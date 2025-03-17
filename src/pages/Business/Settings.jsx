import React, { useState, useEffect } from "react";
import ActiveTab from "../../components/ui/ActiveTab";
import BusinessCredentials from "../../components/ui/BusinessCredentials";
import ContactDetailsForm from "../../components/ui/ContactDetailsForm";
import BusinessDashboardHeader from "../../components/ui/Header";
import PersonalDetailsForm from "../../components/ui/PersonalDetailsForm";
import SecurityDetailsForm from "../../components/ui/SecurityDetailsForm";
import { useGetBusinessMutation } from "../../features/business/businessApiSlice";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("Personal Details");
  const [userData, setUserData] = useState({});
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  console.log(userData);

  const [getUser] = useGetBusinessMutation();

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
    <div className="lg:flex lg:flex-col lg:gap-4 bg-gray-50">
      <BusinessDashboardHeader />
      <BusinessCredentials />

      <section className="lg:px-10 px-3 py-20 mx-7 lg:mx-14 my-6 shadow-[0_0_10px_rgba(0,0,0,0.1)] bg-white">
        <ActiveTab
          businessTab="true"
          adminTab={false}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        {userData?.name ? (
          <>
            {activeTab === "Personal Details" && (
              <PersonalDetailsForm userData={userData} business />
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
};

export default Settings;
