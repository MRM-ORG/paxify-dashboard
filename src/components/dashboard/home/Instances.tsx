import { Card } from "antd";
import Link from "next/link";
import React from "react";
import { ArrowRightOutlined, CopyOutlined } from "@ant-design/icons";
import { NextPage } from "next";

const Story = ({ img, text }: { img: string; text: string }) => {
  return (
    <div className="flex flex-col items-center space-y-2 hover:scale-110 cursor-pointer ease-in transition">
      <div className="relative rounded-full overflow-hidden w-16 h-16">
        <div className="absolute inset-0 border-2 border-[#bdbdca] rounded-full"></div>
        <div className="absolute inset-1 rounded-full bg-white">
          <img
            src={img}
            alt={text}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
      <p className="text-sm font-medium">{text}</p>
    </div>
  );
};

type Props = {
  stories: any
}

const Instances:NextPage<Props> = ({ stories }) => {
  return (
    <Card>
      <h1 className="font-bold text-lg lg:text-start text-center">Instances</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10">
        <Card
          title={
            <span className="flex space-x-2">
              <CopyOutlined style={{ fontSize: "1rem" }} />
              <h1 className="text-[1rem]">PROD</h1>
            </span>
          }
          extra={
            <Link className="text-primary text-[0.8rem]" href="#">
              Go To Content{" "}
              <ArrowRightOutlined className="ml-2 text-[0.8rem]" />{" "}
            </Link>
          }
        >
          <div className="flex space-x-10 overflow-y-hidden overflow-x-auto py-2 px-2">
            <Story
              text={stories[0]?.player[0]?.layout?.title}
              img={stories[0]?.player[0]?.content?.source}
            />
            <Story
              text={stories[1]?.player[0]?.layout?.title}
              img={stories[1]?.player[0]?.content?.source}
            />
            <Story
              text={stories[2]?.player[0]?.layout?.title}
              img={stories[2]?.player[0]?.content?.source}
            />
            <Story
              text={stories[4]?.player[0]?.layout?.title}
              img={stories[4]?.player[0]?.content?.source}
            />
          </div>
        </Card>
        <Card
          title={
            <span className="flex space-x-2">
              <CopyOutlined style={{ fontSize: "1rem" }} />
              <h1 className="text-[1rem]">Test</h1>
            </span>
          }
          extra={
            <Link className="text-primary text-[0.8rem]" href="#">
              Go To Content{" "}
              <ArrowRightOutlined className="ml-2 text-[0.8rem]" />{" "}
            </Link>
          }
        >
          <div className="flex space-x-10 overflow-y-hidden overflow-x-auto py-2 px-2">
            <Story
              text={stories[0]?.player[0]?.layout?.title}
              img={stories[0]?.player[0]?.content?.source}
            />
            <Story
              text={stories[1]?.player[0]?.layout?.title}
              img={stories[1]?.player[0]?.content?.source}
            />
            <Story
              text={stories[2]?.player[0]?.layout?.title}
              img={stories[2]?.player[0]?.content?.source}
            />
            <Story
              text={stories[3]?.player[0]?.layout?.title}
              img={stories[3]?.player[0]?.content?.source}
            /> 
          </div>
        </Card>
      </div>
    </Card>
  );
};

export default Instances;
