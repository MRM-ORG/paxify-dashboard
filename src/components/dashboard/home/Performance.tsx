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
  summarizedEvents: any;
};

// const groupByDate = (analytics: any) => {
//   const dateCounts: Record<string, number> = {};

//   analytics?.forEach((obj: any) => {
//     if (!obj.payload) return;
//     // Convert the timestamp to a date
//     const date = new Date(obj.payload.time);
//     const dateString = date.toLocaleDateString(); // Convert date to a string

//     // Check if the date exists in the dateCounts object
//     if (dateCounts[dateString]) {
//       dateCounts[dateString]++;
//     } else {
//       dateCounts[dateString] = 1;
//     }
//   });

//   // Create a new array of objects with date and count
//   return Object.entries(dateCounts).map(([date, count]) => ({
//     date,
//     count,
//   }));
// };

const groupEventsByKeys = (analytics: any, key: string) => {
  if (!analytics) return [];

  return Object.keys(analytics)
    .map((year) => {
      const months = analytics[year];
      return Object.keys(months).map((month) => {
        const days = months[month];
        return Object.keys(days).map((day) => {
          const dayEvents = days[day];
          if (dayEvents) {
            return {
              date: `${day}/${Number(month) + 1}/${year}`,
              count: dayEvents[key],
            };
          }
        });
      });
    })
    .flat(2);
};

const Performance: NextPage<Props> = ({ summarizedEvents }) => {
  // const viewAnalytics = analytics.filter(
  //   (obj: { event: string }) => obj.event === "reels_story_viewed"
  // );

  // const interactionAnalytics = analytics.filter(
  //   (obj: { event: string }) =>
  //     obj.event === "cta_clicked" || obj.event === "reels_interacted"
  // );

  const screens = useBreakpoint();

  const [plan, setPlan] = useState("Basic");
  // const impressions = groupByDate(impressionAnalytics);
  // const viewEvents = groupByDate(viewAnalytics);
  // const interactionEvents = groupByDate(interactionAnalytics);

  console.log("SUMMARIZED EVENTS:", summarizedEvents);

  const impressionsSummarized = groupEventsByKeys(summarizedEvents, "init");
  const viewsSummarized = groupEventsByKeys(summarizedEvents, "storyViews");

  const likesSummarized = groupEventsByKeys(summarizedEvents, "likes");
  const sharesSummarized = groupEventsByKeys(summarizedEvents, "shares");

  console.log("Impressions:", impressionsSummarized);

  // Merge likes and shares such that their counts of the same date are added together
  const interactionSummarized = likesSummarized.map((like) => {
    const share = sharesSummarized.find(
      (share) => share?.date === like?.date
    ) || { count: 0 };

    return {
      date: like?.date,
      count: like?.count + share?.count,
    };
  });

  const reach = viewsSummarized.map((viewEvent) => {
    const impression = impressionsSummarized.find(
      (impression) => impression?.date === viewEvent?.date
    );

    return {
      date: viewEvent?.date,
      count: impression ? (viewEvent?.count / impression.count) * 100 : 0,
    };
  });

  const engagement = interactionSummarized.map((interactionEvent) => {
    const viewEvent = viewsSummarized.find(
      (viewEvent) => viewEvent?.date === interactionEvent.date
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

  // TODO: To be removed later when we have real data
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
      children: impressionsSummarized ? (
        <div className="h-[300px] w-full">
          {!!impressionsSummarized.length && (
            <AreaChart
              analytics={impressionsSummarized}
              event={{
                name: "Impressions",
                description:
                  "Number of times your stories were presented to users",
              }}
            />
          )}
          {!impressionsSummarized?.length && <div>Loading...</div>}
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
      title={
        <h1 className="font-bold text-lg">
          Performance Over Time: Your Story Insights
        </h1>
      }>
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
