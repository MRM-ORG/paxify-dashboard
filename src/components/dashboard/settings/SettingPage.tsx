import { getUserProfile, updateUserProfile } from "@/apiCalls/auth";
import { getUser } from "@/utils/auth";
import React, { useEffect } from "react";
import { BiSolidMessageDetail } from "react-icons/bi";

const SettingPage = () => {
  const [profile, setProfile] = React.useState<any>({
    uid: "",
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    country: "",
  });

  useEffect(() => {
    const user = getUser();
    if (!user) return;

    const fetchProfile = async () => {
      const profile = await getUserProfile(user.uid);
      console.log("profile", profile);
      setProfile(profile);
    };

    fetchProfile();
  }, []);

  const handleProfileChange = (e: any) => {
    const { name, value } = e.target;
    setProfile((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const user = getUser();
    if (!user) return;

    profile.uid = user.uid;
    updateUserProfile(profile).then((res) => {
      alert("Profile updated successfully");
    });
  };

  return (
    <div>
      <div className="bg-white rounded-[10px]  p-6 ">
        <h1 className="text-setting-text-color text-[16px] font-[700] max-md:mt-8">
          Profile
        </h1>

        <div className="flex flex-col items-start w-full gap-4 lg:gap-8 lg:flex-row">
          <div className="w-full lg:w-[50%] mt-4">
            <div>
              <label className="font-[500] text-[14px] text-setting-text-color">
                First Name
              </label>
              <br />
              <input
                name="firstName"
                value={profile?.firstName}
                type="text"
                onChange={handleProfileChange}
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
                name="city"
                value={profile.city}
                onChange={handleProfileChange}
                className="setting-placeholder mt-2 border border-[#C2C2C2] p-2 pl-4 rounded-[8px] w-full h-[44px]"
              />
            </div>

            <div className="mt-4">
              <label className="font-[500] text-[14px] text-setting-text-color">
                Email
              </label>
              <br />
              <input
                name="email"
                type="email"
                disabled
                value={profile.email}
                onChange={handleProfileChange}
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
                name="lastName"
                type="text"
                value={profile.lastName}
                onChange={handleProfileChange}
                className="setting-placeholder mt-2 border border-[#C2C2C2] p-2 pl-4 rounded-[8px] w-full h-[44px]"
              />
            </div>

            <div className="mt-4">
              <label className="font-[500] text-[14px] text-setting-text-color">
                Country
              </label>
              <br />
              <input
                name="country"
                type="text"
                value={profile.country}
                onChange={handleProfileChange}
                className="setting-placeholder mt-2 border border-[#C2C2C2] p-2 pl-4 rounded-[8px] w-full h-[44px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-6 max-md:p-4">
        <button
          onClick={handleSave}
          className="py-[6px] px-[46px] bg-setting-btb-bg rounded-[6px] text-white text-[14px] font-[500]">
          Save
        </button>
        {/* <button className="py-[6px] px-[46px] bg-[#D3D3D9] rounded-[6px] text-[#212143] text-[14px] font-[500]">
          Cancel
        </button> */}
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
