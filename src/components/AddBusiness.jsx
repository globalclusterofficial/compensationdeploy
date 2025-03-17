import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { useForm } from "react-hook-form";
import countries from "../lib/countries.json";
import { useSignupBusinessMutation } from "../features/business/businessApiSlice";
function AddBusiness({ CloseModalWindow, currentStatus }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [dragging, setDragging] = useState(false);
  const [signupBusiness] = useSignupBusinessMutation();

  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        CloseModalWindow(!currentStatus);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [CloseModalWindow, currentStatus]);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const onSubmit = async (data) => {
    try {
      const responseData = await signupBusiness({
        ...data,
        name: data.company_name,
        user_type: "company",
      }).unwrap();
      CloseModalWindow(!currentStatus);
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
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div
        ref={modalRef}
        className={`w-[50rem] font-thin flex flex-col gap-2 bg-white border rounded-xl ${
          dragging ? "border-blue-500" : ""
        }`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex justify-between items-center px-16 py-8 border-b">
          <p className="font-thin">Add Vendor</p>
          <div
            className="cursor-pointer"
            onClick={() => CloseModalWindow(!currentStatus)}
          >
            <ImCancelCircle style={{ fontSize: "2rem" }} />
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-14 py-8 flex flex-col gap-8"
        >
          <div className={`space-y-6  px-8`}>
            <div className="space-y-4">
              <label htmlFor="company_name" className="block text-gray-700">
                company Name<span className="text-red-500">*</span>
              </label>
              <input
                id="company_name"
                type="text"
                placeholder="Dahort Consult"
                className="w-full p-4 border border-gray-300 outline-none rounded-2xl"
                {...register("company_name", {
                  required: "Company Name is required",
                })}
              />
              {errors.company_name && (
                <span className="text-red-500">
                  {errors.company_name.message}
                </span>
              )}
            </div>
            <div className="space-y-4">
              <label htmlFor="email" className="block text-gray-700">
                Email Address<span className="text-red-500">*</span>
              </label>
              <input
                id="email"
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
            <div className="space-y-4">
              <label htmlFor="address" className="block text-gray-700">
                Address
              </label>
              <input
                id="address"
                type="text"
                placeholder="Enter your Address"
                className="w-full p-4 border border-gray-300 outline-none rounded-2xl"
                {...register("address")}
              />
            </div>

            <div className="space-y-4">
              <label htmlFor="phone_number" className="block text-gray-700">
                Phone No
              </label>
              <input
                id="phone_number"
                type="tel"
                placeholder="+1 (555) 123-4567"
                className="w-full p-4 border border-gray-300 outline-none rounded-2xl"
                {...register("phone_number")}
              />
            </div>

            <div className="space-y-4">
              <label htmlFor="country" className="block text-gray-700">
                Country
              </label>
              {/* <input
              id="country"
              type="text"
              placeholder="Select Your Country"
              className="w-full p-4 border border-gray-300 outline-none rounded-2xl"
              {...register("country")}
            /> */}
              <select
                // value={}
                id="country"
                name="country"
                className="w-full p-4 border border-gray-300 outline-none rounded-2xl"
                {...register("country")}
              >
                {countries.countries.country.map((country, index) => (
                  <option key={index} className="" value={country.countryName}>
                    {country.countryName}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <label
                htmlFor="company_registration_number"
                className="block text-gray-700"
              >
                Country Registration No (RC or BN)
                <span className="text-red-500">*</span>
              </label>
              <input
                id="company_registration_number"
                type="text"
                placeholder="Reg1245669"
                className="w-full p-4 border border-gray-300 outline-none rounded-2xl"
                {...register("company_registration_number", {
                  required: "Registration Number is required",
                })}
              />
              {errors.company_registration_number && (
                <span className="text-red-500">
                  {errors.company_registration_number.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-gray-700">
                Password<span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                type="password"
                placeholder="Confirm Your Password"
                className="w-full border border-gray-300 p-4 outline-none rounded-2xl"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="cofirmPassword" className="block text-gray-700">
                Confirm Password<span className="text-red-500">*</span>
              </label>
              <input
                id="cofirmPassword"
                type="password"
                placeholder="Confirm Your Password"
                className="w-full border border-gray-300 p-4 outline-none rounded-2xl"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <span className="text-red-500">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <p
              onClick={() => CloseModalWindow(!currentStatus)}
              className="flex-1 flex items-center justify-center px-4 py-6 border rounded-xl border-primary-light hover:bg-primary-light hover:text-white cursor-pointer"
            >
              Cancel
            </p>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center px-4 py-6 bg-primary-light text-white rounded-xl cursor-pointer hover:bg-primary-dark"
            >
              Add Vendor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AddBusiness.propTypes = {
  addNewProduct: PropTypes.func.isRequired,
  CloseModalWindow: PropTypes.func.isRequired,
  currentStatus: PropTypes.bool.isRequired,
};

export default AddBusiness;
