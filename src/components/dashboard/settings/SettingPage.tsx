import React from "react";
import { Tabs, Grid, ConfigProvider, Input, Button } from "antd";
const { useBreakpoint } = Grid;

const Profile = () => {
    return (
        <div className="px-4 py-2 bg-[#fff]">
            <h1 className="font-bold  text-xl">Profile</h1>
            <form>
                <div className="flex gap-6 lg:w-[50%] mt-8 w-[100%]">
                    <div className="flex lg:flex-0 flex-1 flex-col space-y-2">
                        <label htmlFor="name" className="font-medium">Name</label>
                        <Input style={{ padding: "10px 12px 10px 12px" }} className="bg-[#fff] border border-[#d9d9d9]" placeholder="Your name" />
                    </div>
                    <div className="flex lg:flex-0 flex-1 flex-col space-y-2">
                        <label htmlFor="name" className="font-medium">Surname</label>
                        <Input style={{ padding: "10px 12px 10px 12px" }} className="bg-[#fff] border border-[#d9d9d9]" placeholder="Your surname" />
                    </div>
                </div>
                <div className="lg:w-[50%] w-[100%] mt-7">
                    <div className="flex lg:flex-0 flex-1 flex-col space-y-2">
                        <label htmlFor="name" className="font-medium">Name</label>
                        <Input style={{ padding: "10px 12px 10px 12px" }} className="bg-[#fff] border border-[#d9d9d9]" placeholder="Your name" />
                    </div>
                </div>
                <div className="lg:w-[25%] w-[100%] mt-7">
                    <div className="flex lg:flex-0 flex-1 flex-col space-y-2">
                        <label htmlFor="name" className="font-medium">Password</label>
                        <div className="px-[15px] cursor-pointer text-primary text-center py-[12px] bg-[#e9e9ed] rounded-[6px]">
                            Change Password
                        </div>

                    </div>
                </div>

                <div className="lg:w-[25%] w-[100%] mt-7">
                  <Button className="bg-primary " type="primary">Save Changes</Button>
                </div>

            </form>
        </div>
    );
};

const SettingPage = () => {
    const screens = useBreakpoint();

    return (

        <Tabs
            defaultActiveKey="reach"
            tabPosition={screens.lg ? "left" : "top"}
            items={Array.from({ length: 1 }).map((_, i) => {
                return {
                    label: "Profile",
                    key: "Profile",
                    children: <Profile />,
                };
            })}
        />
    );
};

export default SettingPage;
