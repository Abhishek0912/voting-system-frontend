import React, { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function BasicBars(props) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    let arr = [];
    for (let i = 0; i < props.data.length; i++) {
      arr.push({ data: [props.data[i].votes], label: props.data[i].name });
    }
    setChartData(arr);
  }, [props]);

  return (
    <BarChart
      xAxis={[
        {
          scaleType: "band",
          data: [""],
        },
      ]}
      series={chartData}
      width={600}
      height={300}
    />
  );
}
