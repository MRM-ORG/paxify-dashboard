import { Row } from "@/styles/common";
import { BodyText } from "@/utils/text";
import { THEME } from "@/utils/theme";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface IOptionSelectorProps {
  options: string[];
  onChange?: (option: string) => void;
}

const Container = styled(Row)`
  border: 1px solid ${THEME.primary};
  border-radius: 5px;
`;

const Value = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  min-width: 60px;
  height: 40px;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  color: ${(props) => (props.isActive ? THEME.white : THEME.body1)};
  background-color: ${(props) =>
    props.isActive ? THEME.body1 : "transparent"};
`;

const HeaderValue = styled(Value)`
  min-width: 100px;
  color: white;
  margin-right: 10px;
  background-color: ${THEME.primary};
`;

const OptionSelector: React.FC<IOptionSelectorProps> = ({
  options,
  onChange,
}) => {
  const [activeOption, setActiveOption] = useState<string>(options[1]);

  useEffect(() => {
    onChange && onChange(activeOption);
  }, [activeOption]);

  return (
    <Container>
      <HeaderValue isActive={false}>{options[0]}</HeaderValue>
      {options.slice(1).map((option) => {
        return (
          <BodyText key={option}>
            <Value
              onClick={() => setActiveOption(option)}
              isActive={option === activeOption}>
              {option}
            </Value>
          </BodyText>
        );
      })}
    </Container>
  );
};

export default OptionSelector;
