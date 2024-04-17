import React, { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";



export default function BasicPie(props) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    console.log(props);
    let arr = [];
    for (let i = 0; i < props.data.length; i++) {
      arr.push({
        id: props.data[i].id,
        value: props.data[i].votes,
        label: props.data[i].name,
      });
    }
    setChartData(arr);
  }, [props]);

  return (
    <PieChart
      series={[
        {
          data: chartData,
        },
      ]}
      width={500}
      height={200}
    />
  );
}
