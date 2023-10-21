import React, { CSSProperties } from "react";
import FormikTextInput, { IFormikTextInputProps } from "./FormikTextInput";
import { useField } from "formik";
import styled from "styled-components";
import Spacer from "@/components/atoms/Spacer";
import { BodyText, ErrorSpan } from "@/utils/text";

export interface IFormikLabelledTextInputProps extends IFormikTextInputProps {
  label?: string;
  width?: string;
  toolTip?: string;
  leftDecoration?: JSX.Element;
  rightDecoration?: JSX.Element;
  labelStyle?: CSSProperties;
  defaultValue?: string;
  disabled?: boolean;
  readOnly?: boolean;
}

const Container = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;
  textalign: left;
`;

const Label = styled("label")``;

const FormikLabelledTextInput: React.FC<IFormikLabelledTextInputProps> = (
  props
) => {
  const [field, meta] = useField(props);

  const _renderErrorText = () => {
    const touched = meta.touched;
    const error = meta.error;
    if (touched && error) {
      return error;
    } else return null;
  };

  const error = _renderErrorText();

  return (
    <Container>
      <Label htmlFor={props.name}>
        <BodyText>{props.label}</BodyText>
      </Label>
      <Spacer height={6} />
      <ErrorSpan>{error}</ErrorSpan>
      <FormikTextInput
        toolTip={props.toolTip}
        isError={error !== null}
        {...field}
        {...props}
      />
    </Container>
  );
};

export default FormikLabelledTextInput;
