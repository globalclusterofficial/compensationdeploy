import PropTypes from "prop-types";
import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import UserImg from "./../assets/images/userProfile.png";
import Modal from "./Modal";
import ShowDetailComp from "./ShowDetailComp";
import { convertStandardDate } from "../lib/utils";
import ConfirmDeletion from "./ConfirmDeletion.jsx";
import {
  useRejectRegistrationMutation,
  useAcceptRegistrationMutation,
} from "../features/user/userApiSlice";
import {
  useAcceptCompanyRegistrationMutation,
  useRejectCompanyRegistrationMutation,
} from "../features/business/businessApiSlice";
import { useNavigate, NavLink } from "react-router-dom";
import { BASE_URL } from "../lib/constants";
import { PiTreeStructureDuotone } from "react-icons/pi";
import BusinessImg from "../assets/images/BusinessImg.png";

function UserDataTable({
  data = [],
  tableHeadNames,
  onDelete,
  onSuspend,
  onActivate,
  handleShowDetails,
  type = "default",
}) {
  const [showDetail, setShowDetail] = useState(false);
  const [userData, setUserData] = useState();
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [rejectUser] = useRejectRegistrationMutation();
  const [acceptUser, { isLoading: acceptUserLoading }] =
    useAcceptRegistrationMutation();
  const [rejectCompany] = useRejectCompanyRegistrationMutation();
  const [acceptCompany] = useAcceptCompanyRegistrationMutation();
  const navigate = useNavigate();
  const [processingId, setProcessingId] = useState("");
  async function handleShowUserDetails(user) {
    setUserData(user);
    setShowDetail(!showDetail);
  }

  function handleDelete(index) {
    setDeleteIndex(index);
    setConfirmDeletion(true);
  }

  function handleConfirmDelete() {
    if (deleteIndex !== null) {
      onDelete(deleteIndex);
      setConfirmDeletion(false);
      setDeleteIndex(null);
    }
  }

  function handleCancelDelete() {
    console.log("Delete is cancelled");
    setConfirmDeletion(false);
    setDeleteIndex(null);
  }

  async function handleAccept(userId) {
    try {
      setProcessingId(userId);
      if (type === "company") {
        await acceptCompany(userId).unwrap();
        navigate(0);
      } else {
        await acceptUser(userId).unwrap();
        navigate(0);
      }
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

  async function handleReject(userId) {
    try {
      if (type === "company") {
        await rejectCompany(userId).unwrap();
        navigate(0);
      } else {
        await rejectUser(userId).unwrap();
        navigate(0);
      }
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
    <div className="overflow-hidden overflow-x-auto rounded-t-xl rounded-l-xl rounded-r-xl border-t border-l border-r">
      {" "}
      <table className="w-full min-w-max text-xl">
        <thead className="rounded-t-xl">
          <tr className="bg-[#f9f9fc] rounded-t-xl">
            {tableHeadNames.map((item, index) => (
              <th
                className={`${index === 0 ? "flex gap-3" : "text-left"} p-6`}
                key={index}
              >
                {index === 0 && (
                  <input type="checkbox" id="products" name="products" />
                )}
                <p>{item}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {type === "downlineUser" &&
            data.map((user, index) => (
              <tr key={index} className="border-t border-b">
                <td className="flex gap-3 items-center p-6">
                  <input type="checkbox" id="products" name="products" />
                  <img
                    src={
                      user?.profile_picture &&
                      user?.profile_picture.includes(BASE_URL)
                        ? user?.profile_picture
                        : user?.profile_picture
                          ? `${BASE_URL}/media/${user?.profile_picture}`
                          : UserImg
                    }
                    className="p-4 w-[5rem]"
                    alt="userImg for Downline members table"
                  />

                  <div className="flex flex-col gap-2">
                    <p>{user.member}</p>
                    <p>{user.name}</p>
                  </div>
                </td>
                <td className="p-6">{user?.email}</td>
                <td className="p-6">{user?.position}</td>
                <td className="p-6">{user?.rank}</td>
              </tr>
            ))}

          {type === "company" &&
            data.map((user, index) => (
              <tr key={index} className="border-t border-b">
                <td className="flex gap-3 items-center p-6">
                  <input type="checkbox" id="products" name="products" />
                  <div className="p-2 bg-orange-200">
                    <img
                      className="w-10"
                      src={
                        user?.profile_picture
                          ? `${BASE_URL}/media/${user?.profile_picture}`
                          : UserImg
                      }
                      alt="product images for show off"
                    />
                  </div>
                  <p>{user?.name}</p>
                </td>
                <td className="p-6">{user?.company_registration_number}</td>
                <td className="p-6">{user?.email || "placeholder@hxl.com"}</td>
                <td className="p-6">
                  {convertStandardDate(user?.date_joined || new Date())}
                </td>
                <td className="flex gap-4">
                  <p
                    className="bg-green-100 text-green-500 flex justify-center px-2 rounded-lg w-fit cursor-pointer"
                    onClick={() => {
                      handleAccept(user.id);
                    }}
                  >
                    Accept
                  </p>
                  <p
                    className="bg-red-100 text-red-500 flex justify-center px-2 rounded-lg w-fit cursor-pointer"
                    onClick={() => {
                      handleReject(user.id);
                    }}
                  >
                    Decline
                  </p>
                </td>
              </tr>
            ))}
          {type === "company_history" &&
            data.map((user, index) => (
              <tr key={index} className="border-t border-b">
                <td className="flex gap-3 items-center p-6">
                  <input type="checkbox" id="products" name="products" />
                  <div className="p-2 bg-orange-200">
                    <img
                      className="w-10"
                      src={
                        user?.profile_picture
                          ? `${BASE_URL}/media/${user?.profile_picture}`
                          : UserImg
                      }
                      alt="product images for show off"
                    />
                  </div>
                  <p>{user?.name || `${user?.name}`}</p>
                </td>
                <td className="p-6">{user?.company_registration_number}</td>
                <td className="p-6">{user?.email}</td>
                <td className="p-6">{convertStandardDate(user?.date)}</td>
                <td className="p-6">
                  <p
                    className={`${
                      user.status === "active"
                        ? "bg-green-100 text-green-500"
                        : ""
                    } flex justify-center px-2 rounded-lg w-fit ${
                      user.status === "pending"
                        ? "bg-orange-100 text-orange-500"
                        : ""
                    } ${
                      user.status === "rejected"
                        ? "bg-red-100 text-red-500"
                        : null
                    }  ${
                      user.status === "approved"
                        ? "bg-green-100 text-green-500"
                        : null
                    }`}
                  >
                    {user?.status &&
                      user?.status?.charAt(0).toUpperCase() +
                        user?.status?.slice(1)}
                  </p>
                </td>
                <td className="p-6">
                  <p
                    className={`${
                      user.status === "rejected"
                        ? "bg-green-100 text-green-500"
                        : "bg-red-100 text-red-500"
                    } flex justify-center px-2 rounded-lg w-fit cursor-pointer`}
                    onClick={() => {
                      user?.status === "approved"
                        ? handleReject(user.id)
                        : handleAccept(user.id);
                    }}
                  >
                    {user?.status === "rejected" ? "Approve" : "Reject"}
                  </p>
                </td>
              </tr>
            ))}
          {type === "admin_manage_business" &&
            data.map((business, index) => (
              <tr key={index} className="border-t border-b">
                <td className="flex gap-3 items-center p-6">
                  <input type="checkbox" id="products" name="products" />
                  <div className="p-2 bg-orange-200">
                    <img
                      className="w-10"
                      src={business?.profile_picture || BusinessImg}
                      alt="product images for show off"
                    />
                  </div>
                  <p>{business?.name}</p>
                </td>
                <td className="p-6">{business?.email}</td>
                <td className="p-6">{business?.phone_number}</td>
                <td className="p-6">
                  {convertStandardDate(business?.date_joined || new Date())}
                </td>
                <td className="p-6">
                  <p
                    className={`${
                      business.is_active === "True"
                        ? "bg-green-100 text-green-500"
                        : ""
                    } flex justify-center px-2 rounded-lg w-fit ${
                      business.is_active === "False"
                        ? "bg-red-100 text-red-500"
                        : ""
                    }`}
                  >
                    {business?.is_active === "True" ? "Active" : "Inactive"}
                  </p>
                </td>
                <td className="p-6">
                  <div className="flex gap-4 items-center">
                    <NavLink
                      className="bg-green-100 text-green-500 flex justify-center px-2 rounded-lg w-fit cursor-pointer"
                      to={`${business?.user_id}`}
                    >
                      View
                    </NavLink>
                    <p
                      className="bg-orange-100 text-orange-500 flex justify-center px-2 rounded-lg w-fit cursor-pointer"
                      onClick={() =>
                        business.is_active === "True"
                          ? onSuspend(business?.user_id)
                          : onActivate(business?.user_id)
                      }
                    >
                      {business.is_active === "True" ? "Suspend" : "Activate"}
                    </p>
                    <p
                      className="bg-red-100 text-red-500 flex justify-center px-2 rounded-lg w-fit cursor-pointer"
                      onClick={() => handleDelete(business?.user_id)}
                    >
                      Delete
                    </p>
                  </div>
                </td>
              </tr>
            ))}

          {type === "admin_manage_rankings" &&
            data.map((rank, index) => (
              <tr key={index} className="border-t border-b">
                <td className="flex gap-3 items-center p-6">
                  <input type="checkbox" id="products" name="products" />
                  <div className="p-2 bg-orange-200">
                    <img
                      className="w-10"
                      src={rank.icon || UserImg}
                      alt="product images for show off"
                    />
                  </div>
                  <p>{rank.rank_level}</p>
                </td>
                <td className="p-6">{rank.rank_level}</td>
                <td className="p-6">{rank.name}</td>
                <td className="p-6">{rank.total_recruits || 0} </td>
                <td className="p-6">{rank.bonus}</td>
                <td className="p-6">
                  <p
                    className={`px-4 py-1 rounded-xl w-fit text-center ${
                      rank.status.toLowerCase() === "enabled"
                        ? "bg-green-100 text-green-500"
                        : null
                    } ${
                      rank.status.toLowerCase() === "disabled"
                        ? "bg-red-100 text-red-500"
                        : null
                    }  `}
                  >
                    {rank.status.charAt(0).toUpperCase() + rank.status.slice(1)}
                  </p>
                </td>
              </tr>
            ))}

          {type === "admin_manage_bonus" &&
            data.map((rank, index) => (
              <tr key={index} className="border-t border-b">
                <td className="flex gap-3 items-center p-6">{rank.id}</td>
                <td className="p-6">{rank.bonus_name}</td>
                <td className="p-6">
                  {convertStandardDate(rank?.created_on || new Date())}
                </td>
                <td className="p-6">{rank.amount}</td>
                <td className="p-6">
                  <p
                    className={`px-4 py-1 rounded-xl w-fit text-center ${
                      rank.status.toLowerCase() === "enabled"
                        ? "bg-green-100 text-green-500"
                        : null
                    } ${
                      rank.status.toLowerCase() === "disabled"
                        ? "bg-red-100 text-red-500"
                        : null
                    }  `}
                  >
                    {rank.status.charAt(0).toUpperCase() + rank.status.slice(1)}
                  </p>
                </td>
                {/*<td className="p-6">*/}
                {/*  <td className="flex gap-4">*/}
                {/*    <IoEyeOutline*/}
                {/*      style={{ fontSize: "1.5rem", cursor: "pointer" }}*/}
                {/*      onClick={() => handleShowProducts(user)}*/}
                {/*    />*/}
                {/*  </td>*/}
                {/*</td>*/}
              </tr>
            ))}

          {type === "admin_manage_users" &&
            data.map((user, index) => (
              <tr key={index} className="border-t border-b">
                <td className="flex gap-3 items-center p-6">
                  <input type="checkbox" id="products" name="products" />
                  <div className="p-2 bg-orange-200">
                    <img
                      className="w-10"
                      src={user?.profile_picture || UserImg}
                      alt="product images for show off"
                    />
                  </div>
                  <p>{`${user?.name}`}</p>
                </td>
                <td className="p-6">{user?.sponsor}</td>
                <td className="p-6">{user?.rank}</td>
                <td className="p-6">{user?.date_joined}</td>
                <td className="p-6">
                  <div className="ml-6 cursor-pointer">
                    <NavLink to={`${user.user_id}/tree`}>
                      <PiTreeStructureDuotone size={20} />
                    </NavLink>
                  </div>
                </td>
                <td className="p-6">
                  <p
                    className={`${
                      user.is_active === "True"
                        ? "bg-green-100 text-green-500"
                        : ""
                    } flex justify-center px-2 rounded-lg w-fit ${
                      user.is_active === "False"
                        ? "bg-red-100 text-red-500"
                        : ""
                    }`}
                  >
                    {user?.is_active === "True" ? "Active" : "Inactive"}
                  </p>
                </td>
                <td className="p-6">
                  <div className="flex gap-4 items-center">
                    <NavLink
                      className="bg-green-100 text-green-500 flex justify-center px-2 rounded-lg w-fit cursor-pointer"
                      to={`${user.user_id}/view`}
                    >
                      View
                    </NavLink>
                    <p
                      className="bg-orange-100 text-orange-500 flex justify-center px-2 rounded-lg w-fit cursor-pointer"
                      onClick={() =>
                        user.is_active === "True"
                          ? onSuspend(user?.user_id)
                          : onActivate(user?.user_id)
                      }
                    >
                      {user.is_active === "True" ? "Suspend" : "Activate"}
                    </p>
                    <p
                      className="bg-red-100 text-red-500 flex justify-center px-2 rounded-lg w-fit cursor-pointer"
                      onClick={() => handleDelete(user?.user_id)}
                    >
                      Delete
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          {type === "default_admin" &&
            data.map((user, index) => (
              <tr key={index} className="border-t border-b">
                <td className="flex gap-3 items-center p-6">
                  <input type="checkbox" id="products" name="products" />
                  <div className="p-2 bg-orange-200">
                    <img
                      className="w-10"
                      src={
                        user?.profile_picture
                          ? `${BASE_URL}/media/${user?.profile_picture}`
                          : UserImg
                      }
                      alt="product images for show off"
                    />
                  </div>
                  <p>{user?.name || `${user?.name}`}</p>
                </td>
                <td className="p-6">{user?.sponsor}</td>
                <td className="p-6">{user?.email}</td>
                <td className="p-6">{convertStandardDate(user?.date)}</td>
                <td className="flex gap-4">
                  <p
                    className="bg-green-100 text-green-500 flex justify-center px-2 rounded-lg w-fit cursor-pointer"
                    onClick={() => {
                      !acceptUserLoading && handleAccept(user.id);
                    }}
                  >
                    {acceptUserLoading && processingId === user.id
                      ? "processing.."
                      : "Accept"}
                  </p>
                  <p
                    className="bg-red-100 text-red-500 flex justify-center px-2 rounded-lg w-fit cursor-pointer"
                    onClick={() => {
                      handleReject(user.id);
                    }}
                  >
                    Decline
                  </p>
                </td>
              </tr>
            ))}
          {type === "default_admin_history" &&
            data.map((user, index) => (
              <tr key={index} className="border-t border-b">
                <td className="flex gap-3 items-center p-6">
                  <input type="checkbox" id="products" name="products" />
                  <div className="p-2 bg-orange-200">
                    <img
                      className="w-10"
                      src={
                        user?.profile_picture
                          ? `${BASE_URL}/media/${user?.profile_picture}`
                          : UserImg
                      }
                      alt="product images for show off"
                    />
                  </div>
                  <p>{user?.name || `${user?.name}`}</p>
                </td>
                <td className="p-6">{user?.sponsor}</td>
                <td className="p-6">{user?.email}</td>
                <td className="p-6">{convertStandardDate(user?.date)}</td>
                <td className="p-6">
                  <p
                    className={`${
                      user.status === "active"
                        ? "bg-green-100 text-green-500"
                        : ""
                    } flex justify-center px-2 rounded-lg w-fit ${
                      user.status === "pending"
                        ? "bg-orange-100 text-orange-500"
                        : ""
                    } ${
                      user.status === "rejected"
                        ? "bg-red-100 text-red-500"
                        : null
                    }  ${
                      user.status === "approved"
                        ? "bg-green-100 text-green-500"
                        : null
                    }`}
                  >
                    {user?.status &&
                      user?.status?.charAt(0).toUpperCase() +
                        user?.status?.slice(1)}
                  </p>
                </td>
                <td className="p-6">
                  <p
                    className={`${
                      user.status === "rejected"
                        ? "bg-green-100 text-green-500"
                        : "bg-red-100 text-red-500"
                    } flex justify-center px-2 rounded-lg w-fit cursor-pointer`}
                    onClick={() => {
                      user?.status === "approved"
                        ? handleReject(user.id)
                        : handleAccept(user.id);
                    }}
                  >
                    {user?.status === "rejected" ? "Approve" : "Reject"}
                  </p>
                </td>
              </tr>
            ))}
          {type === "default" &&
            data.map((user, index) => (
              <tr key={index} className="border-t border-b">
                <td className="flex gap-3 items-center p-6">
                  <input type="checkbox" id="products" name="products" />
                  <div className="p-2 bg-orange-200">
                    <img
                      className="w-10"
                      src={
                        user?.profile_picture &&
                        user?.profile_picture.includes(BASE_URL)
                          ? user?.profile_picture
                          : user?.profile_picture
                            ? `${BASE_URL}/media/${user?.profile_picture}`
                            : UserImg
                      }
                      alt="product images for show off"
                    />
                  </div>
                  <p>{user?.name || `${user?.name}`}</p>
                </td>
                {/* <td className="p-6">{user?.sponsor}</td> */}
                <td className="p-6">{user?.email}</td>
                <td className="p-6">
                  {convertStandardDate(user?.date_joined)}
                </td>
                <td className="p-6">
                  <p
                    className={`${
                      user.status === "active" || user.status === "approved"
                        ? "bg-green-100 text-green-500"
                        : ""
                    } flex justify-center px-2 rounded-lg w-fit ${
                      user.status === "pending"
                        ? "bg-orange-100 text-orange-500"
                        : ""
                    } ${
                      user.status === "decline" || user.status === "rejected"
                        ? "bg-red-100 text-red-500"
                        : null
                    }  ${
                      user.status === "approve"
                        ? "bg-green-100 text-green-500"
                        : null
                    }`}
                  >
                    {user?.status &&
                      user?.status?.charAt(0).toUpperCase() +
                        user?.status?.slice(1)}
                  </p>
                </td>
                <td className="flex pl-4 gap-4">
                  <IoEyeOutline
                    style={{ fontSize: "1.5rem", cursor: "pointer" }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {showDetail && (
        <Modal>
          <ShowDetailComp
            detail={userData}
            setShowDetail={setShowDetail}
            type="user"
          />
        </Modal>
      )}
      {confirmDeletion && (
        <Modal>
          <ConfirmDeletion
            notificationMsg="Are you sure you want to delete?"
            setConfirmDeletion={setConfirmDeletion}
            handleConfirmDelete={handleConfirmDelete}
            deleteIndex={deleteIndex}
            handleCancelDelete={handleCancelDelete}
          />
        </Modal>
      )}
    </div>
  );
}

UserDataTable.propTypes = {
  data: PropTypes.array,
  tableHeadNames: PropTypes.array,
  type: PropTypes.string,
  onDelete: PropTypes.func,
  onSuspend: PropTypes.func,
  onActivate: PropTypes.func,
  handleShowDetails: PropTypes.func,
};

export default UserDataTable;
