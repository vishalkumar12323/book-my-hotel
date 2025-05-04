import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../config";
import { logout, setUserDetails } from "../store/slices/authSlice.js";

const bashQuery = fetchBaseQuery({
  baseUrl: config.api_base_url,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = getState().auth.accessToken;
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
  credentials: "include",
  mode: "no-cors",
});
export const baseQueryWithReauth = async (args, api, extraOptions) => {
  const apiResponse = await bashQuery(args, api, extraOptions);

  if (
    apiResponse?.error?.status === 401 ||
    apiResponse?.error?.status === 403
  ) {
    const sessions = await bashQuery(
      {
        url: "_auth/refresh-session",
        method: "POST",
      },
      api,
      extraOptions
    );

    if (sessions?.data) {
      const { accessToken, user } = sessions?.data;
      api.dispatch(setUserDetails({ accessToken, user, isLoggedIn: true }));
    }
    if (sessions?.error) {
      api.dispatch(logout());
    }
  }
  return apiResponse;
};
