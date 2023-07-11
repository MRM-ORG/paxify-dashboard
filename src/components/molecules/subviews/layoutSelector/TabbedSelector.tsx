import { Row } from "@/styles/common";
import { BodyText } from "@/utils/text";
import { THEME } from "@/utils/theme";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface ITabbedSelectorProps {
  tabs: string[];
  onChange: (tab: string) => void;
}

const COLOR_VARIANTS = ["#1570EF", "#09DBA9", "#FF4545", "#FFC700"];

const Container = styled(Row)``;

const Tab = styled.div<{ isActive: boolean; index: number }>`
  flex-grow: 1;
  padding: 20px;
  cursor: pointer;
  text-align: center;
  border-top: 5px solid ${(props) => COLOR_VARIANTS[props.index % 4]};
  position: relative;
  box-shadow: ${(props) =>
    props.isActive && "rgba(149, 157, 165, 0.2) 0px 8px 24px"};
  background-color: ${(props) =>
    !props.isActive ? THEME.background2 : THEME.white};
`;

const TabbedSelector: React.FC<ITabbedSelectorProps> = ({
  tabs,
  onChange = null,
}) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  useEffect(() => {
    onChange && onChange(activeTab);
  }, [activeTab]);

  return (
    <Container>
      {tabs.map((tab, index) => {
        return (
          <Tab
            key={tab}
            index={index}
            isActive={tab === activeTab}
            onClick={() => setActiveTab(tab)}>
            <BodyText>{tab}</BodyText>
          </Tab>
        );
      })}
    </Container>
  );
};

export default TabbedSelector;
