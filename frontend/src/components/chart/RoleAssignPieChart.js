import React from "react";
import { Chart } from "react-google-charts";

const data = [
  ["Roles", "Registration per year"],
  ["Employee", 110],
  ["ISD", 12],
  ["Officer", 2],
  
];

// Optional
const options = {
  title: "Total Role Assign",
};

function RoleAssignPieChart() {
  return <Chart chartType="PieChart" data={data} options={options} />;
}

export default RoleAssignPieChart;