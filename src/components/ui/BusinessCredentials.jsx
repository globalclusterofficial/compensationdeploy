import React from "react";
import BusinessImg from "./../../assets/images/BusinessImg.png";
import { useUser } from "../../hooks/auth/useUser";
import useProfilePicture from "../../hooks/useProfilePic.js";

function BusinessCredentials() {
  const { user } = useUser();
  const { profile } = user;
  const profilePicture = useProfilePicture();
  return (
    <section className="lg:px-10 px-5 lg:mx-14 mx-7 my-6 shadow-[0_0_10px_rgba(0,0,0,0.1)] ">
      <div className="p-6 flex flex-col lg:flex-row gap-6 lg:gap-20 items-center">
        <img
          className="w-[14rem] h-[14rem]"
          src={profilePicture || BusinessImg}
          alt="Settings Page Business Logo"
        />
        <div className="flex flex-col lg:flex-row gap-20 items-center text-2xl divide-x">
          <div className="flex flex-col gap-8 px-16 ">
            <p className="font-semibold">Business Name</p>
            <p className="text-gray-400">{profile?.name}</p>
          </div>
          <div className="flex flex-col gap-8 px-16 ">
            <p className="font-semibold">Email</p>
            <p className="text-gray-400">{user?.profile?.email}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BusinessCredentials;
