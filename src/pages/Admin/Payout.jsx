import React, { useState } from "react";
import Header from "./../../components/ui/Header";
import Filter from "../../components/ui/Filter.jsx";
import TicketCard from "../../components/ui/TicketCard.jsx";
import {
  useFetchBanksQuery,
  useGetPayoutsQuery,
} from "../../features/user/userApiSlice";
import TableData from "../../components/ui/TableData.jsx";
// import TableDataNew from "../../components/ui/TableDataNew";
import Pagination from "../../components/Pagination.jsx";
import Notification from "../../components/ui/Notification.jsx";
import PageDataHeader from "../../components/ui/PageDataHeader";
import { BiSolidCoinStack, BiTime } from "react-icons/bi";

function Payouts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [payoutDate, setPayoutDate] = useState([]);
  const [tabs, setTabs] = useState("requests");
  const { data: payoutData = [], error, isLoading } = useGetPayoutsQuery();
  console.log(payoutData);
  const { data: banksData = {} } = useFetchBanksQuery();
  const requestData = payoutData.filter(
    (payout) => payout.status === "pending",
  );
  const historyData = payoutData.filter(
    (payout) => payout.status !== "pending",
  );

  const itemsPerPage = 10;
  const [notification, setNotification] = useState(null);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const totalPages = Math.ceil(requestData.length / itemsPerPage);

  const curentPayoutRequests = requestData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const currentHistoryData = historyData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const approvedPayouts = payoutData.reduce((acc, currPayout) => {
    return currPayout.status.toLowerCase() === "approved" ? acc + 1 : acc;
  }, 0);
  const pendingPayouts = payoutData.reduce((acc, currPayout) => {
    return currPayout.status.toLowerCase() === "pending" ? acc + 1 : acc;
  }, 0);

  const rejectedPayouts = payoutData.reduce((acc, currPayout) => {
    return currPayout.status.toLowerCase() === "declined" ||
      currPayout.status.toLowerCase() === "rejected"
      ? acc + 1
      : acc;
  }, 0);

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return setNotification({
      message: "Error Loading Payouts",
      type: "error",
    });

  return (
    <div className="bg-gray-50">
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <Header />
      <main className="bg-white m-20 p-10 rounded-lg">
        <div className="flex justify-between items-center">
          <PageDataHeader name="Payout" to="payouts" />
        </div>
        <section className=" p-10  bg-gray-50  rounded-xl m-20 flex gap-8">
          <TicketCard name="Requested Payout" numbers={pendingPayouts} />
          <TicketCard name="Approved Payout" numbers={approvedPayouts} />
          <TicketCard name="Rejected Payout" numbers={rejectedPayouts} />
        </section>
        <div className="flex justify-between items-center border-b border-gray-300 my-16">
          <div className="flex gap-8">
            <p
              className={`${
                tabs === "requests" ? "border-b-2 border-black" : ""
              } flex px-2 gap-2 items-center cursor-pointer font-semibold`}
              onClick={() => setTabs("requests")}
            >
              <BiSolidCoinStack />
              Pending Payout
            </p>
            <p
              className={`${
                tabs === "history" ? "border-b-2 border-black" : ""
              } flex px-2 gap-2 items-center cursor-pointer font-semibold`}
              onClick={() => setTabs("history")}
            >
              <BiTime />
              Payout History
            </p>
          </div>
        </div>
        {tabs === "requests" && (
          <div className="py-5 px-2">
            <Filter
              data={payoutData}
              setDataFunction={setPayoutDate}
              showDownload={true}
            />
            <br />

            <TableData
              type="admin-payout"
              data={curentPayoutRequests}
              banksData={banksData?.data}
              tableHeadNames={[
                "User",
                "Reference ID",
                "Date",
                "Amount",
                "Action",
              ]}
            />
            <div className="mt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                itemsPerPage={10}
              />
            </div>
          </div>
        )}
        {tabs === "history" && (
          <div className="py-5 px-2">
            <Filter
              data={payoutData}
              setDataFunction={setPayoutDate}
              showDownload={true}
            />
            <br />

            <TableData
              type="admin-payout-history"
              data={currentHistoryData}
              banksData={banksData?.data}
              tableHeadNames={[
                "User",
                "Reference ID",
                "Date",
                "Amount",
                "Status",
                "Action",
              ]}
            />
            <div className="mt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                itemsPerPage={10}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Payouts;
