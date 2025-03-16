import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../config/api.js";

export const hotelApi = createApi({
  reducerPath: "hotelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const accessToken = getState().auth.accessToken;
      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
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
