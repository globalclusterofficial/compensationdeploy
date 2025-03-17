import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useGetUserEarningsQuery } from "../features/user/userApiSlice.js";
import { useUser } from "../hooks/auth/useUser.js";

function RefererStatisticsGraph() {
  const [chartData, setChartData] = useState([]);
  const { user } = useUser();
  const {
    data: earnings,
    isLoading,
    isError,
  } = useGetUserEarningsQuery({ user_id: user?.profile?.user_id || "" });

  useEffect(() => {
    if (earnings) {
      const transformedData = Object.keys(earnings.monthly_earnings).map(
        (month) => ({
          month,
          value: earnings.monthly_earnings[month],
        }),
      );
      setChartData(transformedData);
    }
  }, [earnings]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div
      className="p-6 text-lg lg:text-lg"
      style={{ width: "100%", height: 300 }}
    >
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

export default RefererStatisticsGraph;
