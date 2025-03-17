import React, { useEffect, useState } from "react";
import AdminHeader from "../../components/ui/AdminHeader.jsx";
import AdminDashboardHeader from "./../../components/ui/Header";
import RecruitmentStatistics from "../../components/ui/RecruitmentStatistics.jsx";
import BonusStatistic from "../../components/BonusStatistic.jsx";
import NewMember from "../../components/NewMember.jsx";
import { convertStandardDate } from "../../lib/utils.js";
import UserImg from "../../assets/images/userImg.png";
import { useNavigate } from "react-router-dom";
import {
  useGetUsersMutation,
  useGetAdminDashboardQuery,
} from "../../features/user/userApiSlice";
import TopRecruiters from "../../components/TopRecruiters.jsx";
import TopEarners from "../../components/TopEarners.jsx";

function Dashboard() {
  const [newMembers, setNewMembers] = useState([]);
  const navigate = useNavigate();
  const {
    data: adminData = {},
    error,
    isLoading,
  } = useGetAdminDashboardQuery();

  const [getUsers] = useGetUsersMutation();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers().unwrap();
        setNewMembers(response);
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
  }, [getUsers]);
  const recruitmentData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  };

  return (
    <div className="bg-gray-50 p-6">
      <AdminDashboardHeader />
      <AdminHeader data={adminData} />
      <div className="grid grid-cols-3 gap-6">
        <div className="flex-1 bg-white p-6 flex flex-col gap-20 rounded-md">
          <p className="font-semibold">Top Recruiters</p>
          <div className="flex flex-col gap-3">
            {newMembers
              ? newMembers
                  .slice(0, 5)
                  .map((user, index) => (
                    <TopRecruiters
                      key={index}
                      memberName={`${user?.name}` || ""}
                      userName={user?.name || ""}
                      recruits={10}
                      img={
                        user?.profile_picture ||
                        user?.profile?.profile_picture ||
                        UserImg
                      }
                    />
                  ))
              : null}
          </div>
        </div>
        <div className="flex-1 bg-white p-6 flex flex-col gap-20 rounded-md">
          <p className="font-semibold">Top Earners</p>
          <div className="flex flex-col gap-3">
            {newMembers
              ? newMembers
                  .slice(0, 5)
                  .map((user, index) => (
                    <TopEarners
                      key={index}
                      memberName={`${user?.name}` || ""}
                      userName={user?.name || ""}
                      amount={0.0}
                      img={
                        user?.profile_picture ||
                        user?.profile?.profile_picture ||
                        UserImg
                      }
                    />
                  ))
              : null}
          </div>
        </div>
        <div className="flex-1 bg-white p-6 flex flex-col gap-20 rounded-md">
          <p className="font-semibold">New Members</p>
          <div className="flex flex-col gap-3">
            {newMembers
              ? newMembers
                  .slice(0, 5)
                  .map((user, index) => (
                    <NewMember
                      key={index}
                      memberName={`${user?.name}` || ""}
                      userName={user?.name || ""}
                      date={convertStandardDate(user?.date_joined) || ""}
                      img={
                        user?.profile_picture ||
                        user?.profile?.profile_picture ||
                        UserImg
                      }
                    />
                  ))
              : null}
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-5 gap-6">
        <BonusStatistic
          iconBgColor="green"
          purpose="Direct Referral Bonus"
          amount={adminData?.drb_total ?? 0}
        />
        <BonusStatistic
          iconBgColor="pink"
          purpose="Matching Bonus"
          amount={adminData?.mb_total ?? 0}
        />
        <BonusStatistic
          iconBgColor="orange"
          purpose="Stair Step Bonus"
          amount={adminData?.ss_total ?? 0}
        />
        <BonusStatistic
          iconBgColor="green"
          purpose="Board Breaker Bonus"
          amount={adminData?.bb_total ?? 0}
        />
        <BonusStatistic
          iconBgColor="green"
          purpose="Promote and Earn Bonus"
          amount={adminData?.pae_total ?? 0}
        />
      </div>

      <div className="flex flex-col gap-10 p-6 rounded-md bg-white">
        <div className="flex justify-between items-center">
          <p>Recruitment Statistics</p>
        </div>
        <RecruitmentStatistics data={recruitmentData} />
      </div>
    </div>
  );
}

export default Dashboard;
