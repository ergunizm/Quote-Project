import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    email: "",
    token: "",
    isLoggedIn: false,
  },
  reducers: {
    auth(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.isLoggedIn = true;
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: action.payload.email,
          token: action.payload.token,
          username: action.payload.username,
        })
      );
    },
    logout(state) {
      state.email = "";
      state.token = "";
      state.username = "";
      state.isLoggedIn = false;
      localStorage.clear();
    },
    getFromStorage(state) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (localStorage.getItem("user")) {
        state.email = user.email;
        state.token = user.token;
        state.username = user.username;
        state.isLoggedIn = true;
      }
    },
  },
});

export default userSlice;

export const userActions = userSlice.actions;
