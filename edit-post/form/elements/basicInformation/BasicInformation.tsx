import type { FC } from "react";
import { useFormContext } from "react-hook-form";

import { FieldWrapper, FormSection } from "@/src/components/general/forms";
import { Input } from "@/src/components/general/forms/elements/input/Input";
import { RaceInput } from "@/src/components/general/forms/elements/raceInput/RaceInput";
import { Select } from "@/src/components/general/forms/elements/select/Select";
import { SvgIcon } from "@/src/components/general/icons/SvgIcon";
import { basicInformationChoices } from "@/src/components/post/form/constants";
import {
  type AnimalKey,
  CatKey,
  catSize,
  dogSize,
  gender,
} from "@/src/constants/animalEnums";

import { BoolChoices } from "../boolChoices/BoolChoices";

import styles from "./BasicInformation.module.scss";

interface Size {
  key: AnimalKey;
  label: string;
}

type Props = {
  animalType: AnimalKey;
};

export const BasicInformation: FC<Props> = ({ animalType }) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const getSize = (animal: AnimalKey): Size[] => {
    const animalSize = animal === CatKey ? catSize : dogSize;
    return Object.entries(animalSize).map(([animalKey, text]) => ({
      key: animalKey as AnimalKey,
      label: text,
    }));
  };

  return (
    <FormSection>
      <FieldWrapper
        icon={
          <SvgIcon color="#ff6666" height={24} icon="starEmpty" width={24} />
        }
        label="Základní informace"
      >
        <div className="flex flex-wrap gap-8">
          <div className="flex w-full flex-col gap-8 md:flex-row md:gap-3">
            <Select
              errorMessage={errors.gender?.message?.toString()}
              identifier="gender"
              label="Pohlaví"
              options={[
                {
                  key: gender.male,
                  label: "Samec",
                },
                {
                  key: gender.female,
                  label: "Samice",
                },
              ]}
              register={register}
              required
            />
            <Input
              errorMessage={errors.birthDate?.message?.toString()}
              hasError={!!errors.birthDate}
              label="Rok narození"
              tooltip="Pokud nevíte, prosíme alespoň o odhad."
              type="date"
              required
              {...register("birthDate", { required: true })}
            />
          </div>
          <div className="flex w-full flex-col gap-8 md:flex-row md:gap-3">
            <Select
              errorMessage={errors.size?.message?.toString()}
              identifier="size"
              label="Velikost"
              options={getSize(animalType)}
              register={register}
              required
            />
            <Input
              errorMessage={errors.foundOnDate?.message?.toString()}
              hasError={!!errors.foundOnDate}
              label="Datum umístění"
              type="date"
              required
              {...register("foundOnDate", { required: true })}
            />
          </div>
          <RaceInput
            animalType={animalType}
            errorMessage={errors?.race?.message?.toString()}
          />
        </div>
        <hr className={styles.line} />
        <BoolChoices
          choices={basicInformationChoices}
          register={register}
          setValue={setValue}
          watch={watch}
        />
      </FieldWrapper>
    </FormSection>
  );
};
