import React, { useState, useEffect } from "react";
import ActiveTab from "../../components/ui/ActiveTab";
import ContactDetailsForm from "../../components/ui/ContactDetailsForm";
import BusinessDashboardHeader from "../../components/ui/Header";
import PersonalDetailsForm from "../../components/ui/PersonalDetailsForm";
import SecurityDetailsForm from "../../components/ui/SecurityDetailsForm";
import UserCredentials from "../../components/UserCredentials";
import BankDetailForm from "./../../components/BankDetailForm";
import PaymentSettings from "./../../components/PaymentSettings";
import { useFetchUserQuery } from "../../features/user/userApiSlice";

function Settings() {
  const [activeTab, setActiveTab] = useState("Personal Details");
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  const { data: userData = {} } = useFetchUserQuery();

  return (
    <div className="flex flex-col gap-4 bg-gray-50">
      <BusinessDashboardHeader />
      <UserCredentials adminPage userData={userData} nonUser={true} />
      <section className="px-10 py-20 mx-14 my-6 shadow-[0_0_10px_rgba(0,0,0,0.1)] bg-white">
        {userData?.name ? (
          <>
            <ActiveTab
              handleTabClick={handleTabClick}
              activeTab={activeTab}
              adminTab={true}
            />
            {activeTab === "Personal Details" && (
              <PersonalDetailsForm userData={userData} />
            )}
            {activeTab === "Contact Details" && (
              <ContactDetailsForm userData={userData} />
            )}
            {activeTab === "Security" && <SecurityDetailsForm />}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </div>
  );
}

export default Settings;
