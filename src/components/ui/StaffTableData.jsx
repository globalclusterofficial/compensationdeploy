import PropTypes from "prop-types";
import React, { useState } from "react";
import { GrEdit } from "react-icons/gr";
import Modal from "../Modal";
import EditStaff from "../EditStaff";
import ConfirmDeletion from "../../components/ConfirmDeletion.jsx";

function TableData({
  data = [],
  tableHeadNames = [],
  onDelete,
  onSuspend,
  onActivate,
  handleShowStaffDetails,
}) {
  const [showEditDetail, setEditStaffDetail] = useState(false);
  const [staffDetail, setStaffDetail] = useState({});
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

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

  async function handleEditStaff(item) {
    const data = await handleShowStaffDetails(item.id);
    setStaffDetail(data);
    setEditStaffDetail(true);
  }

  return (
    <div className="overflow-hidden rounded-t-xl rounded-l-xl rounded-r-xl border-t border-l border-r">
      <table className="w-full text-xl">
        <thead className="rounded-t-xl bg-[#f9f9fc]">
          <tr>
            {tableHeadNames.map((item, index) => (
              <th
                key={index}
                className={`p-6 ${index === 0 ? "flex gap-3" : "text-left"}`}
              >
                <p>{item}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.map((item, index) => (
            <tr key={index} className="border-t border-b my-2">
              <td className="p-6">{`${item.name}`}</td>
              <td className="p-6">{item.email}</td>
              <td className="p-6">{item?.phone_number}</td>
              <td className="p-6">
                {item?.role === "superadmin"
                  ? "Super Admin"
                  : item?.role === "admin"
                    ? "Admin"
                    : ""}
              </td>
              <td className="p-6">
                <p
                  className={`px-4 py-1 rounded-xl w-fit text-center ${
                    item.is_active === "True"
                      ? "bg-green-100 text-green-500"
                      : "bg-red-100 text-red-500"
                  }`}
                >
                  {item.is_active === "True" ? "Active" : "Inactive"}
                </p>
              </td>
              <td className="p-6">
                <div className="flex gap-4 items-center">
                  <p
                    className={`${
                      item.is_active !== "True"
                        ? "bg-green-100 text-green-500"
                        : "bg-yellow-100 text-yellow-500"
                    } flex justify-center px-2 rounded-lg w-fit cursor-pointer`}
                    onClick={() =>
                      item.is_active === "True"
                        ? onSuspend(item?.user_id)
                        : onActivate(item?.user_id)
                    }
                  >
                    {item.is_active === "True" ? "Disable" : "Enable"}
                  </p>
                  <p
                    className="bg-red-100 text-red-500 flex justify-center px-2 rounded-lg w-fit cursor-pointer"
                    onClick={() => handleDelete(item?.id)}
                  >
                    Delete
                  </p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showEditDetail && (
        <Modal>
          <EditStaff setEditDetail={setEditStaffDetail} item={staffDetail} />
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

TableData.propTypes = {
  data: PropTypes.array,
  tableHeadNames: PropTypes.array,
  onDelete: PropTypes.func,
  handleShowStaffDetails: PropTypes.func,
  onSuspend: PropTypes.func,
  onActivate: PropTypes.func,
};

export default TableData;
