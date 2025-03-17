import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import { ImCancelCircle } from "react-icons/im";
import { useForm } from "react-hook-form";
import { useUser } from "../../hooks/auth/useUser.js";

function AddStaff({ addNewStaff, CloseModalWindow, currentStatus }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useUser();

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

  const onSubmit = async (data) => {
    try {
      const staffData = {
        ...data,
        name: `${data.first_name} ${data.last_name}`,
      };
      delete staffData.first_name;
      delete staffData.last_name;

      await addNewStaff(staffData);
      CloseModalWindow(!currentStatus);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div
        ref={modalRef}
        className="w-[50rem] font-thin flex flex-col gap-2 bg-white border rounded-xl"
      >
        <div className="flex justify-between items-center px-16 py-8 border-b">
          <p className="font-thin">Add New Staff</p>
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
          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="firstName" className="block">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="border rounded-md outline-none p-2 w-full"
              {...register("first_name", {
                required: "First Name is required",
              })}
            />
            {errors.firstName && (
              <p className="text-red-500">{errors.firstName.message}</p>
            )}
          </div>

          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="last_name" className="block">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              className="border rounded-md outline-none p-2 w-full"
              {...register("last_name", { required: "Last Name is required" })}
            />
            {errors.last_name && (
              <p className="text-red-500">{errors.last_name.message}</p>
            )}
          </div>

          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border rounded-md outline-none p-2 w-full"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="phone_number" className="block">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone_number"
              className="border rounded-md outline-none p-2 w-full"
              {...register("phone_number", {
                required: "Phone Number is required",
              })}
            />
            {errors.phone_number && (
              <p className="text-red-500">{errors.phone_number.message}</p>
            )}
          </div>

          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              className="border rounded-md outline-none p-2 w-full"
              type="password"
              id="password"
              {...register("password", {
                required: "password is required",
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

          <div className="mb-4 flex flex-col gap-4">
            <label htmlFor="role" className="block">
              Role
            </label>
            <div className="flex gap-4">
              <label className="py-4 px-6 flex-1 font-thin flex gap-2 border-2 rounded-xl">
                <input
                  type="radio"
                  id="admin"
                  {...register("role", { required: "Role is required" })}
                  value="admin"
                />
                Admin
              </label>
              <label className="py-4 px-6 flex-1 font-thin flex gap-2 border-2 rounded-xl">
                <input
                  type="radio"
                  id="superadmin"
                  {...register("role", { required: "Role is required" })}
                  value="superadmin"
                />
                Superadmin
              </label>
            </div>
            {errors.role && (
              <p className="text-red-500">{errors.role.message}</p>
            )}
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
              Add Staff
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AddStaff.propTypes = {
  addNewStaff: PropTypes.func.isRequired,
  CloseModalWindow: PropTypes.func.isRequired,
  currentStatus: PropTypes.bool.isRequired,
};

export default AddStaff;
