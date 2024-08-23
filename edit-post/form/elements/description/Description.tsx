import type { FC } from "react";
import { useFormContext } from "react-hook-form";

import { FieldWrapper } from "@/src/components/general/forms/elements/fieldWrapper/FieldWrapper";
import { FormSection } from "@/src/components/general/forms/elements/formSection/FormSection";
import { Input } from "@/src/components/general/forms/elements/input/Input";
import { SvgIcon } from "@/src/components/general/icons/SvgIcon";
import { TextArea } from "@/src/components/general/textarea/TextArea";
import { animalList } from "@/src/constants/animalEnums";

import { InputError } from "../inputError/InputError";

type Props = {
  placeholders: { [index: string]: string };
};

export const Description: FC<Props> = ({ placeholders }) => {
  const {
    register,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext();

  const animalGenitiv = animalList.find(
    (animal) => animal.key === getValues("animal")
  )?.genitiv;

  return (
    <FormSection>
      <FieldWrapper
        icon={
          <SvgIcon color="#ff6666" height={24} icon="fileEdit" width={24} />
        }
        id="name"
        label={`Název ${animalGenitiv}`}
      >
        <Input
          maxLength={15}
          placeholder={placeholders.name}
          value={watch("name")}
          {...register("name", { required: true })}
          showCounter
        />
        <InputError error={errors.name} />
      </FieldWrapper>

      <FieldWrapper
        helperText="Tady popište co nejlépe jakú má zvířatko povahu, po případě jeho historii nebo příběh. Čím lepší popis napíšete, tím lépe dokážete oslovit potenciální zájemce."
        icon={<SvgIcon color="#ff6666" height={24} icon="edit" width={24} />}
        id="description"
        label="Popis inzerátu"
      >
        <TextArea
          fieldId="description"
          maxLength={1500}
          placeholder={placeholders.description}
          register={register}
          value={watch("description")}
          showCounter
        />
        <InputError error={errors.description} />
      </FieldWrapper>
    </FormSection>
  );
};
