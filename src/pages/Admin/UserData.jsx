import AdminDashboardHeader from "./../../components/ui/Header";
import UserCredentials from "../../components/UserCredentials";
import { useParams } from "react-router-dom";
import BonusStatistic from "../../components/BonusStatistic";
import UserDataTable from "../../components/UserDataTable";
import Pagination from "../../components/Pagination";
import { useState, useEffect } from "react";
import { useGetUserDataAdminMutation } from "../../features/user/userApiSlice";
import TableData from "../../components/ui/TableData";

function UserData() {
  const params = useParams();
  const { userId } = params;
  const [getUserData] = useGetUserDataAdminMutation();
  const [userData, setUserData] = useState({});
  const earnings = userData?.user_earnings ?? [];
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEarnings = earnings.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserData(userId).unwrap();
        setUserData(response);
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
    fetchUserData();
  }, []);

  const directReferralBonus = earnings.reduce((acc, currentValue) => {
    return currentValue.earnings_type_id === 1
      ? currentValue.amount + acc
      : acc;
  }, 0);

  const matchingBonus = earnings.reduce((acc, currentValue) => {
    return currentValue.earnings_type_id === 2
      ? currentValue.amount + acc
      : acc;
  }, 0);

  const stairStepBonus = earnings.reduce((acc, currentValue) => {
    return currentValue.earnings_type_id === 3
      ? currentValue.amount + acc
      : acc;
  }, 0);

  const boardBreakerBonus = earnings.reduce((acc, currentValue) => {
    return currentValue.earnings_type_id === 4
      ? currentValue.amount + acc
      : acc;
  }, 0);

  const promoteBonus = earnings.reduce((acc, currentValue) => {
    return currentValue.earnings_type_id === 5
      ? currentValue.amount + acc
      : acc;
  }, 0);

  return (
    <div className="flex flex-col gap-4 bg-gray-50 px-10 py-14">
      {userData?.user_data ? (
        <>
          <AdminDashboardHeader />
          <UserCredentials userData={userData?.user_data} adminPage={true} />
          <div className="flex gap-3 px-14">
            <BonusStatistic
              iconBgColor="green"
              purpose="Direct Referal bonus"
              amount={directReferralBonus}
            />
            <BonusStatistic
              iconBgColor="pink"
              purpose="Matching bonus"
              amount={matchingBonus}
            />
            <BonusStatistic
              iconBgColor="orange"
              purpose="Stair Step bonus"
              amount={stairStepBonus}
            />
            <BonusStatistic
              iconBgColor="pink"
              purpose="Board Breaker bonus"
              amount={boardBreakerBonus}
            />
            <BonusStatistic
              iconBgColor="green"
              purpose="Promote & Earn bonus"
              amount={promoteBonus}
            />
          </div>
          <div className="flex flex-col gap-10 mt-5 px-14">
            <TableData
              type="earnings"
              data={currentEarnings}
              tableHeadNames={[
                "Reference ID",
                "Date",
                "Description",
                "Amount",
                "Action",
              ]}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(earnings.length / itemsPerPage)}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}

export default UserData;
