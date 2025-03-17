import React, { useEffect, useState } from "react";
import UserDataTable from "../../components/UserDataTable";
import Header from "./../../components/ui/Header";
import Pagination from "../../components/Pagination";
import {
  useGetPendingUsersMutation,
  useGetNonPendingUsersMutation,
} from "../../features/user/userApiSlice";
import Filter from "../../components/ui/Filter.jsx";
import { BiSolidCoinStack, BiTime } from "react-icons/bi";

function AdminUserRegistrations() {
  const [currentPage, setCurrentPage] = useState(1);
  const [tabs, setTabs] = useState("requests");
  const [usersData, setUsersData] = useState([]);
  const [registrationHistory, setRegistrationHistory] = useState([]);
  const [getUsers] = useGetPendingUsersMutation();
  const [getRegistrationHistory] = useGetNonPendingUsersMutation();
  const itemsPerPage = 5;

  const totalPages = Math.ceil(usersData.length / itemsPerPage);
  const totalPagesHistory = Math.ceil(
    registrationHistory.length / itemsPerPage,
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedData = usersData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const paginatedHistory = registrationHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const pendingUsers = await getUsers().unwrap();
        const registrationHistory = await getRegistrationHistory().unwrap();
        setUsersData(pendingUsers);
        setRegistrationHistory(registrationHistory);
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
    <div className="bg-gray-50">
      <Header />
      <main className="bg-white m-20 p-10 rounded-lg">
        <h2 className="text-4xl font-semibold py-6">User Registrations</h2>
        <div className="flex justify-between items-center border-b border-gray-300 my-16">
          <div className="flex gap-8">
            <p
              className={`${
                tabs === "requests" ? "border-b-2 border-black" : ""
              } flex px-2 gap-2 items-center cursor-pointer font-semibold`}
              onClick={() => setTabs("requests")}
            >
              <BiSolidCoinStack />
              Registrations Request
            </p>
            <p
              className={`${
                tabs === "history" ? "border-b-2 border-black" : ""
              } flex px-2 gap-2 items-center cursor-pointer font-semibold`}
              onClick={() => setTabs("history")}
            >
              <BiTime />
              Registrations History
            </p>
          </div>
        </div>
        {tabs === "requests" && (
          <>
            <Filter
              data={usersData}
              setDataFunction={setUsersData}
              showDownload={true}
            />
            <div className="py-20 px-2">
              <UserDataTable
                type="default_admin"
                data={paginatedData}
                tableHeadNames={["User", "Sponsor", "Email", "Date", "Action"]}
              />
            </div>
            {itemsPerPage <= usersData.length && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
        {tabs === "history" && (
          <>
            <Filter
              data={registrationHistory}
              setDataFunction={setRegistrationHistory}
              showDownload={true}
            />
            <div className="py-20 px-2">
              <UserDataTable
                type="default_admin_history"
                data={paginatedHistory}
                tableHeadNames={[
                  "User",
                  "Sponsor",
                  "Email",
                  "Date",
                  "Status",
                  "Action",
                ]}
              />
            </div>
            {itemsPerPage <= registrationHistory.length && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPagesHistory}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default AdminUserRegistrations;
