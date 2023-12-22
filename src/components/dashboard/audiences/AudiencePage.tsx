import React from "react";
import { Badge, Button, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { IoIosPeople } from "react-icons/io";
import { BiDotsVerticalRounded } from "react-icons/bi";

const AudiencePage = () => {
  const cardData = [
    {
      id: 1,
      background: "#FFE2E5",
      iconBg: "#FA5A7D",
      icon: <IoIosPeople className="text-white text-[20px]" />,
      iconText: "LABELS",
      heading: "Newyork",
      text: "Labels : 1",
    },
    {
      id: 2,
      background: "#FFF4DE",
      iconBg: "#FF947A",
      icon: <IoIosPeople className="text-white text-[20px]" />,
      iconText: "LABELS",
      heading: "Newyork",
      text: "Labels : 1",
    },
    {
      id: 3,
      background: "#DCFCE7",
      iconBg: "#3CD856",
      icon: <IoIosPeople className="text-white text-[20px]" />,
      iconText: "LABELS",
      heading: "Newyork",
      text: "Labels : 1",
    },
    {
      id: 3,
      background: "#F3E8FF",
      iconBg: "#BF83FF",
      icon: <IoIosPeople className="text-white text-[20px]" />,
      iconText: "LABELS",
      heading: "Newyork",
      text: "Labels : 1",
    },
  ];

  return (
    <>
      <div className="p-4 bg-white rounded-[10px]">
        <div className="flex items-center justify-between max-md:mt-8">
          <div>
            <h1 className="text-[18px] font-[900] text-[#151D48]">Overview</h1>
          </div>
          <div className="">
            <Button
              className="bg-[#8b62ff] audience-btn"
              type="primary"
              icon={<PlusOutlined />}>
              New Audience
            </Button>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 lg:flex-row">
          {cardData.map((item) => (
            <div
              key={item?.id}
              className="w-full  p-4 rounded-[10px] mt-8"
              style={{ background: item.background }}>
              <div className="flex items-center justify-between">
                <div
                  className="bg-[#FA5A7D] px-[15px] py-[8px] rounded-[20px] flex items-center gap-2"
                  style={{ background: item.iconBg }}>
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <h1 className="text-[14px] font-[400] text-white">
                      {item.iconText}
                    </h1>
                  </div>
                </div>

                <div>
                  <BiDotsVerticalRounded className="text-[20px] text-black text-opacity-[0.85] cursor-pointer" />
                </div>
              </div>

              <div>
                <h1 className="text-[#151D48] text-[20px] font-[900] mt-4">
                  {item.heading}
                </h1>

                <p className="text-[#425166] text-[12px] font-[600] mt-3">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AudiencePage;
