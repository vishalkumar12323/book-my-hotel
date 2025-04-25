import { useSelector } from "react-redux";
import { session } from "../../app/store/slices/authSlice.js";
import { protectedRoutes } from "../../app/services/permissions.js";
import { Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetUserInfoQuery } from "../../app/services/authServices.js";
import Loading from "../Loading.jsx";

export const ProtectedRouteLayout = ({ children }) => {
  const [showAlert, setShowAlert] = useState(false);
  const { isLoggedIn, user } = useSelector(session);
  const location = useLocation();
  const currentPath = location.pathname;
  const { isLoading } = useGetUserInfoQuery(undefined);

  const [hasAccess, setHasAccess] = useState(null);

  useEffect(() => {
    const checkPermissions = () => {
      if (!user) return false;

      const userRole = user?.roles || ["GUEST"];
      return userRole.some((role) => {
        const allowedRoutes = protectedRoutes[role] || [];
        return allowedRoutes.some((route) => {
          if (currentPath === route) return true;
          if (route.includes(":")) {
            const routePattern = route.replace(/:\w+/g, "[^/]+");
            return new RegExp(`^${routePattern}$`).test(currentPath);
          }
          return currentPath.startsWith(route);
        });
      });
    };
    const access = checkPermissions();
    setHasAccess(access);

    if (!access && user) {
      setShowAlert(true);
    }
  }, [user, currentPath]);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  if (isLoading || hasAccess === null) {
    return <Loading />;
  }
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (hasAccess === false) {
    return (
      <>
        {showAlert && (
          <div
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              backgroundColor: "#f44336",
              color: "white",
              padding: "15px",
              borderRadius: "4px",
              zIndex: 1000,
            }}
          >
            You don't have permission to access this page
          </div>
        )}
        <Navigate to="/" state={{ from: location }} replace />
      </>
    );
  }
  return <>{children}</>;
};
