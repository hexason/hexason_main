import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

export default function Status() {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    const myChartRef = document.getElementById("tesss") as any;
    let dates = new Array(7).fill(0).map((_, i) => `2021-01-${i + 1}`);
    // change the dates to be the last 7 days
    dates = dates.map((date) => {
      const d = new Date(date);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    });

    const myChart = new Chart(myChartRef, {
      type: "line",
      data: {
        //Bring in data
        labels: dates,
        datasets: [
          {
            label: "Earned",
            data: [0,0,0,0,0,0,0],
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