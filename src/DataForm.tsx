import { Field, Form, Formik } from "formik";
import { useRecoilState } from "recoil";
import RangeInput from "./components/RangeInput";
import styles from "./DataForm.module.scss";
import { dataState } from "./model/dataPoint";
import { v4 as uuidv4 } from "uuid";

function DataForm() {
  const [data, setData] = useRecoilState(dataState);

  return (
    <Formik
      initialValues={{
        name: "",
        truckRobot: 0,
        muppetMan: 0,
        pickupDelivery: 0,
      }}
      onSubmit={(values) => {
        const id = uuidv4();
        setData({
          ...data,
          [id]: values,
        });
      }}
    >
      <Form className={styles.form}>
        <label>
          Name
          <Field name="name" type="text" />
        </label>
        <RangeInput name="truckRobot" leftLabel="Truck" rightLabel="Robot" />
        <RangeInput name="muppetMan" leftLabel="Muppet" rightLabel="Man" />
        <RangeInput
          name="pickupDelivery"
          leftLabel="Pickup"
          rightLabel="Delivery"
        />
        <button type="submit">Save</button>
      </Form>
    </Formik>
  );
}

export default DataForm;
