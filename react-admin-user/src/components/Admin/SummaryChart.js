// SummaryChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SummaryChart = ({ summary }) => {
  // Prepare data for the chart
  const data = {
    labels: ['Total Products', 'Total Order Price', 'Total Users'],
    datasets: [
      {
        label: 'Statistics',
        data: [
          summary.totalProductCount,
          summary.totalOrderPrice,
          summary.totalUsers,
        ],
        backgroundColor: [
          'rgba(76, 175, 80, 0.6)', // Green for Total Products
          'rgba(33, 150, 243, 0.6)', // Blue for Total Order Price
          'rgba(255, 152, 0, 0.6)', // Orange for Total Users
        ],
        borderColor: [
          'rgba(76, 175, 80, 1)', // Green
          'rgba(33, 150, 243, 1)', // Blue
          'rgba(255, 152, 0, 1)', // Orange
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Summary Statistics',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default SummaryChart;
