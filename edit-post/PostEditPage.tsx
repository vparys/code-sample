import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { FC } from "react";

import { AdminAccessCheckPost } from "@/src/components/access/AdminAccessCheckPost";
import { AuthCheck } from "@/src/components/auth/AuthCheck";
import { Error404 } from "@/src/components/error/Error404";
import { Error500 } from "@/src/components/error/Error500";
import { PageLoading } from "@/src/components/general/loading/PageLoading";
import { PostForm } from "@/src/components/post/form/postForm/PostForm";
import { useTapBar } from "@/src/hooks/useTapBar";
import { getPost, updatePostWithImgs } from "@/src/services/db/post";
import { logErrorDebounced } from "@/src/services/logging/honeybadger/logger";
import { deleteImagesByUrl } from "@/src/services/storage/delete";
import type {
  IPost,
  IPostDBPayload,
  IPostFormPayload,
} from "@/src/types/interfaces";
import { getObjectsDifference } from "@/src/utils/common";
import { formatDateToInputValue } from "@/src/utils/dates";
import { getUrlQuery } from "@/src/utils/routing/getUrlQuery";

export const PostEditPage: FC = () => {
  const [filesToDelete, setFilesToDelete] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setIsTapBarVisible } = useTapBar();

  useEffect(() => {
    setIsTapBarVisible(false);

    return (): void => {
      setIsTapBarVisible(true);
    };
  }, [setIsTapBarVisible]);

  const postId = router.isReady ? getUrlQuery(router.query.uid) : "";

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => {
      if (!postId) return;
      return getPost(postId);
    },
    enabled: !!postId,
  });

  const { mutateAsync } = useMutation({
    mutationFn: (data: IPostFormPayload) => editPost(data, postId),
    onError: (error) => {
      logErrorDebounced(error, "error on saving editing/creating post");
    },
    onSuccess: (changedData) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.setQueryData(["post", postId], (oldData: IPost) => {
        return {
          ...oldData,
          ...changedData,
          ...(changedData.birthDate && {
            birthDate: new Date(changedData.birthDate),
          }),
          ...(changedData.foundOnDate && {
            foundOnDate: new Date(changedData.foundOnDate),
          }),
          ...(changedData.animalImages && {
            images: changedData.images,
          }),
        };
      });
      router.push(`/posts/${postId}`);
    },
  });

  if (isLoading || !router.isReady) return <PageLoading />;

  if (isError) {
    logErrorDebounced(error, "error on edit post - fetching data");
    return <Error500 errorMessage={error.message} />;
  }

  if (!data) return <Error404 />;

  const preparedPostData: IPostFormPayload = {
    ...data,
    birthDate: formatDateToInputValue(data.birthDate),
    foundOnDate: formatDateToInputValue(data.foundOnDate),
    animalImages: data.images.map(({ url, fileRefPath }) => ({
      url,
      fileRefPath,
      file: null,
      local: false,
    })),
  };

  async function editPost(
    data: IPostFormPayload,
    postId: string
  ): Promise<Partial<IPostFormPayload>> {
    const changedData = getObjectsDifference<IPostFormPayload>(
      data,
      preparedPostData
    );

    if (Object.keys(changedData).length > 0) {
      const { foundOnDate, birthDate, ...rest } = changedData;

      const payload: Partial<IPostDBPayload> = {
        ...rest,
        ...(birthDate && {
          birthDate: new Date(birthDate),
        }),
        ...(foundOnDate && {
          foundOnDate: new Date(foundOnDate),
        }),
      };

      if (filesToDelete) {
        await deleteImagesByUrl(filesToDelete);
      }
      changedData.images = await updatePostWithImgs(postId, payload);
    }

    return changedData;
  }

  return (
    <AuthCheck>
      <AdminAccessCheckPost>
        <PostForm
          header="Upravit inzerát"
          postData={preparedPostData}
          setFilesToDelete={setFilesToDelete}
          toastMessages={{
            loading: "Ukládám změny...",
            success: "Změny byly uloženy.",
          }}
          onSubmit={(data): Promise<Partial<IPostFormPayload>> =>
            mutateAsync(data)
          }
        />
      </AdminAccessCheckPost>
    </AuthCheck>
  );
};
