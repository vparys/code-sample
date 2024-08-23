import type {
  FieldValues,
  Path,
  SetValueConfig,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

import Button from "@/src/components/general/button/Button";
import { Icon } from "@/src/components/general/icons/icon/Icon";

import styles from "./BoolChoices.module.scss";

type Props<T extends FieldValues> = {
  choices: { id: Path<T>; title: string }[];
  register: UseFormRegister<T>;
  setValue: (
    name: Path<T>,
    value: boolean | undefined,
    options?: SetValueConfig
  ) => void;
  watch: UseFormWatch<T>;
};

export const BoolChoices = <T extends FieldValues>({
  register,
  choices,
  setValue,
  watch,
}: Props<T>): React.JSX.Element => (
  <div className="flex flex-wrap gap-8">
    {choices.map((choice) => {
      const choiceId = watch(choice.id);

      return (
        <div key={choice.id} className="flex w-full flex-col md:w-auto">
          <div className={`mb-2 ${styles.title}`}>{choice.title}</div>
          <div className="flex items-center gap-2">
            <input
              className={styles.visuallyHidden}
              type="checkbox"
              {...register(choice.id)}
            />
            <div className="w-1/2 md:w-auto">
              <Button
                className={styles.choiceButton}
                iconLeft={
                  <Icon
                    id="check"
                    size={24}
                    variant={choiceId ? "white" : "primary"}
                  />
                }
                type="button"
                variant={choiceId ? "default" : "outline"}
                onClick={(): void =>
                  setValue(choice.id, true, {
                    shouldValidate: true,
                    shouldTouch: true,
                    shouldDirty: true,
                  })
                }
              >
                Ano
              </Button>
            </div>

            <div className="w-1/2 md:w-auto">
              <Button
                className={styles.choiceButton}
                iconLeft={
                  <Icon
                    id="close"
                    size={24}
                    variant={choiceId ? "primary" : "white"}
                  />
                }
                type="button"
                variant={choiceId ? "outline" : "default"}
                onClick={(): void =>
                  setValue(choice.id, false, {
                    shouldValidate: true,
                    shouldTouch: true,
                    shouldDirty: true,
                  })
                }
              >
                Ne
              </Button>
            </div>
          </div>
        </div>
      );
    })}
  </div>
);
