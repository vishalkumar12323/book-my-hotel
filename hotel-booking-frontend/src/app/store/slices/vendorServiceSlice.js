import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listings: [],
  listing: null,
  loading: false,
  error: null,
};

export const vendorServiceSlice = createSlice({
  name: "vendorService",
  initialState,
  reducers: {
    setListings: (state, action) => {
      state.listings = action.payload;
    },
    setListing: (state, action) => {
      state.listing = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setListings, setListing, setLoading, setError } =
  vendorServiceSlice.actions;
export const selectListings = (state) => state.vendorService;
