import React, { useEffect, useState } from "react";
import UserDataTable from "../../components/UserDataTable";
import Header from "./../../components/ui/Header";
import Pagination from "../../components/Pagination";
import {
  useGetPendingCompaniesMutation,
  useGetNonPendingCompaniesMutation,
} from "../../features/business/businessApiSlice";
import Filter from "../../components/ui/Filter";
import { BiTime, BiSolidCoinStack } from "react-icons/bi";

function BusinessRegistrations() {
  const [currentPage, setCurrentPage] = useState(1);
  const [tabs, setTabs] = useState("requests");
  const [businessesData, setBusinessesData] = useState([]);
  const [registrationHistory, setRegistrationHistory] = useState([]);
  const [getPendingBusiness] = useGetPendingCompaniesMutation();
  const [getRegistrationHistory] = useGetNonPendingCompaniesMutation();
  const itemsPerPage = 5;

  const totalPages = Math.ceil(businessesData.length / itemsPerPage);
  const totalPagesHistory = Math.ceil(
    registrationHistory.length / itemsPerPage,
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedData = businessesData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const paginatedHistory = registrationHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const pendingCompanies = await getPendingBusiness().unwrap();
        const registrationHistory = await getRegistrationHistory().unwrap();
        setBusinessesData(pendingCompanies);
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
    fetchBusinesses();
  }, []);
  return (
    <div className="bg-gray-50">
      <Header />
      <main className="bg-white m-20 p-10 rounded-lg">
        <h2 className="text-4xl font-semibold py-6">Business Registrations</h2>
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
              data={businessesData}
              setDataFunction={setBusinessesData}
              showDownload={true}
            />
            <div className="py-20 px-2">
              <UserDataTable
                type="company"
                data={paginatedData}
                tableHeadNames={["User", "Rc or BN", "Email", "Date", "Action"]}
              />
            </div>
            {itemsPerPage <= businessesData.length && (
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
                type="company_history"
                data={paginatedHistory}
                tableHeadNames={[
                  "User",
                  "Rc or BN",
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
export default BusinessRegistrations;
