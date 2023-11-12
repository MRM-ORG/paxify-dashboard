import styled from "styled-components";

interface ISharedStylesProps {
  gap?: string;
  alignItem?: string;
}

const CommonProperties = styled("div")`
  display: flex;
  flex-wrap: wrap;
`;

export const Row = styled(CommonProperties)<ISharedStylesProps>`
  align-items: ${(props) => (props.alignItem ? props.alignItem : "center")};
  gap: ${(props) => (props.gap ? props.gap : "0")};
`;

export const Column = styled(CommonProperties)<ISharedStylesProps>`
  flex-direction: column;
  gap: ${(props) => (props.gap ? props.gap : "0")};
`;
