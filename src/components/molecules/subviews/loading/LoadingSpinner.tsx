import { THEME } from "@/utils/theme";
import React from "react";
import ReactLoading from "react-loading";
import styled from "styled-components";

interface ILoadingSpinnerProps {
  color?: string;
  containerStyle?: string;
  type?:
    | "blank"
    | "balls"
    | "bars"
    | "bubbles"
    | "cubes"
    | "cylon"
    | "spin"
    | "spinningBubbles"
    | "spokes";
  height?: number;
  width?: number;
}

const Container = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
`;

const LoadingSpinner: React.FC<ILoadingSpinnerProps> = (props) => {
  return (
    <Container>
      <ReactLoading
        type={props.type ? props.type : "spin"}
        color={props.color ? props.color : THEME.primary}
        height={props.height ? props.height : 25}
        width={props.width ? props.width : 25}
      />
    </Container>
  );
};

export default LoadingSpinner;
