import { fetchUserStores } from "@/apiCalls/auth";
import { getUser } from "@/utils/auth";
import { Badge, Button, Select } from "antd";
import { NextPage } from "next";
import React, { useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import styled from "styled-components";
import Stories from "./Stories";
import { SketchPicker } from "react-color";
import {
  SearchOutlined,
  EyeOutlined,
  WindowsOutlined,
  PicCenterOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const Flex = styled("div")`
  gap: 15px;
  display: flex;
`;

type Props = {
  stories: any;
};

const StoryPage: NextPage<Props> = ({ stories }) => {
  const [searchString, setSearchString] = React.useState("");
  const [stores, setStores] = React.useState<any>([]);
  const [filteredStories, setFilteredStories] = React.useState<any[]>(stories);

  const handleSearch = (e: any) => {
    setSearchString(e.target.value);

    if (e.target.value === "") {
      setFilteredStories(stories);
      return;
    }

    const filteredStories = stories.filter((story: any) => {
      return story?.player[0]?.layout?.title
        ?.toLowerCase()
        .includes(searchString.toLowerCase());
    });

    setFilteredStories(filteredStories);
  };

  useEffect(() => {
    setFilteredStories(stories);
  }, [stories]);

  useEffect(() => {
    try {
      const user = getUser();
      if (!user) return;
      const { uid } = user;
      fetchUserStores(uid).then((stores) => {
        if (Array.isArray(stores)) {
          setStores(stores);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="w-full p-8 rounded-[10px] bg-white">
      <div className=" max-md:mt-12 max-md:p-3 flex flex-col justify-between gap-4  min-[1334px]:gap-2 min-[1334px]:flex-row">
        <div className="w-full min-[1334px]:w-[40%]">
          <Flex>
            {stores.length > 0 &&
              stores.map((store: any) => (
                <div key={store.id}>
                  <input
                    style={{
                      width: "450px",
                    }}
                    disabled
                    className="pl-10 h-[45px] py-2 px-3 bg-[#F9FAFB]  rounded shadow-none focus:outline-none"
                    value={`Store: ${store.name} (${store.domain})`}></input>
                </div>
              ))}
            <div className="relative">
              <input
                value={searchString}
                onChange={handleSearch}
                type="text"
                placeholder="Filter stories..."
                style={{
                  width: "450px",
                }}
                className="pl-10 story-placeholder w-full h-[45px] py-2 px-3 bg-[#F9FAFB]  rounded shadow-none focus:outline-none"
              />
              <AiOutlineSearch className="absolute top-4 left-4 z-1 text-[18px] cursor-pointer text-[#09797A]" />
            </div>
          </Flex>
        </div>
      </div>

      {/* <SketchPicker /> */}
      <Stories stores={stores} stories={filteredStories} />
    </div>
  );
};

export default StoryPage;
