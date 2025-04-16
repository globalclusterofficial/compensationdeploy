import React, { useState } from "react";
import { useUser } from "../hooks/auth/useUser";
import useProfilePicture from "../hooks/useProfilePic.js";
import useProfileDetails from "../hooks/useUserProfileDetails.js";
import PropTypes from "prop-types";
import { BASE_URL } from "../lib/constants";
import BusinessImg from "../assets/images/BusinessImg.png";
import { GoVerified } from "react-icons/go";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import Modal from "./Modal.jsx";
import PaymentProofModal from "./PaymentProofModal.jsx";
import { useGetUserProfileUnVerifyMutation } from "../features/user/userApiSlice.js";

const capitalizeFirstLetter = (string) => {
  if (!string) return string;
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const UserCredentials = ({ userData, adminPage, nonUser, business }) => {
  const profilePicture = useProfilePicture();
  // const profileDetails = useProfileDetails();
  const [selectUser, setSelectedUser] = useState(null);
  const [getUserProfileUnVerify] = useGetUserProfileUnVerifyMutation();

  const { user } = useUser();
  const fullName = adminPage ? userData?.name : user?.profile?.name || "";
  let image_url;
  if (business) {
    image_url = userData?.profile_picture
      ? userData?.profile_picture.includes("media")
        ? `${BASE_URL}/${userData?.profile_picture}`
        : `${BASE_URL}/media/${userData?.profile_picture}`
      : BusinessImg;
  } else {
    image_url =
      adminPage && userData?.profile_picture
        ? userData?.profile_picture.includes("media")
          ? `${BASE_URL}/${userData?.profile_picture}`
          : `${BASE_URL}/media/${userData?.profile_picture}`
        : profilePicture;
  }

  const removeVerification = () => {
    getUserProfileUnVerify(userData.id);
    window.location.reload();
  };

  return (
    <section className="px-10 mx-14 my-6 shadow-[0_0_10px_rgba(0,0,0,0.1)] ">
      <div className="p-6 flex flex-col lg:flex-row gap-10 items-center">
        <img
          className="w-[14rem] h-[14rem] border-2 rounded-lg"
          src={image_url}
          alt="Settings Page Business Logo"
        />
        <div className="flex flex-wrap gap-20 items-center text-2xl divide-x">
          <div className="flex flex-col gap-8 px-16 ">
            <p className="font-semibold">Name</p>
            <p className="text-gray-400">{fullName}</p>
            <p className="flex items-center gap-2">
              {fullName}
              {userData.is_verified && (
                <RiVerifiedBadgeFill className="fill-green-600 bg-green-600text-3xl" />
              )}
            </p>
          </div>
          {nonUser && (
            <div className="flex flex-col gap-8 px-16 ">
              <p className="font-semibold">Email</p>
              <p className="text-gray-400">{userData?.email}</p>
            </div>
          )}
          {!nonUser && (
            <>
              <div className="flex flex-col gap-8 px-16 ">
                <p className="font-semibold">Sponsor</p>
                <p className="text-gray-400">
                  {adminPage ? userData?.sponsor : user?.profile?.sponsor || ""}
                </p>
              </div>
              {!adminPage && (
                <div className="flex flex-col gap-8 px-16 ">
                  <p className="font-semibold">Placement</p>
                  <p className="text-gray-400">
                    {user?.profile?.user_id || ""}
                  </p>
                </div>
              )}
              <div className="flex flex-col gap-8 px-16 ">
                <p className="font-semibold">Membership Package</p>
                <p className="text-gray-400">
                  {capitalizeFirstLetter(
                    adminPage
                      ? userData?.membership_type
                      : user?.profile?.membership_type,
                  ) || ""}
                </p>
              </div>
              <div className="flex flex-col gap-8 px-16 ">
                <p className="font-semibold">Current Ranking</p>
                <p className="text-gray-400">
                  {capitalizeFirstLetter(
                    adminPage ? userData?.rank : user?.profile?.rank,
                  ) || ""}
                </p>
                {!!selectUser && (
                  <Modal>
                    <PaymentProofModal
                      user={selectUser}
                      setSelectedUser={setSelectedUser}
                    />
                  </Modal>
                )}
              </div>
              <div className="flex gap-4 ml-auto">
                <button
                  className="bg-primary-light text-white font-semibold w-fit mt-5
                      px-4 py-4 rounded-md flex items-center justify-center gap-4 hover:bg-primary-dark cursor-pointer select-none"
                  onClick={() => setSelectedUser(userData)}
                  disabled={user.is_verified}
                >
                  view receipt
                </button>
                {userData.is_verified && (
                  <button
                    className="bg-primary-light text-white font-semibold w-fit mt-5
                      px-4 py-4 rounded-md flex items-center justify-center gap-4 hover:bg-primary-dark cursor-pointer select-none"
                    onClick={() => removeVerification()}
                    disabled={user.is_verified}
                  >
                    remove verification
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

UserCredentials.propTypes = {
  userData: PropTypes.object,
  adminPage: PropTypes.bool,
  nonUser: PropTypes.bool,
  business: PropTypes.bool,
};

export default UserCredentials;
