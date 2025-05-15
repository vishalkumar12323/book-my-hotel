import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice.js";
import { listingsSlice } from "./slices/listingsSlice.js";
import { authApi } from "../services/authServices.js";
import { listingApi } from "../services/listingServices.js";
import { userBookingSlice } from "./slices/userBookingSlice.js";
import { listingInfoSlice } from "./slices/listingInfoSlice.js";
import { vendorServiceApi } from "../services/vendorServices.js";
import { vendorServiceSlice } from "./slices/vendorServiceSlice.js";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    listingsData: listingsSlice.reducer,
    listing: listingInfoSlice.reducer,
    bookings: userBookingSlice.reducer,
    vendorService: vendorServiceSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [listingApi.reducerPath]: listingApi.reducer,
    [vendorServiceApi.reducerPath]: vendorServiceApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(listingApi.middleware)
      .concat(vendorServiceApi.middleware),
});
