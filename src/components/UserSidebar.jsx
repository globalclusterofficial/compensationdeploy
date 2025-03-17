import React, { useEffect, useState } from "react";
import { BiWalletAlt } from "react-icons/bi";
import { BsTicketPerforated } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { TbNotes } from "react-icons/tb";

import { PiChartPieSliceFill, PiSignOutFill } from "react-icons/pi";
import { NavLink, useNavigate } from "react-router-dom";
import SidebarLogo from "./SidebarLogo";
import { useDispatch } from "react-redux";
import { logoutAction } from "../features/auth/authSlice";

function UserSidebar() {
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
        <ul className="flex flex-col gap-6 p-5 lg:p-20 text-white">
          <NavLink
            to="/user/dashboard"
            className="py-4 px-8 hover:rounded-2xl hover:bg-[#24669e]"
          >
            <li className="flex gap-6 items-center">
              <PiChartPieSliceFill className="text-5xl" />
              <p>Dashboard</p>
            </li>
          </NavLink>
          <NavLink
            to="/user/register"
            className="py-4 px-8 hover:rounded-2xl hover:bg-[#24669e]"
          >
            <li className="flex gap-6 items-center ">
              <HiOutlineUsers className="text-5xl" />
              <p>Register Clusterians</p>
            </li>
          </NavLink>
          <NavLink
            to="/user/registrations"
            className="py-4 px-8 hover:rounded-2xl hover:bg-[#24669e]"
          >
            <li className="flex gap-6 items-center ">
              <HiOutlineUsers className="text-5xl" />
              <p>Registrations</p>
            </li>
          </NavLink>
          <NavLink
            to="/user/network"
            className="py-4 px-8 hover:rounded-2xl hover:bg-[#24669e]"
          >
            <li className="flex gap-6 items-center ">
              <HiOutlineUsers className="text-5xl" />
              <p>Network</p>
            </li>
          </NavLink>
          <NavLink
            to="/user/promote-and-earn"
            className="py-4 px-8 hover:rounded-2xl hover:bg-[#24669e]"
          >
            <li className="flex gap-6 items-center ">
              <TbNotes className="text-5xl" />
              <p>Promote & Earn</p>
            </li>
          </NavLink>
          <NavLink
            to="/user/wallet"
            className="py-4 px-8 hover:rounded-2xl hover:bg-[#24669e]"
          >
            <li className="flex gap-6 items-center ">
              <BiWalletAlt className="text-5xl" />
              <p>Wallet</p>
            </li>
          </NavLink>
          <NavLink
            to="/user/payout"
            className="py-4 px-8 hover:rounded-2xl hover:bg-[#24669e]"
          >
            <li className="flex gap-6 items-center ">
              <TbNotes className="text-5xl" />
              <p>Payout</p>
            </li>
          </NavLink>
          <NavLink
            to="/user/support-ticket"
            className="py-4 px-8 hover:rounded-2xl hover:bg-[#24669e]"
          >
            <li className="flex gap-6 items-center justify-start ">
              <BsTicketPerforated className="text-5xl" />
              <p>Support Ticket</p>
            </li>
          </NavLink>
          <NavLink
            to="/user/settings"
            className="py-4 px-8 hover:rounded-2xl hover:bg-[#24669e]"
          >
            <li className="flex gap-6 items-center ">
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

export default UserSidebar;
