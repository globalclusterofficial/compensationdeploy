import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { usePasswordResetRequestMutation } from "../features/auth/authApiSlice";
import Notification from "./ui/Notification.jsx";
import { BASE_URL } from "../lib/constants";
import axios from "axios";

const PasswordResetRequestForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [notification, setNotification] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [passwordResetRequest] = usePasswordResetRequestMutation();
  const navigate = useNavigate();

  // const onSubmit = async (data) => {
  //   try {
  //     const responseData = await passwordResetRequest(data).unwrap();
  //     setNotification({
  //       message: "Password reset email sent!",
  //       type: "success",
  //     });
  //     setTimeout(() => {
  //       navigate("/login");
  //     }, 2000);
  //   } catch (error) {
  //     if (error.response && error.response.data) {
  //       setErrorMessage(
  //         error.response.data.message ||
  //           "Failed to send reset email. Please try again.",
  //       );
  //     } else if (error.request) {
  //       setErrorMessage(
  //         "Network error. Please check your connection and try again.",
  //       );
  //     } else {
  //       setErrorMessage("An unexpected error occurred. Please try again.");
  //     }
  //     setNotification({ message: errorMessage, type: "error" });
  //     setTimeout(() => setNotification(null), 3000);
  //   }
  // };

  const onSubmit = async (data) => {
    console.log(BASE_URL);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/accounts/password/reset/`,
        { email: data.email },
      );

      // If the request is successful, show success notification
      setNotification({
        message: "Password reset email sent!",
        type: "success",
      });

      // Redirect to login after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      // Handle errors based on the type of error
      if (error.response && error.response.data) {
        setErrorMessage(
          error.response.data.detail ||
            "Failed to send reset email. Please try again.",
        );
      } else if (error.request) {
        setErrorMessage(
          "Network error. Please check your connection and try again.",
        );
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }

      // Display error notification
      setNotification({ message: errorMessage, type: "error" });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <form className="space-y-20 px-8 max-w-3xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <h2 className='mt-20 mb-4 text-4xl font-bold'>Request Password Reset</h2>
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <div className="space-y-8">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-gray-700">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="janedoe@xxx.com"
            className="w-full p-4 border border-gray-300 outline-none rounded-2xl"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div
          className="w-full bg-primary-light text-white font-semibold py-4 rounded-full hover:bg-primary-dark
        transition duration-300 flex gap-4 items-center justify-center cursor-pointer"
        >
          <button
            type="submit"
            className="flex items-center justify-center gap-4 w-full"
          >
            <p className="select-none text-2xl font-medium">Send Reset Email</p>
          </button>
        </div>
      </div>
    </form>
  );
};

export default PasswordResetRequestForm;
