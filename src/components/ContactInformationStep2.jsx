import React from "react";
import PropTypes from "prop-types";
import countries from "../lib/countries.json";
import genders from "../lib/genders.json";

const ContactInformationStep2 = ({ register, errors }) => {
  return (
    <div className="mx-auto my-6 text-gray-500">
      <div className="flex gap-2">
        <div className="flex flex-col gap-2 w-1/2">
          <label className="p-2" htmlFor="first_name">
            First Name
          </label>
          <input
            className="p-6 border outline-none rounded-md"
            type="text"
            id="first_name"
            {...register("first_name", { required: "First Name is required" })}
          />
          {errors.firstName && (
            <p className="text-red-500">{errors.firstName.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <label className="p-2" htmlFor="last_name">
            Last Name
          </label>
          <input
            className="p-6 border outline-none rounded-md"
            type="text"
            id="last_name"
            {...register("last_name", { required: "Last Name is required" })}
          />
          {errors.lastName && (
            <p className="text-red-500">{errors.lastName.message}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="p-2" htmlFor="gender">
          Gender
        </label>
        <select
          className="p-6 border outline-none rounded-md"
          id="gender"
          {...register("gender", { required: "Gender is required" })}
        >
          {genders.genders.gender.map((gender, index) => (
            <option key={index} value={gender.sex.toLowerCase()}>
              {gender.sex}
            </option>
          ))}
        </select>
        {errors.gender && (
          <p className="text-red-500">{errors.gender.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label className="p-2" htmlFor="email">
          Email Address
        </label>
        <input
          className="p-6 border outline-none rounded-md"
          type="email"
          id="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <label className="p-2" htmlFor="address">
          Address
        </label>
        <input
          className="p-6 border outline-none rounded-md"
          type="text"
          id="address"
          {...register("address", { required: "Address is required" })}
        />
        {errors.address && (
          <p className="text-red-500">{errors.address.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label className="p-2" htmlFor="country">
          Country
        </label>
        <select
          id="country"
          className="p-6 border outline-none rounded-md"
          {...register("country", { required: "Country is required" })}
        >
          {countries.countries.country.map((country, index) => (
            <option key={index} value={country.countryName}>
              {country.countryName}
            </option>
          ))}
        </select>
        {errors.country && (
          <p className="text-red-500">{errors.country.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label className="p-2" htmlFor="state">
          State
        </label>
        <input
          className="p-6 border outline-none rounded-md"
          type="text"
          id="state"
          {...register("state", { required: "State is required" })}
        />
        {errors.state && <p className="text-red-500">{errors.state.message}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <label className="p-2" htmlFor="city">
          City
        </label>
        <input
          className="p-6 border outline-none rounded-md"
          type="text"
          id="city"
          {...register("city", { required: "city is required" })}
        />
        {errors.state && <p className="text-red-500">{errors.state.message}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <label className="p-2" htmlFor="phone_number">
          Phone No
        </label>
        <input
          className="p-6 border outline-none rounded-md"
          type="tel"
          id="phone_number"
          {...register("phone_number", {
            required: "Phone number is required",
          })}
        />
        {errors.phone_number && (
          <p className="text-red-500">{errors.phone_number.message}</p>
        )}
      </div>
    </div>
  );
};

ContactInformationStep2.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default ContactInformationStep2;
