import { useSelector } from "react-redux";
import { session } from "../app/store/slices/authSlice";

const useAuthenticeRoute = () => {
  const { isLoggedIn } = useSelector(session);
};
