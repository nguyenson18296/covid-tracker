import React from "react";
import { Line } from "react-chartjs-2";

export interface IChartData {
  id: string;
  country: string;
  total_confirm: number;
  total_deaths: number;
}

interface IChartVisualization {
  data?: IChartData[];
}

const ChartVisualization: React.FC<IChartVisualization> = ({ data }) => {

  return (
    <Line
      datasetIdKey="id"
      data={{
        labels: data.map(item => item.country),
        datasets: [
          {
            label: "Total Confirm",
            data: data.map(item => item.total_confirm),
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
          {
            label: "Total Deaths",
            data: data.map(item => item.total_deaths),
            fill: false,
            borderColor: "rgb(245, 66, 132)",
            tension: 0.1,
          },
        ],
      }}
    />
  );
};

export default ChartVisualization;
