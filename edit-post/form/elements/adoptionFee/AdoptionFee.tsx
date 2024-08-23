import type { FC } from "react";
import { useFormContext } from "react-hook-form";

import Button from "@/src/components/general/button/Button";
import { FormSection } from "@/src/components/general/forms";
import { FieldWrapper } from "@/src/components/general/forms/elements/fieldWrapper/FieldWrapper";
import { Input } from "@/src/components/general/forms/elements/input/Input";
import { Icon } from "@/src/components/general/icons/icon/Icon";
import { DivRow } from "@/src/components/general/structure/Structure";
import { placeholders } from "@/src/components/post/form/constants";

import { InputError } from "../inputError/InputError";

import styles from "./AdoptionFee.module.scss";

export const AdoptionFee: FC = () => {
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();

  const changePrice = (value: number): void => {
    const newValue = Number(value) + Number(getValues("adoptionFee"));
    setValue("adoptionFee", newValue > 0 ? newValue : 0, {
      shouldValidate: true,
    });
  };

  return (
    <FormSection>
      <FieldWrapper label="Adopční poplatek">
        <DivRow className={styles.row}>
          <Button
            className={`p-4 ${styles.priceButton}`}
            type="button"
            variant="outline"
            onClick={(): void => changePrice(-500)}
          >
            <Icon id="minus" size={24} variant="primary" />
          </Button>
          <Input
            placeholder={placeholders.price}
            type="number"
            {...register("adoptionFee", { required: true })}
            className={styles.input}
            endAdornment="Kč"
            wrapperClassName={styles.price}
          />
          <Button
            className={`p-4 ${styles.priceButton}`}
            type="button"
            variant="outline"
            onClick={(): void => changePrice(500)}
          >
            <Icon id="plus" size={24} variant="primary" />
          </Button>
        </DivRow>
        <InputError error={errors.adoptionFee} />
      </FieldWrapper>
    </FormSection>
  );
};
