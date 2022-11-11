import styles from "./Layout.module.scss";

export type LayoutProps = {
  drawer: React.ReactNode;
  main: React.ReactNode;
};

function Layout(props: LayoutProps): JSX.Element {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.drawer}>{props.drawer}</div>
        <div className={styles.main}>{props.main}</div>
      </div>
    </>
  );
}

export default Layout;
