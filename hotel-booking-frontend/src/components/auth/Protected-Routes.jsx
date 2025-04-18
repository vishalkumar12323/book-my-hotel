import { useLocation } from "react-router-dom";
import { protectedRoutes } from "../../app/services/permissions.js";
import { session } from "../../app/store/slices/authSlice.js";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ children }) => {
  const location = useLocation();
  const { user } = useSelector(session);

  const isAuthorized = user?.roles?.some((role) =>
    protectedRoutes[role]?.includes(location.pathname)
  );
  return isAuthorized && children;
};

export default ProtectedRoutes;
