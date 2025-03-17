import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useResetPasswordMutation } from "../features/auth/authApiSlice";
import { BASE_URL } from "../lib/constants";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Notification from "./ui/Notification.jsx";

const PasswordResetForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [notification, setNotification] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { uidb64, token } = useParams(); // Assuming the token and uidb64 are passed as URL parameters

  // const onSubmit = async (data) => {
  //   try {
  //     const responseData = await resetPassword({
  //       resetPasswordData: { new_password: data.new_password },
  //       uidb64,
  //       token,
  //     }).unwrap();
  //     setNotification({
  //       message: "Password reset successful!",
  //       type: "success",
  //     });
  //     setTimeout(() => {
  //       navigate("/login");
  //     }, 2000);
  //   } catch (error) {
  //     if (error.response && error.response.data) {
  //       setErrorMessage(
  //         error.response.data.message ||
  //           "Failed to reset password. Please try again.",
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
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/accounts/password/reset/${uidb64}/${token}/`,
        data
      );

      setNotification({
        message: "Password has been reset successfully!",
        type: "success",
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      let errorMessage = "An unexpected error occurred. Please try again.";

      if (error.response && error.response.data) {
        errorMessage =
          error.response.data.message ||
          "Failed to reset the password. Please try again.";
      } else if (error.request) {
        errorMessage =
          "Network error. Please check your connection and try again.";
      }

      setNotification({ message: errorMessage, type: "error" });

      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <form className="space-y-8 px-8 max-w-3xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <h2 className='mt-20 mb-4 text-4xl font-bold'>Reset your password!</h2>
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}

      {/* New Password Field */}
      <div className="space-y-2 relative">
        <label htmlFor="new_password" className="block text-gray-700">
          New Password
        </label>
        <div className="relative">
          <input
            id="new_password"
            name="new_password"
            type={passwordVisible ? "text" : "password"}
            placeholder="Enter New Password"
            className="w-full p-4 pr-12 border border-gray-300 outline-none rounded-2xl"
            {...register("new_password", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500"
          >
            {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>
        {errors.new_password && (
          <span className="text-red-500">{errors.new_password.message}</span>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-2 relative">
        <label htmlFor="confirm_password" className="block text-gray-700">
          Confirm Password
        </label>
        <div className="relative">
          <input
            id="confirm_password"
            name="confirm_password"
            type={confirmPasswordVisible ? "text" : "password"}
            placeholder="Confirm New Password"
            className="w-full p-4 pr-12 border border-gray-300 outline-none rounded-2xl"
            {...register("confirm_password", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("new_password") || "Passwords do not match",
            })}
          />
          <button
            type="button"
            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500"
          >
            {confirmPasswordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>
        {errors.confirm_password && (
          <span className="text-red-500">{errors.confirm_password.message}</span>
        )}
      </div>

      {/* Submit Button */}
      <div className="w-full bg-primary-light text-white font-semibold py-4 rounded-full hover:bg-primary-dark transition duration-300 flex gap-4 items-center justify-center cursor-pointer">
        <button
          type="submit"
          className="flex items-center justify-center gap-4 w-full"
        >
          <p className="select-none text-2xl font-medium">Reset Password</p>
        </button>
      </div>
    </form>
  );
};

export default PasswordResetForm;
