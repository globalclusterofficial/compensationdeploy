import React, { useEffect, useState } from "react";
import { GoArrowRight, GoChevronDown } from "react-icons/go";
import BonusStatistic from "../../components/BonusStatistic";
import EarningCard from "../../components/EarningCard";
import NewMember from "../../components/NewMember";
import PermoteCard from "../../components/PermoteCard";
import Ranking from "../../components/Ranking";
import RefererStatisticsGraph from "../../components/RefererStatisticsGraph";
import TeamPerfomance from "../../components/TeamPerfomance";
import UserDashboardPayout from "../../components/UserDashboardPayout";
import UserImg from "./../../assets/images/userImg.png";
import UserDashboardHeader from "./../../components/ui/Header";
import { useUser } from "../../hooks/auth/useUser";
import {
  useGetUsersMutation,
  useGetUserEarningsQuery,
} from "../../features/user/userApiSlice";
import { convertStandardDate } from "../../lib/utils";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [newMembers, setNewMembers] = useState([]);
  const [selectedDate, setSelectedDate] = useState("today");
  const [bonuses, setBonuses] = useState({
    drBonus: 0,
    matchingBonus: 0,
    stairStepBonus: 0,
    boardBreakerBonus: 0,
    promoteEarnBonus: 0,
    totalBonus: 0,
  });

  const [getUsers] = useGetUsersMutation();
  const {
    data: earnings,
    isLoading,
    isError,
  } = useGetUserEarningsQuery({
    user_id: user?.profile?.user_id || "",
    date: selectedDate,
  });

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

  useEffect(() => {
    if (earnings) {
      setBonuses({
        drBonus: earnings.direct_referral_bonus || 0,
        matchingBonus: earnings.matching_bonus || 0,
        stairStepBonus: earnings.stairstep_bonus || 0,
        boardBreakerBonus: earnings.board_breaker_bonus || 0,
        promoteEarnBonus: earnings.promote_and_earn_bonus || 0,
        totalEarnings: earnings.total_earnings || 0,
      });
    }
  }, [earnings]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className="bg-gray-50 h-full w-full">
      <div className="bg-white">
        <UserDashboardHeader />
      </div>
      <main className="m-10 rounded-xl flex flex-col gap-4">
        <div className="p-10 flex flex-col gap-6 bg-white rounded-md">
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-3xl">
              Welcome {user?.profile?.first_name} {user?.profile?.last_name}
            </h2>
            <p>Dashboard Summary</p>
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            <EarningCard
              icon="icon"
              earnings="₦ 0"
              whichEarning="Total Earnings"
              rateIncDec="0% Increase"
              amount={earnings?.total_earnings || 0}
            />
            <EarningCard
              icon="icon"
              earnings="₦ 0"
              whichEarning="Today's Earnings"
              rateIncDec="0% Increase"
              amount={earnings?.selected_date_earnings || 0}
            />
            <PermoteCard />
          </div>
        </div>

        {/* Bonus Statistics  */}
        <div className="flex flex-col gap-4 bg-white p-8">
          <div className="flex justify-between items-center">
            <p>Bonus Statistics</p>
            <p className="flex gap-3 items-center justify-between p-2 border rounded-lg text-lg">
              <select
                className="appearance-none bg-transparent outline-none"
                value={selectedDate}
                onChange={handleDateChange}
              >
                <option value="all_time">All Time</option>
                <option value="last_7_days">Last 7 days</option>
                <option value="yesterday">Yesterday</option>
                <option value="today">Today</option>
              </select>
              <GoChevronDown />
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-3">
            <BonusStatistic
              iconBgColor="green"
              purpose="Direct Referal bonus"
              amount={earnings ? earnings["Direct Referral Bonus"] : 0}
            />
            <BonusStatistic
              iconBgColor="pink"
              purpose="Matching bonus"
              amount={earnings ? earnings["Matching Bonus"] : 0}
            />
            <BonusStatistic
              iconBgColor="orange"
              purpose="Stair Step bonus"
              amount={earnings ? earnings["Stairstep Bonus"] : 0}
            />
            <BonusStatistic
              iconBgColor="pink"
              purpose="Board Breaker bonus"
              amount={earnings ? earnings["Board Breaker Bonus"] : 0}
            />
            <BonusStatistic
              iconBgColor="green"
              purpose="Promote & Earn bonus"
              amount={earnings ? earnings["Promote and Earn Bonus"] : 0}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-7/12 flex flex-col gap-10 p-6 rounded-md bg-white">
            <div className="flex justify-between items-center">
              <p>Referrer Statistics</p>
            </div>
            <RefererStatisticsGraph />
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
            <div
              className="flex gap-4 p-8 text-2xl items-center justify-center font-bold text-primary-light cursor-pointer"
              onClick={() => navigate("/user/registrations")}
            >
              <GoArrowRight />
              <p>View All</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row p-8 gap-4">
          <div className="flex-1 bg-white p-8 rounded-md text-lg lg:text-lg">
            <TeamPerfomance />
          </div>
          <div className="flex-1 bg-white py-8 px-10 rounded-md text-lg lg:text-lg">
            <Ranking />
          </div>
          <div className="flex-1 bg-white py-8 px-10 rounded-md text-lg lg:text-lg">
            <UserDashboardPayout />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
