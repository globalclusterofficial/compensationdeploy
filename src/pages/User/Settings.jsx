import React, { useState, useEffect } from "react";
import ActiveTab from "../../components/ui/ActiveTab";
import ContactDetailsForm from "../../components/ui/ContactDetailsForm";
import BusinessDashboardHeader from "../../components/ui/Header";
import PersonalDetailsForm from "../../components/ui/PersonalDetailsForm";
import SecurityDetailsForm from "../../components/ui/SecurityDetailsForm";
import UserCredentials from "../../components/UserCredentials";
import BankDetailForm from "./../../components/BankDetailForm";
import PaymentSettings from "./../../components/PaymentSettings";
import { useGetIndividualsMutation } from "../../features/user/userApiSlice";

function Settings() {
  const [activeTab, setActiveTab] = useState("Personal Details");
  const [userData, setUserData] = useState({});
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  const [getUser] = useGetIndividualsMutation();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUser().unwrap();
        setUserData(response[0]);
      } catch (error) {
        if (error.response) {
          console.error("Server Error:", JSON.stringify(error.response));
        } else if (error.request) {
          console.error("Network Error:", error.message);
        } else {
          console.error("Error:", error.message);
        }
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className=" bg-gray-50">
      <BusinessDashboardHeader />
      <UserCredentials />
      <section className="px-10 py-20 mx-14 my-6 shadow-[0_0_10px_rgba(0,0,0,0.1)] bg-white">
        {userData?.name ? (
          <>
            <ActiveTab
              handleTabClick={handleTabClick}
              activeTab={activeTab}
              businessTab="false"
              adminTab={false}
            />
            {activeTab === "Personal Details" && (
              <PersonalDetailsForm userData={userData} />
            )}
            {activeTab === "Contact Details" && (
              <ContactDetailsForm userData={userData} />
            )}
            {activeTab === "Security" && <SecurityDetailsForm />}
            {activeTab === "Bank Details" && (
              <BankDetailForm userData={userData} />
            )}{" "}
            {activeTab === "Payment Settings" && (
              <PaymentSettings userData={userData} />
            )}{" "}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </div>
  );
}

export default Settings;
