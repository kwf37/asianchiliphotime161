import { Chart, LinearScale, PointElement, ScatterController } from "chart.js";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { dataState } from "../model/dataPoint";
import { randomColorFromLabel } from "../Utils";

type AxisType = "muppetMan" | "truckRobot" | "pickupDelivery";

export type ScatterPlot2dProps = {
  xData: AxisType;
  yData: AxisType;
};

function ScatterPlot2d(props: ScatterPlot2dProps): JSX.Element {
  const [data] = useRecoilState(dataState);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  Chart.register(LinearScale, ScatterController, PointElement);

  const getLabels = (axis: AxisType) => {
    switch (axis) {
      case "muppetMan":
        return ["muppet", "man"];
      case "truckRobot":
        return ["truck", "robot"];
      case "pickupDelivery":
        return ["pickup", "delivery"];
    }
  };
  useEffect(() => {
    if (canvasRef.current !== null) {
      const myChart = new Chart(canvasRef.current, {
        type: "scatter",
        data: {
          datasets: [
            {
              data: Object.values(data),
              pointBackgroundColor: Object.values(data).map((val) =>
                randomColorFromLabel(val.name)
              ),
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: "linear",
              position: "center",
              ticks: {
                callback: (val) => {
                  const [startLabel, endLabel] = getLabels(props.xData);
                  if (val === -161) return startLabel;
                  if (val === 161) return endLabel;
                  return "";
                },
              },
              min: -161,
              max: 161,
            },
            y: {
              type: "linear",
              position: "center",
              ticks: {
                callback: (val) => {
                  const [startLabel, endLabel] = getLabels(props.yData);
                  if (val === -161) return startLabel;
                  if (val === 161) return endLabel;
                  return "";
                },
              },
              min: -161,
              max: 161,
            },
          },
          parsing: {
            xAxisKey: props.xData,
            yAxisKey: props.yData,
          },
        },
      });
      return () => myChart.destroy();
    }
  }, [canvasRef, props, data]);
  return <canvas ref={canvasRef} />;
}

export default ScatterPlot2d;
