import { useRecoilState } from "recoil";
import { dataState } from "../model/dataPoint";
import styles from "./DataList.module.scss";

function DataList(): JSX.Element {
  const [data] = useRecoilState(dataState);

  return (
    <div className={styles.container}>
      {Object.values(data).map((dataPoint, index) => (
        <li key={index}>{dataPoint.name}</li>
      ))}
    </div>
  );
}

export default DataList;
