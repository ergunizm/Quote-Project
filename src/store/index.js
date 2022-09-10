import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user-slice";
import quotesSlice from "./quote-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: {
    quotes: quotesSlice.reducer,
    user: userSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;
