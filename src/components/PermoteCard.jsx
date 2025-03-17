import React from "react";
import PermoteImg from "./../assets/images/permoteImg.png";
import { NavLink } from "react-router-dom";

function PermoteCard() {
  return (
    <div className="flex flex-1 gap-4 bg-[#e9f0f5] px-6 py-10 justify-between rounded-lg">
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-primary ">Promote & Earn Reward</p>
        <p className="text-primary-light font-thin">
          Experience next level marketing solution by promoting products on
          social media
        </p>
        <NavLink to="/user/promote-and-earn">
          <p className="px-6 py-3 bg-primary-light rounded-lg cursor-pointer hover:bg-primary-dark text-white w-fit ">
            Go to Products
          </p>
        </NavLink>
      </div>
      <div className="h-[10rem] w-[10rem]">
        <img
          className=""
          src={PermoteImg}
          alt="permotion side photos with heart and box"
        />
      </div>
    </div>
  );
}

export default PermoteCard;
