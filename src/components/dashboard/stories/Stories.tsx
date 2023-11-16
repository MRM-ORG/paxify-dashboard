import { InfoCircleOutlined } from "@ant-design/icons";
import { Card, Switch } from "antd";
import { NextPage } from "next";
import Image from "next/image";
import React from "react";
const { Meta } = Card;

type Props = {
  stories: any;
};
const Story = ({ img, text }: { img: string; text: string }) => {
  return (
    <div className="relative">
      <img
        src={img}
        alt="Your Image"
        className="w-full h-auto rounded-lg"
        style={{ borderRadius: "16px 16px 0 0" }}
      />

      <div className="absolute top-3 right-3">
        <Image
          src="/logo/edit.png"
          alt="edit"
          width={25}
          height={25}
          style={{ borderRadius: "2px" }}
          className="h-6 w-6 cursor-pointer"
        />
      </div>
    </div>
  );
};

const Stories: NextPage<Props> = ({ stories }) => {
  return (
    <div className="flex relative justify-center sm:justify-between items-center flex-wrap mt-8">
      {Array.from(stories).map((_: any, index) => (
        <Card
          key={index}
          hoverable
          actions={[
            <div key={"hi"} className="flex w-[190px] justify-end">
              <div>
                <InfoCircleOutlined />{" "}
              </div>
              <p className="ml-2 text-[#7C7C96]">Audiences</p>
            </div>,
          ]}
          style={{
            width: "210px",
            height: "310px",
            marginBottom: "40px",
            borderRadius: "16px 16px 0 0",
          }}
          cover={<Story text={_?.id} img={_.player[0]?.content?.source} />}>
          <div className="mt-1 mb-1" style={{ fontWeight: "500" }}>
            {_?.player[0]?.layout?.title}
          </div>
          <Meta
            className=""
            title={<Switch className="" defaultChecked />}
            description={
              <div className="h-8 w-4 rounded-sm bg-black ml-[10px] mt-[5px]"></div>
            }
          />
        </Card>
      ))}
    </div>
  );
};

export default Stories;
