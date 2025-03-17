import React, { useEffect, useState } from "react";
import RowData from "./RowData";
import UserImg from "./../assets/images/userImg.png";
import { GoArrowRight } from "react-icons/go";
import { useGetUsersMutation } from "../features/user/userApiSlice";

function TeamPerformance() {
  const [activeTab, setActiveTab] = useState("earners");
  const [topEarners, setTopEarners] = useState([]);
  const [topRecruiters, setTopRecruiters] = useState([]);
  const [getUsers] = useGetUsersMutation();
  useEffect(() => {
    const fetchEarners = async () => {
      try {
        const response = await getUsers().unwrap();
        const topThreeEarners = response.slice(0, 3);
        setTopEarners(topThreeEarners);
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
    const fetchRecruiters = async () => {
      try {
        const response = await getUsers().unwrap();
        const topThreeRecruiters = response.slice(0, 3);
        setTopRecruiters(topThreeRecruiters);
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
    if (activeTab === "earners") {
      fetchEarners();
    } else {
      fetchRecruiters();
    }
  }, [activeTab]);
  return (
    <div className="flex flex-col gap-8">
      <p className="font-semibold !text-2xl">Team Performance</p>
      <div className="border-b flex gap-6 p-2">
        <p
          className={`text-2xl cursor-pointer ${
            activeTab === "earners"
              ? "bg-primary-light text-white rounded-lg px-2"
              : ""
          }`}
          onClick={() => setActiveTab("earners")}
        >
          Top Earners
        </p>
        <p
          className={`text-2xl cursor-pointer ${
            activeTab === "recruiters"
              ? "bg-primary-light text-white rounded-lg px-2"
              : ""
          }`}
          onClick={() => setActiveTab("recruiters")}
        >
          Top Recruiters
        </p>
      </div>

      {activeTab === "earners" && (
        <div className="flex flex-col gap-8">
          {topEarners.map((earner, index) => (
            <RowData
              key={index}
              memberName={earner?.name || ""}
              userName={earner?.name || ""}
              img={earner?.profile_picture || UserImg}
            >
              <p className="px-6 font-bold text-primary-dark mb-4">
                {earner.amount}
              </p>
            </RowData>
          ))}
        </div>
      )}

      {activeTab === "recruiters" && (
        <div className="flex flex-col gap-8">
          {topRecruiters.map((recruiter, index) => (
            <RowData
              key={index}
              memberName={recruiter?.name || ""}
              userName={recruiter?.name || ""}
              img={recruiter?.profile_picture || UserImg}
            >
              <p className="px-6 font-bold text-white rounded-lg bg-primary-light mb-4">
                {recruiter.recruits || ""} Recruits
              </p>
            </RowData>
          ))}
        </div>
      )}

      <div className="flex gap-4 p-8 text-2xl items-center justify-center font-bold text-primary-light cursor-pointer">
        <GoArrowRight />
        <p>View All</p>
      </div>
    </div>
  );
}

export default TeamPerformance;
