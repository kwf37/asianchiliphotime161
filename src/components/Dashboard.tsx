import ScatterPlot2d from "./ScatterPlot2d";
import styles from "./Dashboard.module.scss";

function Dashboard() {
  return (
    <div className={styles.container}>
      <ScatterPlot2d xData="truckRobot" yData="muppetMan" />
      <ScatterPlot2d xData="truckRobot" yData="pickupDelivery" />
      <ScatterPlot2d xData="muppetMan" yData="pickupDelivery" />
    </div>
  );
}

export default Dashboard;
