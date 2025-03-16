import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../config/api.js";

export const authApi = createApi({
  reducerPath: "authApi",
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
    login: builder.mutation({
      query: (credential) => ({
        url: "_auth/login",
        method: "POST",
        body: credential,
      }),
    }),

    register: builder.mutation({
      query: (credential) => ({
        url: "_auth/register",
        method: "POST",
        body: credential,
      }),
    }),

    getUserInfo: builder.query({
      query: () => ({
        url: "_auth/user-profile",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserInfoQuery, useLoginMutation, useRegisterMutation } =
  authApi;
