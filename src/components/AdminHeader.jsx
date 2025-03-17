import React from "react";
import GlobalClusterLogo from "./../assets/images/sidebarLogo.png";

function AdminHeader() {
  return (
    <div className="flex items-center justify-center gap-4 py-6 border-b h-auto bg-[#ffffff] ">
      <img
        className="w-20"
        src={GlobalClusterLogo}
        alt="Company Official Logo"
      />
      <p className="font-bold text-3xl text-primary-light">The Global Clusters</p>
    </div>
  );
}

export default AdminHeader;
