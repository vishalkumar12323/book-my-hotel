import { Navigate, useLocation } from "react-router-dom";
import { protectedRoutes } from "../app/services/permissions.js";
import { session } from "../app/store/slices/authSlice.js";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ children }) => {
  const location = useLocation();
  const { user } = useSelector(session);

  const isAuthorized = user?.roles?.some((role) =>
    protectedRoutes[role]?.includes(location.pathname)
  );

  console.log(user.roles, location.pathname, isAuthorized);
  return isAuthorized ? children : <Navigate to={"/"} replace />;
};

export default ProtectedRoutes;
