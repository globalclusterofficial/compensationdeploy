import React from "react";

// eslint-disable-next-line react/prop-types
const Notification = ({ message, type }) => {
  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`fixed top-5 right-5 ${bgColor} text-white px-4 py-2 rounded-md shadow-md`}
    >
      {message}
    </div>
  );
};

export default Notification;
