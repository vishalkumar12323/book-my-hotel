import { Navigate, useLocation } from "react-router-dom";
import { protectedRoutes } from "../app/services/permissions.js";
import { session } from "../app/store/slices/authSlice.js";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ children, routes }) => {
  const location = useLocation();
  const {
    user: { roles },
  } = useSelector(session);

  const isAuthorized = roles.some((role) =>
    protectedRoutes[role].includes(location.pathname)
  );

  console.log(isAuthorized);
  return isAuthorized ? children : <Navigate to={"/"} replace />;
};

export default ProtectedRoutes;
