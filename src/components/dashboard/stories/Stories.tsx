import { BACKEND_URL } from "@/constants";
import { getUser } from "@/utils/auth";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Card, Switch } from "antd";
import axios from "axios";
import { NextPage } from "next";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

const Toggle = styled(Switch)`
  // Styles for the on state
  &.ant-switch-checked:not(.ant-switch-loading) {
    .ant-switch-inner {
      background-color: #52c41a; // Change this color to your desired background color for the "on" state
    }
  }

  // Styles for the off state
  &.ant-switch:not(.ant-switch-checked):not(.ant-switch-loading) {
    .ant-switch-inner {
      background-color: #f5222d; // Change this color to your desired background color for the "off" state
    }
  }
`;

const Flex = styled("div")`
  margin-top: 10px;
  gap: 10px;
  align-items: center;
  display: flex !important;
  justify-content: center;
`;

const { Meta } = Card;

type Props = {
  stores: any;
  stories: any;
};

const Story = ({
  store,
  story,
  img,
  text,
}: {
  store: any;
  story: any;
  img: string;
  text: string;
}) => {
  const [isActive, setIsActive] = React.useState(story.status);

  const handleStoryToggle = (storyId: string) => {
    const user = getUser();
    axios
      .post(`${BACKEND_URL}/firebase/update-story-status`, {
        uid: user?.uid,
        storeId: store.id,
        storyId,
      })
      .then(() => setIsActive(!isActive));
  };

  return (
    <>
      <div className="relative">
        <img
          src={img}
          alt="Story"
          className="w-full h-auto rounded-lg"
          style={{
            borderRadius: "16px 16px 0 0",
            width: "250px",
            height: "450px",
          }}
        />
      </div>

      <Flex>
        <div className="mt-1 mb-1" style={{ fontWeight: "500" }}>
          {story?.player[0]?.layout?.title}
        </div>
        <Meta
          className=""
          title={
            <Toggle
              onClick={() => handleStoryToggle(story?.id)}
              checked={isActive}
              checkedChildren="ON"
              unCheckedChildren="OFF"
              defaultChecked
            />
          }
        />
      </Flex>
    </>
  );
};

const Stories: NextPage<Props> = ({ stores, stories }) => {
  return (
    <div className="flex gap-5 relative justify-center sm:justify-start items-center flex-wrap mt-8">
      {Array.from(stories).map((_: any, index) => (
        <Card
          key={index}
          hoverable
          style={{
            width: "250px",
            height: "500px",
            marginBottom: "40px",
            borderRadius: "16px",
          }}
          cover={
            <Story
              store={stores[0]}
              story={_}
              text={_?.id}
              img={_.player[0]?.content?.source}
            />
          }
        />
      ))}
    </div>
  );
};

export default Stories;
