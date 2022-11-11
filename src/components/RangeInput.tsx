import { useField } from "formik";
import styles from "./RangeInput.module.scss";

export type RangeInputProps = {
  name: string;
  leftLabel: string;
  rightLabel: string;
};

function RangeInput(props: RangeInputProps): JSX.Element {
  const [field] = useField(props.name);

  return (
    <div className={styles.container}>
      <span>{props.leftLabel}</span>
      <input type="range" min="-166" max="166" {...field}></input>
      <span>{props.rightLabel}</span>
    </div>
  );
}

export default RangeInput;
