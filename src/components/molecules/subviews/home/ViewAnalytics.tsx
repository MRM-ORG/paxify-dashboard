import { getStoreEvents } from "@/apiCalls/tracking";
import Spacer from "@/components/atoms/Spacer";
import { Row } from "@/styles/common";
import {
  transformAverageStoryViews,
  transformComponentInteractions,
  transformPageViews,
  transformStoryViews,
} from "@/utils/firebaseHelpers";
import { getSummaryObject, transformDomain } from "@/utils/helpers";
import { isMobileDevice } from "@/utils/responsive";
import { H3 } from "@/utils/text";
import { Form, Formik } from "formik";
import Head from "next/head";
import { useEffect, useState } from "react";
import styled from "styled-components";
import AnalyticsChart from "../../AnalyticsCharts";
import AnalyticsCard from "../../cards/AnalyticsCard";
import FormikLabelledSingleSelect from "../../inputs/formik/FormikLabelledSingleSelect";
import OptionSelector from "../layoutSelector/OptionSelector";
import TabbedSelector from "../layoutSelector/TabbedSelector";
import LoadingPage from "../loading/LoadingPage";

interface IViewAnalyticsProps {
  storeEvents?: any;
  setStoreEvents: (storeEvents: any) => void;
  activeStore: any;
  setActiveStore: (store: any) => void;
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
  padding: 24px;
  overflow: auto;
  flex-direction: column;
`;

const ChartUI = styled.div`
  gap: 20px;
  display: flex;
  flex-wrap: wrap;
  padding: 20px 0;
`;

const Summaries = styled(Row)`
  gap: 20px;
  flex-wrap: nowrap;
  margin-bottom: 20px;

  @media (max-width: 1440px) {
    flex-wrap: wrap;
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const SpacedRow = styled(Row)`
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    gap: 20px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ViewAnalytics: React.FC<IViewAnalyticsProps> = ({
  user,
  storeEvents,
  activeStore,
  setStoreEvents,
  setActiveStore,
}) => {
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
  const [pageViews, setPageViews] = useState<any>([]);
  const [interactions, setInteractions] = useState<any>([]);
  const [storyViews, setStoryViews] = useState<any>([]);
  const [averageStoryViews, setAverageStoryViews] = useState<any>([]);
  const [analyticsSummary, setAnalyticsSummary] = useState<any>([]);

  const [customDateRange, setCustomDateRange] = useState<any>([null, null]);

  useEffect(() => {
    setLoading(true);

    if (activeStore == null) {
      setError("Please select a store");
      return;
    }
    (async () => {
      const user = JSON.parse(localStorage.getItem("user") as string);

      const apiResponse = await getStoreEvents(
        user.uid,
        transformDomain(activeStore.value)
      );

      const storeEvents = apiResponse.data;

      if (storeEvents == null) {
        setError("Error fetching store events");
        return;
      }

      setStoreEvents(storeEvents);
    })();
  }, [activeStore]);

  useEffect(() => {
    getStoreAnalytics();
  }, [storeEvents]);

  const getStoreAnalytics = () => {
    if (storeEvents == null) {
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
    if (error != null) {
      setLoading(false);
    }
  }, [error]);

  useEffect(() => {
    getStoreAnalytics();
  }, [filters]);

  useEffect(() => {
    setAnalyticsSummary({
      pageViews: {
        ...getSummaryObject(pageViews, "pageView"),
      },
      interactions: {
        ...getSummaryObject(interactions, "ratio"),
      },
      storyViews: {
        ...getSummaryObject(storyViews, "interaction"),
      },
      averageStoryViews: {
        ...getSummaryObject(averageStoryViews, "average"),
      },
    });
  }, [pageViews, interactions, storyViews, averageStoryViews]);

  return (
    <>
      <Head>
        <title>Paxify | Analytics</title>
        <meta name="description" content="Paxify analytics" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Container>
        <h1>Analytics</h1>
        <Spacer height={10} />

        <SpacedRow>
          <Formik
            initialValues={{ store: activeStore }}
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

          {!error && !loading && (
            <Row gap="15px">
              <OptionSelector
                options={["Traffic", "All", "Mobile", "Desktop"]}
                onChange={(tab) =>
                  setFilters((prev: any) => {
                    return {
                      ...prev,
                      traffic: tab.toLocaleLowerCase(),
                    };
                  })
                }
              />
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
              {/* <RangeDatePicker
              dateRange={customDateRange}
              setDateRange={setCustomDateRange}
            /> */}
            </Row>
          )}
        </SpacedRow>

        <Spacer height={20} />

        {!loading && !error && (
          <Summaries>
            <AnalyticsCard
              label="Page Views"
              quantity={analyticsSummary?.pageViews?.quantity ?? 0}
              percentChange={analyticsSummary?.pageViews?.percentChange}
            />
            <AnalyticsCard
              label="Interactions Ratio"
              quantity={`${
                (analyticsSummary?.interactions?.quantity * 100).toFixed(2) ?? 0
              }%`}
              percentChange={analyticsSummary?.interactions?.percentChange}
            />
            <AnalyticsCard
              label="Avg. Story Views"
              quantity={
                analyticsSummary?.averageStoryViews?.quantity?.toFixed(2) ?? 0
              }
              percentChange={analyticsSummary?.averageStoryViews?.percentChange}
            />
            <AnalyticsCard
              label="Story Views"
              quantity={analyticsSummary?.storyViews?.quantity ?? 0}
              percentChange={analyticsSummary?.storyViews?.percentChange}
            />
          </Summaries>
        )}

        {!isMobileDevice() && (
          <>
            {!loading && !error && (
              <TabbedSelector
                tabs={[
                  "Page Views",
                  "Interactions Ratio",
                  "Average Story Views",
                  "Total Story Views",
                ]}
                onChange={(tab) => setActiveTab(tab)}
              />
            )}

            <ChartUI>
              {!loading && activeStore && !error && (
                <>
                  {activeTab === "Page Views" && (
                    <AnalyticsChart
                      data={pageViews}
                      filter={filters}
                      label="pageView"
                      toolTipLabel="Page Views"
                    />
                  )}

                  {activeTab === "Interactions Ratio" && (
                    <AnalyticsChart
                      roundOff
                      data={interactions}
                      filter={filters}
                      label="ratio"
                      toolTipLabel="Ratio"
                    />
                  )}

                  {activeTab === "Average Story Views" && (
                    <AnalyticsChart
                      roundOff
                      data={averageStoryViews}
                      filter={filters}
                      label="average"
                      toolTipLabel="Average Views"
                    />
                  )}

                  {activeTab === "Total Story Views" && (
                    <AnalyticsChart
                      data={storyViews}
                      filter={filters}
                      label="interaction"
                      toolTipLabel="Story Views"
                    />
                  )}
                </>
              )}
              {error && !loading && <H3>{error}</H3>}
            </ChartUI>
          </>
        )}
        <LoadingPage isLoading={loading} />
      </Container>
    </>
  );
};

export default ViewAnalytics;
