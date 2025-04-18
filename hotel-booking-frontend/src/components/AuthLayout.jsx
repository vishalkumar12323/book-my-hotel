import React, { useEffect } from "react";
import { useNavigate, useHref } from "react-router-dom";
import { session } from "../app/store/slices/authSlice.js";
import { useSelector } from "react-redux";

export const AuthLayout = ({ children, isAuthenticated = true }) => {
  const { isLoggedIn } = useSelector(session);
  const navigate = useNavigate();
  const href = useHref();
  useEffect(() => {
    if (isAuthenticated && isLoggedIn !== isAuthenticated) {
      switch (href) {
        case "/my-bookings":
          navigate(href);
          break;
        case `/vendor-dashboard`:
          navigate(href);
          break;
        case `/admin-dashboard`:
          navigate(href);
          break;
        default:
          navigate("/");
          break;
      }
    } else if (!isAuthenticated && isLoggedIn !== isAuthenticated) {
      if (href === "/register") {
        navigate("/register");
      } else {
        navigate("/login");
      }
    }
  }, [navigate, href, isAuthenticated]);
  return <>{children}</>;
};
