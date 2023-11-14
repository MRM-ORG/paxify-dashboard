import React from "react";
import { Select, Badge, Button, Radio } from "antd";
import {
  EyeOutlined,
  PicCenterOutlined,
  PlusOutlined,
  SearchOutlined,
  UnorderedListOutlined,
  WindowsOutlined,
} from "@ant-design/icons";
import Stories from "./Stories";
import { NextPage } from "next";
const { Option } = Select;
import { AiOutlineSearch } from "react-icons/ai";

type Props = {
  stories: any;
};

const StoryPage: NextPage<Props> = ({ stories }) => {
  return (
    <div className="w-full p-8 rounded-[10px] bg-white">
      <div className=" max-md:mt-12 max-md:p-3 flex flex-col justify-between gap-4  min-[1334px]:gap-2 min-[1334px]:flex-row">
        <div className="w-full min-[1334px]:w-[40%]">
          <div className="relative">
            <input
              type="text"
              placeholder="Search here..."
              className="pl-10 story-placeholder w-full h-[45px] py-2 px-3 bg-[#F9FAFB]  rounded shadow-none focus:outline-none"
            />
            <AiOutlineSearch className="absolute top-4 left-4 z-1 text-[18px] cursor-pointer text-[#09797A]" />
          </div>
        </div>

        <div className="w-full min-[1334px]:w-[60%] flex flex-row max-sm:flex-col justify-start  gap-2 sm:items-center">
          <div className="flex gap-1">
            <div className="ml-6">
              <Select defaultValue={"option1"} placeholder="Select an option">
                <Option value="option1">
                  Option 1{" "}
                  <Badge
                    style={{ backgroundColor: "#8b62ff", marginLeft: "7px" }}
                    count={1}
                  />
                </Option>
                <Option value="option2">
                  Option 2{" "}
                  <Badge
                    style={{ backgroundColor: "#8b62ff", marginLeft: "7px" }}
                    count={1}
                  />
                </Option>
                <Option value="option3">
                  Option 3{" "}
                  <Badge
                    style={{ backgroundColor: "#8b62ff", marginLeft: "7px" }}
                    count={1}
                  />
                </Option>
              </Select>
            </div>

            <div className="ml-2">
              <Select defaultValue={"option1"} placeholder="Select an option">
                <Option value="option1">Labels</Option>
                <Option value="option2">Labels</Option>
              </Select>
            </div>

            <div className="ml-6">
              <Select defaultValue={"option1"} placeholder="Select an option">
                <Option value="option1">Audiences</Option>
                <Option value="option2">Audiences</Option>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <div className="ml-2">
              <Button
                className="bg-white"
                type="default"
                shape="default"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                  >
                    <path
                      d="M8.08998 8.66668C8.45817 8.66668 8.75664 8.3682 8.75664 8.00001C8.75664 7.63182 8.45817 7.33334 8.08998 7.33334C7.72179 7.33334 7.42331 7.63182 7.42331 8.00001C7.42331 8.3682 7.72179 8.66668 8.08998 8.66668Z"
                      stroke="#7C7C96"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12.7566 8.66668C13.1248 8.66668 13.4233 8.3682 13.4233 8.00001C13.4233 7.63182 13.1248 7.33334 12.7566 7.33334C12.3884 7.33334 12.09 7.63182 12.09 8.00001C12.09 8.3682 12.3884 8.66668 12.7566 8.66668Z"
                      stroke="#7C7C96"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M3.42329 8.66668C3.79148 8.66668 4.08996 8.3682 4.08996 8.00001C4.08996 7.63182 3.79148 7.33334 3.42329 7.33334C3.0551 7.33334 2.75662 7.63182 2.75662 8.00001C2.75662 8.3682 3.0551 8.66668 3.42329 8.66668Z"
                      stroke="#7C7C96"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                }
              />
            </div>

            <div className="ml-2">
              <Button
                className="bg-white"
                shape="default"
                type="default"
                icon={<SearchOutlined />}
              />
            </div>

            <div className="ml-2">
              <Button
                className="bg-white"
                shape="default"
                type="default"
                icon={<EyeOutlined />}
              />
            </div>

            <div className="ml-[10px]">
              <div className="w-[130px] h-[40px] flex justify-between" style={{border: '1px solid #D3D3DC', borderRadius: '6px'}}>
                {/* <Radio.Button value="large"> */}
                  <WindowsOutlined className="pl-[10px]"/>
                {/* </Radio.Button>
                <Radio.Button value="middle"> */}
                  <PicCenterOutlined />
                {/* </Radio.Button> */}
                {/* <Radio.Button value="small"> */}
                  <UnorderedListOutlined className="pr-[10px]"/>
                {/* </Radio.Button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Stories stories={stories} />
    </div>
  );
};

export default StoryPage;
