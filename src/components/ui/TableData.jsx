import PropTypes from "prop-types";
import React, { useState } from "react";
import { GrEdit } from "react-icons/gr";
import { IoEyeOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConfirmDeletion from "../ConfirmDeletion";
import Modal from "../Modal";
import ShowDetailComp from "../ShowDetailComp";
import ProductImg from "./../../assets/images/productImg.png";
import {
  convertStandardDate,
  DecreaseDescription,
  imageUrl,
} from "../../lib/utils";
import EditProduct from "../EditProduct";
import TicketReply from "../TicketReply.jsx";
import { BASE_URL, FRONTEND_URL } from "../../lib/constants";
import {
  useApproveProductMutation,
  useDeclineProductMutation,
} from "../../features/product/productApiSlice";
import { useUpdatePayoutStatusMutation } from "../../features/user/userApiSlice";
import { useNavigate } from "react-router-dom";

function TableData({
  data = [],
  tableHeadNames = [],
  type = "default",
  onDelete,
  handleShowDetails,
  banksData,
  userType = "individual",
}) {
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [showEditDetail, setEditProductDetail] = useState(false);
  const [showReplyTicket, setShowReplyTicket] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [productDetail, setProductDetail] = useState({});
  const [userData, setUserData] = useState({});
  const [showDetail, setShowDetail] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [approveProduct] = useApproveProductMutation();
  const [declineProduct] = useDeclineProductMutation();
  const [updatePayout] = useUpdatePayoutStatusMutation();
  const navigate = useNavigate();

  async function handleShowUserDetails(user) {
    setUserData(user);
    setShowDetail(!showDetail);
  }

  async function handleAccept(productId) {
    try {
      await approveProduct(productId).unwrap();
      navigate(0);
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

  async function handleReject(productId) {
    try {
      await declineProduct(productId).unwrap();
      navigate(0);
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

  async function handlePayoutApproal(payoutId) {
    try {
      await updatePayout({ payoutId, status: "approved" }).unwrap();
      navigate(0);
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

  async function handlePayoutRejection(payoutId) {
    try {
      await updatePayout({ payoutId, status: "rejected" }).unwrap();
      navigate(0);
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

  async function handleShowProducts(item) {
    const data = await handleShowDetails(item.uuid);
    setProductDetail(data);
    setShowProductDetail(true);
  }

  async function handleEditItem(item) {
    const data = await handleShowDetails(item.uuid);
    setProductDetail(data);
    setEditProductDetail(true);
  }

  function handleReplyToTicket(ticketId) {
    setSelectedTicket(ticketId);
    setShowReplyTicket(true);
  }

  return (
    <div className="overflow-hidden rounded-t-xl rounded-l-xl rounded-r-xl border-t border-l border-r overflow-x-auto">
      <table className="w-full min-w-max text-xl">
        <thead className="rounded-t-xl bg-[#f9f9fc]">
          <tr>
            {tableHeadNames.map((item, index) => (
              <th
                key={index}
                className={`p-6 ${index === 0 ? "flex gap-3" : "text-left"}`}
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
          {type === "payout" &&
            data.map((item, index) => (
              <tr key={index} className="border-t border-b my-2">
                <td className="p-6 flex gap-3 items-center">
                  <input type="checkbox" id="products" name="products" />
                  <p>{item.id}</p>
                </td>
                <td className="p-6">{convertStandardDate(item.timestamp)}</td>
                <td className="p-6">{item.amount}</td>
                <td className="p-6">
                  <p
                    className={`${
                      item.status === "active"
                        ? "bg-green-100 text-green-500"
                        : ""
                    } flex justify-center px-2 rounded-lg w-fit ${
                      item.status === "pending"
                        ? "bg-orange-100 text-orange-500"
                        : ""
                    } ${
                      item.status === "rejected"
                        ? "bg-red-100 text-red-500"
                        : null
                    }  ${
                      item.status === "approved"
                        ? "bg-green-100 text-green-500"
                        : null
                    }`}
                  >
                    {item?.status &&
                      item?.status?.charAt(0).toUpperCase() +
                        item?.status?.slice(1)}
                  </p>
                </td>
                <td className="flex gap-4">
                  <IoEyeOutline
                    style={{ fontSize: "1.5rem", cursor: "pointer" }}
                    onClick={() => handleShowProducts(item)}
                  />
                </td>
              </tr>
            ))}
          {type === "admin-payout" &&
            data.map((item, index) => (
              <tr key={index} className="border-t border-b my-2">
                <td className="p-6 flex gap-3 items-center">
                  <input type="checkbox" id="products" name="products" />
                  <div className="p-2 bg-orange-200">
                    <img
                      src={
                        item?.user_picture
                          ? `${BASE_URL}/media/${item?.user_picture}`
                          : ProductImg
                      }
                      alt="User image"
                      className="w-10"
                    />
                  </div>
                  <p>{item.username}</p>
                </td>
                <td className="p-6">{item.id}</td>
                <td className="p-6">{convertStandardDate(item.timestamp)}</td>
                <td className="p-6">{item.amount}</td>
                <td className="flex gap-4">
                  <p
                    className="bg-blue-100 text-blue-500 flex justify-center px-2 rounded-lg w-fit cursor-pointer"
                    onClick={() => handleShowUserDetails(item)}
                  >
                    View
                  </p>
                  <p
                    className="bg-green-100 text-green-500 flex justify-center px-2 rounded-lg w-fit cursor-pointer"
                    onClick={() => {
                      handlePayoutApproal(item.id);
                    }}
                  >
                    Approve
                  </p>
                  <p
                    className="bg-red-100 text-red-500 flex justify-center px-2 rounded-lg w-fit cursor-pointer"
                    onClick={() => {
                      handlePayoutRejection(item.id);
                    }}
                  >
                    Reject
                  </p>
                </td>
              </tr>
            ))}
          {type === "admin-payout-history" &&
            data.map((item, index) => (
              <tr key={index} className="border-t border-b my-2">
                <td className="p-6 flex gap-3 items-center">
                  <input type="checkbox" id="products" name="products" />
                  <div className="p-2 bg-orange-200">
                    <img
                      src={
                        item?.user_picture
                          ? `${BASE_URL}/media/${item?.user_picture}`
                          : ProductImg
                      }
                      alt="User image"
                      className="w-10"
                    />
                  </div>
                  <p>{item.username}</p>
                </td>
                <td className="p-6">{item.id}</td>
                <td className="p-6">{convertStandardDate(item.timestamp)}</td>
                <td className="p-6">{item.amount}</td>
                <td className="p-6">
                  <p
                    className={`${
                      item.status === "active"
                        ? "bg-green-100 text-green-500"
                        : ""
                    } flex justify-center px-2 rounded-lg w-fit ${
                      item.status === "pending"
                        ? "bg-orange-100 text-orange-500"
                        : ""
                    } ${
                      item.status === "rejected"
                        ? "bg-red-100 text-red-500"
                        : null
                    }  ${
                      item.status === "approved"
                        ? "bg-green-100 text-green-500"
                        : null
                    }`}
                  >
                    {item?.status &&
                      item?.status?.charAt(0).toUpperCase() +
                        item?.status?.slice(1)}
                  </p>
                </td>
                <td className="p-6">
                  <p
                    className="bg-blue-100 text-blue-500 flex justify-center px-2 rounded-lg w-fit cursor-pointer"
                    onClick={() => handleShowUserDetails(item)}
                  >
                    View
                  </p>
                </td>
              </tr>
            ))}
          {type === "earnings" &&
            data.map((item, index) => (
              <tr key={index} className="border-t border-b my-2">
                <td className="p-6 flex gap-3 items-center">
                  <input type="checkbox" id="products" name="products" />
                  <p>{item?.uuid ?? item?.id}</p>
                </td>
                <td className="p-6">{convertStandardDate(item.date)}</td>
                <td className="p-6">{DecreaseDescription(item.description)}</td>
                <td className="p-6">{item.amount}</td>
                <td className="flex gap-4">
                  <IoEyeOutline
                    style={{ fontSize: "1.5rem", cursor: "pointer" }}
                    onClick={() => handleShowProducts(item)}
                  />
                </td>
              </tr>
            ))}
          {type === "wallet" &&
            data.map((item, index) => (
              <tr key={index} className="border-t border-b my-2">
                <td className="p-6 flex gap-3 items-center">
                  <input type="checkbox" id="products" name="products" />
                  <p>{item?.uuid ?? item?.id}</p>
                </td>
                <td className="p-6">
                  {item?.date
                    ? convertStandardDate(item.date)
                    : convertStandardDate(item.timestamp)}
                </td>
                <td className="p-6">
                  {item.description
                    ? DecreaseDescription(item.description)
                    : "Withdrawal"}
                </td>
                <td className="p-6">{item.amount}</td>
                <td className="p-6">
                  <p
                    className={`px-4 py-1 rounded-xl w-fit text-center  ${
                      item?.status && item.status.toLowerCase() === "approved"
                        ? "bg-green-100 text-green-500"
                        : null
                    } ${
                      item?.status && item.status.toLowerCase() === "declined"
                        ? "bg-red-100 text-red-500"
                        : null
                    }  ${
                      item?.status && item.status.toLowerCase() === "pending"
                        ? "bg-blue-100 text-blue-500"
                        : null
                    }                     
                    ${
                      item?.status === undefined
                        ? "bg-green-100 text-green-500"
                        : null
                    }`}
                  >
                    {item?.status ? item.status : "approved"}
                  </p>
                </td>
                <td className="flex gap-4">
                  <IoEyeOutline
                    style={{ fontSize: "1.5rem", cursor: "pointer" }}
                    onClick={() => handleShowProducts(item)}
                  />
                </td>
              </tr>
            ))}
          {type === "supportTicket" &&
            data.map((item, index) => (
              <tr key={index} className="border-t border-b my-2">
                {userType !== "admin" ? (
                  <>
                    <td className="p-6 flex gap-3 items-center">
                      <input type="checkbox" id="products" name="products" />
                      <a href="#" onClick={() => handleReplyToTicket(item)}>
                        <p>{item?.uuid.split("-")}</p>
                      </a>
                    </td>
                    <td className="p-6">
                      {convertStandardDate(item.date_created)}
                    </td>
                    <td className="p-6">
                      {convertStandardDate(item.date_updated)}
                    </td>
                    <td className="p-6">{item.title}</td>
                    <td className="p-6">
                      {item.status.charAt(0).toUpperCase() +
                        item.status.slice(1)}
                    </td>

                    <td className="p-6">
                      <p
                        className={`px-4 py-1 rounded-xl w-fit text-center ${
                          item.priority.toLowerCase() === "high"
                            ? "bg-red-100 text-red-500"
                            : item.priority.toLowerCase() === "medium"
                              ? "bg-blue-100 text-blue-500"
                              : item.priority.toLowerCase() === "low"
                                ? "bg-green-100 text-green-800"
                                : ""
                        }`}
                      >
                        {item.priority.charAt(0).toUpperCase() +
                          item.priority.slice(1)}
                      </p>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-6 flex gap-3 items-center">
                      <input type="checkbox" id="products" name="products" />
                      <p>{item?.uuid.split("-")}</p>
                    </td>
                    <td className="p-6">{item.submitted_by.name}</td>
                    <td className="p-6">{item.status}</td>
                    <td className="p-6">
                      {convertStandardDate(item.date_updated)}
                    </td>

                    <td className="p-6">
                      <p
                        className={`px-4 py-1 rounded-xl w-fit text-center ${
                          item.priority.toLowerCase() === "high"
                            ? "bg-red-100 text-red-500"
                            : item.priority.toLowerCase() === "medium"
                              ? "bg-blue-100 text-blue-500"
                              : item.priority.toLowerCase() === "low"
                                ? "bg-green-100 text-green-800"
                                : ""
                        }`}
                      >
                        {item.priority.charAt(0).toUpperCase() +
                          item.priority.slice(1)}
                      </p>
                    </td>
                  </>
                )}
                {type === "ranking" &&
                  data.map((item, index) => (
                    <tr key={index} className="border-t border-b my-2">
                      <td className="p-6">{item.rank_level}</td>
                      <td className="p-6">{item.name}</td>
                      <td className="p-6">{item.total_recruits}</td>
                      <td className="p-6">{item.bonus}</td>

                      <td className="p-6">
                        <p
                          className={`px-4 py-1 rounded-xl w-fit text-center ${
                            item.status.toLowerCase() === "enabled"
                              ? "bg-green-100 text-green-500"
                              : null
                          } ${
                            item.status.toLowerCase() === "disabled"
                              ? "bg-red-100 text-red-500"
                              : null
                          }  `}
                        >
                          {item.status.charAt(0).toUpperCase() +
                            item.status.slice(1)}
                        </p>
                      </td>
                      <td className="flex gap-4">
                        <IoEyeOutline
                          style={{ fontSize: "1.5rem", cursor: "pointer" }}
                          onClick={() => handleShowProducts(item)}
                        />
                      </td>
                    </tr>
                  ))}

                {userType === "admin" && (
                  <>
                    <td className="flex gap-4">
                      <GrEdit
                        style={{ fontSize: "1.5rem", cursor: "pointer" }}
                        onClick={() => handleReplyToTicket(item)}
                      />
                    </td>
                  </>
                )}
              </tr>
            ))}

          {type === "dashboard" &&
            data.map((item, index) => (
              <tr key={index} className="border-t border-b my-2">
                <td className="p-6 flex gap-3 items-center">
                  <input type="checkbox" id="products" name="products" />
                  <div className="p-2 bg-orange-200">
                    <img
                      src={item.product_image ? item.product_image : ProductImg}
                      alt="product images for show off"
                      className="w-10"
                    />
                  </div>
                  <p>{item.product_name}</p>
                </td>
                <td className="p-6">{DecreaseDescription(item.description)}</td>
                <td className="p-6">{item.shares}</td>
                <td className="p-6">{item.traffic}</td>
                <td className="p-6">
                  <p
                    className={`px-4 py-1 rounded-lg w-fit text-center ${
                      item.status === "Active"
                        ? "bg-green-100 text-green-500"
                        : item.status === "Pending"
                          ? "bg-blue-100 text-blue-500"
                          : "bg-red-100 text-red-500"
                    }`}
                  >
                    {item.status}
                  </p>
                </td>
                <td className="flex gap-4">
                  <IoEyeOutline
                    style={{ fontSize: "1.7rem", cursor: "pointer" }}
                    onClick={() => handleShowProducts(item)}
                  />
                </td>
              </tr>
            ))}
          {type === "products_request" &&
            data.map((item, index) => (
              <tr key={index} className="border-t border-b my-2">
                <td className="p-6 flex gap-3 items-center">
                  <input type="checkbox" id="products" name="products" />
                  <div className="p-2 bg-orange-200">
                    <img
                      src={
                        item?.product_image
                          ? `${BASE_URL}/media/${item?.product_image}`
                          : ProductImg
                      }
                      alt="product images for show off"
                      className="w-10"
                    />
                  </div>
                  <p>{item.product_name}</p>
                </td>
                <td className="p-6">{item.company_name}</td>
                <td className="p-6">{DecreaseDescription(item.description)}</td>
                <td className="p-6">{item.product_link}</td>
                <td className="p-6">
                  <div className="flex gap-4 items-center">
                    <p
                      className="bg-green-100 text-green-500 flex justify-center px-2 rounded-lg w-fit cursor-pointer"
                      onClick={() => handleShowProducts(item)}
                    >
                      View
                    </p>
                    <p
                      className="bg-orange-100 text-orange-500 flex justify-center px-2 rounded-lg w-fit cursor-pointer"
                      onClick={() => handleAccept(item.uuid)}
                    >
                      Approve
                    </p>
                    <p
                      className="bg-red-100 text-red-500 flex justify-center px-2 rounded-lg w-fit cursor-pointer"
                      onClick={() => handleReject(item.uuid)}
                    >
                      Decline
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          {type === "company_product" &&
            data.map((item, index) => (
              <tr key={index} className="border-t border-b my-2">
                <td className="p-6 flex gap-3 items-center">
                  <input type="checkbox" id="products" name="products" />
                  <div className="p-2 bg-orange-200">
                    <img
                      src={
                        item?.product_image &&
                        item?.product_image.includes(BASE_URL)
                          ? item?.product_image
                          : item?.product_image
                            ? `${BASE_URL}/media/${item?.product_image}`
                            : ProductImg
                      }
                      alt="product images for show off"
                      className="w-10"
                    />
                  </div>
                  <p>{item.product_name}</p>
                </td>
                <td className="p-6">{DecreaseDescription(item.description)}</td>
                <td className="p-6">{item.shares}</td>
                <td className="p-6">{item.traffic}</td>
                <td className="p-6">
                  <p
                    className={`px-4 py-1 rounded-lg w-fit text-center ${
                      item.status === "active"
                        ? "bg-green-100 text-green-500"
                        : item.status === "pending"
                          ? "bg-blue-100 text-blue-500"
                          : "bg-red-100 text-red-500"
                    }`}
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </p>
                </td>
                <div className="p-6">
                  <div className="flex gap-3">
                    <a
                      className="bg-green-100 text-green-500 flex justify-center px-2 rounded-lg w-fit cursor-pointer"
                      href={`${FRONTEND_URL}/product/${item.uuid}`}
                    >
                      View
                    </a>
                    <p
                      className="bg-blue-100 text-blue-500 flex justify-center px-2 rounded-lg w-fit cursor-pointer"
                      onClick={() => handleEditItem(item)}
                    >
                      Edit
                    </p>
                    <p
                      className="bg-red-100 text-red-500 flex justify-center px-2 rounded-lg w-fit cursor-pointer"
                      onClick={() => handleDelete(item.uuid)}
                    >
                      Delete
                    </p>
                  </div>
                </div>
              </tr>
            ))}
          {type === "default" &&
            data.map((item, index) => (
              <tr key={index} className="border-t border-b my-2">
                <td className="p-6 flex gap-3 items-center">
                  <input type="checkbox" id="products" name="products" />
                  <div className="p-2 bg-orange-200">
                    <img
                      src={
                        item?.product_image &&
                        item?.product_image.includes(BASE_URL)
                          ? item?.product_image
                          : item?.product_image
                            ? `${BASE_URL}/media/${item?.product_image}`
                            : ProductImg
                      }
                      alt="product images for show off"
                      className="w-10"
                    />
                  </div>
                  <p>{item.product_name}</p>
                </td>
                <td className="p-6">{item.company_name}</td>
                <td className="p-6">{DecreaseDescription(item.description)}</td>
                <td className="p-6">{item.product_link}</td>
                <td className="p-6">
                  <p
                    className={`px-4 py-1 rounded-lg w-fit text-center ${
                      item.status === "active"
                        ? "bg-green-100 text-green-500"
                        : item.status === "pending"
                          ? "bg-blue-100 text-blue-500"
                          : "bg-red-100 text-red-500"
                    }`}
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </p>
                </td>
                <div className="p-6">
                  <div className="flex gap-3">
                    <a
                      className="bg-green-100 text-green-500 flex justify-center px-2 rounded-lg w-fit cursor-pointer"
                      href={`${FRONTEND_URL}/product/${item.uuid}`}
                    >
                      View
                    </a>
                    <p
                      className="bg-red-100 text-red-500 flex justify-center px-2 rounded-lg w-fit cursor-pointer"
                      onClick={() => handleDelete(item.uuid)}
                    >
                      Delete
                    </p>
                  </div>
                </div>
              </tr>
            ))}
          {type === "business-products" &&
            data.map((item, index) => (
              <tr key={index} className="border-t border-b my-2">
                <td className="p-6 flex gap-3 items-center">
                  <input type="checkbox" id="products" name="products" />
                  <div className="p-2 bg-orange-200">
                    <img
                      src={
                        item?.product_image &&
                        item?.product_image.includes(BASE_URL)
                          ? item?.product_image
                          : item?.product_image
                            ? `${BASE_URL}/media/${item?.product_image}`
                            : ProductImg
                      }
                      alt="product images for show off"
                      className="w-10"
                    />
                  </div>
                  <p>{item.product_name}</p>
                </td>
                <td className="p-6">{DecreaseDescription(item.description)}</td>
                <td className="p-6">{item.shares}</td>
                <td className="p-6">{item.traffic}</td>
                <td className="p-6">
                  <p
                    className={`px-4 py-1 rounded-lg w-fit text-center ${
                      item.status === "active"
                        ? "bg-green-100 text-green-500"
                        : item.status === "pending"
                          ? "bg-blue-100 text-blue-500"
                          : "bg-red-100 text-red-500"
                    }`}
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </p>
                </td>
                <div className="p-6">
                  <div className="flex gap-3">
                    <a
                      className="bg-green-100 text-green-500 flex justify-center px-2 rounded-lg w-fit cursor-pointer"
                      href={`${FRONTEND_URL}/product/${item.uuid}`}
                    >
                      View
                    </a>
                    <p
                      className="bg-red-100 text-red-500 flex justify-center px-2 rounded-lg w-fit cursor-pointer"
                      onClick={() => handleDelete(item.uuid)}
                    >
                      Delete
                    </p>
                  </div>
                </div>
              </tr>
            ))}
        </tbody>
      </table>
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
      {showProductDetail && (
        <Modal>
          <ShowDetailComp
            detail={productDetail}
            setShowDetail={setShowProductDetail}
            type={"product"}
          />
        </Modal>
      )}
      {showDetail && (
        <Modal>
          <ShowDetailComp
            detail={userData}
            setShowDetail={setShowDetail}
            type="user"
            banksData={banksData}
          />
        </Modal>
      )}
      {showEditDetail && (
        <Modal>
          <EditProduct
            setEditDetail={setEditProductDetail}
            item={productDetail}
            CloseModalWindow={() => setEditProductDetail(false)}
          />
        </Modal>
      )}
      {showReplyTicket && (
        <Modal>
          <TicketReply
            ticket={selectedTicket}
            setReplyDetail={setShowReplyTicket}
            CloseModalWindow={() => setShowReplyTicket(false)}
          />
        </Modal>
      )}
    </div>
  );
}

TableData.propTypes = {
  data: PropTypes.array,
  tableHeadNames: PropTypes.array,
  type: PropTypes.string,
  onDelete: PropTypes.func,
  handleShowDetails: PropTypes.func,
  banksData: PropTypes.array,
  userType: PropTypes.oneOf(["admin", "individual", "business"]),
};

export default TableData;
