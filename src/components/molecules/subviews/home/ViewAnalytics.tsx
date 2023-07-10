import Spacer from "@/components/atoms/Spacer";
import {
  fetchStoreEvents,
  transformAverageStoryViews,
  transformComponentInteractions,
  transformPageViews,
  transformStoryViews,
} from "@/utils/firebaseHelpers";
import { transformDomain } from "@/utils/helpers";
import { H2, H3 } from "@/utils/text";
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
  width: fit-content;

  & > div {
    width: 550px !important;
    height: fit-content !important;
  }
`;

const ChartContainer = styled.div`
  gap: 20px;
  display: flex;
  flex-wrap: wrap;
  padding: 20px 0;
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

  // Events
  const [pageViews, setPageViews] = useState<any[]>([]);
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

      if (storeEvents == null) {
        setError(
          "No tracking data available for this store. Please ensure you have installed the app on your store and it is registered with us."
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

      const pageViews = transformPageViews(rawPageViews);
      const interactions = transformComponentInteractions(rawInteractions);
      const storyViews = transformStoryViews(rawStoryViews);
      const averageStoryViews = transformAverageStoryViews(rawStoryViews);

      setPageViews(pageViews);
      setInteractions(interactions);
      setStoryViews(storyViews);
      setAverageStoryViews(averageStoryViews);
      setLoading(false);
      setError(null);
    })();
  }, [activeStore]);

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

  return (
    <Container>
      <h1>Analytics</h1>
      <Spacer height={10} />

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
      <Spacer height={20} />

      <ChartContainer>
        {!loading && activeStore && !error && (
          <>
            <Chart>
              <H2>Page Views</H2>
              <VictoryChart
                domainPadding={20}
                containerComponent={
                  <VictoryVoronoiContainer
                    labels={({ datum }) => `Page Views: ${datum.pageView}`}
                    labelComponent={<VictoryTooltip {...commonToolTopStyles} />}
                  />
                }>
                <VictoryAxis tickValues={[1, 2, 3, 4, 5]} />
                <VictoryAxis dependentAxis tickFormat={(x) => x} />
                <VictoryLine
                  {...commonLineChartStyles}
                  interpolation="natural"
                  data={pageViews}
                  x="day"
                  y="pageView"
                />
              </VictoryChart>
            </Chart>

            <Chart>
              <H2>Interaction Ratio</H2>
              <VictoryChart
                domainPadding={20}
                containerComponent={
                  <VictoryVoronoiContainer
                    labels={({ datum }) =>
                      `Ratio: ${datum.ratio?.toFixed(2) * 100}% `
                    }
                    labelComponent={<VictoryTooltip {...commonToolTopStyles} />}
                  />
                }>
                <VictoryBar
                  {...commonBarChartStyles}
                  data={interactions}
                  x="day"
                  y="ratio"
                />
                <VictoryAxis tickValues={[1, 2, 3, 4, 5]} />
                <VictoryAxis dependentAxis tickFormat={(x) => `${x * 100}%`} />
              </VictoryChart>
            </Chart>

            <Chart>
              <H2>Avg. Story Views</H2>
              <VictoryChart
                domainPadding={20}
                containerComponent={
                  <VictoryVoronoiContainer
                    labels={({ datum }) => `Average: ${datum.average}`}
                    labelComponent={<VictoryTooltip {...commonToolTopStyles} />}
                  />
                }>
                <VictoryAxis
                  tickValues={[1, 2, 3, 4, 5]}
                  tickFormat={(value) => `${value}`}
                />
                <VictoryAxis dependentAxis tickFormat={(x) => x} />
                <VictoryLine
                  {...commonLineChartStyles}
                  interpolation="natural"
                  data={averageStoryViews}
                  x="day"
                  y="average"
                />
              </VictoryChart>
            </Chart>

            <Chart>
              <H2>Total Story Views</H2>
              <VictoryChart
                domainPadding={20}
                containerComponent={
                  <VictoryVoronoiContainer
                    labels={({ datum }) => `Views: ${datum.interaction}`}
                    labelComponent={<VictoryTooltip {...commonToolTopStyles} />}
                  />
                }>
                <VictoryAxis
                  tickValues={[1, 2, 3, 4, 5]}
                  tickFormat={(value) => `${value}`}
                />
                <VictoryAxis dependentAxis tickFormat={(x) => x} />
                <VictoryLine
                  {...commonLineChartStyles}
                  interpolation="natural"
                  data={storyViews}
                  x="day"
                  y="interaction"
                />
              </VictoryChart>
            </Chart>
          </>
        )}
        {error && <H3>{error}</H3>}
      </ChartContainer>
      <LoadingPage isLoading={loading} />
    </Container>
  );
};

export default ViewAnalytics;
