import { Outlet } from "react-router-dom";
import { useGetUserInfoQuery } from "./app/services/authServices.js";
import { useDispatch, useSelector } from "react-redux";
import { session, updateUserDetails } from "./app/store/slices/authSlice.js";
import { useEffect, useState } from "react";
import { Navbar, Footer, AppInfoToast } from "./components";

export default function App() {
  const [showAppInfoToast, setShowAppInfoToast] = useState(false);
  const { isLoggedIn } = useSelector(session);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetUserInfoQuery(undefined, {
    skip: !isLoggedIn,
  });

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(updateUserDetails(data));
    }
  }, [isLoggedIn, dispatch, data]);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setTimeout(() => {
        setShowAppInfoToast(true);
      }, 2000);
      localStorage.setItem("hasVisited", "true");
    }

    return () => localStorage.removeItem("hasvisited");
  }, []);
  return (
    <>
      <Navbar />
      <Outlet />
      <div
        className={` absolute bottom-8 right-8 ${
          showAppInfoToast ? "opacity-100" : "opacity-0 hidden"
        } transition-opacity duration-500`}
      >
        <AppInfoToast setShowAppInfoToast={setShowAppInfoToast} />
      </div>
      <Footer />
    </>
  );
}
