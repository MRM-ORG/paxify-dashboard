import { THEME } from "@/utils/theme";
import React from "react";
import styled from "styled-components";

export interface IInputContainerProps {
  customBackgroundColor?: string;
  customWidth?: string;
  disabled?: boolean;
  isError?: boolean;
  children?: React.ReactNode;
}

const Container = styled("div")<IInputContainerProps>`
  position: relative;
  border-radius: 4px;
  display: flex;
  padding-left: 15px;
  padding-right: 15px;
  justify-content: center;
  border: ${(props) =>
    props.isError ? "1px solid red" : `1px solid ${THEME.body1}`};
  max-width: ${(props) => (props.customWidth ? props.customWidth : "unset")};
  min-height: 45px;
  background-color: ${(props) =>
    props.customBackgroundColor
      ? props.customBackgroundColor
      : props.disabled
      ? THEME.body1
      : "white"};
  flex-direction: row;
  align-items: center;
`;

const InputContainer: React.FC<IInputContainerProps> = (props) => {
  return (
    <Container {...props} isError={props.isError} disabled={props.disabled}>
      {props.children}
    </Container>
  );
};

export default InputContainer;
