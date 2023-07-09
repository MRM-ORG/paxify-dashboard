import React from "react";
import styled, { css } from "styled-components";
import { mq } from "../../../../utils/responsive";
import InputContainer, { IInputContainerProps } from "../InputContainer";

export interface IFormikTextInputProps extends IInputContainerProps {
  placeholder: string;
  name: string;
  type?: "password" | "text" | "number";
  inputContainerStyle?: string;
  isError?: boolean;
  leftDecoration?: JSX.Element;
  rightDecoration?: JSX.Element;
  maxLength?: number;
  defaultValue?: string;
  disabled?: boolean;
  readOnly?: boolean;
}

interface InputInterface {
  isEmpty: boolean;
  customWidth?: string;
}

export const Input = styled("input")<InputInterface>`
  border: 0 none white;
  color: black;
  background-color: transparent;
  font-size: 14px;
  fontweight: 500;
  padding: 0;
  textalign: left;
  display: inline;
  flex-grow: 1;
  outline: none;
  ${mq.medium(css`
    font-size: 16px;
  `)};
`;

const Decoration = styled("div")`
  margin-right: 5px;
`;

const FormikTextInput: React.FC<IFormikTextInputProps> = (props, field) => {
  return (
    <InputContainer disabled={props.disabled} isError={props.isError}>
      <Decoration>{props.leftDecoration}</Decoration>
      <Input
        isDisabled={props.disabled}
        {...field}
        {...props}
        type={props.type}
        className="text-input"
        maxLength={props.maxLength}
        disabled={props.disabled || props.readOnly}
      />
      <Decoration>{props.rightDecoration}</Decoration>
    </InputContainer>
  );
};

export default FormikTextInput;
