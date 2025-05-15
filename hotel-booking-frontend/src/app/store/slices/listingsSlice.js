import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listings: [],
  totalHotels: 0,
  totelRestaurants: 0,
};

export const listingsSlice = createSlice({
  name: "listingsData",
  initialState,
  reducers: {
    setListingsData: (state, { payload }) => {
      const { listings } = payload;
      state.listings = listings.listings;
      state.totalHotels = listings.totalHotels;
      state.totelRestaurants = listings.totalRestaurants;
    },
    updateListingsData: (state, { payload }) => {
      const { listings } = payload;
      state.listings = listings.listings;
      state.totalHotels = listings.totalHotels;
      state.totelRestaurants = listings.totalRestaurants;
    },
  },
});

export const { setListingsData, updateListingsData } = listingsSlice.actions;
export const listingsData = (state) => state.listingsData;
