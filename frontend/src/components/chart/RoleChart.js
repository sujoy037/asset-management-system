import React from "react";
import { Chart } from "react-google-charts";

const data = [
  ["Status", "Active/Inactive"],
  ["Active", 111],
  ["Inactive", 2]
];

// Optional
const options = {
  title: "Roles Status",
};

function RoleChart() {
  return <Chart chartType="PieChart" data={data} options={options} />;
}

export default RoleChart;