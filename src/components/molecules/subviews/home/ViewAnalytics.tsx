import Spacer from "@/components/atoms/Spacer";
import { Row } from "@/styles/common";
import {
  fetchStoreEvents,
  transformAverageStoryViews,
  transformComponentInteractions,
  transformPageViews,
  transformStoryViews,
} from "@/utils/firebaseHelpers";
import { transformDomain } from "@/utils/helpers";
import { H3 } from "@/utils/text";
import { THEME } from "@/utils/theme";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLine,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory";
import FormikLabelledSingleSelect from "../../inputs/formik/FormikLabelledSingleSelect";
import OptionSelector from "../layoutSelector/OptionSelector";
import TabbedSelector from "../layoutSelector/TabbedSelector";
import LoadingPage from "../loading/LoadingPage";

interface IViewAnalyticsProps {
  user: {
    stores: any[];
    setStores: (stores: string[]) => void;
  };
}

const StoreSelector = styled.div`
  width: 250px;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  overflow: auto;
  flex-direction: column;
`;

const Chart = styled.div`
  width: 100%;
  height: 500px;
  border: 1px solid ${THEME.primary};
`;

const ChartUI = styled.div`
  gap: 20px;
  display: flex;
  flex-wrap: wrap;
  padding: 20px 0;
`;

