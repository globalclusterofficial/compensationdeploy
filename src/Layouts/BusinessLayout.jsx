import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import BusinesSidebar from "../components/BusinesSidebar";
import { useUser } from "../hooks/auth/useUser";

function BusinessLayout() {
  const { user, isAuthenticated } = useUser();
  const isBusiness = user?.user_type === "company";
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated || !isBusiness) {
      navigate("/login");
    }
  }, [isAuthenticated, isBusiness, navigate]);

  if (!isAuthenticated || !isBusiness) {
    return null;
  }

  return (
    <div className="flex">
      <div className="bg-primary w-[22%] flex-col min-h-screen hidden lg:flex">
        <BusinesSidebar style={{ color: "#1F2937", fontSize: "1.5rem" }} />
      </div>

      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default BusinessLayout;
