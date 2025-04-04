import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice.js";
import { hotelSlice } from "./slices/hotelSlice.js";
import { authApi } from "../services/authServices.js";
import { hotelApi } from "../services/hotelServices.js";
import { userBookingSlice } from "./slices/userBookingSlice.js";
import { hotelInfoSlice } from "./slices/hotelInfoSlice.js";
import { vendorServiceApi } from "../services/vendorServices.js";
import { vendorServiceSlice } from "./slices/vendorServiceSlice.js";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    hotelData: hotelSlice.reducer,
    hotel: hotelInfoSlice.reducer,
    bookings: userBookingSlice.reducer,
    vendorService: vendorServiceSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [hotelApi.reducerPath]: hotelApi.reducer,
    [vendorServiceApi.reducerPath]: vendorServiceApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(hotelApi.middleware)
      .concat(vendorServiceApi.middleware),
});
