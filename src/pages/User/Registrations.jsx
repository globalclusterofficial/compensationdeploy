import React, { useEffect, useState } from "react";
import UserDataTable from "../../components/UserDataTable";
import Header from "./../../components/ui/Header";
import Pagination from "../../components/Pagination";
import { useGetAllUsersMutation } from "../../features/user/userApiSlice";
import UserDataTableNew from "../../components/UserDataTableNew";

function Registrations() {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersData, setUsersData] = useState([]);
  const [getUsers] = useGetAllUsersMutation();
  const itemsPerPage = 5;

  const totalPages = Math.ceil(usersData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedData = usersData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers().unwrap();
        setUsersData(response);
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
  // console.log({paginatedData})
  return (
    <div className="bg-gray-50">
      <Header />
      <main className="bg-white m-8 lg:m-20 p-10 rounded-lg">
        <h2 className="text-4xl font-semibold">Registrations</h2>
        <div className="mt-3 p-0 lg:p-20">
          <UserDataTableNew
            type="default"
            data={paginatedData}
            tableHeadNames={[
              "User",
              // "Type",
              "Email",
              "Date",
              "Status",
              "Payment proof",
              "Action",
            ]}
          />
        </div>
        {itemsPerPage <= usersData.length && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>
    </div>
  );
}

export default Registrations;
