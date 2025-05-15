import { useSelector } from "react-redux";
import { session } from "../../app/store/slices/authSlice";
import { useHref, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export const AuthLayout = ({ children, isAuthenticated = true }) => {
  const { isLoggedIn } = useSelector(session);
  const navigate = useNavigate();
  const href = useHref();
  const param = useParams();
  useEffect(() => {
    if (isAuthenticated && isLoggedIn !== isAuthenticated) {
      switch (href) {
        case "customer-dashboard":
          navigate(href);
          break;
        case `vendor-dashboard`:
          navigate(href);
          break;
        case `admin-dashboard`:
          navigate(href);
          break;
        case `edit-list/${param?.listId}/${param?.listName}`:
          navigate(href);
          break;
        case `hotels/${param?.hotelId}/${param?.hotelName}`:
          navigate(href);
          break;
        default:
          navigate("/");
      }
    } else if (!isAuthenticated && isLoggedIn !== isAuthenticated) {
      if (href === "/register") {
        navigate("/register");
      } else {
        navigate("/login");
      }
    }
  }, [
    navigate,
    href,
    isAuthenticated,
    isLoggedIn,
    param?.hotelId,
    param?.listId,
    param?.hotelName,
    param?.listName,
  ]);
  return <>{children}</>;
};
