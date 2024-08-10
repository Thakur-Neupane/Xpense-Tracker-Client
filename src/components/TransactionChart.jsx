import React, { useState } from "react";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import { Tab, Tabs } from "react-bootstrap";

// Register components
ChartJS.register(
  LineElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const TransactionChart = ({ data }) => {
  const [chartType, setChartType] = useState("bar");

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Income",
        data: data.income,
        backgroundColor:
          chartType === "bar" ? "rgba(0, 255, 0, 0.2)" : "rgba(0, 255, 0, 0.2)",
        borderColor: "green",
        borderWidth: chartType === "bar" ? 1 : 0,
        fill: chartType === "line" || chartType === "bar",
      },
      {
        label: "Expenses",
        data: data.expenses,
        backgroundColor:
          chartType === "bar" ? "rgba(255, 0, 0, 0.2)" : "rgba(255, 0, 0, 0.2)",
        borderColor: "red",
        borderWidth: chartType === "bar" ? 1 : 0,
        fill: chartType === "line" || chartType === "bar",
      },
    ],
  };

  const doughnutData = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Income vs Expenses",
        data: [
          data.income.reduce((a, b) => a + b, 0),
          data.expenses.reduce((a, b) => a + b, 0),
        ],
        backgroundColor: ["rgba(0, 255, 0, 0.2)", "rgba(255, 0, 0, 0.2)"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return <Bar data={chartData} options={options} />;
      case "pie":
        return <Pie data={chartData} options={options} />;
      case "doughnut":
        return <Doughnut data={doughnutData} options={options} />;
      default:
        return <Bar data={chartData} options={options} />;
    }
  };

  return (
    <div>
      <Tabs
        defaultActiveKey="bar"
        id="chart-tabs"
        className="mb-3"
        onSelect={(key) => setChartType(key)}
      >
        <Tab eventKey="bar" title="Bar Chart" />
        <Tab eventKey="pie" title="Pie Chart" />
        <Tab eventKey="doughnut" title="Doughnut Chart" />
      </Tabs>
      <div style={{ height: "400px" }}>{renderChart()}</div>
    </div>
  );
};

export default TransactionChart;
