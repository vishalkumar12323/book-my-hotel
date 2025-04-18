import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listings: [],
  listing: null,
};

export const vendorServiceSlice = createSlice({
  name: "vendorService",
  initialState,
  reducers: {
    setListings: (state, { payload }) => {
      state.listings = payload;
    },
    setListing: (state, { payload }) => {
      state.listing = payload;
    },
  },
});

export const { setListings, setListing } = vendorServiceSlice.actions;
export const selectListings = (state) => state.vendorService;
