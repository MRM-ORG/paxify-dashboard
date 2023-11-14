import React from "react";
import { BiSolidMessageDetail } from "react-icons/bi";

const SettingPage = () => {
  return (
    <div>
      <div className="bg-white rounded-[10px]  p-6 ">
        <h1 className="text-setting-text-color text-[16px] font-[700] max-md:mt-8">
          Profile
        </h1>

        <div className="flex flex-col items-start w-full gap-4 lg:gap-8 lg:flex-row lg:items-center">
          <div className="w-full lg:w-[50%] mt-4">
            <div>
              <label className="font-[500] text-[14px] text-setting-text-color">
                First name
              </label>
              <br />
              <input
                type="text"
                placeholder="Muzamil"
                className="setting-placeholder mt-2 border border-[#C2C2C2] p-2 pl-4 rounded-[8px] w-full h-[44px]"
              />
            </div>

            <div className="mt-4">
              <label className="font-[500] text-[14px] text-setting-text-color">
                City
              </label>
              <br />
              <input
                type="text"
                placeholder="Gilgit"
                className="setting-placeholder mt-2 border border-[#C2C2C2] p-2 pl-4 rounded-[8px] w-full h-[44px]"
              />
            </div>

            <div className="mt-4">
              <label className="font-[500] text-[14px] text-setting-text-color">
                Email
              </label>
              <br />
              <input
                type="email"
                placeholder="muzamil@gmail.com"
                className="setting-placeholder mt-2 border border-[#C2C2C2] p-2 pl-4 rounded-[8px] w-full h-[44px]"
              />
            </div>
          </div>

          <div className="w-full lg:w-[50%] mt-1 lg:mt-4">
            <div>
              <label className="font-[500] text-[14px] text-setting-text-color">
                Last Name
              </label>
              <br />
              <input
                type="text"
                placeholder="Mehdi"
                className="setting-placeholder mt-2 border border-[#C2C2C2] p-2 pl-4 rounded-[8px] w-full h-[44px]"
              />
            </div>

            <div className="mt-4">
              <label className="font-[500] text-[14px] text-setting-text-color">
                Country
              </label>
              <br />
              <input
                type="text"
                placeholder="Pakistan"
                className="setting-placeholder mt-2 border border-[#C2C2C2] p-2 pl-4 rounded-[8px] w-full h-[44px]"
              />
            </div>

            <div className="mt-4">
              <label className="font-[500] text-[14px] text-setting-text-color">
                Password
              </label>
              <br />
              <input
                type="password"
                placeholder="******"
                className="setting-placeholder mt-2 border border-[#C2C2C2] p-2 pl-4 rounded-[8px] w-full h-[44px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-6 max-md:p-4">
        <button className="py-[6px] px-[46px] bg-setting-btb-bg rounded-[6px] text-white text-[14px] font-[500]">
          Save
        </button>
        <button className="py-[6px] px-[46px] bg-[#D3D3D9] rounded-[6px] text-[#212143] text-[14px] font-[500]">
          Cancel
        </button>
      </div>

      <div className="flex justify-end mt-8 ">
        <div className="bg-[#7A4BFF] p-3 rounded-[50%] max-md:mr-4 cursor-pointer">
          <BiSolidMessageDetail className="text-[29px] text-white " />
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
