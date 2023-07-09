import { THEME } from "@/utils/theme";
import { mq } from "@/utils/responsive";
import React from "react";
import styled, { css } from "styled-components";

interface IPrimaryButtonProps {
  onClick: (e?: any) => void;
  backgroundColor?: string;
  isDisabled?: boolean;
  width?: string;
  background?: string;
  type?: "submit" | "button";
  action?: string;
  children: React.ReactNode;
}

interface IButtonProps {
  background?: string;
  backgroundColor?: string;
  isDisabled?: boolean;
}
interface IContainerProps {
  width?: string;
}

const Container = styled("div")<IContainerProps>`
  transition: 300ms;
  width: ${(props) => (props.width ? props.width : "100%")};
`;

const Button = styled("button")<IButtonProps>`
  min-height: 49px;
  border-radius: 9px;
  color: white;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : THEME.body1};
  background: ${(props) => props.background};
  cursor: pointer;
  transition: 200ms;
  padding: 10px 15px;
  border: 0px;
  outline: none;
  width: 100%;
  &:hover {
    opacity: 0.7;
    opacity: ${(prop) => (prop.isDisabled ? 0.3 : 0.7)};
  }
  opacity: ${(prop) => (prop.isDisabled ? 0.3 : 1)};
  ${mq.medium(css`
    font-size: 17px;
  `)};
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.2);
`;

const FontLabel = styled("div")`
  font-size: 14px;
  fontweight: 400;
`;

const PrimaryButton: React.FC<IPrimaryButtonProps> = (props) => {
  return (
    <Container width={props.width}>
      <Button
        isDisabled={props.isDisabled}
        background={props.background}
        backgroundColor={props.backgroundColor}
        onClick={!props.isDisabled ? props.onClick : () => {}}
        data-action={props.action}
        type={props.type}>
        <FontLabel>{props.children}</FontLabel>
      </Button>
    </Container>
  );
};

export default PrimaryButton;
