import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchSingleQuote } from "../../store/quote-slice";
import Card from "../UI/Card";

import styles from "./SingleQuote.module.css";

const SingleQuote = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [quote, setQuote] = useState();
  const dispatch = useDispatch();
  const { quoteId } = useParams();

  useEffect(() => {
    const fetch = async () => {
      const clicked = await dispatch(fetchSingleQuote(quoteId));
      setQuote(clicked);
      setIsLoading(false);
    };

    fetch();
  }, [setQuote, dispatch, quoteId]);

  return (
    <Card>
      {isLoading && <Fragment>Loading Spinner</Fragment>}
      {!isLoading && quote && (
        <Fragment>
          <img
            className={styles.img}
            alt="imag"
            src="https://www.w3schools.com/bootstrap/paris.jpg"
          />
          <div className={styles.detail}>
            <h3>{quote.title}</h3>
            <p>{quote.description}</p>
            <p>{quote.author}</p>
          </div>
        </Fragment>
      )}
    </Card>
  );
};

export default SingleQuote;
