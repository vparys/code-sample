import {
  type ChangeEvent,
  type Dispatch,
  type JSX,
  type SetStateAction,
  useState,
} from "react";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";
import toast from "react-hot-toast";

import Button from "@/src/components/general/button/Button";
import { Icon } from "@/src/components/general/icons/icon/Icon";
import { ResponsiveImage } from "@/src/components/general/responsiveImage/ResponsiveImage";
import { Typography } from "@/src/components/general/typography/Typography";
import { logErrorDebounced } from "@/src/services/logging/honeybadger/logger";
import {
  isLocallyUnique,
  isOverSizeLimit,
  isValidMIME,
} from "@/src/services/storage/fileUploadValidator";
import type { FileFormat, FormFile } from "@/src/types/interfaces";

import { PhotoPositionChanger } from "../photoPositionChanger/PhotoPositionChanger";

import styles from "./FilesUpload.module.scss";

type Props<T extends FieldValues> = {
  formats: FileFormat[];
  identifier: Path<T>;
  maxQuantity: number;
  onChange: (newFiles: FormFile[]) => void;
  register: UseFormRegister<T>;
  setFilesToDelete?: Dispatch<SetStateAction<string[]>>;
  value: FormFile[];
};

export const FilesUpload = <T extends FieldValues>({
  formats,
  maxQuantity,
  identifier,
  register,
  onChange,
  value,
  setFilesToDelete,
}: Props<T>): JSX.Element => {
  const [draggedPhotoIndex, setDraggedPhotoIndex] = useState<number>(-1);
  const [target, setTarget] = useState<number>(-1);

  const acceptedFormats = formats
    .map((format) => `.${format.extension}`)
    .join(",");

  const storedFiles = value || [];

  const handleFileUpload = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const files = e.target.files;
    if (!files) {
      return;
    }

    const addedFiles = Array.from(files)
      .slice(0, maxQuantity - storedFiles.length)
      .reduce<FormFile[]>((acc, uploadedFile) => {
        if (!isLocallyUnique(uploadedFile, storedFiles)) {
          toast.error(`Soubor s názvem ${uploadedFile.name} již máte přidaný.`);
          return acc;
        }
        if (!isValidMIME(uploadedFile)) {
          toast.error(
            `Soubor s názvem ${uploadedFile.name} má neplatný formát.`
          );
          return acc;
        }
        if (isOverSizeLimit(uploadedFile)) {
          toast.error(`Soubor s názvem ${uploadedFile.name} je příliš velký.`);
          return acc;
        }

        acc.push({
          url: URL.createObjectURL(uploadedFile),
          file: uploadedFile,
          local: true,
        });

        return acc;
      }, []);
    onChange([...storedFiles, ...addedFiles]);
  };

  const handleFileRemove = async (index: number): Promise<void> => {
    const fileToRemove = storedFiles[index];
    try {
      onChange(storedFiles.filter((_, i) => i !== index));

      const fileUrl = !fileToRemove.local ? fileToRemove.url : null;
      if (fileUrl && setFilesToDelete) {
        setFilesToDelete((prev) => [...prev, fileUrl]);
      }
    } catch (err) {
      logErrorDebounced(err, "error on post image delete", {
        file: JSON.stringify(fileToRemove),
      });
    }

    const newFiles = [
      ...storedFiles.slice(0, index),
      ...storedFiles.slice(index + 1),
    ];
    onChange(newFiles);
  };

  const movePhoto = (fromIndex: number, toIndex: number): void => {
    const newFiles = [...storedFiles];

    const isMovingBackwards = toIndex < fromIndex;

    const newInsertIndex = isMovingBackwards ? toIndex : toIndex + 1;
    newFiles.splice(newInsertIndex, 0, storedFiles[fromIndex]);

    const removeOriginalIndex = isMovingBackwards ? fromIndex + 1 : fromIndex;
    newFiles.splice(removeOriginalIndex, 1);

    onChange(newFiles);
  };

  const onDragStart = (e: React.DragEvent<HTMLDivElement>): void => {
    setDraggedPhotoIndex(Number(e.currentTarget.id));
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setTarget(Number(e.currentTarget.id));
  };

  const onDrop = (): void => {
    movePhoto(draggedPhotoIndex, target);
    setDraggedPhotoIndex(-1);
    setTarget(-1);
  };

  const [isPositionChangerVisible, setIsPositionChangerVisible] =
    useState<boolean>(false);

  return (
    <>
      {isPositionChangerVisible ? (
        <PhotoPositionChanger
          pictures={storedFiles}
          setIsVisible={setIsPositionChangerVisible}
          setState={onChange}
        />
      ) : null}
      <div className="flex justify-between">
        <Typography
          as="p"
          variant="headline-300"
        >{`Nahráno: ${storedFiles.length} / ${maxQuantity}`}</Typography>
        {storedFiles.length >= 2 && (
          <Button
            className="mb-2"
            size="small"
            type="button"
            onClick={(): void => setIsPositionChangerVisible(true)}
          >
            Změnit pořadí
          </Button>
        )}
      </div>
      <div ref={register(identifier).ref} className="flex flex-wrap gap-2">
        {storedFiles.length < maxQuantity && (
          <div className={styles.filesUpload}>
            <input
              accept={acceptedFormats}
              id={`${identifier}_fileInput`}
              name={`${identifier}_fileInput`}
              type="file"
              multiple
              onChange={handleFileUpload}
              onClick={(e): void => {
                (e.target as HTMLInputElement).value = "";
              }}
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor={`${identifier}_fileInput`}>
              <Icon id="plus" size={24} variant="white" />
            </label>
          </div>
        )}
        {storedFiles.map((shownFile, index) => (
          <div
            key={shownFile.url}
            className={styles.uploadedFile}
            id={index.toString()}
            draggable
            onDragOver={onDragOver}
            onDragStart={onDragStart}
            onDrop={onDrop}
          >
            <ResponsiveImage
              alt={
                shownFile.local ? shownFile.file.name : `Obrázek ${index + 1}`
              }
              height={104}
              src={shownFile.url}
              width={104}
            />
            {index === 0 && (
              <div className={styles.mainPicName}>Hlavní fotka</div>
            )}
            <div className={styles.fileName}>
              {shownFile.local ? shownFile.file.name : `Obrázek ${index + 1}`}
            </div>
            <Button
              className={styles.deleteButton}
              noStyles
              onClick={(): Promise<void> => handleFileRemove(index)}
            >
              <Icon id="delete" size={16} variant="white" />
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};
