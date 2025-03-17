import React, { useState } from "react";
import HeaderSearch from "../HeaderSearch";
import UserSideBar from "../UserSidebar";
import BusinessSidebar from "../BusinesSidebar";
import { LuBellRing } from "react-icons/lu";
import { BiChevronDown } from "react-icons/bi";
import USAFlag from "./../../assets/images/usa.png";
import { useUser } from "../../hooks/auth/useUser";
import useProfilePicture from "../../hooks/useProfilePic.js";
import { AiOutlineMenu } from "react-icons/ai";

function Header() {
  const profilePicture = useProfilePicture();
  const { user } = useUser();
  const [sideBar, setSideBar] = useState(false);

  return (
    <>
      {user?.user_type === "company" && (
        <>
          <div className="flex items-center justify-between shadow-sm px-10 py-10 bg-gray-50">
            <AiOutlineMenu
              style={{ fontSize: "4rem", cursor: "pointer", width: "23px" }}
              className="cursor-pointer flex lg:hidden !min-w-[23px]"
              onClick={() => setSideBar(!sideBar)}
            />
            <div className="w-[50rem] hidden lg:flex">
              <HeaderSearch />
            </div>
            <div className="flex lg:hidden w-[400px] justify-center">
              <h2 className="font-semibold text-3xl">Dashboard</h2>
            </div>
            <div className="flex gap-8 items-center justify-between">
              <div className="hidden lg:flex gap-4 bg-[#f9fafb] py-4 px-6 rounded-md">
                <img className="w-10" src={USAFlag} alt="usa flag" />
                <select
                  className="outline-none bg-[#f9fafb] cursor-pointer"
                  name="language"
                  id="language"
                >
                  <option value="EngUS">Eng (US)</option>
                  <option value="EngUK">Eng (UK)</option>
                  <option value="EngAUS">Eng (AUS)</option>
                  <option value="Punjabi">Punjabi</option>
                </select>
              </div>
              <div className="p-4 bg-[#fffaf1]">
                <LuBellRing style={{ color: "#ffa412", fontSize: "2.4rem" }} />
              </div>
              <div className="flex items-center justify-center gap-8">
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="w-10 h-10 max-w-16 rounded-full object-cover"
                />
                <div className="hidden lg:flex flex-col">
                  <p className="flex items-center gap-4 justify-between text-2xl">
                    {user?.profile?.name} <BiChevronDown />
                  </p>
                  <p className="text-lg text-gray-500">
                    @{user?.profile?.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-[3rem] py-2 bg-gray-50 flex lg:hidden">
            <HeaderSearch className="w-full" />
          </div>
        </>
      )}
      {user?.user_type === "individual" && (
        <>
          <div className="flex relative items-center justify-between shadow-sm px-10 py-10 bg-gray-50">
            <AiOutlineMenu
              style={{ fontSize: "4rem", cursor: "pointer", width: "23px" }}
              className="cursor-pointer flex lg:hidden !min-w-[23px]"
              onClick={() => setSideBar(!sideBar)}
            />
            <div className="w-[50rem] hidden lg:flex">
              <HeaderSearch />
            </div>
            <div className="flex lg:hidden w-[400px] justify-center">
              <h2 className="font-semibold text-3xl">Dashboard</h2>
            </div>
            <div className="flex gap-8 items-center justify-between">
              <div className="hidden lg:flex gap-4 bg-[#f9fafb] py-4 px-6 rounded-md">
                <img className="w-10" src={USAFlag} alt="usa flag" />
                <select
                  className="outline-none bg-[#f9fafb] cursor-pointer"
                  name="language"
                  id="language"
                >
                  <option value="EngUS">Eng (US)</option>
                  <option value="EngUK">Eng (UK)</option>
                  <option value="EngAUS">Eng (AUS)</option>
                  <option value="Punjabi">Punjabi</option>
                </select>
              </div>
              <div className="p-4 bg-[#fffaf1]">
                <LuBellRing style={{ color: "#ffa412", fontSize: "2.4rem" }} />
              </div>
              <div className="flex items-center justify-center gap-8">
                <img
                  className="w-40 lg:w-14 lg:h-16 rounded-lg max-w-16"
                  src={profilePicture}
                  alt="Profile Img of Business Account"
                />
                <div className="hidden lg:flex flex-col">
                  <p className="flex items-center gap-4 justify-between text-2xl">
                    {user?.profile?.name}
                    {""}
                    <BiChevronDown />
                  </p>
                  <p className="text-lg text-gray-500">
                    @{user?.profile?.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-[3rem] py-2 bg-gray-50 flex lg:hidden">
            <HeaderSearch className="w-full" />
          </div>
        </>
      )}

      {sideBar && (
        <div
          className="flex fixed w-full"
          style={{ marginTop: "-180px", zIndex: "1000" }}
        >
          <div
            style={{ overflow: "scroll", maxHeight: "110vh" }}
            className="flex lg:hidden flex-col min-h-screen bg-primary w-[75%]"
          >
            {user?.user_type === "individual" && <UserSideBar />}
            {user?.user_type === "company" && <BusinessSidebar />}
          </div>
          <div
            className="flex lg:hidden w-[25%] min-h-screen bg-black/45 cursor-pointer"
            onClick={() => setSideBar(!sideBar)}
          ></div>
        </div>
      )}
    </>
  );
}

export default Header;
