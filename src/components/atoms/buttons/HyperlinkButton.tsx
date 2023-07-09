import { THEME } from "@/utils/theme";
import React from "react";
import styled from "styled-components";

interface IHyperlinkButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const Container = styled("div")<{ disabled: boolean }>`
  cursor: ${(props) => (props.disabled ? "none" : "pointer")};
  textalign: left;
  color: ${THEME.blue0};
  text-decoration: none;
`;

const HyperlinkButton: React.FC<IHyperlinkButtonProps> = (props) => {
  return (
    <Container
      disabled={props.disabled ?? false}
      onClick={() => {
        !props.disabled && props.onClick();
      }}>
      {props.children}
    </Container>
  );
};

export default HyperlinkButton;
