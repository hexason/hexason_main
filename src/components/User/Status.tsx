import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

export default function Status({dates}:any) {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    const myChartRef = document.getElementById("tesss") as any;
    // change the dates to be the last 7 days
    if(!dates) {
      dates = new Array(7).fill(0).map((_, i) => `2021-01-${i + 1}`).map((date) => {
        const d = new Date(date);
        return { 
          date: d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        value: 0,
      }  
      });
    }
    const myChart = new Chart(myChartRef, {
      type: "line",
      data: {
        //Bring in data
        labels: dates.map(({date}:any)=> date),
        datasets: [
          {
            label: "Earned",
            data: dates.map(({value}:any)=> value),
            fill: true,
            backgroundColor: "teal",
            borderColor: "teal",
            tension: 0.2,
            pointRadius: 0

          },
        ],
      },
      options: {
        //Customize chart options
      },
    });
    return () => {
      // cleanup
      myChart.destroy();
    }
  }, []);

  return (
    <div>
      <canvas id="tesss" ref={chartRef} />
    </div>
  );
}