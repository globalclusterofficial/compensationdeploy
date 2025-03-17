import React from "react";
import PropTypes from "prop-types";
import RowData from "./RowData";

function TopEarners({ memberName, userName, img, amount }) {
  return (
    <div className="">
      <RowData memberName={memberName} userName={userName} img={img}>
        <p className="text-green-500">N {amount}</p>
      </RowData>
    </div>
  );
}

TopEarners.propTypes = {
  memberName: PropTypes.string,
  userName: PropTypes.string,
  img: PropTypes.string,
  amount: PropTypes.number,
};

export default TopEarners;
