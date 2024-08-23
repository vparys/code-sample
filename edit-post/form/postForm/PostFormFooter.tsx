import type { FC } from "react";

import Button from "@/src/components/general/button/Button";
import { Icon } from "@/src/components/general/icons/icon/Icon";

import styles from "./PostForm.module.scss";

type Props = {
  formSendDisabled: boolean;
  onFormClose: () => void;
};

export const PostFormFooter: FC<Props> = ({
  formSendDisabled,
  onFormClose,
}) => (
  <div className={`flex ${styles.stickyFooter}`}>
    <div className="w-full md:w-auto">
      <Button
        className={`flex w-full justify-center ${styles.submitButton}`}
        disabled={formSendDisabled}
        iconRight={<Icon id="chevron-right" size={24} variant="white" />}
        type="submit"
      >
        Pokračovat
      </Button>
    </div>
    <div className="mx-2 hidden md:block">
      <Button
        iconLeft={<Icon id="close" size={24} variant="primary" />}
        type="button"
        variant="outline"
        onClick={onFormClose}
      >
        Zrušit
      </Button>
    </div>
  </div>
);
