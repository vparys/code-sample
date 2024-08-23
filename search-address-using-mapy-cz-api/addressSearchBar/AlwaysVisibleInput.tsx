import { type InputProps, components } from "react-select";

import { type AddressSearchBarOptions } from "./AddressSearchBar";

/**
 * @description This component acts as an utility for react-select package which by default hides the input field.
 * @param props
 * @returns JSX.Element
 */
export const AlwaysVisibleInput = (
  props: InputProps<AddressSearchBarOptions, false>
): JSX.Element => <components.Input {...props} isHidden={false} />;
