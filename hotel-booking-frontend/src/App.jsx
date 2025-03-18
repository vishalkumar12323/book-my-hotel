import { Outlet, useNavigate } from "react-router-dom";
import { useGetUserInfoQuery } from "./app/services/authServices.js";
import { useDispatch, useSelector } from "react-redux";
import { session, updateUserDetails } from "./app/store/slices/authSlice.js";
import { useEffect } from "react";

export default function App() {
  const { isLoggedIn } = useSelector(session);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useGetUserInfoQuery(undefined, {
    skip: !isLoggedIn,
  });

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(updateUserDetails(data));
    }
  }, [isLoggedIn, dispatch, data]);
  return <Outlet />;
}
