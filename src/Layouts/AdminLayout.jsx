import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "./../components/AdminSidebar";
import { useUser } from "../hooks/auth/useUser";

function AdminLayout() {
  const { user, isAuthenticated } = useUser();
  const isAdmin = user?.user_type === "admin";
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isAuthenticated || !isAdmin) {
  //     navigate("/admin-login");
  //   }
  // }, [isAuthenticated, isAdmin, navigate]);

  // if (!isAuthenticated || !isAdmin) {
  //   return null; // Prevent rendering the children if the user is not authenticated or not an admin
  // }

  return (
    <div className="flex">
      <div className="bg-primary w-[48rem] flex flex-col min-h-screen">
        <AdminSidebar style={{ color: "#1F2937", fontSize: "1.5rem" }} />
      </div>
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
