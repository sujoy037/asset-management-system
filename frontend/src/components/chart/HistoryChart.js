import React from "react";
import { Chart } from "react-google-charts";

const data = [
  ["Status", "Active/Inactive"],
  ["Active", 111],
  ["Inactive", 2]
];

// Optional
const options = {
  title: "History Status",
};

function HistoryChart() {
  return <Chart chartType="PieChart" data={data} options={options} />;
}

export default HistoryChart;