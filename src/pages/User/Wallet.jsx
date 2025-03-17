import React, { useContext, useEffect, useState } from "react";
import BusinessDashboardHeader from "../../components/ui/Header";
import TicketCard from "../../components/ui/TicketCard";
import WalletCard from "../../components/WalletCard";
import TableData from "../../components/ui/TableData";
import {
  useGetPayoutsQuery,
  useGetAllEarningsQuery,
} from "../../features/user/userApiSlice";
import { ModalContext } from "../../App.jsx";
import { appendAttribute } from "jsdom/lib/jsdom/living/attributes.js";
import PageDataHeader from "../../components/ui/PageDataHeader.jsx";
import Button from "../../components/Button.jsx";
import Pagination from "../../components/Pagination";

function Wallet() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: payoutInfo = [], error, isLoading } = useGetPayoutsQuery();
  const payoutData = payoutInfo?.transaction_data ?? [];
  const earningsData = payoutInfo?.earning_data ?? [];
  const availableBalance = payoutInfo?.available_amount;
  const [notification, setNotification] = useState(null);
  const allData = [...payoutData, ...(earningsData ?? [])];

  const itemsPerPage = 10;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = allData.slice(startIndex, endIndex);

  const approvedTrx = allData.reduce((acc, currItem) => {
    return (currItem?.status && currItem.status.toLowerCase() === "approved") ||
      currItem?.status === undefined
      ? acc + 1
      : acc;
  }, 0);

  const pendingTrx = allData.reduce((acc, currItem) => {
    return currItem?.status && currItem.status.toLowerCase() === "pending"
      ? acc + 1
      : acc;
  }, 0);

  const rejectedTrx = allData.reduce((acc, currItem) => {
    return (currItem?.status && currItem.status.toLowerCase() === "declined") ||
      (currItem?.status && currItem.status.toLowerCase() === "rejected")
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
      <BusinessDashboardHeader />
      <main className=" my-10 p-2 shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-md bg-white">
        <section className="flex-1 p-2  bg-gray-50  rounded-xl mx-7 my-20 flex flex-col lg:flex-row gap-8">
          <WalletCard totalBalance={availableBalance} />
          <div className="flex lg:flex-row flex-wrap lg:flex-nowrap gap-8">
            <TicketCard
              name="Successfull Transactions"
              numbers={approvedTrx || 0}
            />
            <TicketCard name="Pending Transactions" numbers={pendingTrx || 0} />
            <TicketCard
              name="Declined Transactions"
              numbers={rejectedTrx || 0}
            />
          </div>
        </section>
        <div className="flex flex-col gap-4 py-20 px-2">
          <TableData
            type="wallet"
            data={currentData}
            tableHeadNames={[
              "Reference ID",
              "Date",
              "Description",
              "Amount",
              "Status",
              "Action",
            ]}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil((allData?.length || 0) / itemsPerPage)}
            onPageChange={handlePageChange}
            itemsPerPage={10}
          />
        </div>
      </main>
    </div>
  );
}

export default Wallet;
