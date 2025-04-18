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
      state.pandingBookings = payload;
    },
    setConfirmedBookings: (state, { payload }) => {
      state.confirmedBookings = payload;
    },
    setCancelledBookings: (state, { payload }) => {
      state.cancelledBookings = payload;
    },
  },
});

export const {
  setCancelledBookings,
  setConfirmedBookings,
  setPandingBookings,
} = userBookingSlice.actions;

export const bookings = (state) => state.bookings;
