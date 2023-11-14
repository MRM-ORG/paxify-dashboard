import { ArrowRightOutlined, CaretDownOutlined, CaretUpOutlined, DownloadOutlined } from "@ant-design/icons";
import { Card, Select, Button, Tabs, Badge,Grid } from "antd";
const {useBreakpoint} = Grid 
import React from "react";
import Link from "next/link";
import { NextPage } from "next";
import AreaChart from "./AreaChart";

const Extra = (
  <div className="flex items-center space-x-3">
    <Select defaultValue={"Apps and Websites"} />
    <Button icon={<DownloadOutlined />}>Export</Button>
  </div>
);

type Props = {
  analytics: any
}

const Performance:NextPage<Props> = ({ analytics }) => {

  console.log({ analytics })
  const reactAnalytics = analytics.filter((obj: { name: string; }) => obj.name === "reels_init");

  const reachDateCounts: Record<string, number> = {};

  reactAnalytics?.forEach((obj: any) => {
    // Convert the timestamp to a date
    const date = new Date(obj.time);
    const dateString = date.toLocaleDateString(); // Convert date to a string
  
    // Check if the date exists in the dateCounts object
    if (reachDateCounts[dateString]) {
      reachDateCounts[dateString]++;
    } else {
      reachDateCounts[dateString] = 1;
    }
  });
  
  // Create a new array of objects with date and count
  const newArray = Object.entries(reachDateCounts).map(([date, count]) => ({
    date: new Date(date),
    count,
  }));

  console.log({newArray})

  const viewAnalytics = analytics.filter((obj: { name: string; }) => obj.name === "reels_story_viewed");

  const viewDateCounts: Record<string, number> = {};

  viewAnalytics?.forEach((obj: any) => {
    // Convert the timestamp to a date
    const date = new Date(obj.time);
    const dateString = date.toLocaleDateString(); // Convert date to a string
  
    // Check if the date exists in the dateCounts object
    if (viewDateCounts[dateString]) {
      viewDateCounts[dateString]++;
    } else {
      viewDateCounts[dateString] = 1;
    }
  });
  
  // Create a new array of objects with date and count
  const viewsArray = Object.entries(viewDateCounts).map(([date, count]) => ({
    date: new Date(date),
    count,
  }));

  console.log({viewsArray})

  const dummyData = [
    {
        date: new Date("2023-09-04"),
        count: 36.5
    },
    {
        date: new Date("2023-09-03"),
        count: 73
    },
]

  const screens = useBreakpoint();

  const PERFORMANCE_TABS_ITEMS = [
    {
        text:"Reach",
        number: analytics?.filter((obj: { name: string; }) => obj.name === "reels_init")?.length,
        label:"28.1%",
        increase:true,
        children:newArray ? (
          <div className="h-[300px] w-full">
            <AreaChart analytics={!newArray?.length ? dummyData : newArray} />
          </div>
        ) : null,
        link:false
    },
    {
        text:"Impression",
        number: analytics.filter((obj: { name: string; }) => obj?.name === "reels_init")?.length,
        label:"12.4%",
        increase:true,
        children:newArray ? (
          <div className="h-[300px] w-full">
            <AreaChart analytics={!newArray?.length ? dummyData : newArray} />
          </div>
        ) : null,
        link:false
    },
    {
        text:"Click",
        number: analytics?.filter((obj: { name: string; }) => obj?.name === "reels_story_viewed")?.length,
        label:`${((analytics?.filter((obj: { name: string; }) => obj?.name === "reels_init")?.length) / (analytics?.filter((obj: { name: string; }) => obj.name === "reels_story_viewed").length)).toFixed(2)}%`,
        increase:false,
        children:viewsArray ? (
          <div className="h-[300px] w-full">
            <AreaChart analytics={!viewsArray?.length ? dummyData : viewsArray} />
          </div>
        ) : null,
        link:false
    },
    // {
    //     text:"Active Users",
    //     number:"1.5k",
    //     label:"17.4%",
    //     increase:true,
    //     children:<h1>Active Users</h1>,
    //     link:false
    // },
    {
        text:"Event Tracker",
        children:<h1>Event Tracker</h1>,
        link:true
    },
]
  
  return (
    <Card className="h-auto" extra={Extra} style={{ marginTop: "0px" }} title={<h1 className="font-bold text-lg">Performance</h1>}>
  <Tabs
    defaultActiveKey="reach"
    tabPosition={screens.lg ? "bottom":"bottom"}
    items={PERFORMANCE_TABS_ITEMS?.map((item, i) => {
      return {
        label: (
          <div className="flex flex-wrap">
          <div className="lg:space-x-14 tab-label mt-20" >
            <h1>{item.text}</h1>
            {
                item.link ? <Link className="text-primary flex items-center" href="#"><p>Get Started </p><ArrowRightOutlined className="ml-3"/></Link> : <div className="lg:space-x-3 lg:flex w-[100px] badge-content">
                <div><span className="font-bold">{item.number}</span></div>
                <div>
                <Badge
                  className="font-medium"
                  count={
                    item.increase ? (
                      <div>
                        <CaretUpOutlined size={2} style={{ color: "#01EA85" }} /> {item.label}
                      </div>
                    ) : (
                      <div>
                        <CaretDownOutlined style={{ color: "#FF5F4A" }} /> {item.label}
                      </div>
                    )
                  }
                  style={{
                    backgroundColor: item.increase ? "rgba(1, 234, 133, 0.10)" : "rgba(255, 95, 74, 0.10)",
                    padding: "5px 8px 4.5px 8px",
                    borderRadius: "100px",
                  }}
                />
                </div>
              </div>
            }
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
