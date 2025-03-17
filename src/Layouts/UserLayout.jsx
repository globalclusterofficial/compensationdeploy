import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UserSidebar from "./../components/UserSidebar";
import { useUser } from "../hooks/auth/useUser";

function UserLayout() {
  const { user, isAuthenticated } = useUser();

  const isIndividual = user?.user_type === "individual";
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !isIndividual) {
      navigate("/login");
    }
  }, [isAuthenticated, isIndividual, navigate]);

  if (!isAuthenticated || !isIndividual) {
    return null; // Prevent rendering the children if the user is not authenticated or not an admin
  }

  return (
    <div className="flex">
      <div className="bg-primary w-[22%] flex-col min-h-screen hidden lg:flex">
        <UserSidebar style={{ color: "#1F2937", fontSize: "1.5rem" }} />
      </div>
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default UserLayout;
