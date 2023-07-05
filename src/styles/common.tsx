import styled from "styled-components";

interface ISharedStylesProps {
  gap?: string;
}

const CommonProperties = styled("div")`
  display: flex;
  flex-wrap: wrap;
`;

export const Row = styled(CommonProperties)<ISharedStylesProps>`
  align-items: center;
  gap: ${(props) => (props.gap ? props.gap : "0")};
`;

export const Column = styled(CommonProperties)<ISharedStylesProps>`
  flex-direction: column;
  gap: ${(props) => (props.gap ? props.gap : "0")};
`;
