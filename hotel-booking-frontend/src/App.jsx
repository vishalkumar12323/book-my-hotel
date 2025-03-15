import { Outlet } from "react-router-dom";
import { useGetUserInfoQuery } from "./app/services/authServices.js";
import { setUserDetails, session } from "./app/store/slices/authSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

export default function App() {
  const { isLoggedIn, accessToken } = useSelector(session);
  const { data: userInfo } = useGetUserInfoQuery(undefined, {
    skip: !isLoggedIn,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      dispatch(setUserDetails({ user: userInfo, accessToken }));
    }
  }, [isLoggedIn, userInfo, dispatch]);
  return <Outlet />;
}
