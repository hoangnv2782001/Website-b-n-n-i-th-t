import { Box } from "@mui/material";
import React from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,

} from "chart.js";


import Chart from 'chart.js/auto';

const StatisticChart = ({revenue}) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  
  );
  return (
    <Box sx={{ marginTop: 5 }}>
      <Bar
        data={{
          labels: [
            "Tháng 1",
            "Tháng 2",
            "Tháng 3",
            "Tháng 4",
            "Tháng 5",
            "Tháng 6",
            "Tháng 7",
            "Tháng 8",
            "Tháng 9",
            "Tháng 10",
            "Tháng 11",
            "Tháng 12",

          ],
          datasets: [
            {
              label: "Doanh thu tháng",
              backgroundColor: [
                "#3e95cd",
                "#8e5ea2",
                "#3cba9f",
                "#e8c3b9",
                "#c45850",
                "#d458e0",
                "#c458g0",
                "#e45800",
                "#b45870",
                "#f4c3e9",
                "#e4e800",
                "#b4b870",
              ],
              data: revenue,
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: {
            display: true,
            text: "Doanh Thu Theo Tháng Trong Năm",
          },
        }}
      />
    </Box>
  );
};

export default StatisticChart;
