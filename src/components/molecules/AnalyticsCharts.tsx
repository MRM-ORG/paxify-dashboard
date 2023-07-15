import { THEME } from "@/utils/theme";
import styled from "styled-components";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLine,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory";

interface IChartsProps {
  data: any;
  filter: any;
  label: string;
  toolTipLabel: string;
  roundOff?: boolean;
}

const Chart = styled.div`
  width: 100%;
  height: 500px;
  border: 1px solid ${THEME.primary};
`;

const commonToolTopStyles = {
  style: {
    fill: THEME.primary1, // Set the background color of the tooltip
  },
  flyoutStyle: {
    stroke: THEME.primary1, // Set the border color of the tooltip container
    strokeWidth: 1, // Set the border width of the tooltip container
    fill: THEME.background0, // Set the background color of the tooltip container
  },
};

const commonLineChartStyles = {
  style: {
    data: {
      stroke: THEME.background1,
    },
  },
};

const commonBarChartStyles = {
  style: {
    data: {
      fill: THEME.background1,
    },
  },
};

const AnalyticsChart: React.FC<IChartsProps> = ({
  data,
  filter,
  label,
  roundOff = false,
  toolTipLabel,
}) => {
  return (
    <Chart>
      <VictoryChart
        width={800}
        domainPadding={20}
        containerComponent={
          <VictoryVoronoiContainer
            labels={({ datum }) =>
              `${toolTipLabel}: ${
                roundOff ? datum[label].toFixed(2) : datum[label]
              }`
            }
            labelComponent={<VictoryTooltip {...commonToolTopStyles} />}
          />
        }>
        <VictoryAxis fixLabelOverlap tickFormat={(value) => `${value}`} />
        <VictoryAxis dependentAxis tickFormat={(x) => x} />
        {data?.length > 5 ? (
          <VictoryLine
            {...commonLineChartStyles}
            interpolation="natural"
            data={data}
            x={filter.groupBy}
            y={label}
          />
        ) : (
          <VictoryBar
            {...commonBarChartStyles}
            data={data}
            barWidth={30}
            x={filter.groupBy}
            y={label}
          />
        )}
      </VictoryChart>
    </Chart>
  );
};

export default AnalyticsChart;
