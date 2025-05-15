import { createSlice } from "@reduxjs/toolkit";

const listInfoState = {
  listing: {},
};
export const listingInfoSlice = createSlice({
  name: "listing",
  initialState: listInfoState,
  reducers: {
    setListingInfo: (state, { payload }) => {
      state.listing = payload;
    },
  },
});

export const { setListingInfo } = listingInfoSlice.actions;
export const listingData = (state) => state.listing;
