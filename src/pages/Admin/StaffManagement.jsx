import React, { useContext, useEffect, useState } from "react";
import AdminDashboardHeader from "./../../components/ui/Header";
import { ModalContext } from "../../App";
import AddStaff from "../../components/ui/AddStaff.jsx";
import PageDataHeader from "../../components/ui/PageDataHeader.jsx";
import Modal from "../../components/Modal.jsx";
import ActionNotification from "../../components/ActionNotification.jsx";
import TableData from "../../components/ui/StaffTableData.jsx";
import Pagination from "../../components/Pagination.jsx";
import { itemsPerPage } from "../../lib/constants.js";
import {
  useAddStaffMutation,
  useStaffsMutation,
  useStaffMutation,
  useDeleteStaffMutation,
} from "../../features/staff/staffApiSlice";
import {
  useSuspendUserMutation,
  useActivateUserMutation,
} from "../../features/user/userApiSlice";
import Filter from "../../components/ui/Filter.jsx";
import { BiTime, BiSolidCoinStack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function StaffManagement() {
  const [staffData, setStaffData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [staff] = useStaffMutation();
  const [staffs] = useStaffsMutation();
  const [addStaff] = useAddStaffMutation();
  const { showModal, setShowModal } = useContext(ModalContext);
  const [showAction, setShowAction] = useState(false);
  const [tabs, setTabs] = useState("allStaff");
  const [deleteStaff] = useDeleteStaffMutation();
  const [suspendUser] = useSuspendUserMutation();
  const [activateUser] = useActivateUserMutation();
  const navigate = useNavigate();

  async function addNewStaff(formData) {
    try {
      const response = await addStaff(formData).unwrap();
      const [first_name, ...lastNameParts] = response.name.split(" ");
      const last_name = lastNameParts.join(" ");
      const newStaffMember = {
        ...response,
        first_name,
        last_name,
      };
      setStaffData([...staffData, newStaffMember]);
      setShowModal(false);
      showTemporaryNotification();
    } catch (error) {
      throw new Error("Failed to add staff details");
    }
  }

  async function handleShowStaffDetails(staffId) {
    try {
      const staffData = await staff(staffId).unwrap();

      return staffData;
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

  function showTemporaryNotification() {
    setShowAction(true);
    setTimeout(() => {
      setShowAction(false);
    }, 2000);
  }

  async function handleDeleteUser(staffId) {
    try {
      await deleteStaff(staffId).unwrap();
      const updatedStaff = staffData.filter((staff) => staff?.id !== staffId);
      setStaffData(updatedStaff);
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

  async function handleSuspendUser(userId) {
    try {
      await suspendUser(userId).unwrap();
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

  async function handleActivateUser(userId) {
    try {
      await activateUser(userId).unwrap();
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

  useEffect(() => {
    const fetchedStaffs = async () => {
      try {
        const response = await staffs().unwrap();
        setStaffData(response);
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
    fetchedStaffs();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentStaff = staffData.slice(startIndex, endIndex);

  return (
    <div className="bg-gray-50 h-full w-full">
      <div className="bg-white">
        <AdminDashboardHeader />
        <main className="m-10 shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-md bg-white">
          <div className="py-20 px-20 flex flex-col gap-10">
            <div className="flex justify-between items-center">
              <PageDataHeader name="Staff Management" to="Staff" />
            </div>
            <div className="flex justify-between items-end border-b border-gray-300 my-16">
              <div className="flex gap-8">
                <p
                  className={`${
                    tabs === "allStaff" ? "border-b-2 border-black" : ""
                  } flex px-2 gap-2 items-center cursor-pointer font-semibold`}
                  onClick={() => setTabs("allStaff")}
                >
                  <BiSolidCoinStack />
                  All Staff
                </p>
                {/* <p
                  className={`${
                    tabs === "roles" ? "border-b-2 border-black" : ""
                  } flex px-2 gap-2 items-center cursor-pointer font-semibold`}
                  onClick={() => setTabs("roles")}
                >
                  <BiTime />
                  Roles
                </p> */}
              </div>
              <div className="flex gap-5 mb-5">
                <div
                  className="px-9 py-5 border-black border-[1.5px] rounded-md cursor-pointer"
                  onClick={() =>
                    tabs === "allStaff" ? setShowModal(!showModal) : null
                  }
                >
                  {tabs === "allStaff" ? "Create New Staff" : "Create Role"}
                </div>
                <div className="bg-[#24669E] px-9 py-5 rounded-md text-white cursor-pointer">
                  Assign Role
                </div>
              </div>
            </div>
            {showModal && (
              <Modal>
                <AddStaff
                  addNewStaff={addNewStaff}
                  CloseModalWindow={setShowModal}
                  currentStatus={showModal}
                />
              </Modal>
            )}

            {showAction && (
              <Modal>
                <ActionNotification message="Staff Details Added Successfully" />
              </Modal>
            )}
            {tabs === "allStaff" && (
              <>
                <Filter
                  data={staffData}
                  setDataFunction={setStaffData}
                  showDownload={true}
                />
                <section className="flex flex-col gap-6">
                  <div className="flex flex-col gap-10">
                    <TableData
                      data={currentStaff}
                      tableHeadNames={[
                        "Name",
                        "Email",
                        "Phone Number",
                        "Role",
                        "Status",
                        "Action",
                      ]}
                      onDelete={handleDeleteUser}
                      onSuspend={handleSuspendUser}
                      onActivate={handleActivateUser}
                      handleShowStaffDetails={handleShowStaffDetails}
                    />
                    <Pagination
                      currentPage={currentPage}
                      totalPages={Math.ceil(staffData.length / itemsPerPage)}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </section>
              </>
            )}
          </div>
        </main>
      </div>
      <main className="m-10 rounded-xl flex flex-col gap-4"></main>
    </div>
  );
}

export default StaffManagement;
