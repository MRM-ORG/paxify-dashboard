import Spacer from "@/components/atoms/Spacer";
import { Row } from "@/styles/common";
import {
  fetchStoreEvents,
  transformAverageStoryViews,
  transformComponentInteractions,
  transformPageViews,
  transformStoryViews,
} from "@/utils/firebaseHelpers";
import {
  getPercentChange,
  getSummaryObject,
  transformDomain,
} from "@/utils/helpers";
import { H3 } from "@/utils/text";
import { THEME } from "@/utils/theme";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import styled from "styled-components";
import AnalyticsChart from "../../AnalyticsCharts";
import FormikLabelledSingleSelect from "../../inputs/formik/FormikLabelledSingleSelect";
import OptionSelector from "../layoutSelector/OptionSelector";
import TabbedSelector from "../layoutSelector/TabbedSelector";
import LoadingPage from "../loading/LoadingPage";
import AnalyticsCard from "../../cards/AnalyticsCard";
import { isMobileDevice } from "@/utils/responsive";

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
  const [analyticsSummary, setAnalyticsSummary] = useState<any>([]);

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
    console.log(filters);
    console.log(pageViews);
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
        </Row>
      </SpacedRow>

      <Spacer height={20} />

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

      {!isMobileDevice() && (
        <>
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
                  <AnalyticsChart
                    data={pageViews}
                    filter={filters}
                    label="pageView"
                  />
                )}

                {activeTab === "Interactions Ratio" && (
                  <AnalyticsChart
                    data={interactions}
                    filter={filters}
                    label="ratio"
                  />
                )}

                {activeTab === "Average Story Views" && (
                  <AnalyticsChart
                    data={averageStoryViews}
                    filter={filters}
                    label="average"
                  />
                )}

                {activeTab === "Total Story Views" && (
                  <AnalyticsChart
                    data={storyViews}
                    filter={filters}
                    label="interaction"
                  />
                )}
              </>
            )}
            {error && <H3>{error}</H3>}
          </ChartUI>
        </>
      )}
      <LoadingPage isLoading={loading} />
    </Container>
  );
};

export default ViewAnalytics;
