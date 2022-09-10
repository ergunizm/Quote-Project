import styles from "./Notification.module.css";

const Notification = (props) => {
  const classes = `${styles.notification} ${
    props.status === "error" ? styles.error : ""
  }`;

  return (
    <section className={classes}>
      <h2>{props.title}</h2>
      <p>{props.message}</p>
    </section>
  );
};

export default Notification;
