import React, { useState } from "react";
import countries from "../../lib/countries.json";
import { useUser } from "../../hooks/auth/useUser";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  useUpdateUserProfileMutation,
  useUpdateAdminProfileMutation,
} from "../../features/auth/authApiSlice";
import { updateUserProfileAction } from "../../features/auth/authSlice.js";
import { useUpdateBusinessProfileMutation } from "../../features/business/businessApiSlice";
import Notification from "./Notification";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function ContactDetailsForm({ userData }) {
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const [updateBusinessProfile] = useUpdateBusinessProfileMutation();
  const [updateAdminProfile] = useUpdateAdminProfileMutation();
  const [notification, setNotification] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone_number: userData?.phone_number || "",
      address: userData?.address || "",
      country: userData?.country || "",
      state: userData?.state || "",
      city: userData?.city || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      // Append all non-file data
      Object.keys(data).forEach((key) => {
        if (key !== "profile_picture") {
          formData.append(key, data[key]);
        }
      });
      let responseData;
      if (userData?.user_type) {
        const updateProfile =
          userData?.user_type === "company"
            ? updateBusinessProfile
            : userData?.user_type === "admin"
              ? updateAdminProfile
              : updateUserProfile;
        responseData = await updateProfile({
          id: userData.user_id,
          data: formData,
        }).unwrap();
      }
      dispatch(updateUserProfileAction(responseData));
      setNotification({
        message: "Contact details updated successfully!",
        type: "success",
      });
      setTimeout(() => setNotification(null), 3000);
      navigate(0);
    } catch (error) {
      setNotification({
        message: "Error updating contact details. Please try again.",
        type: "error",
      });
      setTimeout(() => setNotification(null), 3000);
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
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <h2 className="text-3xl font-semibold">Account Settings</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
        <div className="flex flex-col gap-2 text-gray-500">
          <label htmlFor="address">Address</label>
          <input
            className="outline-none border border-gray-300 rounded-md px-4 py-3 w-3/3 lg:w-1/3 focus:border-primary-light transition-all duration-300 ease-in-out"
            type="text"
            id="address"
            name="address"
            placeholder="Enter your address"
            {...register("address")}
          />
          {errors.address && (
            <span className="text-red-500">{errors.address.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2 text-gray-500">
          <label htmlFor="country">Country</label>
          <select
            id="country"
            className="outline-none border border-gray-300 rounded-md px-4 py-4 w-3/3 lg:w-1/3 focus:border-primary-light transition-all duration-300 ease-in-out"
            {...register("country")}
          >
            {countries.countries.country.map((country, index) => (
              <option key={index} className="py-3" value={country.countryName}>
                {country.countryName}
              </option>
            ))}{" "}
          </select>
        </div>
        <div className="flex flex-col gap-2 text-gray-500">
          <label htmlFor="state">State</label>
          <input
            className="outline-none border border-gray-300 rounded-md px-4 py-3 w-3/3 lg:w-1/3 focus:border-primary-light transition-all duration-300 ease-in-out"
            type="text"
            id="state"
            name="state"
            placeholder="Enter your state"
            {...register("state")}
          />
          {errors.state && (
            <span className="text-red-500">{errors.state.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2 text-gray-500">
          <label htmlFor="city">City</label>
          <input
            className="outline-none border border-gray-300 rounded-md px-4 py-3 w-3/3 lg:w-1/3 focus:border-primary-light transition-all duration-300 ease-in-out"
            type="text"
            id="city"
            name="city"
            placeholder="Enter your City"
            {...register("city")}
          />
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2 text-gray-500">
          <label htmlFor="phone_number">Phone No</label>
          <input
            className="outline-none border border-gray-300 rounded-md px-4 py-3 w-3/3 lg:w-1/3 focus:border-primary-light transition-all duration-300 ease-in-out"
            type="text"
            id="phone_number"
            name="phone_number"
            placeholder="Enter your Phone No"
            {...register("phone_number")}
          />
          {errors.phone_no && (
            <span className="text-red-500">{errors.phone_no.message}</span>
          )}
        </div>
        <button
          type="submit"
          className="bg-primary-light text-white w-fit px-6 rounded-md py-4"
        >
          Save Contact Details
        </button>
      </form>
    </div>
  );
}
ContactDetailsForm.propTypes = {
  userData: PropTypes.object,
};
export default ContactDetailsForm;
