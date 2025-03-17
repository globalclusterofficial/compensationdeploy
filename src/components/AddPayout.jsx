import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useGetBanksMutation,
  useWalletMutation,
  useAddPayoutMutation,
  useVerifyAccountMutation,
} from "../features/user/userApiSlice.js";
import Notification from "./ui/Notification.jsx";
import { useUser } from "../hooks/auth/useUser.js";
import { ImCancelCircle } from "react-icons/im";
import { useLoginMutation } from "../features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";

function AddPayout({
  CloseModalWindow,
  currentStatus,
  userData,
  availableBalance,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      accountNumber: userData?.account_number ?? "",
      bank_name: userData?.bank_code ?? "",
      accName: userData?.account_name ?? "",
    },
  });
  const navigate = useNavigate();
  const [walletData, setWalletData] = useState(0);
  const [wallet] = useWalletMutation();
  const [getBanks, { data: banksData, isLoading, error }] =
    useGetBanksMutation();
    const [addPayout, { data: payoutData, isLoading: addPayoutIsLoading }] =
    useAddPayoutMutation();
  const [notification, setNotification] = useState(null);
  const [verifyAccount, { data, verifyError }] = useVerifyAccountMutation();
  const [loading, setLoading] = useState(false);
  const [myAccountName, setMyAccountName] = useState("");
  const accNumber = watch("accountNumber");
  const bankCode = watch("bank_name");
  const { user } = useUser();
  const [step, setStep] = useState(1);
  const [payoutInfo, setPayoutInfo] = useState({});
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [login, { isLoading: loginIsLoading }] = useLoginMutation();

  const modalRef = useRef(null);
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      CloseModalWindow(false);
    }
  };

  const handlePasswordVerify = async () => {
    if (!password) {
      setPasswordError("Please input password");
      return;
    }
    try {
      const response = await login({
        email: user.email,
        password,
      });
      if (!response?.data) {
        setPasswordError("Password verification failed");
        return;
      }
      const payoutResponse = await addPayout({
        account_number: payoutInfo.accountNumber,
        payment_method: userData?.payment_method,
        amount: payoutInfo?.amount,
        bank_code: payoutInfo?.bank_name,
        account_name: myAccountName,
      }).unwrap();
      if (payoutResponse?.amount) {
        setNotification({
          message: "Payout added successfully!",
          type: "success",
        });
        setTimeout(() => setNotification(null), 3000);
        navigate(0);
        CloseModalWindow();
      } else {
        setNotification({
          message: "Error processing payout. Please try again.",
          type: "error",
        });
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (error) {
      console.error("Error processing payout:", error);

      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";

      setNotification({
        message: `Error submitting payout. ${errorMessage}`,
        type: "error",
      });

      setTimeout(() => setNotification(null), 3000);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const response = await wallet().unwrap();
        setWalletData(response);
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      }
    };
    fetchWalletData();
  }, [wallet]);

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

  const banks = banksData?.data || [];

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
            setMyAccountName(response.data.account_name);
            setValue("accountName", response.data.account_name);
          } else {
            setMyAccountName("");
            setValue("accountName", "");
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
    setPayoutInfo(data);
    setStep(2);
  };

  if (isLoading) return <p>Loading banks...</p>;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <div
        ref={modalRef}
        className={`w-[55rem] font-thin rounded-xl border bg-white ${step === 1 ? "p-40" : "p-5"}`}
      >
        {step === 1 && (
          <div className="w-full flex flex-col gap-4">
            <div className="border-dashed border-primary px-4 bg-primary/30 py-8 rounded-md flex flex-col items-start">
              <span className="text-slate-700 font-bold text-2xl ">
                Wallet Balance
              </span>
              <span className="text-xl font-bold">
                {`₦ ${availableBalance}` || `₦ ${0}`}
              </span>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-2 text-gray-500">
                <label htmlFor="bank-name">Bank Name</label>
                <select
                  className="outline-none border border-gray-300 rounded-md px-4 py-3 focus:border-primary-light transition-all duration-300 ease-in-out"
                  id="bank-name"
                  {...register("bank_name", {
                    required: "Bank Name is required",
                  })}
                >
                  <option>Select Bank Name</option>
                  {banks.map((mybank) => (
                    <option key={mybank.code} value={mybank.code}>
                      {mybank.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2 text-gray-500">
                <label htmlFor="account-number">Account Number</label>
                <input
                  className="outline-none border border-gray-300 rounded-md px-4 py-3 focus:border-primary-light transition-all duration-300 ease-in-out"
                  type="text"
                  id="account-number"
                  placeholder="Enter Account Number"
                  {...register("accountNumber", {
                    required: "Account Number is required",
                  })}
                />
                {loading && <span>Loading...</span>}
                {errors.accountNumber && (
                  <span className="text-red-500">
                    {errors.accountNumber.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 text-gray-500">
                <label htmlFor="account-name">Account Name</label>
                <input
                  className="outline-none border border-gray-300 rounded-md px-4 py-3 focus:border-primary-light transition-all duration-300 ease-in-out"
                  type="text"
                  id="account-name"
                  placeholder="Account Name"
                  value={myAccountName}
                  {...register("accName", {
                    required: "Account Name is required",
                  })}
                  readOnly
                />
                {errors.accName && (
                  <span className="text-red-500">{errors.accName.message}</span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="amount">Amount</label>
                <input
                  id="amount"
                  className="p-6 border outline-none rounded-md"
                  type="number"
                  step="0.01"
                  {...register("amount", {
                    required: "Amount is required",
                    validate: (value) => Number(value) <= availableBalance,
                  })}
                />
                {errors.amount && (
                  <p className="text-red-500">{errors.amount.message}</p>
                )}
                {errors.amount?.type === "validate" && (
                  <p className="text-red-500">
                    Payout amount cannot be greater than available balance
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="bg-primary text-white p-4 w-32 ml-auto rounded-4xl"
              >
                Next
              </button>
            </form>
          </div>
        )}
        {step === 2 && (
          <div className="w-full flex flex-col items-center gap-8">
            <div className="flex w-full  justify-end">
              <ImCancelCircle
                className="cursor-pointer"
                onClick={() => CloseModalWindow()}
              />
            </div>
            <p className="text-4xl font-bold">Enter your password</p>
            <p className="-mt-8">Enter your password to request payout</p>
            <input
              id="password"
              className="p-6 border outline-none rounded-md w-full"
              type="password"
              placeholder="Enter your password"
              onChange={(event) => {
                setPasswordError("");
                setPassword(event.target.value);
              }}
            />
            {passwordError && <p className="text-red-500">{passwordError}</p>}
            <div className="flex w-full justify-center items-center">
              <button
                onClick={
                  loginIsLoading || addPayoutIsLoading
                    ? () => {}
                    : handlePasswordVerify
                }
                className="bg-primary text-white mt-8 px-10 py-5 rounded-3xl"
              >
                {loginIsLoading || addPayoutIsLoading
                  ? "Confirming.."
                  : "Confirm"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

AddPayout.propTypes = {
  CloseModalWindow: PropTypes.func.isRequired,
  currentStatus: PropTypes.bool.isRequired,
  userData: PropTypes.object.isRequired,
  availableBalance: PropTypes.number.isRequired,
};

export default AddPayout;
