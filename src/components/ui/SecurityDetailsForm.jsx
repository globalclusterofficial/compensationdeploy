import React, { useState } from "react";
import { useUpdatePasswordMutation } from "../../features/auth/authApiSlice";
import { useForm } from "react-hook-form";
import { useUser } from "../../hooks/auth/useUser";
import { useUpdateBusinessPasswordMutation } from "../../features/business/businessApiSlice";
import Notification from "./Notification.jsx";

function SecurityDetailsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const [updatePassword] = useUpdatePasswordMutation();
  const [updateBusinessPassword] = useUpdateBusinessPasswordMutation();
  const [notification, setNotification] = useState(null);
  const { user } = useUser();
  const onSubmit = async (data) => {
    const updateData = {
      email: user?.email,
      password: data?.oldPassword,
      user_type: user?.user_type,
      newPassword: data?.newPassword,
    };
    try {
      let responseData;
      if (user?.user_type === "company") {
        responseData = await updateBusinessPassword(updateData).unwrap();
      }
      if (user?.user_type === "individual") {
        responseData = await updatePassword(updateData).unwrap();
      }
      if (user?.user_type === "admin") {
        responseData = await updatePassword(updateData).unwrap();
      }
      setNotification({
        message: "Password updated successfully!",
        type: "success",
      });
      setTimeout(() => setNotification(null), 3000);
      reset();
    } catch (error) {
      if (error.response) {
        setNotification({
          message: "Error updating password. Please try again.",
          type: "error",
        });
        setTimeout(() => setNotification(null), 3000);
        console.error("Server Error:", JSON.stringify(error.response.data));
      } else if (error.request) {
        console.error("Network Error:", error.message);
      } else {
        console.error("Error:", JSON.stringify(error));
      }
    }
  };
  return (
    <div className="flex flex-col gap-16 py-20 px-14">
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <h2 className="text-3xl font-semibold">Password Settings</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
        <div className="flex flex-col gap-2 text-gray-500">
          <label htmlFor="oldPassword">Old Password</label>
          <input
            className="outline-none border border-gray-300 rounded-md px-4 py-3 w-3/3 lg:w-1/3 focus:border-primary-light transition-all duration-300 ease-in-out"
            type="password"
            id="oldPassword"
            placeholder="Enter your password"
            {...register("oldPassword", {
              required: "oldPassword is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.oldPassword && (
            <span className="text-red-500">{errors.oldPassword.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2 text-gray-500">
          <label htmlFor="newPassword">New Password</label>
          <input
            className="outline-none border border-gray-300 rounded-md px-4 py-3 w-3/3 lg:w-1/3 focus:border-primary-light transition-all duration-300 ease-in-out"
            type="password"
            id="newPassword"
            // name="newPassword"
            placeholder="Enter your new password"
            {...register("newPassword", {
              required: "newPassword is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.newPassword && (
            <span className="text-red-500">{errors.newPassword.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2 text-gray-500">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            className="outline-none border border-gray-300 rounded-md px-4 py-3 w-3/3 lg:w-1/3 focus:border-primary-light transition-all duration-300 ease-in-out"
            type="password"
            id="confirmPassword"
            // name="confirmPassword"
            placeholder="Enter your password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === watch("newPassword") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="bg-primary-light text-white w-fit px-6 rounded-md py-4"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}

export default SecurityDetailsForm;
