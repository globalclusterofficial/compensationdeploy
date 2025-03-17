import AdminDashboardHeader from "./../../components/ui/Header";
import React, { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";

import TableData from "../../components/ui/TableData";

import TicketCard from "./../../components/ui/TicketCard";

import {
  useDeleteTicketMutation,
  useTicketMutation,
  useTicketsMutation,
} from "../../features/ticket/ticketApiSlice";
import Modal from "../../components/Modal.jsx";
import EditTicket from "../../components/EditTicket.jsx";

function SupportTicket() {
  const [currentPage, setCurrentPage] = useState(1);
  const [ticketsData, setTicketsData] = useState([]);
  const [tickets] = useTicketsMutation();
  const [ticket] = useTicketMutation();
  const [deleteTicket] = useDeleteTicketMutation();
  const [showTicketDetail, setShowTicketDetail] = useState(false);
  const [showEditTicket, setShowEditTicket] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await tickets().unwrap();

        setTicketsData(response);
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
    fetchTickets();
  }, [tickets]);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(ticketsData.length / itemsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const paginatedData = ticketsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const sumTickets = ticketsData.length;
  const countTicketsByProgress = (status) => {
    return ticketsData.filter((ticket) => ticket.progress === status).length;
  };
  const resolvedTickets = countTicketsByProgress("resolved");
  const progressTickets = countTicketsByProgress("progress");

  async function handleDelete(ticketId) {
    try {
      await deleteTicket(ticketId).unwrap();
      const updatedTickets = ticketsData.filter(
        (ticket) => ticket.uuid !== ticketId,
      );
      setTicketsData(updatedTickets);
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", JSON.stringify(error.response));
      } else if (error.request) {
        console.error("Network Error:", error.message);
      } else {
        console.error("Error:", error.message);
      }
    }
  }

  async function handleShowTicketDetails(ticketId) {
    try {
      const response = await ticket(ticketId).unwrap();
      setSelectedTicket(response);
      setShowTicketDetail(true);
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", JSON.stringify(error.response));
      } else if (error.request) {
        console.error("Network Error:", error.message);
      } else {
        console.error("Error:", error.message);
      }
    }
  }

  async function handleReply(ticketId) {
    try {
      const response = await ticket(ticketId);
      setSelectedTicket(response);
      setShowEditTicket(true);
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", JSON.stringify(error.response));
      } else if (error.request) {
        console.error("Network Error:", error.message);
      } else {
        console.error("Error:", error.message);
      }
    }
  }

  return (
    <div className="bg-gray-50">
      <AdminDashboardHeader />
      <main className="mx-10 my-10  rounded-md bg-white">
        <section className="px-20 py-20 flex justify-between items-center">
          <p className="font-bold text-5xl">Support Center</p>
        </section>

        <section className=" p-10  bg-gray-50  rounded-xl m-20 flex gap-8">
          <TicketCard name="Total Tickets" numbers={sumTickets} />
          <TicketCard name="In Progress" numbers={sumTickets} />
          <TicketCard name="Critical" numbers={resolvedTickets} />
          <TicketCard name="New Tickets" numbers={progressTickets} />
        </section>
        <section className="p-10 space-y-20">
          <div className="p-8 flex flex-col gap-10">
            <TableData
              type="supportTicket"
              data={paginatedData}
              tableHeadNames={[
                "Subject",
                "Submitted By",
                "status",
                "Priority",
                "Last Reply",
                "Action",
              ]}
              userType="admin"
              handleShowProductDetails={(ticketId) =>
                handleShowTicketDetails(ticketId)
              }
              handleEdit={(ticketId) => handleReply(ticketId)}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />

            {showEditTicket && (
              <Modal>
                <EditTicket
                  detail={selectedTicket}
                  setEditDetail={setShowEditTicket}
                  item={selectedTicket}
                />
              </Modal>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default SupportTicket;
