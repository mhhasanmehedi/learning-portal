import { createSlice } from "@reduxjs/toolkit";

// initial State
const initialState = {
  accessToken: undefined,
  user: undefined,
  auth: undefined,
};

// create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.admin = undefined;
    },
    userLoggedOut: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
      state.admin = undefined;
    },
    adminLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.admin = action.payload.admin;
      state.user = undefined;
    },
    adminLoggedOut: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
      state.admin = undefined;
    },
  },
});

export const { userLoggedIn, userLoggedOut, adminLoggedIn, adminLoggedOut } =
  authSlice.actions;
export default authSlice.reducer;
