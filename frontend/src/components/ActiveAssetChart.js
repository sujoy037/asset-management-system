import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

// Register necessary chart components
Chart.register(...registerables);

const ActiveAssetChart = () => {
  const chartRef = useRef(null); // Reference for the canvas
  const chartInstance = useRef(null); // Store Chart instance to avoid duplication

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d'); // Get the canvas context

    // Destroy any existing chart instance to prevent overlapping
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Initialize the Chart
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['2014', '2015', '2016', '2017'], // X-axis labels
        datasets: [
          {
            label: 'Active Assets',
            data: [20, 35, 50, 65], // Example active asset data
            backgroundColor: '#1E88E5', // Blue color for bars
            borderColor: '#1565C0', // Border color (optional)
            borderWidth: 1, // Bar border thickness
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true, // Show legend for the dataset
            position: 'top',
          },
          title: {
            display: true,
            text: 'Active Assets Over the Years', // Chart title
            font: { size: 16 },
          },
        },
        scales: {
          y: {
            beginAtZero: true, // Start Y-axis at 0
            title: {
              display: true,
              text: 'Number of Active Assets',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Year',
            },
          },
        },
      },
    });

    // Cleanup the chart instance on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div style={{ width: '60%', margin: '0 auto' }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default ActiveAssetChart;
