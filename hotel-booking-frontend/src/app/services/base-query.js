import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../config/api";
import { setUserDetails } from "../store/slices/authSlice.js";

const bashQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = getState().auth.accessToken;
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
  credentials: "include",
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

    if (sessions) {
      const { accessToken, user } = sessions?.data;
      api.dispatch(setUserDetails({ accessToken, user }));

      const mainRequest = await bashQuery(args, api, extraOptions);
      console.log(mainRequest);
    }
  }
  return apiResponse;
};
