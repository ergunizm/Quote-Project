import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const quotesSlice = createSlice({
  name: "quotes",
  initialState: {
    items: [],
  },
  reducers: {
    getQuotes(state, action) {
      state.items = action.payload.items;
    },
  },
});

export const fetchQuotes = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const res = await fetch(
        "https://react-2b40a-default-rtdb.firebaseio.com/quotes.json"
      );
      if (!res.ok) {
        throw new Error("Could not get the Quotes, please try again later");
      }
      const data = await res.json();
      return data;
    };

    try {
      const quoteData = await fetchData();
      dispatch(quotesSlice.actions.getQuotes({ items: quoteData || [] }));
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Something went wrong!",
          message: err.message,
        })
      );
    }
  };
};

export const sendQuote = (addData) => {
  return async (dispatch) => {
    const sendData = async (comingData) => {
      const res = await fetch(
        "https://react-2b40a-default-rtdb.firebaseio.com/quotes.json",
        {
          method: "POST",
          body: JSON.stringify(comingData),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Could not upload the Quote, please try again later");
      }
      const data = await res.json();
      return data;
    };

    try {
      await sendData(addData);
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Something went wrong!",
          message: err.message,
        })
      );
    }
  };
};

export const fetchSingleQuote = (quoteId) => {
  return async (dispatch) => {
    const fetchOne = async (id) => {
      const res = await fetch(
        "https://react-2b40a-default-rtdb.firebaseio.com/quotes.json"
      );
      if (!res.ok) {
        throw new Error("Could not get this Quote");
      }
      const data = await res.json();
      for (const value of Object.values(Object.entries(data))) {
        if (value[1].id === quoteId) {
          return value[1];
        }
      }
      return null;
    };

    try {
      const quote = await fetchOne(quoteId);
      return quote;
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Something went wrong!",
          message: err.message,
        })
      );
    }
  };
};

export default quotesSlice;

export const quotesActions = quotesSlice.actions;
