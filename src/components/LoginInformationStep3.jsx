import React from "react";
import PropTypes from "prop-types";

const LoginInformationStep3 = ({ register, errors, watch }) => {
  const password = watch("password");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="username">
          Username <span className="text-red-500">*</span>
        </label>
        <input
          className="py-6 px-2 border outline-none rounded-md"
          type="text"
          id="username"
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password">
          Password <span className="text-red-500">*</span>
        </label>
        <input
          className="py-6 px-2 border outline-none rounded-md"
          type="password"
          id="password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="confirmPassword">
          Confirm Password <span className="text-red-500">*</span>
        </label>
        <input
          className="py-6 px-2 border outline-none rounded-md"
          type="password"
          id="confirmPassword"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>
      <div className="flex gap-2">
        <input
          className="py-6 px-2"
          type="checkbox"
          id="terms"
          {...register("terms", {
            required: "You must accept the terms and conditions",
          })}
        />
        <label htmlFor="terms" className="uppercase">
          I accept terms and conditions <span className="text-red-500">*</span>
        </label>
        {errors.terms && <p className="text-red-500">{errors.terms.message}</p>}
      </div>
    </div>
  );
};

LoginInformationStep3.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  watch: PropTypes.func.isRequired,
};

export default LoginInformationStep3;
