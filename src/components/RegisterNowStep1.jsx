import React from "react";
import { useUser } from "../hooks/auth/useUser";
import useProfilePicture from "../hooks/useProfilePic.js";
import PropTypes from "prop-types";

function RegisterNowStep1({ setPosition, position }) {
  const { user } = useUser();
  const profilePicture = useProfilePicture();

  return (
    <div className="bg-white px-0 lg:px-20 py-8 justify-between flex-col gap-4">
      <h2 className="font-semibold text-4xl">Sponsor</h2>
      <div className="flex flex-col gap-8">
        <div className="flex gap-6 items-center">
          <div className="p-3 rounded-full w-fit h-fit overflow-hidden">
            <img
              src={profilePicture}
              alt="user profile"
              className="w-16 h-16 lg:w-44 lg:h-44 rounded-full object-cover"
            />
          </div>

          <div className="text-lg text-gray-500">
            <p>{user?.profile?.ref}</p>
            <p>{`${user?.profile?.name}`}</p>
          </div>
        </div>
        <div className="flex  gap-6 text-white">
          <p
            onClick={() => setPosition("left")}
            className={`lg:px-20 px-16 py-4 rounded-lg cursor-pointer ${position === "left" ? "bg-primary-light" : "bg-gray-500"}`}
          >
            Left
          </p>
          <p
            onClick={() => setPosition("right")}
            className={`lg:px-20 px-16 py-4 rounded-lg cursor-pointer ${position === "right" ? "bg-primary-light" : "bg-gray-500"}`}
          >
            Right
          </p>
        </div>
      </div>
    </div>
  );
}

RegisterNowStep1.propTypes = {
  setPosition: PropTypes.func.isRequired,
  position: PropTypes.string.isRequired,
};

export default RegisterNowStep1;
