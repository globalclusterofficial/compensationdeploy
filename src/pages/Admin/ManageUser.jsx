import AdminDashboardHeader from "./../../components/ui/Header";
import React, { useEffect, useState } from "react";
import { itemsPerPage } from "../../lib/constants";
import UserDataTable from "../../components/UserDataTableNew.jsx";
import { IoMdAdd } from "react-icons/io";
import Filter from "../../components/ui/Filter";
import Pagination from "../../components/Pagination";
import { useNavigate } from "react-router-dom";
import {
  useGetIndividualsMutation,
  useDeleteUserMutation,
  useGetUserMutation,
  useSuspendUserMutation,
  useActivateUserMutation,
} from "../../features/user/userApiSlice";
import Notification from "../../components/ui/Notification.jsx";

function ManageUser() {
  const [usersData, setUsersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [getUser] = useGetUserMutation();
  const [getUsers] = useGetIndividualsMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [suspendUser] = useSuspendUserMutation();
  const [activateUser] = useActivateUserMutation();
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = usersData.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers().unwrap();
        setUsersData(response);
      } catch (error) {
        if (error.response) {
          console.error("Server Error:", JSON.stringify(error.response));
        } else if (error.request) {
          console.error("Network Error:", error.message);
        } else {
          console.error("Error:", error.message);
        }
        setNotification({
          message: "Unexpected error. Please try again.",
          type: "error",
        });
        setTimeout(() => setNotification(null), 3000);
      }
    };
    fetchUsers();
  }, []);

  async function handleShowUserDetails(userId) {
    try {
      const userData = await getUser(userId).unwrap();

      return userData;
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

  async function handleDeleteUser(userId) {
    try {
      await deleteUser(userId).unwrap();
      const updatedUsers = usersData.filter((user) => user?.user_id !== userId);
      setUsersData(updatedUsers);
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

  return (
    <div className="flex flex-col gap-8 bg-gray-50">
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <AdminDashboardHeader />
      <main className="m-10 bg-white">
        <div className="py-20 px-20 flex flex-col gap-10">
          <div className="flex justify-between items-center">
            <p className="font-bold text-5xl">Customer Management</p>
            <div
              onClick={() => {
                navigate("/admin/user/manage/registrations");
              }}
              className="bg-primary-light text-white font-semibold w-fit
    px-4 py-4 rounded-md flex items-center justify-center gap-4 hover:bg-primary-dark cursor-pointer select-none"
            >
              <IoMdAdd />
              <p>Add Individual</p>
            </div>
          </div>

          <section className="flex flex-col gap-6">
            <Filter
              data={usersData}
              setDataFunction={setUsersData}
              showDownload={true}
            />
            <div className="flex flex-col gap-10">
              <UserDataTable
                type="admin_manage_users"
                data={currentUsers}
                onDelete={handleDeleteUser}
                onSuspend={handleSuspendUser}
                onActivate={handleActivateUser}
                handleShowDetails={handleShowUserDetails}
                tableHeadNames={[
                  "Full Name",
                  "Sponsor",
                  "Rank",
                  "Date",
                  "Tree View",
                  "Status",
                  "Action",
                ]}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(usersData.length / itemsPerPage)}
                onPageChange={handlePageChange}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default ManageUser;
