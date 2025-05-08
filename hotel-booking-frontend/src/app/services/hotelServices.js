import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./bashQuery.js";

export const hotelApi = createApi({
  reducerPath: "hotelApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAvailableListings: builder.query({
      query: (query) => {
        return {
          url: "/listings/get-all-listings",
          method: "GET",
          params: { ...query },
        };
      },
    }),
    getUserBookings: builder.query({
      query: (status) => {
        return {
          url: `/shared/bookings/history/${status}`,
          method: "GET",
        };
      },
    }),
    getHotelById: builder.query({
      query: (hotelId) => {
        return {
          url: `/listings/listing/${hotelId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetAvailableListingsQuery,
  useGetUserBookingsQuery,
  useGetHotelByIdQuery,
} = hotelApi;
