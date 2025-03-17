import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useUpdateUserProfileMutation } from "../features/auth/authApiSlice";
import { useUpdateBusinessProfileMutation } from "../features/business/businessApiSlice";

function PaymentSettings({ userData }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      paymentMethod: userData?.payment_method ?? "",
    },
  });
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const [updateBusinessProfile] = useUpdateBusinessProfileMutation();
  const [notification, setNotification] = useState(null);
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("payment_method", data.paymentMethod);
      let responseData;
      if (userData?.user_type) {
        const updateProfile =
          userData?.user_type === "company"
            ? updateBusinessProfile
            : updateUserProfile;
        responseData = await updateProfile({
          id: userData.user_id,
          data: formData,
        }).unwrap();
      }
      setNotification({
        message: "Payment Method details updated successfully!",
        type: "success",
      });
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      if (error.response) {
        // Server errors (status code outside of 2xx range)
        console.error("Server Error:", JSON.stringify(error.response.data));
      } else if (error.request) {
        // Network errors or no response from server
        console.error("Network Error:", error.message);
      } else {
        // Other errors
        console.error("Error:", JSON.stringify(error));
      }
    }
  };
  return (
    <div className="flex flex-col gap-16 py-20 px-14">
      <h2 className="text-3xl font-semibold">Payment Settings</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
        {notification && (
          <div
            className={`${
              notification.type === "success" ? "bg-green-500" : "bg-red-500"
            } p-4 rounded-md`}
          >
            <p className="text-white">{notification.message}</p>
          </div>
        )}
        <div className="flex flex-col gap-2 text-gray-500">
          <label htmlFor="payment-method">Payment Method</label>
          <select
            className="outline-none border border-gray-300 rounded-md px-4 py-3 w-3/3 lg:w-1/3 focus:border-primary-light transition-all duration-300 ease-in-out"
            id="payment-method"
            name="payment-method"
            {...register("paymentMethod")}
          >
            <option>Select Payment Method</option>
            {/* Add more payment method options as needed */}
            <option>Bank Transfer</option>
            <option>Credit Card</option>
            <option>PayPal</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-primary-light text-white w-fit px-6 rounded-md py-4"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

PaymentSettings.propTypes = {
  userData: PropTypes.object,
};

export default PaymentSettings;
