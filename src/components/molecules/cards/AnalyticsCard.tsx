import { NegativeArrow } from "@/components/atoms/icons/negativeArrow";
import { PositiveArrow } from "@/components/atoms/icons/positiveArrow";
import { Column, Row } from "@/styles/common";
import { Body, GenericText } from "@/utils/text";
import { THEME } from "@/utils/theme";
import styled from "styled-components";

interface IAnalyticsSummaryProps {
  label: string;
  quantity: string;
  percentChange: number;
}

const Card = styled(Row)`
  width: 350px;
  min-width: 300px;
  padding: 20px 24px;
  border-radius: 8px;
  background-color: ${THEME.white};
  justify-content: space-between;
`;

const Title = styled(Row)``;

const Container = styled(Column)`
  gap: 9px;
`;

const Pill = styled(Row)<{ isPositive: boolean }>`
  gap: 9px;
  padding: 4px 10px;
  border: 1px solid
    ${(props) => (props.isPositive ? THEME.positive100 : THEME.danger)};
  border-radius: 100px;
  background-color: ${(props) =>
    props.isPositive ? THEME.positive25 : THEME.danger25};
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  color: ${(props) => (props.isPositive ? THEME.positive300 : THEME.danger)};
`;

const AnalyticsCard: React.FC<IAnalyticsSummaryProps> = ({
  label,
  quantity,
  percentChange,
}) => {
  return (
    <Card>
      <Container>
        <Title>
          {/* <Image width={20} height={20} src="/images/ui/bars.png" alt="bars" /> */}
          <Body color={THEME.primary}>{label}</Body>
        </Title>
        <GenericText fontSize="30px" color={THEME.primary} fontWeight="700">
          {quantity}
        </GenericText>
      </Container>
      <Pill isPositive={percentChange >= 0}>
        {percentChange > 0 && <PositiveArrow />}
        {percentChange < 0 && <NegativeArrow />}
        <div>{percentChange} %</div>
      </Pill>
    </Card>
  );
};

export default AnalyticsCard;
