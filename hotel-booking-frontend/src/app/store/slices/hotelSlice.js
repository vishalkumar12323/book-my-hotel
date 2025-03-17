import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hotels: [],
  totalHotels: 0,
  totelRestaurants: 0,
};

export const hotelSlice = createSlice({
  name: "hotelData",
  initialState,
  reducers: {
    setHotelsData: (state, { payload }) => {
      state.hotels = payload.hotels;
      state.totalHotels = payload.tHotels;
      state.totelRestaurants = payload.tRestaurants;
    },
    updateHotelsData: (state, { payload }) => {},
  },
});

export const { setHotelsData, updateHotelsData } = hotelSlice.actions;
export const data = (state) => state.hotels;
