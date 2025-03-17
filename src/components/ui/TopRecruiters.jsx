import React from "react";
import PropTypes from "prop-types";

function TopRecruiters({ title, data }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <ul>
        {data.map((recruiter, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <img
                src={recruiter.avatar}
                alt={recruiter.name}
                className="w-8 h-8 rounded-full mr-4"
              />
              <div>
                <p className="font-semibold">{recruiter.name}</p>
                <p className="text-sm text-gray-500">{recruiter.role}</p>
              </div>
            </div>
            <span className="bg-blue-100 text-blue-900 px-2 py-1 rounded-full">
              {recruiter.recruits}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

TopRecruiters.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default TopRecruiters;
