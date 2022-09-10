import { Link } from "react-router-dom";
import styles from "./QuoteItem.module.css";

const QuoteItem = (props) => {
  let description = props.description;
  if (props.description.length > 27) {
    description = props.description.slice(0, 27) + "...";
  }

  return (
    <Link className={styles.link} to={`${props.id}`}>
      <img
        className={styles.img}
        alt="imag"
        src="https://www.w3schools.com/bootstrap/paris.jpg"
      />
      <div className={styles.detail}>
        <h3>{props.title}</h3>
        <p>{description}</p>
        <p>{props.author}</p>
      </div>
    </Link>
  );
};

export default QuoteItem;
