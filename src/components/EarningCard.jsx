import React from "react";
import PropTypes from "prop-types";
import { CgNotes } from "react-icons/cg";

function EarningCard({ amount, whichEarning }) {
  return (
    <div className="flex h-fit flex-1 flex-col gap-4 bg-primary-light  justify-between rounded-xl px-10 py-8 text-white">
      <div className="bg-red-500 p-4 rounded-full w-fit">
        <CgNotes className="text-3xl " />
      </div>

      <p className="font-semibold text-4xl">
        ₦ {amount > 0 ? amount.toLocaleString() : 0}
      </p>
      <p className="font-semibold">{whichEarning}</p>
      <div className="flex gap-4 items-center text-green-500 text-xl"></div>
    </div>
  );
}

EarningCard.propTypes = {
  amount: PropTypes.number,
  whichEarning: PropTypes.string,
};

export default EarningCard;
