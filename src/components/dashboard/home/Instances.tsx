import { Card } from "antd";
import Link from "next/link";
import React from "react";
import { ArrowRightOutlined, CopyOutlined } from "@ant-design/icons";
import { NextPage } from "next";
import Performance from "./Performance";

const Story = ({ img, text }: { img: string; text: string }) => {
  return (
    // <div className="flex flex-col items-center space-y-2 hover:scale-110 cursor-pointer ease-in transition">
    //   <div className="relative rounded-full overflow-hidden w-16 h-16">
    //     <div className="absolute inset-0 border-2 border-[#bdbdca] rounded-full"></div>
    //     <div className="absolute inset-1 rounded-full bg-white">
    //       <img
    //         src={img}
    //         alt={text}
    //         className="w-full h-full object-cover rounded-full"
    //       />
    //     </div>
    //   </div>
    //   <p className="text-sm font-medium">{text}</p>
    // </div>
    <div>
      <img src={img} className="w-[102px] h-[115px] rounded-[10px]"/>
      <p className="text-sm font-medium">{text}</p>
    </div>
  );
};

type Props = {
  stories: any,
  analytics: any
}

const Instances:NextPage<Props> = ({ stories, analytics }) => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-5 mt-10">
        <Card className="col-span-3">
          <h1 className="font-bold text-lg lg:text-start text-center">Instances</h1>
        <div>
          <div className="flex justify-between mt-7">
             <span className="flex space-x-2 pl-3">
               <CopyOutlined style={{ fontSize: "1rem" }} />
               <h1 className="text-[1rem]" style={{fontWeight: 500}}>PROD</h1>
             </span>
             <Link className="text-primary text-[0.8rem] pr-5" href="#">
               Go To Content{" "}
               <ArrowRightOutlined className="ml-2 text-[0.8rem]" />{" "}
             </Link>
          </div>
          <div className="flex space-x-4 overflow-y-hidden overflow-x-auto py-2 px-2">
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
        </div>
        <div>
          <div className="flex justify-between mt-7">
             <span className="flex space-x-2 pl-3">
               <CopyOutlined style={{ fontSize: "1rem" }} />
               <h1 className="text-[1rem]" style={{fontWeight: 500}}>TEST</h1>
             </span>
             <Link className="text-primary text-[0.8rem] pr-5" href="#">
               Go To Content{" "}
               <ArrowRightOutlined className="ml-2 text-[0.8rem]" />{" "}
             </Link>
          </div>
          <div className="flex space-x-4 overflow-y-hidden overflow-x-auto py-2 px-2">
            <Story
              text={stories[4]?.player[0]?.layout?.title}
              img={stories[4]?.player[0]?.content?.source}
            />
            <Story
              text={stories[5]?.player[0]?.layout?.title}
              img={stories[5]?.player[0]?.content?.source}
            />
            <Story
              text={stories[6]?.player[0]?.layout?.title}
              img={stories[6]?.player[0]?.content?.source}
            />
            <Story
              text={stories[7]?.player[0]?.layout?.title}
              img={stories[7]?.player[0]?.content?.source}
            />
          </div>
        </div>
        </Card>
        <div className="col-span-4">
          <Performance analytics={analytics}/>
        </div>
      </div>
    </div>
  );
};

export default Instances;
