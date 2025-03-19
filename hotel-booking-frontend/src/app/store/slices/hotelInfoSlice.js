import { createSlice } from "@reduxjs/toolkit";

const hotelInfoState = {
  hotel: {},
};
export const hotelInfoSlice = createSlice({
  name: "hotel",
  initialState: hotelInfoState,
  reducers: {
    setHotelInfo: (state, { payload }) => {
      state.hotel = payload;
    },
  },
});

export const { setHotelInfo } = hotelInfoSlice.actions;
export const hotelData = (state) => state.hotel;
