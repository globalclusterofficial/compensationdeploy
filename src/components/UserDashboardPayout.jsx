import React, { useEffect, useState } from "react";
import DollarImg from "./../assets/images/dollar.png";
import { useGetPayoutsQuery } from "../features/user/userApiSlice";

function UserDashboardPayout() {
  // const [payouts, setPayouts] = useState([]);
  const { data: payoutInfo = [], error, isLoading } = useGetPayoutsQuery();
  const payouts = payoutInfo?.transaction_data ?? [];
  useEffect(() => {
    const fetchPayout = async () => {
      try {
        const response = await payouts.unwrap();
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
    fetchPayout();
  }, [error]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <p className="font-semibold border-b pb-2 !text-2xl">Payout</p>
      <div className="mt-10">
        {payouts?.map((payout) => (
          <div
            key={payout.uuid}
            className="flex justify-between items-center border-b px-8 py-4"
          >
            <div className="flex gap-2 items-center justify-center">
              <img
                className="w-[5rem]"
                src={DollarImg}
                alt="user profile img"
              />
              <div className="flex flex-col gap-1 items-center justify-center">
                <p className="font-semibold capitalize">
                  {payout?.status || ""}
                </p>
              </div>
              <p
                className={`text-semibold ${
                  payout?.status === "Requested" && "text-primary-dark"
                }  ${payout?.status === "Approved" && "text-green-400"}  ${
                  payout?.status === "Rejected" && "text-green-400"
                }`}
              >
                {payout?.amount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDashboardPayout;
