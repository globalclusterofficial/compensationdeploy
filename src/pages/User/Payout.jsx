import React, { useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import Filter from "../../components/ui/Filter";
import BusinessDashboardHeader from "../../components/ui/Header";
import PageDataHeader from "../../components/ui/PageDataHeader";
import TicketCard from "../../components/ui/TicketCard";
import { ModalContext } from "./../../App";
import AddPayout from "./../../components/AddPayout";
import Modal from "./../../components/Modal";
import Pagination from "./../../components/Pagination";
import TableData from "./../../components/ui/TableData";
import Notification from "./../../components/ui/Notification";
import { useUser } from "../../hooks/auth/useUser.js";
import {
  useGetIndividualsMutation,
  useGetPayoutsQuery,
} from "../../features/user/userApiSlice";

function Payout() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setPayoutData] = useState([]);
  const { showModal, setShowModal } = useContext(ModalContext);
  const { data: payoutInfo = {}, error, isLoading } = useGetPayoutsQuery();
  const payoutData = payoutInfo?.transaction_data ?? [];
  const available_balance = payoutInfo?.available_amount;
  const [userData, setUserData] = useState({});
  const [getUser] = useGetIndividualsMutation();
  const [notification, setNotification] = useState(null);
  const { user } = useUser();
  const itemsPerPage = 7;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const curentPayoutData = payoutData.slice(startIndex, endIndex);

  const requestedPayouts = payoutData.reduce((acc, currPayout) => acc + 1, 0);
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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUser().unwrap();
        setUserData(response[0]);
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
      <BusinessDashboardHeader />
      <main className="mx-10 my-10 pt-20  flex flex-col gap-10  rounded-md bg-white">
        <section className="px-12 flex flex-col lg:flex-row justify-between">
          <PageDataHeader name="Payout" to="Payout" />
          <Button
            btnText="Request Payout"
            onClick={() => setShowModal(!showModal)}
          />

          {showModal && (
            <Modal>
              <AddPayout
                CloseModalWindow={setShowModal}
                currentStatus={showModal}
                userData={userData}
                availableBalance={available_balance}
              />
            </Modal>
          )}
        </section>
        <section className=" p-10  bg-gray-50 overflow-x-auto rounded-xl m-5 lg:m-20 flex gap-8">
          <TicketCard name="Requested Payouts" numbers={requestedPayouts} />
          <TicketCard name="Approved Payouts" numbers={approvedPayouts} />
          <TicketCard name="Pending Payouts" numbers={pendingPayouts} />
          <TicketCard name="Rejected Payouts" numbers={rejectedPayouts} />
        </section>
        <section className="p-10 space-y-4">
          <div className="p-8 flex flex-col gap-10">
            <Filter
              data={payoutData}
              setProductFunction={setPayoutData}
              showDownload={true}
            />
          </div>

          <TableData
            type="payout"
            tableHeadNames={[
              "Reference Id",
              "Date",
              "Amount",
              "Status",
              "Action",
            ]}
            data={curentPayoutData}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(payoutData.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </section>
      </main>
    </div>
  );
}

export default Payout;
