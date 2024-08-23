import classNames from "classnames";
import type { FC } from "react";
import {
  type FieldError,
  type FieldErrorsImpl,
  type Merge,
} from "react-hook-form";

import { Icon } from "@/src/components/general/icons/icon/Icon";
import { Typography } from "@/src/components/general/typography/Typography";

import styles from "./InputError.module.scss";

type Props = {
  error:
    | FieldError
    | Merge<FieldError, Merge<FieldError, FieldErrorsImpl<object>>>
    | undefined;
};

export const InputError: FC<Props> = ({ error }) => {
  if (!error) return null;

  return (
    <div className={classNames("mt-2 flex gap-2", styles.error)}>
      <Icon id="info" size={20} variant="alert500" />
      <Typography as="span">{error.message}</Typography>
    </div>
  );
};
