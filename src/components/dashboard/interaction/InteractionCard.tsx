import { fetchUserStores } from "@/apiCalls/auth";
import { BACKEND_URL } from "@/constants";
import axios from "axios";
import React, { useEffect, useState } from "react";

const InteractionCard = () => {
  const [stories, setStories] = useState<any[]>([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    fetchUserStores(user?.uid)
      .then((stores) => {
        if (Array.isArray(stores)) {
          Promise.all(
            stores?.map((store) => {
              const apiUrl = `${BACKEND_URL}/firebase/analytics/${user?.uid}/${store?.id}`;
              return axios.get(apiUrl);
            })
          ).then((response) => {
            const newStories = response
              ?.map((res) => res?.data?.data?.stories)
              .flat();
            const filteredStories = newStories.filter((story) => story);
            setStories(filteredStories);
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div className="flex relative justify-center sm:justify-between items-center flex-wrap mt-20">
      {Array.from(stories).map((_, index) => (
        <div key={index}>
          <div
            className="w-[220px] p-0 mb-6 h-[448px] bg-[#fff]"
            style={{ boxShadow: "4px 4px 20px 0px rgba(36, 36, 80, 0.10)" }}>
            <img
              src={_?.player[0]?.content?.source}
              alt="img"
              className="h-[230px]"
            />
            <div className="p-2">
              <div className="flex justify-between items-center">
                <h1 className="font-bold">Poll</h1>
                <div className="space-x-4 flex items-centers">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none">
                    <path
                      d="M0.666656 8.49999C0.666656 8.49999 3.33332 3.16666 7.99999 3.16666C12.6667 3.16666 15.3333 8.49999 15.3333 8.49999C15.3333 8.49999 12.6667 13.8333 7.99999 13.8333C3.33332 13.8333 0.666656 8.49999 0.666656 8.49999Z"
                      stroke="#666685"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8 10.5C9.10457 10.5 10 9.60457 10 8.5C10 7.39543 9.10457 6.5 8 6.5C6.89543 6.5 6 7.39543 6 8.5C6 9.60457 6.89543 10.5 8 10.5Z"
                      stroke="#666685"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none">
                    <path
                      d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10"
                      stroke="#666685"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M4.66666 6.66666L7.99999 9.99999L11.3333 6.66666"
                      stroke="#666685"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8 10V2"
                      stroke="#666685"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex mt-2 items-center space-x-3">
                <div
                  style={{
                    background:
                      "url(https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg), lightgray 0px 0px / 100% 100% no-repeat",
                    backgroundSize: "cover",
                  }}
                  className="h-[25px] w-[40px]  border border-red-300  rounded-full"></div>
                <p
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  className="font-medium">
                  Sweet Chili-Peanut Sauce Chicken Thighs{" "}
                </p>
              </div>
              <div className="flex justify-between mt-2">
                <div className="flex flex-col justify-center items-center">
                  <h1 className="font-medium">1</h1>
                  <p className="font-normal" style={{ fontSize: "10px" }}>
                    Impression
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <h1 className="font-medium">1</h1>
                  <p className="font-normal" style={{ fontSize: "10px" }}>
                    responses
                  </p>
                </div>
                <div
                  style={{ padding: "6px 12px 6px 12px" }}
                  className="flex flex-col bg-[#e6fcfd] rounded-[12px] justify-center items-center">
                  <h1 className="font-medium">100%</h1>
                  <p className="font-normal" style={{ fontSize: "10px" }}>
                    response
                  </p>
                </div>
              </div>
              <div className="border-b mt-2"></div>
              <h1 className="text-start mt-2 text-xs font-bold">
                Would you try this?
              </h1>
              <div className="flex flex-col justify-center mt-1">
                <div className="flex flex-row items-center space-y-2">
                  <p>👍</p>
                  <div
                    style={{
                      height: "3px",
                      width: "90%",
                      background: "#7a4bff",
                    }}></div>
                  <p>1</p>
                </div>
                <div className="flex flex-row items-center">
                  <p>👎</p>
                  <div
                    style={{
                      height: "3px",
                      width: "100%",
                      background: "#9D9D9D",
                    }}></div>
                  <p>0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InteractionCard;
