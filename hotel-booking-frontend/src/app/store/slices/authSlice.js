import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../../config/api.js";
import axios from "axios";

export const register = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const reqUrl = `${API_BASE_URL}_auth/register`;
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(reqUrl, formData, config);
      console.log(data);
      localStorage.setItem("session-token", data.token);
    } catch (error) {
      console.log("user register error ", error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const reqUrl = `${API_BASE_URL}_auth/login`;
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(reqUrl, formData, config);
      localStorage.setItem("session-token", data.token);
    } catch (error) {
      console.log("user login error ", error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const initialState = {
  isLoading: false,
  isLoggedIn: localStorage.getItem("session-token") ? true : false,
  user: null,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("session-token"),
        (state.isLoading = false),
        (state.isLoggedIn = false),
        (state.user = null),
        (state.error = null);
    },

    setUserDetails: (state, { payload }) => {
      state.isLoggedIn = true;
      state.user = payload;
    },
  },
  extraReducers: (builder) => {
    // user signup reducers
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
      state.isLoggedIn = false;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.error = null;
    });
    builder.addCase(register.rejected, (state) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.error = action.error;
    });

    // user login reducers
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.isLoggedIn = false;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.error = null;
    });
    builder.addCase(login.rejected, (state) => {
      state.isLoading = true;
      state.isLoggedIn = false;
      state.error = action.error;
    });
  },
});

export const { logout, setUserDetails } = authSlice.actions;
export const session = (state) => state.auth;
