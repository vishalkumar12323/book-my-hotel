import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pandingBookings: [],
  confirmedBookings: [],
  cancelledBookings: [],
};

export const userBookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setPandingBookings: (state, { payload }) => {
      console.log("panding ", payload);
    },
    setConfirmedBookings: (state, { payload }) => {
      console.log("confirmed ", payload);
    },
    setCancelledBookings: (state, { payload }) => {
      console.log("calcelled ", payload);
    },
  },
});

export const {
  setCancelledBookings,
  setConfirmedBookings,
  setPandingBookings,
} = userBookingSlice.actions;

export const bookings = (state) => state.bookings;
