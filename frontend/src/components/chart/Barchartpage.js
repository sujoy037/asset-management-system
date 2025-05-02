import React from 'react'
import { Chart } from "react-google-charts";

const Barchartpage = () => {
    const data = [
        ["Year", "Asset", "User" ,"Officer" ,"Complaint"],
        ["2014", 1000, 400,700,100],
        ["2015", 1170, 460 ,800,200],
        ["2016", 660, 1120,400,200],
        ["2017", 1030, 540,100,300],
      ];

     // Material chart options
    const options = {
    chart: {
      title: "Performance",
      subtitle: "Asset Registration,User Registration,Officer Registration and Complaint Registration over the Years",
    },
     }; 

  return (
    <Chart
    // Note the usage of Bar and not BarChart for the material version
    chartType="Bar"
    data={data}
    options={options}
  />
  )
}

export default Barchartpage