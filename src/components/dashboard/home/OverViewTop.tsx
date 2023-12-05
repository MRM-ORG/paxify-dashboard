import React, { useEffect, useMemo, useState } from "react";
import { Button, DatePicker, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FaInfoCircle } from "react-icons/fa";
import { NextPage } from "next";
import { getUserSubscriptionStatus } from "@/apiCalls/auth";
import { getUser } from "@/utils/auth";

type Props = {
  analytics: any;
};

const OverViewTop: NextPage<Props> = ({ analytics }) => {
  const [plan, setPlan] = useState("Basic");
  const totalStoryViews = useMemo(() => {
    return analytics.filter(
      (obj: { event: string }) => obj.event === "reels_story_viewed"
    ).length;
  }, [analytics]);

  const totalStoryInit = useMemo(() => {
    return analytics.filter(
      (obj: { event: string }) => obj.event === "reels_init"
    ).length;
  }, [analytics]);

  const totalInteractions = useMemo(() => {
    return analytics.filter(
      (obj: { event: string }) =>
        obj.event === "cta_clicked" || obj.event === "reels_interacted"
    ).length;
  }, [analytics]);

  const reachRate = totalStoryViews / totalStoryInit;
  const engagementRate = totalInteractions / totalStoryViews;

  useEffect(() => {
    const user = getUser();
    if (!user) return;
    getUserSubscriptionStatus(user.uid).then((res) => {
      setPlan(res.plan.plan);
    });
  }, []);

  return (
    <div className="p-4 bg-white rounded-[10px] mb-5">
      <div className="flex items-center justify-between max-md:mt-8">
        <div>
          <h1 className="text-[18px] font-[900] text-[#151D48]">Overview</h1>
        </div>
        {/* <div className="flex justify-between flex-wrap">
            <DatePicker.RangePicker className=" lg:w-auto w-full" />
          </div> */}
      </div>

      <div className="flex flex-col items-start gap-4 lg:flex-row">
        <div
          className="w-full max-w-sm p-4 rounded-[10px] mt-8"
          style={{ background: "#F3E8FF" }}>
          <div className="flex items-center justify-between">
            <div
              className="bg-[#FA5A7D] px-[8px] py-[8px] rounded-[20px] flex items-center gap-2"
              style={{ background: "#BF83FF" }}>
              <div className="flex items-center gap-2">
                <img src="/logo/userIcon.png" alt="icon" />
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-[#151D48] text-[20px] font-[900] mt-4">
              {totalStoryInit.toLocaleString()}
            </h1>

            <div className="flex items-center mt-3 gap-1">
              <p className="text-[#425166] text-[12px] font-[600] ">
                Total Impressions
              </p>
            </div>
            <p className="text-[#4079ED] text-[10px] font-[600] mt-3">
              Number of times your stories were presented to users
            </p>
          </div>
        </div>

        <div
          className="w-full max-w-sm  p-4 rounded-[10px] mt-8"
          style={{ background: "#FFE2E5" }}>
          <div className="flex items-center justify-between">
            <div
              className="bg-[#FA5A7D] px-[8px] py-[8px] rounded-[20px] flex items-center gap-2"
              style={{ background: "#FA5A7D" }}>
              <div className="flex items-center gap-2">
                <img src="/logo/salesIcon.png" alt="icon" />
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-[#151D48] text-[20px] font-[900] mt-4">
              {plan !== "Basic" && !isNaN(reachRate) ? (
                <div>{(Number(reachRate) * 100).toFixed(2)}%</div>
              ) : (
                <div className="blur-sm">--------</div>
              )}
            </h1>
            <div className="flex items-center mt-3 gap-1">
              <p className="text-[#425166] text-[12px] font-[600]">
                Your Reach
              </p>
              {plan === "Basic" && (
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
              {/* +8% from yesterday */}
              People who are viewing your stories
            </p>
          </div>
        </div>
        <div
          className="w-full w-full max-w-sm  p-4 rounded-[10px] mt-8"
          style={{ background: "#DCFCE7" }}>
          <div className="flex items-center justify-between">
            <div
              className="bg-[#FA5A7D] px-[8px] py-[8px] rounded-[20px] flex items-center gap-2"
              style={{ background: "#3CD856" }}>
              <div className="flex items-center gap-2">
                <img src="/logo/resIcon.png" alt="icon" />
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-[#151D48] text-[20px] font-[900] mt-4">
              {plan !== "Basic" && !isNaN(engagementRate) ? (
                <div>{(Number(engagementRate) * 100).toFixed(2)}%</div>
              ) : (
                <div className="blur-sm">--------</div>
              )}
            </h1>
            <div className="flex items-center mt-3 gap-1">
              <p className="text-[#425166] text-[12px] font-[600]">
                Engagement Rate
              </p>
              {plan === "Basic" && (
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
              {/* +8% from yesterday */}
              People who are interacting with your stories
            </p>
          </div>
        </div>
      </div>
      {/* <div className="text-[10px] mt-2">
          Total impression is 11% higher than the previous period. Most viewed
          story group is Beef Empanades with Chimichurri Sauce
        </div> */}
    </div>
  );
};

export default OverViewTop;
