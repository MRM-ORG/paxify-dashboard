import { useField } from "formik";
import React from "react";
import FormikSingleSelectComponent, {
  IFormikSingleSelectComponentProps,
} from "./FormikSingleSelectComponent";
import styled from "styled-components";
import { BodyText, ErrorSpan } from "@/utils/text";
import Spacer from "@/components/atoms/Spacer";
interface IFormikLabelledSingleSelectProps
  extends IFormikSingleSelectComponentProps {
  label: string;
  labelSize?: number;
  width?: string;
  onChange?: (val: any) => void;
  disabled?: boolean;
}

const Container = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const FormikLabelledSingleSelect: React.FC<IFormikLabelledSingleSelectProps> = (
  props
) => {
  const [_, meta] = useField(props.name);

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
      <label htmlFor={props.name}>
        <BodyText>{props.label}</BodyText>
      </label>
      <Spacer height={6} />
      <ErrorSpan>{error}</ErrorSpan>
      <FormikSingleSelectComponent {...props} isError={error != null} />
    </Container>
  );
};

export default FormikLabelledSingleSelect;
