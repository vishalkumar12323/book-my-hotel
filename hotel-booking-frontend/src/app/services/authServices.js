import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./base-query.js";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
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
