import { THEME } from "@/utils/theme";
import React from "react";
import styled from "styled-components";

export interface ISwitchProps {
  id: string;
  toggled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const Container = styled("div")`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
  border-radius: 5px;
  background: inherit;
`;

const Checkbox = styled("input")`
  display: none;

  & + label {
    cursor: pointer;
    position: relative;
    display: inline-block;
    user-select: none;
    transition: 0.4s ease;
    height: 20px;
    width: 36px;
    border: 1px solid ${THEME.body1};
    border-radius: 60px;

    &:before {
      content: "";
      position: absolute;
      display: block;
      transition: 0.2s cubic-bezier(0.24, 0, 0.5, 1);
      height: 20px;
      width: 36px;
      top: -1px;
      left: -1px;
      border-radius: 30px;
      background: ${THEME.background2};
    }

    &:after {
      content: "";
      position: absolute;
      display: block;
      transition: 0.35s cubic-bezier(0.54, 1.6, 0.5, 1);
      background: white;
      height: 14px;
      width: 14px;
      top: 2px;
      left: 1.5px;
      border-radius: 60px;
      box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
        0px 1px 2px rgba(16, 24, 40, 0.06);
    }
  }

  &:checked {
    & + label:before {
      background: ${THEME.buttonPrimary};
      transition: width 0.2s cubic-bezier(0, 0, 0, 0.1);
    }

    & + label:after {
      left: 19px;
    }
  }
`;

const Label = styled("label")``;

const Switch: React.FC<ISwitchProps> = (props) => {
  return (
    <Container>
      <Checkbox
        onChange={() => {
          props.onClick();
        }}
        type="checkbox"
        name={props.id}
        id={props.id}
        checked={props.toggled}
      />
      <Label htmlFor={props.id}></Label>
      <div>{props.children}</div>
    </Container>
  );
};

export default Switch;
