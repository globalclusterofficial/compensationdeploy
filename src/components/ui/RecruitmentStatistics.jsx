import React from "react";
import PropTypes from "prop-types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function RecruitmentStatistics({ data }) {
  // Reformat the data to the structure Recharts expects
  const chartData = data.labels.map((label, index) => ({
    month: label,
    value: data.values[index],
  }));

  return (
    <div className="p-6" style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="month"
            axisLine={{ stroke: "#E5E7EB", strokeWidth: 1 }}
            tickLine={false}
            dy={10}
            padding={{ left: 0, right: 0 }}
          />
          <YAxis
            axisLine={{ stroke: "#E5E7EB", strokeWidth: 1 }}
            tickLine={false}
            domain={[0, "dataMax + 10"]}
            padding={{ top: 20, bottom: 0 }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#0080ff"
            strokeWidth={2}
            dot={{ r: 4, fill: "#0080ff" }}
            activeDot={{ r: 6, fill: "#0080ff" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

RecruitmentStatistics.propTypes = {
  data: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    values: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
};

export default RecruitmentStatistics;
