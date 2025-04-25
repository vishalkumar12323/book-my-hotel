import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  accessToken: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      (state.isLoggedIn = false),
        (state.user = null),
        (state.accessToken = null);
    },

    setUserDetails: (state, { payload }) => {
      state.isLoggedIn = payload.isLoggedIn || true;
      state.accessToken = payload.accessToken;
      state.user = {
        ...state.user,
        ...payload.user,
      };
    },
    updateUserDetails: (state, { payload }) => {
      state.user = { ...state.user, ...payload };
    },
  },
});

export const { logout, setUserDetails, updateUserDetails } = authSlice.actions;
export const session = (state) => state.auth;
