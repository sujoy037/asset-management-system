import React from "react";
import { Chart } from "react-google-charts";

const data = [
  ["Roles", "Assigns per year"],
  ["Employee", 110],
  ["ISD", 12],
  ["Officer", 2],
  
];

// Optional
const options = {
  title: "Total History Generation",
};

function HistoryAssignPieChart() {
  return <Chart chartType="PieChart" data={data} options={options} />;
}

export default HistoryAssignPieChart;