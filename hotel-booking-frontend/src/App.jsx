import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useGetUserInfoQuery } from "./app/services/authServices.js";
import { useDispatch, useSelector } from "react-redux";
import { session, updateUserDetails } from "./app/store/slices/authSlice.js";
import { useEffect, useState } from "react";
import { Navbar, Footer, AppInfoToast } from "./components";

export default function App() {
  const [showAppInfoToast, setShowAppInfoToast] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isSuccess, isError } = useGetUserInfoQuery(undefined);

  useEffect(() => {
    if (!isInitialized && (isSuccess || isError)) {
      if (isSuccess && data) {
        dispatch(updateUserDetails(data));

        const intendedPath = location.state?.from || location.pathname;

        if (
          intendedPath &&
          intendedPath !== "/login" &&
          intendedPath !== "/register"
        ) {
          navigate(intendedPath, { replace: true });
        }
      }
      setIsInitialized(true);
    }
  }, [isSuccess, isError, isInitialized, dispatch, data, navigate, location]);

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
        className={`fixed bottom-8 right-8 ${
          showAppInfoToast ? "opacity-100 block" : "opacity-0 hidden"
        } transition-opacity duration-500`}
      >
        <AppInfoToast setShowAppInfoToast={setShowAppInfoToast} />
      </div>
      <Footer />
    </>
  );
}
