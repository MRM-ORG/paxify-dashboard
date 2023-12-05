import { Card, Grid, Tabs, Tooltip } from "antd";
import { NextPage } from "next";
import AreaChart from "./AreaChart";
import { useEffect, useState } from "react";
import { getUser } from "@/utils/auth";
import { getUserSubscriptionStatus } from "@/apiCalls/auth";
import { FaInfoCircle } from "react-icons/fa";
const { useBreakpoint } = Grid;

const Extra = (
  <div className="flex items-center space-x-3">
    {/* <Select defaultValue={"Apps and Websites"} />*/}
    {/* <Button icon={<DownloadOutlined />}>Export</Button> */}
  </div>
);

type Props = {
  analytics: any;
};

const groupByDate = (analytics: any) => {
  const dateCounts: Record<string, number> = {};

  analytics?.forEach((obj: any) => {
    // Convert the timestamp to a date
    const date = new Date(obj.payload.time);
    const dateString = date.toLocaleDateString(); // Convert date to a string

    // Check if the date exists in the dateCounts object
    if (dateCounts[dateString]) {
      dateCounts[dateString]++;
    } else {
      dateCounts[dateString] = 1;
    }
  });

  // Create a new array of objects with date and count
  return Object.entries(dateCounts).map(([date, count]) => ({
    date,
    count,
  }));
};

const Performance: NextPage<Props> = ({ analytics }) => {
  const impressionAnalytics = analytics.filter(
    (obj: { event: string }) => obj.event === "reels_init"
  );

  const viewAnalytics = analytics.filter(
    (obj: { event: string }) => obj.event === "reels_story_viewed"
  );

  const interactionAnalytics = analytics.filter(
    (obj: { event: string }) =>
      obj.event === "cta_clicked" || obj.event === "reels_interacted"
  );

  const screens = useBreakpoint();

  const [plan, setPlan] = useState("Basic");
  const impressions = groupByDate(impressionAnalytics);
  const viewEvents = groupByDate(viewAnalytics);
  const interactionEvents = groupByDate(interactionAnalytics);

  const reach = viewEvents.map((viewEvent) => {
    const impression = impressions.find(
      (impression) => impression.date === viewEvent.date
    );

    return {
      date: viewEvent.date,
      count: impression ? (viewEvent.count / impression.count) * 100 : 0,
    };
  });

  const engagement = interactionEvents.map((interactionEvent) => {
    const viewEvent = viewEvents.find(
      (viewEvent) => viewEvent.date === interactionEvent.date
    );

    return {
      date: interactionEvent.date,
      count: viewEvent ? (interactionEvent.count / viewEvent.count) * 100 : 0,
    };
  });

  useEffect(() => {
    const user = getUser();
    if (!user) return;
    getUserSubscriptionStatus(user.uid).then((res) => {
      setPlan(res.plan.plan);
    });
  }, []);

  const ANALYTICS_SUMMARY = {
    impressions: {
      daily: {
        current: 234,
        previous: 123,
        change: 90.24,
      },
      weekly: {
        current: 1034,
        previous: 1223,
        change: -15.45,
      },
      monthly: {
        current: 2434,
        previous: 2023,
        change: 20.24,
      },
    },
  };

  const PERFORMANCE_TABS_ITEMS = [
    {
      text: "Impressions",
      number: ANALYTICS_SUMMARY.impressions.daily.current,
      label: `${ANALYTICS_SUMMARY.impressions.daily.change}%`,
      increase: true,
      children: impressions ? (
        <div className="h-[300px] w-full">
          {!!impressions.length && (
            <AreaChart
              analytics={impressions}
              event={{
                name: "Impressions",
                description:
                  "Number of times your stories were presented to users",
              }}
            />
          )}
          {!impressions?.length && <div>Loading...</div>}
        </div>
      ) : null,
      link: false,
    },
    {
      text: "Reach",
      number: ANALYTICS_SUMMARY.impressions.daily.current,
      label: `${ANALYTICS_SUMMARY.impressions.daily.change}%`,
      increase: true,
      children: reach ? (
        <div className="h-[300px] w-full">
          {!!reach.length && (
            <AreaChart
              analytics={reach}
              event={{
                name: "Reach",
                description: "People who are viewing your stories",
              }}
            />
          )}
          {!reach?.length && <div>Loading...</div>}
        </div>
      ) : null,
      link: false,
    },
    {
      text: "Engagement",
      number: ANALYTICS_SUMMARY.impressions.daily.current,
      label: `${ANALYTICS_SUMMARY.impressions.daily.change}%`,
      increase: true,
      children: engagement ? (
        <div className="h-[300px] w-full">
          {!!engagement.length && (
            <AreaChart
              analytics={engagement}
              event={{
                name: "Engagement",
                description: "People who are interacting with your stories",
              }}
            />
          )}
          {!engagement?.length && <div>Loading...</div>}
        </div>
      ) : null,
      link: false,
    },
  ];

  // We only allow basic analytics for basic plan
  if (plan === "Basic") {
    PERFORMANCE_TABS_ITEMS.splice(1, 2);
  }

  return (
    <Card
      className="h-auto"
      extra={Extra}
      style={{ marginTop: "0px" }}
      title={<h1 className="font-bold text-lg">Analytics at a glance</h1>}>
      <Tabs
        defaultActiveKey="Impression"
        tabPosition={screens.lg ? "bottom" : "bottom"}
        items={PERFORMANCE_TABS_ITEMS?.map((item, i) => {
          return {
            label: (
              <div className="flex flex-wrap" style={{ margin: "50px 10px 0" }}>
                <div className="lg:space-x-4 tab-label mt-5">
                  <span>{item.text}</span>
                  {plan === "Basic" && (
                    <Tooltip
                      placement="top"
                      title="Please upgrade your subscription to see more advanced analytics">
                      <FaInfoCircle
                        size={15}
                        className="text-[#4079ED] text-[10px] font-[600]"
                      />
                    </Tooltip>
                  )}
                  {/* <div className="lg:space-x-3 lg:flex w-[100px] badge-content">
                    <div>
                      <span className="font-bold">{item.number}</span>
                    </div>
                    <div>
                      <Badge
                        className="font-medium"
                        count={
                          item.increase ? (
                            <div>
                              <CaretUpOutlined
                                size={2}
                                style={{ color: "#01EA85" }}
                              />{" "}
                              {item.label}
                            </div>
                          ) : (
                            <div>
                              <CaretDownOutlined style={{ color: "#FF5F4A" }} />{" "}
                              {item.label}
                            </div>
                          )
                        }
                        style={{
                          backgroundColor: item.increase
                            ? "rgba(1, 234, 133, 0.10)"
                            : "rgba(255, 95, 74, 0.10)",
                          padding: "5px 8px 4.5px 8px",
                          borderRadius: "100px",
                        }}
                      />
                    </div>
                  </div> */}
                </div>
              </div>
            ),
            key: item.text,
            children: item.children,
          };
        })}
      />
    </Card>
  );
};

export default Performance;
