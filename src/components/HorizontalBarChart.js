import React, { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function BasicHorizontalBars(props) {
  const [chartData, setChartData] = useState([]);
  const [chartSeriesData, setChartSeriesData] = useState([]);

  useEffect(() => {
    let arr = [];
    let arr1 = [];
    for (let i = 0; i < props.data.length; i++) {
      arr.push(props.data[i].name);
      arr1.push(props.data[i].votes);
    }
    setChartData(arr);
    setChartSeriesData(arr1);
  }, [props]);

  return (
    <BarChart
      yAxis={[
        {
          scaleType: "band",
          data: chartData,
        },
      ]}
      layout="horizontal"
      series={[{ data: chartSeriesData }]}
      height={300}
    />
  );
}
