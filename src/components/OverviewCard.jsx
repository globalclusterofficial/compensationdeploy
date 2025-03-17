import PropTypes from "prop-types";
import React from "react";

function OverviewCard({ type, data }) {
  if (type === "sponsorAndMembershipInfo") {
    return (
      <div className="bg-white p-10 text-gray-500">
        <div className="flex flex-col gap-10">
          <p className="border px-8 py-6 rounded-lg bg-gray-50">
            Sponsor And Membership Package
          </p>
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 ">
              <div className="flex flex-col gap-3">
                <p className="font-semibold">Membership Package</p>
                <p className="text-lg">{data?.membership_package}</p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="font-semibold">Sponsor</p>
                <p className="text-lg">{data?.sponsor}</p>
              </div>
            </div>
            {/* 2nd */}
            <div className="grid grid-cols-2 ">
              <div className="flex flex-col gap-3">
                <p className="font-semibold">Price</p>
                <p className="text-lg">₦{data?.price}</p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="font-semibold">Commision</p>
                <p className="text-lg">₦{data?.commision}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "ContactInfo") {
    return (
      <div className="bg-white p-10 text-gray-500">
        <div className="flex flex-col gap-10">
          <p className="border px-8 py-6 rounded-lg bg-gray-50">
            Contact Information
          </p>
          <div className="bg-white p-6 rounded-lg ">
            <div className="flex flex-wrap justify-between gap-y-6">
              <div className="w-1/3">
                <p className="font-semibold">First Name</p>
                <p className="text-lg">{data?.first_name}</p>
              </div>
              <div className="w-1/3">
                <p className="font-semibold ">Last Name</p>
                <p className="text-lg">{data?.last_name}</p>
              </div>
              <div className="w-1/3">
                <p className="font-semibold ">Address</p>
                <p className="text-lg">{data?.address}</p>
              </div>
              <div className="w-1/3">
                <p className="font-semibold ">Gender</p>
                <p className="text-lg">{data?.gender}</p>
              </div>
              <div className="w-1/3">
                <p className="font-semibold ">Email Address</p>
                <p className="text-lg">{data?.email}</p>
              </div>
              <div className="w-1/3">
                <p className="font-semibold ">Country</p>
                <p className="text-lg">{data?.country}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "loginInfo") {
    return (
      <div className="bg-white p-10 text-gray-500">
        <div className="flex flex-col gap-10">
          <p className="border px-8 py-6 rounded-lg bg-gray-50">
            Login Information
          </p>
          <div className="flex flex-col lg:flex-row p-6 w-4/6 justify-between ">
            <div>
              <p className="font-semibold">Username</p>
              <p className="text-xl">{data?.username}</p>
            </div>
            <div>
              <p className="font-semibold">Password</p>
              <p className="text-xl"> **********</p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Please give a Type to use that component</div>;
  }
}

OverviewCard.propTypes = {
  type: PropTypes.string,
  data: PropTypes.object,
};

export default OverviewCard;