const SpacedRow = styled(Row)`
  align-items: center;
  justify-content: space-between;
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

const ViewAnalytics: React.FC<IViewAnalyticsProps> = ({ user }) => {
  const [activeStore, setActiveStore] = useState<{
    label: string;
    value: string;
  } | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<string>("Page Views");
  const [filters, setFilters] = useState<{
    traffic: string;
    groupBy: string;
  }>({
    traffic: "all",
    groupBy: "day",
  });

  // Events
  const [pageViews, setPageViews] = useState<any[]>([]);
  const [storeEvents, setStoreEvents] = useState<any>(null);
  const [interactions, setInteractions] = useState<any[]>([]);
  const [storyViews, setStoryViews] = useState<any[]>([]);
  const [averageStoryViews, setAverageStoryViews] = useState<any[]>([]);

  useEffect(() => {
    if (activeStore == null) return;
    setLoading(true);
    (async () => {
      const storeEvents = await fetchStoreEvents(
        transformDomain(activeStore.value)
      );

      setStoreEvents(storeEvents);
    })();
  }, [activeStore]);

  useEffect(() => {
    getStoreAnalytics();
  }, [storeEvents]);

  const getStoreAnalytics = () => {
    if (storeEvents == null) {
      setError(
        "No tracking data available for this store. Please ensure you have installed the app in your store and it is properly registered."
      );
      return;
    }

    const rawPageViews = storeEvents.tracking.filter(
      (event: any) => event.name === "reels_init"
    );

    const rawInteractions = storeEvents.tracking.filter(
      (event: any) =>
        event.name === "reels_interacted" || event.name === "reels_init"
    );

    const rawStoryViews = storeEvents.tracking.filter(
      (event: any) =>
        event.name === "reels_story_viewed" || event.name === "reels_opened"
    );

    const pageViews = transformPageViews(rawPageViews, filters);
    const interactions = transformComponentInteractions(
      rawInteractions,
      filters
    );
    const storyViews = transformStoryViews(rawStoryViews, filters);
    const averageStoryViews = transformAverageStoryViews(
      rawStoryViews,
      filters
    );

    setPageViews(pageViews);
    setInteractions(interactions);
    setStoryViews(storyViews);
    setAverageStoryViews(averageStoryViews);
    setLoading(false);
    setError(null);
  };

  useEffect(() => {
    if (activeStore != null) return;
    setActiveStore(user.stores[0] ?? null);
  }, []);

  useEffect(() => {
    if (activeStore === null) {
      setLoading(false);
    }
  }, [activeStore]);

  useEffect(() => {
    if (error != null) {
      setLoading(false);
    }
  }, [error]);

  useEffect(() => {
    getStoreAnalytics();
  }, [filters]);

  return (
    <Container>
      <h1>Analytics</h1>
      <Spacer height={10} />

      <SpacedRow>
        <Formik
          initialValues={{ store: user.stores[0] ?? "" }}
          onSubmit={(values) => {}}>
          {({ values }) => {
            return (
              <Form>
                <StoreSelector>
                  <FormikLabelledSingleSelect
                    name="store"
                    label="Active Store"
                    onChange={(val) => {
                      setActiveStore(val);
                    }}
                    placeholder="Store to view analytics"
                    options={user.stores}
                  />
                </StoreSelector>
              </Form>
            );
          }}
        </Formik>
        <Row gap="15px">
          {/* <OptionSelector
            options={["Traffic", "All", "Mobile", "Desktop"]}
            onChange={(tab) =>
              setFilters((prev: any) => {
                return {
                  ...prev,
                  traffic: tab.toLocaleLowerCase(),
                };
              })
            }
          /> */}
          <OptionSelector
            options={["Group By", "Day", "Week", "Month"]}
            onChange={(tab) =>
              setFilters((prev: any) => {
                return {
                  ...prev,
                  groupBy: tab.toLocaleLowerCase(),
                };
              })
            }
          />
        </Row>
      </SpacedRow>
      <Spacer height={20} />

      <TabbedSelector
        tabs={[
          "Page Views",
          "Interactions Ratio",
          "Average Story Views",
          "Total Story Views",
        ]}
        onChange={(tab) => setActiveTab(tab)}
      />

      <ChartUI>
        {!loading && activeStore && !error && (
          <>
            {activeTab === "Page Views" && (
              <Chart>
                <VictoryChart
                  width={800}
                  domainPadding={20}
                  containerComponent={
                    <VictoryVoronoiContainer
                      labels={({ datum }) => `Page Views: ${datum.pageView}`}
                      labelComponent={
                        <VictoryTooltip {...commonToolTopStyles} />
                      }
                    />
                  }>
                  <VictoryAxis
                    fixLabelOverlap
                    tickFormat={(value) => `${value}`}
                  />
                  <VictoryAxis dependentAxis tickFormat={(x) => x} />
                  <VictoryLine
                    {...commonLineChartStyles}
                    interpolation="natural"
                    data={pageViews}
                    x={filters.groupBy}
                    y="pageView"
                  />
                </VictoryChart>
              </Chart>
            )}

            {activeTab === "Interactions Ratio" && (
              <Chart>
                <VictoryChart
                  width={800}
                  domainPadding={20}
                  containerComponent={
                    <VictoryVoronoiContainer
                      labels={({ datum }) =>
                        `Ratio: ${datum.ratio?.toFixed(2) * 100}% `
                      }
                      labelComponent={
                        <VictoryTooltip {...commonToolTopStyles} />
                      }
                    />
                  }>
                  <VictoryBar
                    {...commonBarChartStyles}
                    data={interactions}
                    x={filters.groupBy}
                    y="ratio"
                  />
                  <VictoryAxis
                    fixLabelOverlap
                    tickFormat={(value) => `${value}`}
                  />
                  <VictoryAxis
                    dependentAxis
                    tickFormat={(x) => `${x * 100}%`}
                  />
                </VictoryChart>
              </Chart>
            )}

            {activeTab === "Average Story Views" && (
              <Chart>
                <VictoryChart
                  width={800}
                  domainPadding={20}
                  containerComponent={
                    <VictoryVoronoiContainer
                      labels={({ datum }) =>
                        `Average: ${datum.average.toFixed(2)}`
                      }
                      labelComponent={
                        <VictoryTooltip {...commonToolTopStyles} />
                      }
                    />
                  }>
                  <VictoryAxis
                    fixLabelOverlap
                    tickFormat={(value) => `${value}`}
                  />
                  <VictoryAxis dependentAxis tickFormat={(x) => x} />
                  <VictoryLine
                    {...commonLineChartStyles}
                    interpolation="natural"
                    data={averageStoryViews}
                    x={filters.groupBy}
                    y="average"
                  />
                </VictoryChart>
              </Chart>
            )}

            {activeTab === "Total Story Views" && (
              <Chart>
                <VictoryChart
                  width={800}
                  domainPadding={20}
                  containerComponent={
                    <VictoryVoronoiContainer
                      labels={({ datum }) => `Views: ${datum.interaction}`}
                      labelComponent={
                        <VictoryTooltip {...commonToolTopStyles} />
                      }
                    />
                  }>
                  <VictoryAxis
                    fixLabelOverlap
                    tickFormat={(value) => `${value}`}
                  />
                  <VictoryAxis dependentAxis tickFormat={(x) => x} />
                  <VictoryLine
                    {...commonLineChartStyles}
                    interpolation="natural"
                    data={storyViews}
                    x={filters.groupBy}
                    y="interaction"
                  />
                </VictoryChart>
              </Chart>
            )}
          </>
        )}
        {error && <H3>{error}</H3>}
      </ChartUI>
      <LoadingPage isLoading={loading} />
    </Container>
  );
};

export default ViewAnalytics;
