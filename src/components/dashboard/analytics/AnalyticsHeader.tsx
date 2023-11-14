import React from "react";
import { Select, Badge, Button, DatePicker } from "antd";
import { FileAddOutlined, UngroupOutlined } from "@ant-design/icons";
import AnalyticsTable from "./AnalyticsTable";
import { NextPage } from "next";
const { Option } = Select;

type Props = {
  stories: any;
  analytics: any;
};
const AnalyticsHeader: NextPage<Props> = ({ stories, analytics }) => {
  return (
    <>
      <div className=" bg-white rounded-[10px] overflow-hidden ">
        <div className="p-4 mt-8 md:mt-0">
          <div className="flex flex-col justify-center gap-4 lg:justify-between lg:flex-row lg:gap-0">
            <div className="flex gap-1">
              <h1 className="text-[#242450] text-[18px] font-[900]">
                Analytics
              </h1>
              <p className="text-[#7C7C96] text-[11px] font-[500] mt-[5px]">
                Interaction
              </p>
            </div>
            <div className="flex items-center justify-end gap-4 max-sm:flex-col ">
              <Button
                className="bg-white max-sm:w-full"
                icon={<FileAddOutlined className="text-[#666685]" />}
                style={{ color: "#666685" }}
              >
                Create report
              </Button>
              <DatePicker.RangePicker className="w-full lg:w-auto" />
            </div>
          </div>

          <div className="mt-3">
            <div className="flex gap-2 max-sm:flex-col">
              <Select defaultValue={"status1"} placeholder="Select an option">
                <Option value="status1">
                  Status
                  <Badge
                    style={{
                      backgroundColor: "#8b62ff",
                      marginLeft: "7px",
                    }}
                    count={1}
                  />
                </Option>
                <Option value="option2">
                  Option 2
                  <Badge
                    style={{
                      backgroundColor: "#8b62ff",
                      marginLeft: "7px",
                    }}
                    count={1}
                  />
                </Option>
                <Option value="option3">
                  Option 3
                  <Badge
                    style={{
                      backgroundColor: "#8b62ff",
                      marginLeft: "7px",
                    }}
                    count={1}
                  />
                </Option>
              </Select>
              <Select defaultValue={"option1"} placeholder="Select an option">
                <Option value="option1">Labels</Option>
                <Option value="option2">Labels</Option>
              </Select>
              <Select defaultValue={"option1"} placeholder="Select an option">
                <Option value="option1">Audiences</Option>
                <Option value="option2">Audiences</Option>
              </Select>
              <Select defaultValue={"option1"} placeholder={"Column"}>
                <Option value="option1">
                  <UngroupOutlined /> Column
                </Option>
              </Select>
            </div>
          </div>
        </div>
        <AnalyticsTable stories={stories} analytics={analytics} />
      </div>
    </>
  );
};

export default AnalyticsHeader;
