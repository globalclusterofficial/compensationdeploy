import React, { useEffect, useState } from "react";
import { useUser } from "../hooks/auth/useUser";
import { useUpdatePasswordMutation } from "../features/auth/authApiSlice";
import { useForm } from "react-hook-form";
import {
  useGetBanksMutation,
  useVerifyAccountMutation,
} from "../features/user/userApiSlice.js";
import PropTypes from "prop-types";
import { useUpdateUserProfileMutation } from "../features/auth/authApiSlice";
import { useUpdateBusinessProfileMutation } from "../features/business/businessApiSlice";

function BankDetailForm({ userData }) {
  const [getBanks, { data: banksData, isLoading, error }] =
    useGetBanksMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      bank: userData?.bank_code ?? "",
      accNumber: userData?.account_number ?? "",
      accName: userData?.account_name ?? "",
    },
  });
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const [updateBusinessProfile] = useUpdateBusinessProfileMutation();
  const [notification, setNotification] = useState(null);

  const [verifyAccount, { data, verifyError }] = useVerifyAccountMutation();
  const [loading, setLoading] = useState(false);
  const [accountName, setAccountName] = useState("");
  const accNumber = watch("accNumber");
  const bankCode = watch("bank");

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const result = await getBanks().unwrap();
        if (result.data) {
          console.log("Banks fetched successfully:");
        }
      } catch (error) {
        console.error("Failed to fetch banks:", error);
      }
    };
    fetchBanks();
  }, [getBanks]);

  useEffect(() => {
    const fetchAccountName = async () => {
      if (accNumber && accNumber.length === 10 && bankCode) {
        setLoading(true);
        try {
          const response = await verifyAccount({
            bank_code: bankCode,
            account_number: accNumber,
          }).unwrap();
          if (response.data) {
            setAccountName(response.data.account_name);
            setValue("accName", response.data.account_name);
          } else {
            setAccountName("");
            setValue("accName", "");
          }
        } catch (error) {
          console.error("Failed to verify account:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAccountName();
  }, [accNumber, bankCode, setValue, verifyAccount]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("bank_code", data.bank);
      formData.append("account_number", data.accNumber);
      formData.append("account_name", data.accName);
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
        message: "Bank details updated successfully!",
        type: "success",
      });
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      setNotification({
        message: "Error updating bank details. Please try again.",
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

  if (isLoading) return <p>Loading banks...</p>;
  if (error) return <p>Error loading banks: {error.message}</p>;

  const banks = banksData?.data || [];

  return (
    <div className="flex flex-col gap-16 py-20 px-14">
      <h2 className="text-3xl font-semibold">Primary Bank Details</h2>

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
          <label htmlFor="bank">Bank Name</label>
          <select
            className="outline-none border border-gray-300 rounded-md px-4 py-3 w-3/3 lg:w-1/3 focus:border-primary-light transition-all duration-300 ease-in-out"
            id="bank"
            {...register("bank")}
          >
            <option>Select Bank Name</option>
            {banks.map((bank) => (
              <option key={bank.id} value={bank.code}>
                {bank.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2 text-gray-500">
          <label htmlFor="account-number">Account Number</label>
          <input
            className="outline-none border border-gray-300 rounded-md px-4 py-3 w-3/3 lg:w-1/3 focus:border-primary-light transition-all duration-300 ease-in-out"
            type="text"
            id="account-number"
            placeholder="Enter Account Number"
            {...register("accNumber")}
          />
          {loading && <span>Loading...</span>}
          {errors.accNumber && (
            <span className="text-red-500">{errors.accNumber.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2 text-gray-500">
          <label htmlFor="account-name">Account Name</label>
          <input
            className="outline-none border border-gray-300 rounded-md px-4 py-3 w-3/3 lg:w-1/3 focus:border-primary-light transition-all duration-300 ease-in-out"
            type="text"
            id="account-name"
            placeholder="Account Name"
            value={accountName}
            {...register("accName")}
            readOnly
          />
          {errors.accName && (
            <span className="text-red-500">{errors.accName.message}</span>
          )}
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

BankDetailForm.propTypes = {
  userData: PropTypes.object,
};

export default BankDetailForm;
