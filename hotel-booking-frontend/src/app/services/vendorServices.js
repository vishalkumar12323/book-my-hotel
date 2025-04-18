import { baseQueryWithReauth } from "./bashQuery.js";
import { createApi } from "@reduxjs/toolkit/query/react";

export const vendorServiceApi = createApi({
  reducerPath: "vendorServiceApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getListings: builder.query({
      query: (query) => {
        return {
          url: "/vendor/listings",
          method: "GET",
          params: query,
        };
      },
    }),
    getListing: builder.query({
      query: (listingId) => {
        return {
          url: `/vendor/listing/${listingId}`,
          method: "GET",
        };
      },
    }),
    createListing: builder.mutation({
      query: (listing) => {
        console.log(listing);
        return {
          url: "/vendor/listings",
          method: "POST",
          body: listing,
        };
      },
    }),
    updateListing: builder.mutation({
      query: ({ listingId, listing }) => {
        return {
          url: `/vendor/listing/${listingId}`,
          method: "PUT",
          body: listing,
        };
      },
    }),
    deleteListing: builder.query({
      query: (listingId) => {
        return {
          url: `/vendor/listing/${listingId}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useCreateListingMutation,
  useUpdateListingMutation,
  useDeleteListingQuery,
  useGetListingQuery,
  useGetListingsQuery,
} = vendorServiceApi;
