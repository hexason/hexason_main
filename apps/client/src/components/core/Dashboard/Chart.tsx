import ApexCharts from "apexcharts";
import { useEffect } from "react";

export const Chart = ({ series }: { series: number[] }) => {
  useEffect(() => {
    let chart = (window as any).myChart;
    if (chart) chart.destroy();
    chart = new ApexCharts(document.querySelector("#chart"), {
      chart: {
        type: 'line',
        toolbar: {
          show: false
        },
        events: {
          dataPointMouseEnter: function () {
            return false; // Disable hover data
          }
        }
      },
      series: [{
        name: 'data',
        data: series
      }],
      xaxis: {
        labels: {
          show: false // Hide x-axis labels
        },
        axisBorder: {
          show: false // Hide x-axis line
        },
        axisTicks: {
          show: false // Hide x-axis ticks
        }
      },
      yaxis: {
        labels: {
          show: false // Hide y-axis labels
        },
        axisBorder: {
          show: false // Hide y-axis line
        },
        axisTicks: {
          show: false // Hide y-axis ticks
        }
      },
      stroke: {
        curve: 'smooth',
      },
      markers: {
        show: false // Hide the data point markers
      },
      dataLabels: {
        enabled: false // Set to false to hide the labels
      },
      grid: {
        show: false
      }
    })
    chart.render();
    (window as any).myChart = chart;
  }, [series])

  return (<div id="chart"></div>)
}