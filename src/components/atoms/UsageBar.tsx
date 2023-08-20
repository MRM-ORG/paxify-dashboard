import { Row } from "@/styles/common";
import { THEME } from "@/utils/theme";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface IUsageBarProps {
  consumed: number;
  available: number;
}

const Container = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
  max-width: 100%;
`;

const Bar = styled.div`
  height: 8px;
  width: 350px;
  border: 1px solid;
  border-radius: 4px;
`;

const Filled = styled.div<{ width: number }>`
  height: 100%;
  width: ${({ width }) => width}%;
  background: ${THEME.background1};
  transition: width 0.5s ease-in-out;
`;

const UsageBar: React.FC<IUsageBarProps> = ({ consumed, available }) => {
  const [percentUtilized, setPercentUtilized] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setPercentUtilized((consumed / available) * 100);
    }, 50);
  }, [consumed, available]);

  return (
    <Container>
      <Bar>
        <Filled width={percentUtilized} />
      </Bar>
      {consumed.toLocaleString()}/{available.toLocaleString()}
    </Container>
  );
};

export default UsageBar;
