import { zodResolver } from "@hookform/resolvers/zod";

import classNames from "classnames";
import type { Dispatch, FC, SetStateAction } from "react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";

import Button from "@/src/components/general/button/Button";
import { Icon } from "@/src/components/general/icons/icon/Icon";
import { Typography } from "@/src/components/general/typography/Typography";
import { type AnimalKey } from "@/src/constants/animalEnums";
import { type IPostFormPayload } from "@/src/types/interfaces";

import { placeholders } from "../constants";
import { AdditionalInformation } from "../elements/additionalInformation/AdditionalInformation";
import { AdoptionFee } from "../elements/adoptionFee/AdoptionFee";
import { BasicInformation } from "../elements/basicInformation/BasicInformation";
import { Description } from "../elements/description/Description";
import { Photos } from "../elements/photos/Photos";
import { PostFormFooter } from "./PostFormFooter";

import styles from "./PostForm.module.scss";

const formSchema = z
  .object({
    name: z
      .string()
      .min(1, "Vyplňte název inzerátu")
      .max(15, "Jméno může mít maximálně 15 znaků"),
    description: z
      .string()
      .min(1, "Vyplňte popis inzerátu")
      .max(1500, "Popis může mít maximálně 1500 znaků"),
    gender: z.string().min(1, "Vyberte pohlaví mazlíčka").max(16),
    animal: z.string().min(1).max(32),
    race: z.array(z.string()).max(3),
    mixedRace: z.boolean(),
    animalImages: z
      .array(
        z.object({
          url: z.string().min(1).max(255),
          file:
            typeof window === "undefined"
              ? z.undefined()
              : z.instanceof(File).nullable(),
          local: z.boolean(),
          fileRefPath: z.union([z.string(), z.undefined()]),
        }),
        { invalid_type_error: "Nahrajte alespoň 5 obrázků" }
      )
      .min(5, "Nahrajte alespoň 5 obrázků")
      .max(25, "Nahrajte maximálně 25 obrázků"),
    birthDate: z.coerce.date({
      errorMap: (issue, { defaultError }) => ({
        message:
          issue.code === "invalid_date"
            ? "Vyplňte datum narození mazlíčka"
            : defaultError,
      }),
    }),
    foundOnDate: z.coerce.date({
      errorMap: (issue, { defaultError }) => ({
        message:
          issue.code === "invalid_date"
            ? "Vyplňte datum nalezení mazlíčka"
            : defaultError,
      }),
    }),
    size: z.string().min(1, "Vyberte velikost mazlíčka").max(16),
    vaccinated: z.boolean(),
    dewormed: z.boolean(),
    chipped: z.boolean(),
    castrated: z.boolean(),
    handicaped: z.boolean(),
    suitableForKids: z.boolean(),
    suitableForOtherAnimals: z.boolean(),
    suitableForNewbies: z.boolean(),
    suitableForOutside: z.boolean(),
    suitableForIndoors: z.boolean(),
    petFacilityUid: z.string().min(1).max(64),
    adoptionFee: z.coerce
      .string()
      .min(1, "Zadejte prosím adopční poplatek")
      .pipe(z.coerce.number().min(0, "Adopční poplatek nesmí být záporný")),
    createdBy: z.string().min(1).max(64),
  })
  .refine(
    (data) => {
      if (!data.mixedRace) {
        return data.race.length >= 1;
      }
      return true;
    },
    {
      message: "Vyberte plemeno nebo křížence",
      path: ["race"],
    }
  );
interface IDefaultPostData extends Partial<IPostFormPayload> {
  animal: AnimalKey;
}

type Props = {
  header?: string;
  onSubmit: (data: IPostFormPayload) => Promise<unknown>;
  postData: IDefaultPostData;
  setFilesToDelete?: Dispatch<SetStateAction<string[]>>;
  toastMessages: { loading: string; success: string };
};

export const PostForm: FC<Props> = ({
  onSubmit,
  postData,
  toastMessages,
  header,
  setFilesToDelete,
}) => {
  const methods = useForm<IPostFormPayload>({
    defaultValues: postData,
    resolver: zodResolver(formSchema),
  });

  const handleFormClose = (): void => {
    window.history.back();
  };

  const submitWrapper = async (data: IPostFormPayload): Promise<void> => {
    setIsFormSendDisabled(true);
    toast.promise(
      onSubmit(data),
      {
        loading: toastMessages.loading,
        success: toastMessages.success,
        error: () => {
          setIsFormSendDisabled(false);
          return "Chyba při ukládání inzerátu";
        },
      },
      {
        loading: {
          duration: Infinity,
        },
        success: {
          duration: 3000,
        },
        error: {
          duration: 3000,
        },
      }
    );
  };

  const [isFormSendDisabled, setIsFormSendDisabled] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div
        className={classNames(
          "flex items-center md:hidden",
          styles.closeButton
        )}
      >
        <Button noStyles onClick={handleFormClose}>
          <Icon id="close" size={24} />
        </Button>
      </div>
      <Typography
        as="h1"
        className={classNames(styles.hl, "mt-6")}
        variant="headline-600"
      >
        {header}
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submitWrapper)}>
          <Description placeholders={placeholders} />
          <Photos setFilesToDelete={setFilesToDelete} />
          <BasicInformation animalType={postData.animal} />
          <AdditionalInformation />
          <AdoptionFee />
          <PostFormFooter
            formSendDisabled={isFormSendDisabled}
            onFormClose={handleFormClose}
          />
        </form>
      </FormProvider>
    </div>
  );
};
