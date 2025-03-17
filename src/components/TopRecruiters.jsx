import React from "react";
import PropTypes from "prop-types";
import RowData from "./RowData";

function TopRecruiters({ memberName, userName, img, recruits }) {
  return (
    <div className="">
      <RowData memberName={memberName} userName={userName} img={img}>
        <p className="text-green-500">{recruits}</p>
      </RowData>
    </div>
  );
}

TopRecruiters.propTypes = {
  memberName: PropTypes.string,
  userName: PropTypes.string,
  img: PropTypes.string,
  recruits: PropTypes.number,
};

export default TopRecruiters;
