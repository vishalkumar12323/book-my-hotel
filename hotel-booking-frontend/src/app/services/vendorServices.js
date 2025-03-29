import { baseQueryWithReauth } from "./bashQuery.js";
import { createApi } from "@reduxjs/toolkit/query/react";

export const vendorServiceApi = createApi({
  reducerPath: "vendorServiceApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    createListing: builder.mutation({
      query: (listing) => ({
        url: "/listings",
        method: "POST",
        body: listing,
      }),
    }),
    updateListing: builder.query({
      query: (listingId) => {
        return {
          url: `/listing/${listingId}`,
          method: "PUT",
        };
      },
    }),
    deleteListing: builder.query({
      query: (listingId) => {
        return {
          url: `/listing/${listingId}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useCreateListingMutation,
  useUpdateListingQuery,
  useDeleteListingQuery,
} = vendorServiceApi;
