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
    updateHotelsData: (state, { payload }) => {
      state.hotels = payload.hotels;
      state.totalHotels = payload.tHotels;
      state.totelRestaurants = payload.tRestaurants;
    },
  },
});

export const { setHotelsData, updateHotelsData, setUsersBookings } =
  hotelSlice.actions;
export const hotelsData = (state) => state.hotelData;
