import React from "react";
import PropTypes from "prop-types";

function BonusCard({ title, amount }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <h3 className="text-lg font-semibold text-gray-500">{title}</h3>
      <p className="text-2xl font-bold text-blue-900">{amount}</p>
    </div>
  );
}

BonusCard.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};

export default BonusCard;
