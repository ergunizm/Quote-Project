import { useDispatch, useSelector } from "react-redux";
import { sendQuote } from "../store/quote-slice";
import QuoteForm from "../components/Quotes/QuoteForm";
import { useNavigate } from "react-router-dom";
import { uiActions } from "../store/ui-slice";

const NewQuote = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.user.username);

  const addQuoteHandler = async (data) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending",
        message: "Saving the Quote...",
      })
    );
    await dispatch(sendQuote(data));
    dispatch(uiActions.hideNotification());
    navigate("/");
  };

  return <QuoteForm onAdd={addQuoteHandler} author={username} />;
};

export default NewQuote;
