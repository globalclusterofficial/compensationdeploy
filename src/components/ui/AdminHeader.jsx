import React from "react";
import { useUser } from "../../hooks/auth/useUser";
import TicketCard from "./TicketCard.jsx";
import PropTypes from "prop-types";

function AdminHeader({ data }) {
  const { user } = useUser();
  return (
    <div className="bg-primary text-white p-6">
      <h1 className="text-6xl font-bold">Welcome {user?.name}</h1>
      <p className="text-lg">Sales Summary</p>
      {data?.total_payment_received && (
        <div className="grid grid-cols-6 gap-5 mt-6 bg-white">
          <TicketCard
            name="Total Payment Received"
            numbers={
              data?.total_payment_received
                ? data?.total_payment_received.toLocaleString()
                : 0
            }
          />
          <TicketCard
            name="Total Withdrawals"
            numbers={
              data?.approved_withdrawals
                ? data?.approved_withdrawals.toLocaleString()
                : 0
            }
          />
          <TicketCard
            name="Pending Withdrawals"
            numbers={
              data?.pending_withdrawals
                ? data?.pending_withdrawals.toLocaleString()
                : 0
            }
          />
          <TicketCard name="Total Users" numbers={data?.total_users ?? 0} />
          <TicketCard name="Active Users" numbers={data?.active_users ?? 0} />
          <TicketCard
            name="Inactive Users"
            numbers={data?.inactive_users ?? 0}
          />
        </div>
      )}
    </div>
  );
}

AdminHeader.propTypes = {
  data: PropTypes.object,
};

export default AdminHeader;
