import React from "react";
import PropTypes from "prop-types";
import { FaSearch } from "react-icons/fa";

function HeaderSearch({
  placeholder = "Search here....",
  onChange = () => {},
  value = "",
}) {
  return (
    <div className="flex gap-6 bg-white py-5 px-4 rounded-lg items-center w-full lg:w-auto">
      <FaSearch style={{ color: "#0369a1", fontSize: "1.5rem" }} />
      <input
        className="w-full outline-none border-none"
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

HeaderSearch.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default HeaderSearch;
