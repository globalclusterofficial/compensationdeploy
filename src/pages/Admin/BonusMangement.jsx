import React, { useEffect, useState } from "react";
import AdminDashboardHeader from "./../../components/ui/Header";
import Header from "./../../components/ui/Header";
import UserDataTable from "../../components/UserDataTable.jsx";
import { useGetEarningsTypesQuery } from "../../features/user/userApiSlice.js";
import Pagination from "../../components/Pagination.jsx";

function BonusMangement() {
  const {
    data: earningsTypesData,
    error,
    isLoading,
  } = useGetEarningsTypesQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentEarningTypes =
    earningsTypesData?.slice(startIndex, endIndex) || [];

  useEffect(() => {
    if (error) {
      if (error.response) {
        console.error("Server Error:", JSON.stringify(error.response));
      } else if (error.request) {
        console.error("Network Error:", error.message);
      } else {
        console.error("Error:", error.message);
      }
    }
  }, [error]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-50 h-full w-full">
      <div className="bg-white">
        <AdminDashboardHeader />
      </div>
      <div className="bg-gray-50">
        <Header />
        <main className="bg-white m-20 p-10 rounded-lg">
          <div className="py-20 px-20 flex flex-col gap-10">
            <div className="flex justify-between items-center">
              <h2 className="text-4xl font-semibold">Bonus Management</h2>
              {/*          <div*/}
              {/*            onClick={() => {*/}
              {/*              navigate("/admin/bonus/management/add");*/}
              {/*            }}*/}
              {/*            className="bg-primary-light text-white font-semibold w-fit*/}
              {/*px-4 py-4 rounded-md flex items-center justify-center gap-4 hover:bg-primary-dark cursor-pointer select-none"*/}
              {/*          >*/}
              {/*            <IoMdAdd />*/}
              {/*            <p>Add New</p>*/}
              {/*          </div>*/}
            </div>
            <div className="py-20 px-2">
              <UserDataTable
                data={currentEarningTypes}
                type="admin_manage_bonus"
                tableHeadNames={[
                  "S/N",
                  "Bonus Name",
                  "Created on",
                  "Amount",
                  "Status",
                  // "Action",
                ]}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(
                  (earningsTypesData?.length || 0) / itemsPerPage,
                )}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default BonusMangement;
