import { Outlet, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "./components";
import { useGetUserInfoQuery } from "./app/services/authServices.js";
import { useDispatch, useSelector } from "react-redux";
import { session, setUserDetails } from "./app/store/slices/authSlice.js";
import { useEffect } from "react";

export default function App() {
  const { isLoggedIn } = useSelector(session);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useGetUserInfoQuery();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(setUserDetails(data));
    } else {
      navigate("/login");
    }
  }, [isLoggedIn, dispatch, data]);
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
