import React from 'react';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  Tooltip
} from "chart.js";

import Chart from "./components/Visualizations/ChartContainer";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  Tooltip
);

function App() {

  return (
    <div className="App">
      <Chart />
    </div>
  );
}

export default App;
