import React from "react";
import { Button, DatePicker } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { IoIosPeople } from "react-icons/io";
import { NextPage } from "next";

type Props = {
    analytics: any
}

const OverViewTop:NextPage<Props> = ({analytics}) => {

  return (
    <>
      <div className="p-4 bg-white rounded-[10px] mb-5">
        <div className="flex items-center justify-between max-md:mt-8">
          <div>
            <h1 className="text-[18px] font-[900] text-[#151D48]">Overview</h1>
          </div>
          <div className='flex justify-between flex-wrap'>
                <DatePicker.RangePicker className=' lg:w-auto w-full' />
            </div>
        </div>

        <div className="flex flex-col justify-between gap-4 lg:flex-row">
            <div
              className="w-full  p-4 rounded-[10px] mt-8"
              style={{ background: '#FFE2E5' }}
            >
              <div className="flex items-center justify-between">
                <div
                  className="bg-[#FA5A7D] px-[8px] py-[8px] rounded-[20px] flex items-center gap-2"
                  style={{ background: '#FA5A7D' }}
                >
                  <div className="flex items-center gap-2">
                    <img src="/logo/salesIcon.png" alt="icon"/>
                  </div>
                </div>
              </div>

              <div>
                <h1 className="text-[#151D48] text-[20px] font-[900] mt-4">
                    {((analytics.filter((obj: { name: string; }) => obj.name === "reels_story_viewed").length) / (analytics.filter((obj: { name: string; }) => obj.name === "reels_init").length)).toFixed(2)}%
                </h1>

                <p className="text-[#425166] text-[12px] font-[600] mt-3">
                  Avg. Engagement Rate
                </p>
                <p className="text-[#4079ED] text-[10px] font-[600] mt-3">
                  +8% from yesterday 
                </p>
              </div>
            </div>
            <div
              className="w-full  p-4 rounded-[10px] mt-8"
              style={{ background: '#FFF4DE' }}
            >
              <div className="flex items-center justify-between">
                <div
                  className="bg-[#FA5A7D] px-[8px] py-[8px] rounded-[20px] flex items-center gap-2"
                  style={{ background: '#FF947A' }}
                >
                  <div className="flex items-center gap-2">
                    <img src="/logo/orderIcon.png" alt="img"/>
                  </div>
                </div>
              </div>

              <div>
                <h1 className="text-[#151D48] text-[20px] font-[900] mt-4">
                {((analytics.filter((obj: { name: string; }) => obj.name === "cta_clicked").length) / (analytics.filter((obj: { name: string; }) => obj.name === "reels_init").length)).toFixed(2)}%
                </h1>

                <p className="text-[#425166] text-[12px] font-[600] mt-3">
                  Avg. CTR
                </p>
                <p className="text-[#4079ED] text-[10px] font-[600] mt-3">
                  +8% from yesterday 
                </p>
              </div>
            </div>
            <div
              className="w-full  p-4 rounded-[10px] mt-8"
              style={{ background: '#DCFCE7' }}
            >
              <div className="flex items-center justify-between">
                <div
                  className="bg-[#FA5A7D] px-[8px] py-[8px] rounded-[20px] flex items-center gap-2"
                  style={{ background: '#3CD856' }}
                >
                  <div className="flex items-center gap-2">
                    <img src="/logo/resIcon.png" alt="icon"/>
                  </div>
                </div>
              </div>

              <div>
                <h1 className="text-[#151D48] text-[20px] font-[900] mt-4">
                    {((analytics.filter((obj: { name: string; }) => obj.name === "reels_opened").length) / (analytics.filter((obj: { name: string; }) => obj.name === "reels_init").length)).toFixed(2)}%
                </h1>

                <p className="text-[#425166] text-[12px] font-[600] mt-3">
                  Avg. Response Rate
                </p>
                <p className="text-[#4079ED] text-[10px] font-[600] mt-3">
                  +8% from yesterday 
                </p>
              </div>
            </div>
            <div
              className="w-full  p-4 rounded-[10px] mt-8"
              style={{ background: '#F3E8FF' }}
            >
              <div className="flex items-center justify-between">
                <div
                  className="bg-[#FA5A7D] px-[8px] py-[8px] rounded-[20px] flex items-center gap-2"
                  style={{ background: '#BF83FF' }}
                >
                  <div className="flex items-center gap-2">
                    <img src="/logo/userIcon.png" alt="icon"/>
                  </div>
                </div>
              </div>

              <div>
                <h1 className="text-[#151D48] text-[20px] font-[900] mt-4">
                  $1k
                </h1>

                <p className="text-[#425166] text-[12px] font-[600] mt-3">
                  Avg. Sales
                </p>
                <p className="text-[#4079ED] text-[10px] font-[600] mt-3">
                  +8% from yesterday 
                </p>
              </div>
            </div>
        </div>
        <div className="text-[10px] mt-2">
          Total impression is 11% higher than the previous period. Most viewed story group is Beef Empanades with Chimichurri Sauce
        </div>
      </div>
    </>
  );
};

export default OverViewTop;
