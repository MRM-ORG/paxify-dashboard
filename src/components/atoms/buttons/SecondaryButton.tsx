import { THEME } from "@/utils/theme";
import { mq } from "@/utils/responsive";
import React from "react";
import styled, { css } from "styled-components";

interface IPrimaryButtonProps {
  onClick: (e?: any) => void;
  backgroundColor?: string;
  width?: string;
  height?: string;
  disabled?: boolean;
  multiChildren?: boolean;
  borderRadius?: string;
  background?: string;
  borderColor?: string;
  color?: string;
  type?: "submit" | "button";
  action?: string;
  children: React.ReactNode;
}

interface IButtonProps {
  background?: string;
  backgroundColor?: string;
  borderColor?: string;
  color?: string;
  isDisabled?: boolean;
  borderRadius?: string;
}
interface IContainerProps {
  width?: string;
}

const Container = styled("div")<IContainerProps>`
  transition: 300ms;
  width: ${(props) => (props.width ? props.width : "100%")};
`;

const Button = styled("button")<IButtonProps>`
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "8px"};
  color: ${(props) => (props.color ? props.color : THEME.primary)};
  background: ${(props) => props.background};
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : THEME.body1};
  transition: 200ms;
  padding: 8px 14px;
  border: ${(props) =>
    props.borderColor ? `1px solid ${props.borderColor}` : "none"};
  outline: none;
  width: 100%;

  cursor: ${(prop) => (!prop.isDisabled ? "pointer" : "auto")};
  &:hover {
    opacity: 0.7;
    opacity: ${(prop) => (prop.isDisabled ? 0.3 : 0.7)};
  }
  opacity: ${(prop) => (prop.isDisabled ? 0.3 : 1)};
  ${mq.medium(css`
    font-size: 17px;
  `)};
`;

const FontLabel = styled("div")`
  font-size: 14px;
  fontweight: 400;
`;

const Children = styled(FontLabel)`
  gap: 5px;
  display: flex;
`;

const SecondaryButton: React.FC<IPrimaryButtonProps> = (props) => {
  return (
    <Container width={props.width}>
      <Button
        isDisabled={props.disabled}
        borderRadius={props.borderRadius}
        background={props.background}
        backgroundColor={props.backgroundColor}
        color={props.color}
        borderColor={props.borderColor}
        onClick={!props.disabled ? props.onClick : () => {}}
        data-action={props.action}
        type={props.type}>
        {props.multiChildren ? (
          <Children>{props.children}</Children>
        ) : (
          <FontLabel>{props.children}</FontLabel>
        )}
      </Button>
    </Container>
  );
};

export default SecondaryButton;
