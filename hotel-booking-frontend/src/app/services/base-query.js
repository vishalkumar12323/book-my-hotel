import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../config/api";
import { logout, setUserDetails } from "../store/slices/authSlice.js";
import { updateHotelsData } from "../store/slices/hotelSlice.js";

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

    if (sessions?.data) {
      const { accessToken, user } = sessions?.data;
      api.dispatch(setUserDetails({ accessToken, user: user.user }));

      const mainRequest = await bashQuery(args, api, extraOptions);
      const { data } = mainRequest;
      api.dispatch(
        updateHotelsData({ hotels: data, tHotels: 0, tRestaurants: 0 })
      );
    }
    if (sessions?.error) {
      api.dispatch(logout());
    }
  }
  return apiResponse;
};
