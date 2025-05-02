import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  [
    "Employee",
    "Admin",
    "ISD",
    "Madagascar",
    "Papua New Guinea",
    "Rwanda",
    "Average",
  ],
  ["2004/05", 165, 938, 522, 998, 450, 614.6],
  ["2005/06", 135, 1120, 599, 1268, 288, 682],
  ["2006/07", 157, 1167, 587, 807, 397, 623],
  
];

export const options = {
  title: "Yearly Role Status Creations",
  vAxis: { title: "Creation" },
  hAxis: { title: "Role" },
  seriesType: "bars",
  series: { 3: { type: "line" } },
};

export function ComboChart() {
  return (
    <Chart
      chartType="ComboChart"
      width="100%"
      height="100%"
      data={data}
      options={options}
    />
  );
}