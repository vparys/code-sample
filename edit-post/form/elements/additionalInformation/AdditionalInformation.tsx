import type { FC } from "react";
import { useFormContext } from "react-hook-form";

import { FieldWrapper, FormSection } from "@/src/components/general/forms";
import { SvgIcon } from "@/src/components/general/icons/SvgIcon";
import { additionalInformationChoices } from "@/src/components/post/form/constants";

import { BoolChoices } from "../boolChoices/BoolChoices";

export const AdditionalInformation: FC = () => {
  const { register, watch, setValue } = useFormContext();

  return (
    <FormSection>
      <FieldWrapper
        icon={
          <SvgIcon color="#ff6666" height={24} icon="unfoldMore" width={24} />
        }
        label="Dodatečná informace"
      >
        <BoolChoices
          choices={additionalInformationChoices}
          register={register}
          setValue={setValue}
          watch={watch}
        />
      </FieldWrapper>
    </FormSection>
  );
};
