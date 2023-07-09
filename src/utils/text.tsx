import styled from "styled-components";
import { THEME } from "./theme";

export const H1 = styled("h1")<{ color?: string }>`
  font-size: 32px;
  color: ${(props) => (props.color ? props.color : THEME.primary)};
`;

export const H2 = styled("h2")<{ color?: string; fontWeight?: string }>`
  font-size: 24px;
  fontweight: ${(props) => (props.fontWeight ? props.fontWeight : "600")};
  color: ${(props) => (props.color ? props.color : THEME.primary)};
`;

export const H3 = styled("h3")<{ color?: string; fontWeight?: string }>`
  font-size: 18px;
  fontweight: ${(props) => (props.fontWeight ? props.fontWeight : "400")};
  color: ${(props) => (props.color ? props.color : THEME.primary)};
`;

export const Body = styled("div")<{ color?: string; fontWeight?: string }>`
  font-size: 16px;
  line-height: 24px;
  fontweight: ${(props) => (props.fontWeight ? props.fontWeight : "400")};
  color: ${(props) => (props.color ? props.color : THEME.body1)};
`;

export const BodyText = styled("div")<{ color?: string; fontWeight?: string }>`
  font-size: 14px;
  line-height: 24px;
  fontweight: ${(props) => (props.fontWeight ? props.fontWeight : "500")};
  color: ${(props) => (props.color ? props.color : THEME.primary)};
`;

export const ErrorSpan = styled("span")`
  color: ${THEME.danger};
  font-size: 11px;
`;

export const GenericText = styled("div")<{
  color?: string;
  fontSize: string;
  fontWeight?: string;
  lineHeight?: string;
}>`
  font-size: ${(props) => (props.fontSize ? props.fontSize : "14px")};
  line-height: ${(props) =>
    props.lineHeight ? props.lineHeight : `calc(${props.fontSize} * 1.2)`};
  fontweight: ${(props) => (props.fontWeight ? props.fontWeight : "400")};
  color: ${(props) => (props.color ? props.color : THEME.primary1)};
`;
