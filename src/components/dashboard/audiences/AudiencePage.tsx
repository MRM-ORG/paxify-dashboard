import React from "react";
import { Badge, Button, Card } from "antd";
import {
    InfoOutlined,
    PlusOutlined,
    UsergroupAddOutlined,
} from "@ant-design/icons";

const AudiencePage = () => {
    return (
        <>
            <div className="flex justify-center md:justify-end">
                <Button className="bg-[#8b62ff]" type="primary" icon={<PlusOutlined />}>
                    New Audience
                </Button>
            </div>
            <div className="flex relative justify-center sm:justify-between items-center flex-wrap mt-20">
                {
                    Array.from({ length: 8 }).map((_, index) => (
                        <Card
                            key={index}
                            style={{ width: "300px",marginTop:"20px" }}
                            title={
                                <Badge
                                    style={{
                                        backgroundColor: "#F2EDFF",
                                        padding: "9px 14px",
                                        borderRadius: "100px",
                                    }}
                                    count={
                                        <div
                                            style={{ color: "rgba(0, 0, 0, 0.85)", fontWeight: "bolder" }}
                                        >
                                            <UsergroupAddOutlined
                                                style={{ color: "#242450", marginRight: "5px" }}
                                                size={2}
                                            />
                                            Labels
                                        </div>
                                    }
                                />
                            }
                            extra={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{ fontWeight: "900", fontSize: "18px", marginLeft: "5px", cursor: "pointer" }}
                                    width="17"
                                    height="16"
                                    viewBox="0 0 17 16"
                                    fill="none"
                                >
                                    <path
                                        d="M8.54997 8.66668C8.91816 8.66668 9.21663 8.3682 9.21663 8.00001C9.21663 7.63182 8.91816 7.33334 8.54997 7.33334C8.18178 7.33334 7.8833 7.63182 7.8833 8.00001C7.8833 8.3682 8.18178 8.66668 8.54997 8.66668Z"
                                        stroke="black"
                                        stroke-opacity="0.85"
                                        stroke-width="1.33333"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M8.54997 3.99999C8.91816 3.99999 9.21663 3.70151 9.21663 3.33332C9.21663 2.96513 8.91816 2.66666 8.54997 2.66666C8.18178 2.66666 7.8833 2.96513 7.8833 3.33332C7.8833 3.70151 8.18178 3.99999 8.54997 3.99999Z"
                                        stroke="black"
                                        stroke-opacity="0.85"
                                        stroke-width="1.33333"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M8.54997 13.3333C8.91816 13.3333 9.21663 13.0349 9.21663 12.6667C9.21663 12.2985 8.91816 12 8.54997 12C8.18178 12 7.8833 12.2985 7.8833 12.6667C7.8833 13.0349 8.18178 13.3333 8.54997 13.3333Z"
                                        stroke="black"
                                        stroke-opacity="0.85"
                                        stroke-width="1.33333"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            }
                            actions={[<div key={"keyonedfdfdf"} className="flex ml-6">Labels: <span>1</span></div>]}
                        >
                            <p>New York</p>
                        </Card>
                    ))
                }
            </div>
        </>
    );
};

export default AudiencePage;
