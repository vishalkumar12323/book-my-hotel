import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./bashQuery.js";

export const listingApi = createApi({
  reducerPath: "listingApi",
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
      transformResponse: (response) => {
        const newResponse = {
          listings: response,
          totalHotels: response.filter((item) => item.type === "HOTEL").length,
          totalRestaurants: response.filter(
            (item) => item.type === "RESTAURANT"
          ).length,
        };
        return newResponse;
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
    getListingById: builder.query({
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
  useGetListingByIdQuery,
} = listingApi;
