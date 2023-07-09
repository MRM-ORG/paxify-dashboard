import { OptionInterface } from "@/interfaces/GeneralModels";
import { THEME } from "@/utils/theme";
import { useField } from "formik";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import styled from "styled-components";

interface IFormikDropdownProps {
  name: string;
  value?: string;
  options: OptionInterface[];
  placeholder: string;
  containerStyle?: string;
  notAllowNull?: string;
  disabled?: boolean;
  isError?: boolean;
  onChange?: (val: any) => void;
}

export interface IFormikSingleSelectComponentProps
  extends IFormikDropdownProps {
  formatOptionLabel?: any;
}

const Container = styled("div")`
  & > div > div {
    border-color: ${THEME.primary};
  }
`;

const FormikSingleSelectComponent: React.FC<
  IFormikSingleSelectComponentProps
> = (props) => {
  let { options, placeholder, name, onChange } = props;
  const [field, _, helpers] = useField(name);
  const [label, setLabel] = useState<string | number | null>(null);

  const customStyles = {
    valueContainer: (provided: any, state: any) => ({
      ...provided,
      minHeight: 45,
    }),
    menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
  };

  useEffect(() => {
    if (props.options == null) return;

    const result = props.options.find((opt) => opt.value === field.value);
    if (result) {
      setLabel(result.label);
    }
  }, [JSON.stringify(props.options), field.value]);

  const _onSelect = (val: any) => {
    helpers.setTouched(true);
    helpers.setValue(val.value, true);
    setLabel(val.label);

    if (onChange) {
      onChange(val);
    }
  };

  return (
    <Container>
      <Select
        defaultValue={field.value}
        options={options}
        styles={customStyles}
        placeholder={placeholder}
        isDisabled={props.disabled}
        onChange={_onSelect}
        formatOptionLabel={props.formatOptionLabel}
        menuPosition={"absolute"}
        menuPlacement={"auto"}
      />
    </Container>
  );
};

export default FormikSingleSelectComponent;
