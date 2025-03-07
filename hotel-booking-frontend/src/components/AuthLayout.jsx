import React, { useEffect } from "react";
import { useNavigate, useHref, useParams } from "react-router-dom";
import { session } from "../app/store/slices/authSlice.js";
import { useDispatch, useSelector } from "react-redux";

export const AuthLayout = ({ children, isAuthenticated = true }) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(session);
  const navigate = useNavigate();
  const href = useHref();
  const param = useParams();
  useEffect(() => {
    if (isAuthenticated && isLoggedIn !== isAuthenticated) {
      switch (href) {
        case "/customer-dashboard":
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
