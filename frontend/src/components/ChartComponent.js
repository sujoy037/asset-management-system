import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

// Register necessary chart elements
Chart.register(...registerables);

const ChartComponent = () => {
  const chartRef = useRef(null); // Reference to the canvas element
  const chartInstance = useRef(null); // Store Chart instance

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d'); // Get canvas context

    // Destroy the chart instance if it already exists (to prevent duplicates)
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Data and options for the Chart.js bar chart
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['2014', '2015', '2016', '2017'],
        datasets: [
          {
            label: 'Assets',
            data: [10, 20, 30, 40],
            backgroundColor: '#1E88E5',
          },
          {
            label: 'Users',
            data: [15, 25, 35, 45],
            backgroundColor: '#5E35B1',
          },
          {
            label: 'Complaints',
            data: [5, 15, 25, 35],
            backgroundColor: '#F4511E',
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true },
        },
      },
    });

    // Cleanup on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default ChartComponent;
