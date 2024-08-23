import type { Dispatch, FC, SetStateAction } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { FieldWrapper } from "@/src/components/general/forms";
import { FormSection } from "@/src/components/general/forms/elements/formSection/FormSection";
import { SvgIcon } from "@/src/components/general/icons/SvgIcon";
import { Typography } from "@/src/components/general/typography/Typography";
import { fileTypes } from "@/src/components/post/form/constants";
import { maxImageSizeInMB } from "@/src/constants/assets";
import { supportedUploadImageExtensions } from "@/src/constants/fileExtension";

import { FilesUpload } from "../filesUpload/FilesUpload";
import { InputError } from "../inputError/InputError";

import styles from "./Photos.module.scss";

type Props = {
  setFilesToDelete?: Dispatch<SetStateAction<string[]>>;
};

export const Photos: FC<Props> = ({ setFilesToDelete }: Props) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormSection>
      <FieldWrapper
        icon={<SvgIcon color="#ff6666" height={24} icon="camera" width={24} />}
        label="Fotografie"
      >
        <div className={styles.text}>
          <Typography as="p" variant="body-large" noMargin>
            Maximální datová velikost jedné fotografie je {maxImageSizeInMB}MB.
          </Typography>
          <Typography as="p" variant="body-large" noMargin>
            Podporované formáty {supportedUploadImageExtensions.join(", ")}
          </Typography>
        </div>
        <Controller
          control={control}
          name="animalImages"
          render={({ field: { onChange, value } }) => (
            <FilesUpload
              formats={fileTypes.images}
              identifier="animalImages"
              maxQuantity={15}
              register={register}
              setFilesToDelete={setFilesToDelete}
              value={value}
              onChange={onChange}
            />
          )}
        />
        <InputError error={errors.animalImages} />
      </FieldWrapper>
    </FormSection>
  );
};
