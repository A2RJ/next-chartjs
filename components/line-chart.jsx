"use client";

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
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "Chart.js Line Chart - Multi Axis",
    },
    tooltip: {
      enabled: false,

      external: function (context) {
        let tooltipEl = document.getElementById("chartjs-tooltip-card");

        if (!tooltipEl) {
          tooltipEl = document.createElement("div");
          tooltipEl.id = "chartjs-tooltip-card";
          Object.assign(tooltipEl.style, {
            position: "absolute",
            opacity: 0,
            padding: "8px",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxShadow: "0px 3px 5px rgba(0,0,0,0.1)",
          });
          document.body.appendChild(tooltipEl);
        }

        const tooltipModel = context.tooltip;

        if (tooltipModel.opacity === 0) {
          tooltipEl.style.opacity = 0;
          return;
        }
        function getBody(bodyItem) {
          return bodyItem.lines;
        }
        if (tooltipModel.body) {
          const titleLines = tooltipModel.title || [];
          const bodyLines = tooltipModel.body.map(getBody);

          let innerHtml =
            "<div style='font-weight: bold; margin-bottom: 4px;'>";

          titleLines.forEach(function (title) {
            innerHtml += "<div>" + title + "</div>";
          });

          innerHtml += "</div>";
          bodyLines.forEach(function (body, i) {
            const colors = tooltipModel.labelColors[i];
            let style = "background:" + colors.backgroundColor;
            style += "; border-color:" + colors.borderColor;
            style += "; border-width: 2px";
            const span = '<span style="' + style + '">' + body + "</span>";
            innerHtml += "<div style='margin-bottom: 4px;'>" + span + "</div>";
          });

          tooltipEl.innerHTML = innerHtml;
        }

        const position = context.chart.canvas.getBoundingClientRect();

        tooltipEl.style.opacity = 1;
        tooltipEl.style.left =
          position.left + window.pageXOffset + tooltipModel.caretX + "px";
        tooltipEl.style.top =
          position.top + window.pageYOffset + tooltipModel.caretY + "px";
      },
    },
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
    },
    y1: {
      type: "linear",
      display: true,
      position: "right",
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      yAxisID: "y",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      yAxisID: "y1",
    },
  ],
};
export default function LineChart() {
  return <Line options={options} data={data} />;
}
