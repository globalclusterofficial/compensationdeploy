import React from "react";
import { HiMiniUserPlus } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import AdminHeader from "./AdminHeader";
import { useLoginAdminMutation } from "../features/admin/adminApiSlice";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
import ErrorBoundary from "./ErrorBoundary";
import { loginAction } from "../features/auth/authSlice";

function AdminLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loginAdmin] = useLoginAdminMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [type, setType] = React.useState("password");
  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit = async (data) => {
    try {
      const responseData = await loginAdmin({
        ...data,
        user_type: "admin",
      }).unwrap();

      const { access, refresh, user } = responseData;

      dispatch(loginAction({ access, refresh, user }));
      navigate(`/admin/dashboard`);
    } catch (error) {
      if (error.response) {
        // Server errors (status code outside of 2xx range)
        console.error("Server Error:", JSON.stringify(error.response));
      } else if (error.request) {
        // Network errors or no response from server
        console.error("Network Error:", error.message);
      } else {
        // Other errors
        console.error("Error:", error.message);
      }
    }
  };
  const handleShowPwd = (inputText) => {
    setShowPassword(!showPassword);
    setType(inputText);
  };

  return (
    <ErrorBoundary>
      <div className=" w-full h-full flex flex-col bg-[#f6f6f9] gap-2 min-h-dvh">
        <AdminHeader />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full min-h-full  bg-[#F2F2F2] flex flex-grow justify-center items-center "
        >
          <div className="flex flex-col gap-8 border-gray bg-[#ffffff] my-auto rounded-3xl w-[53rem] sd:p-32 p-14 pt-32 md:mt-28">
            <div className="flex w-full py-4 px-2 gap-4  items-center justify-center rounded-md select-none flex-col">
              <h2 className="text-4xl font-semibold mb-4">Sign In</h2>
              <p className="text-gray-600 mb-6">
                To login, kindly enter your email address and password.
              </p>
            </div>
            <div className="space-y-8">
              <div className="space-y-2 ">
                <label htmlFor="email" className="block text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="janedoe@xxx.com"
                  className="w-full px-4 py-6 border border-gray-300 outline-none rounded "
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
              <div className="space-y-2 relative">
                <label htmlFor="password" className="block text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type={type}
                  placeholder="Enter Your Password"
                  className="w-full border border-gray-300 px-4 outline-none rounded py-6 "
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <div className="absolute bottom-6 right-1 w-auto z-10 cursor-pointer ">
                  {showPassword ? (
                    <FaRegEyeSlash
                      className="text-4xl pr-2"
                      onClick={() => handleShowPwd("password")}
                    />
                  ) : (
                    <IoEyeOutline
                      className="text-4xl pr-2 "
                      onClick={() => handleShowPwd("text")}
                    />
                  )}
                </div>
                {errors.password && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="flex justify-between px-2">
                <span className="flex w-auto gap-4 items-center">
                  <input
                    type="checkbox"
                    className="bg-gray-400 flex mb-[4px]"
                  />
                  <span className="text-xl">Remember me</span>
                </span>
                <div className="w-[150px] max-w-[200px] bg-primary-light text-white font-semibold p-4 py-3 rounded-full hover:bg-primary-dark transition duration-300 flex gap-4 items-center justify-center cursor-pointer">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-4 w-full"
                  >
                    <HiMiniUserPlus className="text-4xl" />
                    <p className="select-none text-2xl font-thin">Login</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </ErrorBoundary>
  );
}

export default AdminLogin;
