import { Chart, LinearScale, PointElement, ScatterController } from "chart.js";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { dataState } from "../model/dataPoint";
import { randomColorFromLabel } from "../Utils";
import styles from "./ScatterPlot2d.module.scss";

const MIN = -180;
const MAX = 180;

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
          responsive: false,
          aspectRatio: 1,
          scales: {
            x: {
              type: "linear",
              position: "center",
              ticks: {
                callback: (val) => {
                  const [startLabel, endLabel] = getLabels(props.xData);
                  if (val === MIN) return startLabel;
                  if (val === MAX) return endLabel;
                  return "";
                },
              },
              min: MIN,
              max: MAX,
            },
            y: {
              type: "linear",
              position: "center",
              ticks: {
                callback: (val) => {
                  const [startLabel, endLabel] = getLabels(props.yData);
                  if (val === MIN) return startLabel;
                  if (val === MAX) return endLabel;
                  return "";
                },
              },
              min: MIN,
              max: MAX,
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
  return <canvas className={styles.canvas} ref={canvasRef} />;
}

export default ScatterPlot2d;
