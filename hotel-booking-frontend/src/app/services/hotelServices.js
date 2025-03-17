import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./base-query.js";

export const hotelApi = createApi({
  reducerPath: "hotelApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAvailableListings: builder.query({
      query: (query) => {
        return {
          url: "/listings",
          method: "GET",
          params: { ...query },
        };
      },
    }),
    getUserBookings: builder.query({
      query: (status) => {
        return {
          url: `/bookings/history/${status}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAvailableListingsQuery, useGetUserBookingsQuery } =
  hotelApi;
