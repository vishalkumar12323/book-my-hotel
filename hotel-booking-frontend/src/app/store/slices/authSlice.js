import { createSlice } from "@reduxjs/toolkit";

const loadAuthState = () => {
  try {
    const serializedState = sessionStorage.getItem("authState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log(err);
    return undefined;
  }
};
const initialState = loadAuthState() || {
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
      sessionStorage.removeItem("authState");
    },

    setUserDetails: (state, { payload }) => {
      state.isLoggedIn = payload.isLoggedIn || true;
      state.accessToken = payload.accessToken;
      state.user = {
        ...state.user,
        ...payload.user,
      };
      sessionStorage.setItem("authState", JSON.stringify(state));
    },
    updateUserDetails: (state, { payload }) => {
      state.user = { ...state.user, ...payload };
      sessionStorage.setItem("authState", JSON.stringify(state));
    },
  },
});

export const { logout, setUserDetails, updateUserDetails } = authSlice.actions;
export const session = (state) => state.auth;
