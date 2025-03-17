import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import { ImCancelCircle } from "react-icons/im";
import { useForm } from "react-hook-form";
import { useUpdateStaffMutation } from "../features/staff/staffApiSlice";

function EditStaff({ setEditDetail, item }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [updateStaff] = useUpdateStaffMutation();

  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setEditDetail(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setEditDetail]);

  useEffect(() => {
    if (item) {
      setValue("firstName", item.first_name);
      setValue("lastName", item.last_name);
      setValue("email", item.email);
      setValue("phoneNumber", item.phone_number);
      setValue("role", item.role);
      setValue("isActive", item.is_active);
    }
  }, [item, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await updateStaff({
        id: item.id,
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone_number: data.phoneNumber,
        role: data.role,
        is_active: data.isActive,
      });

      setEditDetail(false);
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
          <p className="font-thin">Edit Staff</p>
          <div className="cursor-pointer" onClick={() => setEditDetail(false)}>
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
              {...register("firstName", {
                required: "First Name is required",
              })}
            />
            {errors.firstName && (
              <p className="text-red-500">{errors.firstName.message}</p>
            )}
          </div>

          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="lastName" className="block">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="border rounded-md outline-none p-2 w-full"
              {...register("lastName", {
                required: "Last Name is required",
              })}
            />
            {errors.lastName && (
              <p className="text-red-500">{errors.lastName.message}</p>
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
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="phoneNumber" className="block">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              className="border rounded-md outline-none p-2 w-full"
              {...register("phoneNumber", {
                required: "Phone Number is required",
              })}
            />
            {errors.phoneNumber && (
              <p className="text-red-500">{errors.phoneNumber.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <label htmlFor="role" className="block">
              Role
            </label>
            <div className="flex gap-4">
              <label className="py-4 px-6 flex-1 font-thin flex gap-2 border-2 rounded-xl">
                <input
                  type="radio"
                  id="admin"
                  {...register("role", {
                    required: "Role is required",
                  })}
                  value="admin"
                />
                Admin
              </label>
              <label className="py-4 px-6 flex-1 font-thin flex gap-2 border-2 rounded-xl">
                <input
                  type="radio"
                  id="superadmin"
                  {...register("role", {
                    required: "Role is required",
                  })}
                  value="superadmin"
                />
                Superadmin
              </label>
            </div>
            {errors.role && (
              <p className="text-red-500">{errors.role.message}</p>
            )}
          </div>

          <div className="mb-4 flex items-center gap-2">
            <input type="checkbox" id="isActive" {...register("isActive")} />
            <label htmlFor="isActive" className="block">
              Active
            </label>
          </div>

          <div className="flex items-center justify-center gap-4">
            <p
              onClick={() => setEditDetail(false)}
              className="flex-1 flex items-center justify-center px-4 py-6 border rounded-xl border-primary-light hover:bg-primary-light hover:text-white cursor-pointer"
            >
              Cancel
            </p>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center px-4 py-6 bg-primary-light text-white rounded-xl cursor-pointer hover:bg-primary-dark"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

EditStaff.propTypes = {
  setEditDetail: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

export default EditStaff;
