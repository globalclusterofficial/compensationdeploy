import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import HeaderSearch from "./../../components/HeaderSearch";
import { IoFilterSharp } from "react-icons/io5";
import { saveAs } from "file-saver";
import Papa from "papaparse";

function Filter({
  data = [],
  setDataFunction = () => {},
  showDownload = true,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [originalData, setOriginalData] = useState(data);

  useEffect(() => {
    setOriginalData(data);
  }, [data]);

  const handleSearch = (event) => {
    const value = event.target.value.trim().toLowerCase();
    setSearchTerm(value);

    console.log("Search Term:", value);

    if (value === "") {
      console.log("Resetting to original data:", originalData);
      setDataFunction(originalData);
    } else {
      const regex = new RegExp(value, "i");
      const filteredData = originalData.filter((item) =>
        Object.values(item).some(
          (val) => val !== null && regex.test(val.toString().toLowerCase()),
        ),
      );
      console.log("Filtered Data:", filteredData);
      setDataFunction(filteredData);
    }
  };

  const handleDownload = () => {
    if (data.length > 0) {
      const csv = Papa.unparse(data);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, "data.csv");
    }
  };

  return (
    <section className="flex flex-col lg:flex-row justify-between items-center">
      <div className="flex gap-8">
        <div className="border rounded-md">
          <HeaderSearch
            placeholder="Search for an entry"
            onChange={handleSearch}
            value={searchTerm}
          />
        </div>
        <div className="flex gap-6 items-center py-3 px-12 justify-center rounded-md font-bold border">
          <IoFilterSharp style={{ fontSize: "2rem" }} /> <p>Filter</p>
        </div>
      </div>
      {showDownload && (
        <div
          className="hidden lg:flex gap-6 items-center py-4 px-10 justify-center border font-bold rounded-md cursor-pointer"
          onClick={handleDownload}
        >
          <IoFilterSharp style={{ fontSize: "2rem" }} /> <p>Download</p>
        </div>
      )}
    </section>
  );
}

Filter.propTypes = {
  data: PropTypes.array,
  setDataFunction: PropTypes.func,
  showDownload: PropTypes.bool,
};

export default Filter;
