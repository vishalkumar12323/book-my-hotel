import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice.js";
import { hotelSlice } from "./slices/hotelSlice.js";
import { authApi } from "../services/authServices.js";
import { hotelApi } from "../services/hotelServices.js";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    hotelData: hotelSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [hotelApi.reducerPath]: hotelApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(hotelApi.middleware),
});
