import { getUserSubscriptionStatus } from "@/apiCalls/auth";
import { getUser } from "@/utils/auth";
import { Tooltip } from "antd";
import { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

const ICONS = [
  "/logo/userIcon.png",
  "/logo/salesIcon.png",
  "/logo/resIcon.png",
  "/logo/SalesIcon.png",
  "/logo/userIcon.png",
];

enum Plan {
  Basic = 0,
  Starter = 1,
  Professional = 2,
}

const METRICS = [
  {
    id: 1,
    title: "Total Impressions",
    subtitle: "Number of times your stories were presented to users",
  },
  {
    id: 2,
    title: "Your Reach",
    subtitle: "People who are viewing your stories",
  },
  {
    id: 3,
    title: "Engagement",
    subtitle: "People who are interacting with your stories",
  },
  {
    id: 4,
    title: "Like Rate",
    subtitle: "People who are liking the stories",
  },
  {
    id: 5,
    title: "Share Rate",
    subtitle: "People who are sharing the stories",
  },
];

const COLOR_PALETTE = [
  {
    id: 1,
    mainBackground: "#F3E8FF",
    iconBackground: "#BF83FF",
  },
  {
    id: 2,
    mainBackground: "#FFE2E5",
    iconBackground: "#FA5A7D",
  },
  {
    id: 3,
    mainBackground: "#DCFCE7",
    iconBackground: "#3CD856",
  },
  {
    id: 4,
    mainBackground: "#FBFDD9",
    iconBackground: "#19A1A8",
  },
  {
    id: 5,
    mainBackground: "#F2DFF6",
    iconBackground: "#440784",
  },
];

type Props = {
  summarizedEvents: any;
};

const countEvents = (events: any, key: string) => {
  if (!events) return 0;

  return Object?.keys(events)?.reduce((acc: number, event: any) => {
    if (!events?.[event]?.[key]) return acc;
    const count = events?.[event]?.[key];
    acc += count;
    return acc;
  }, 0);
};

const OverViewTop: NextPage<Props> = ({ summarizedEvents }) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const currentMonthEvents = summarizedEvents?.[currentYear]?.[currentMonth];

  const [plan, setPlan] = useState("Basic");

  const totalImpressions = useMemo(() => {
    return countEvents(currentMonthEvents, "init");
  }, [currentMonthEvents]);

  const totalStoryViews = useMemo(() => {
    return countEvents(currentMonthEvents, "storyViews");
  }, [currentMonthEvents]);

  const totalStoryLikes = useMemo(() => {
    return countEvents(currentMonthEvents, "likes");
  }, [currentMonthEvents]);

  const totalStoryShares = useMemo(() => {
    return countEvents(currentMonthEvents, "shares");
  }, [currentMonthEvents]);

  const totalInteractions = useMemo(() => {
    return (
      countEvents(currentMonthEvents, "likes") +
      countEvents(currentMonthEvents, "shares")
    );
  }, [currentMonthEvents]);

  const reachRate = totalStoryViews / totalImpressions;
  const engagementRate = totalInteractions / totalStoryViews;
  const likeRate = totalStoryLikes / totalStoryViews;
  const shareRate = totalStoryShares / totalStoryViews;

  // 0 - Basic
  // 1 - Starter
  // 2 - Professional
  const OVERVIEW_METRICS = [
    {
      id: 1,
      metric: totalImpressions,
      isPercentage: false,
      unlock: 0,
    },
    {
      id: 2,
      metric: reachRate,
      isPercentage: true,
      unlock: 1,
    },
    {
      id: 3,
      metric: engagementRate,
      isPercentage: true,
      unlock: 1,
    },
    {
      id: 4,
      metric: likeRate,
      isPercentage: true,
      unlock: 2,
    },
    {
      id: 5,
      metric: shareRate,
      isPercentage: true,
      unlock: 2,
    },
  ];

  useEffect(() => {
    const user = getUser();
    if (!user) return;
    getUserSubscriptionStatus(user.uid).then((res) => {
      setPlan(res.plan.plan);
    });
  }, []);

  const _renderCard = (
    metric: number,
    isPercentage: boolean,
    index: number,
    unlock: number
  ) => {
    const isLocked =
      Plan[plan as "Basic" | "Starter" | "Professional"] < unlock;

    const metricValue = isNaN(metric)
      ? 0
      : isPercentage
      ? (Number(metric) * 100).toFixed(2)
      : metric?.toLocaleString() ?? 0;

    return (
      <div
        className="w-full max-w-sm p-4 rounded-[10px] mt-8 h-[180px]"
        style={{ background: COLOR_PALETTE[index].mainBackground }}>
        <div className="flex items-center justify-between">
          <div
            className="px-[8px] py-[8px] rounded-[20px] flex items-center gap-2"
            style={{ background: COLOR_PALETTE[index].iconBackground }}>
            <div className="flex items-center gap-2">
              <img src="/logo/userIcon.png" alt="icon" />
            </div>
          </div>
        </div>

        <div>
          {!isLocked && (
            <h1 className="text-[#151D48] text-[20px] font-[900] mt-4">
              {metricValue}
              {isPercentage && "%"}
            </h1>
          )}

          {isLocked && <div className="blur-sm mt-6">--------</div>}

          <div className="flex items-center mt-3 gap-1">
            <p className="text-[#425166] text-[12px] font-[600] ">
              {METRICS[index].title}
            </p>
            {isLocked && (
              <Tooltip
                placement="top"
                title="Please upgrade your subscription to see this metric and much more!">
                <FaInfoCircle
                  size={15}
                  className="text-[#4079ED] text-[10px] font-[600]"
                />
              </Tooltip>
            )}
          </div>
          <p className="text-[#4079ED] text-[10px] font-[600] mt-3">
            {METRICS[index].subtitle}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 bg-white rounded-[10px] mb-5">
      <div className="flex items-center justify-between max-md:mt-8">
        <div>
          <h1 className="text-[18px] font-[900] text-[#151D48]">
            {new Date().toLocaleString("default", {
              month: "long",
              timeZone: "UTC",
            })}
            , At a Glance!
          </h1>
        </div>
      </div>

      <div className="flex flex-col items-start gap-4 lg:flex-row">
        {OVERVIEW_METRICS.map((metric, index) => {
          return _renderCard(
            metric.metric,
            metric.isPercentage,
            index,
            metric.unlock
          );
        })}
      </div>
    </div>
  );
};

export default OverViewTop;
