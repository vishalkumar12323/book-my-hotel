import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./bashQuery.js";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credential) => ({
        url: "_auth/login",
        method: "POST",
        body: credential,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    register: builder.mutation({
      query: (credential) => ({
        url: "_auth/signup",
        method: "POST",
        body: credential,
        headers: {
          "Content-Type": "application/json",
        },
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
