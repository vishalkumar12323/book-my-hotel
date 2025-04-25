import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ErrorPage, AddListing } from "./components";
import { CustomerDashboard } from "./pages/CustomerDashboard";
import { VendorDashboard } from "./pages/VendorDashboard";
import { EditList } from "./pages/EditList.jsx";
import { AboutPage } from "./pages/AboutPage.jsx";
import { store } from "./app/store/store.js";
import { Provider } from "react-redux";
import { Hotel } from "./pages/Hotel.jsx";
import { AuthLayout } from "./components/auth/auth-layout.jsx";
import { ProtectedRouteLayout } from "./components/auth/protected-route.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Provider store={store}>
        <App />
      </Provider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",

        element: (
          // <AuthLayout>
          <HomePage />
          // </AuthLayout>
        ),
      },
      {
        path: "/about",
        element: (
          // <AuthLayout>
          <AboutPage />
          // </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          // <AuthLayout isAuthenticated={false}>
          <LoginPage />
          // </AuthLayout>
        ),
      },
      {
        path: "/register",
        element: (
          // <AuthLayout isAuthenticated={false}>
          <RegisterPage />
          // </AuthLayout>
        ),
      },
      {
        path: "/my-bookings",
        element: (
          // <AuthLayout isAuthenticated>
          <ProtectedRouteLayout>
            <CustomerDashboard />
          </ProtectedRouteLayout>
          // </AuthLayout>
        ),
      },
      {
        path: "/vendor-dashboard",
        element: (
          // <AuthLayout isAuthenticated>
          <ProtectedRouteLayout>
            <VendorDashboard />
          </ProtectedRouteLayout>
          // </AuthLayout>
        ),
      },
      {
        path: "/edit-list/:listId/:listName",
        element: (
          // <AuthLayout isAuthenticated>
          <ProtectedRouteLayout>
            <EditList />
          </ProtectedRouteLayout>
          // </AuthLayout>
        ),
      },
      {
        path: "/add-new-listing",
        element: (
          // <AuthLayout isAuthenticated>
          <ProtectedRouteLayout>
            <AddListing />
          </ProtectedRouteLayout>
          // </AuthLayout>
        ),
      },
      {
        path: "/hotels/:hotelId/:hotelName",
        element: <Hotel />,
      },
    ],
  },
]);
