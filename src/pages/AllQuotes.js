import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuoteList from "../components/Quotes/QuoteList";
import { fetchQuotes } from "../store/quote-slice";

const AllQuotes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuotes());
  }, [dispatch]);

  const quotes = useSelector((state) => state.quotes.items);

  return <QuoteList quotes={quotes} />;
};

export default AllQuotes;
