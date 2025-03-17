import React, { useEffect, useState } from "react";
import { PiChartPieSliceFill, PiSignOutFill } from "react-icons/pi";
import { NavLink, useNavigate } from "react-router-dom";

import { AiOutlineProduct } from "react-icons/ai";
import { BsTicketPerforated } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import SidebarLogo from "./SidebarLogo";
import { useDispatch } from "react-redux";
import { logoutAction } from "../features/auth/authSlice";

function BusinesSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signOut, setSignOut] = useState(false);

  const handleSignOut = () => {
    dispatch(logoutAction());
    setSignOut(true);
  };

  useEffect(() => {
    if (signOut) {
      navigate("/login");
    }
  }, [signOut, navigate]);
  return (
    <div className="flex  flex-col gap-6 items-center">
      <SidebarLogo />
      <nav>
        <ul className="flex flex-col gap-4 p-5 lg:p-20 text-white">
          <NavLink
            to="/business/dashboard"
            className="py-4 px-8 hover:rounded-2xl hover:bg-[#24669e]"
          >
            <li className="flex gap-6 items-center ">
              <PiChartPieSliceFill className="text-5xl" />
              <p>Dashboard</p>
            </li>
          </NavLink>
          <NavLink
            to="/business/products"
            className="py-4 px-8 hover:rounded-2xl hover:bg-[#24669e]"
          >
            <li className="flex gap-6 items-center">
              <AiOutlineProduct className="text-5xl" />
              <p>Products</p>
            </li>
          </NavLink>
          <NavLink
            to="/business/support-ticket"
            className="py-4 px-8 hover:rounded-2xl hover:bg-[#24669e]"
          >
            <li className="flex gap-6 items-center ">
              <BsTicketPerforated className="text-5xl" />
              <p>Support Ticket</p>
            </li>
          </NavLink>
          <NavLink
            to="/business/settings"
            className="py-4 px-8 hover:rounded-2xl hover:bg-[#24669e]"
          >
            <li className="flex gap-6 items-center justify-start ">
              <IoSettingsOutline className="text-5xl" />
              <p>Settings</p>
            </li>
          </NavLink>
          <NavLink
            to="/login"
            onClick={handleSignOut}
            className="py-4 px-8 hover:rounded-2xl hover:bg-[#24669e]"
          >
            <li className="flex gap-6 items-center ">
              <PiSignOutFill className="text-5xl" />
              <p>Sign Out</p>
            </li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
}

export default BusinesSidebar;
