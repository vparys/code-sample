import classNames from "classnames";
import React, { forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import type {
  GroupBase,
  InputActionMeta,
  OptionsOrGroups,
  SelectInstance,
  StylesConfig,
} from "react-select";
import AsyncSelect from "react-select/async";

import { SvgIcon } from "@/src/components/general/icons/SvgIcon";
import { Typography } from "@/src/components/general/typography/Typography";
import { getFormattedMapSuggestions } from "@/src/services/mapycz/suggestions";
import { type IFormattedSuggestion } from "@/src/types/interfaces";
import { debounce } from "@/src/utils/common";

import { Input } from "../input/Input";
import { Label } from "../label/Label";
import { AlwaysVisibleInput } from "./AlwaysVisibleInput";

import styles from "./AddressSearchBar.module.scss";

type Props = {
  className?: string;
  errorMessage?: string;
  hasError?: boolean;
  label?: string;
  name: string;
  onSelection?: (suggestion: IFormattedSuggestion) => void;
  placeholder?: string;
  required?: boolean;
};

export type AddressSearchBarOptions = {
  label: string;
  value: IFormattedSuggestion;
};

const MIN_QUERY_LENGTH = 3;

export const AddressSearchBar = forwardRef<
  SelectInstance<AddressSearchBarOptions>,
  Props
>(
  (
    {
      name,
      required,
      label,
      onSelection,
      className,
      errorMessage,
      placeholder,
      hasError,
    },
    ref
  ) => {
    const { setValue, watch, register } = useFormContext();
    const value = watch(name);

    const loadOptions = (
      query: string,
      callback: (
        options: OptionsOrGroups<
          AddressSearchBarOptions,
          GroupBase<AddressSearchBarOptions>
        >
      ) => void
    ): void => {
      if (query.length < MIN_QUERY_LENGTH) callback([]);

      debounce(async () => {
        const addresses = await getFormattedMapSuggestions(query);
        if (!addresses) {
          callback([]);
          return;
        }
        const options = addresses.map((address) => ({
          value: address,
          label: address.label,
        }));

        callback(options);
      }, 300)();
    };

    const handleInputChange = (
      inputValue: string,
      { action }: InputActionMeta
    ): void => {
      if (action === "input-change") {
        setValue(name, inputValue, { shouldValidate: true, shouldDirty: true });

        //clear hidden inputs if they are not empty and main input is touched
        if (watch("zip")) {
          setValue("zip", "", { shouldValidate: true, shouldDirty: true });
          setValue("lat", 0, { shouldValidate: true, shouldDirty: true });
          setValue("lon", 0, { shouldValidate: true, shouldDirty: true });
        }
      }
    };

    const handleSelection = (option: AddressSearchBarOptions | null): void => {
      if (!option) {
        return;
      }

      const { value } = option;

      setValue(name, value.streetAddress, {
        shouldValidate: true,
        shouldDirty: true,
      });

      setValue("zip", String(value.zip), {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("lat", Number(value.lat), {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("lon", Number(value.lon), {
        shouldValidate: true,
        shouldDirty: true,
      });

      if (onSelection) {
        onSelection(value);
      }
    };

    const customStyles: StylesConfig<AddressSearchBarOptions> = {
      control: (provided, state) => ({
        ...provided,
        border: state.isFocused ? "2px solid black" : "2px solid transparent",
        boxShadow: "none",
        padding: "6px 15px 6px 15px",
      }),
      option: (provided, state) => ({
        ...provided,
        background: state.isFocused ? "#ff6666" : provided.background,
        color: state.isFocused ? "white" : provided.color,
      }),
      valueContainer: (provided) => ({
        ...provided,
        padding: "0px",
      }),
      container: (provided) => ({
        ...provided,
        padding: "0px",
      }),
    };

    return (
      <div className={styles.container}>
        {label ? (
          <Label htmlFor={name} required={required}>
            {label}
          </Label>
        ) : null}
        <AsyncSelect
          ref={ref}
          className={classNames("form-control", className, {
            [styles.hasError]: hasError,
          })}
          components={{
            Input: AlwaysVisibleInput,
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
            IndicatorsContainer: () => null,
          }}
          inputValue={value}
          loadOptions={loadOptions}
          loadingMessage={(): string => "Hledáme adresu..."}
          name={name}
          noOptionsMessage={(value): string | null => {
            if (value.inputValue.length < MIN_QUERY_LENGTH) return null;
            return "Tuto adresu jsme bohužel nenašli.";
          }}
          placeholder={placeholder}
          required={required}
          styles={customStyles}
          value={{ label: value, value: value }}
          cacheOptions
          onChange={handleSelection}
          onInputChange={handleInputChange}
        />
        {hasError ? (
          <div className={styles.error}>
            <SvgIcon className={styles.errorIcon} icon="alertSolid" size={16} />
            {errorMessage ? (
              <Typography as="span">{errorMessage}</Typography>
            ) : null}
          </div>
        ) : null}
        <Input type="hidden" {...register("zip")} />
        <Input type="hidden" {...register("lat")} />
        <Input type="hidden" {...register("lon")} />
      </div>
    );
  }
);

AddressSearchBar.displayName = "AddressSearchBar";
