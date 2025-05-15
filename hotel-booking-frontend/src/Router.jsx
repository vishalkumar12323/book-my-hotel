import { lazy, Suspense } from "react";
import { store } from "./app/store/store.js";
import { Provider } from "react-redux";
import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRouteLayout } from "./components/auth/protected-route.jsx";
import { Loading, ErrorPage } from "./components";
import { AuthLayout } from "./components/auth/auth-layout.jsx";

const HomePage = lazy(() =>
  import("./pages/HomePage.jsx").then((m) => ({ default: m.HomePage }))
);
const LoginPage = lazy(() =>
  import("./pages/LoginPage").then((m) => ({ default: m.LoginPage }))
);
const RegisterPage = lazy(() =>
  import("./pages/RegisterPage").then((m) => ({ default: m.RegisterPage }))
);
const CustomerDashboard = lazy(() =>
  import("./pages/CustomerDashboard").then((m) => ({
    default: m.CustomerDashboard,
  }))
);
const VendorDashboard = lazy(() =>
  import("./pages/VendorDashboard").then((m) => ({
    default: m.VendorDashboard,
  }))
);
const EditListing = lazy(() =>
  import("./pages/EditListing.jsx").then((m) => ({ default: m.EditList }))
);

const AddListing = lazy(() =>
  import("./pages/AddListing.jsx").then((m) => ({ default: m.AddListing }))
);
const AboutPage = lazy(() =>
  import("./pages/AboutPage").then((m) => ({ default: m.AboutPage }))
);
const Hotel = lazy(() =>
  import("./pages/Hotel").then((m) => ({ default: m.Hotel }))
);

const withSuspense = (Component) => (
  <Suspense fallback={<Loading />}>{Component}</Suspense>
);

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
        element: withSuspense(
          <AuthLayout>
            <HomePage />
          </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: withSuspense(
          <AuthLayout isAuthenticated={false}>
            <LoginPage />
          </AuthLayout>
        ),
      },
      {
        path: "/register",
        element: withSuspense(
          <AuthLayout isAuthenticated={false}>
            <RegisterPage />
          </AuthLayout>
        ),
      },
      {
        path: "/about",
        element: withSuspense(
          <AuthLayout>
            <AboutPage />
          </AuthLayout>
        ),
      },
      {
        path: "/hotels/:hotelId/:hotelName",
        element: withSuspense(<Hotel />),
      },
      {
        path: "/my-bookings",
        element: withSuspense(
          <AuthLayout isAuthenticated>
            <ProtectedRouteLayout>
              <CustomerDashboard />
            </ProtectedRouteLayout>
          </AuthLayout>
        ),
      },
      {
        path: "/vendor-dashboard",
        element: withSuspense(
          <AuthLayout isAuthenticated>
            <ProtectedRouteLayout>
              <VendorDashboard />
            </ProtectedRouteLayout>
          </AuthLayout>
        ),
      },
      {
        path: "/edit-list/:listId/:listName",
        element: withSuspense(
          <AuthLayout isAuthenticated>
            <ProtectedRouteLayout>
              <EditListing />
            </ProtectedRouteLayout>
          </AuthLayout>
        ),
      },
      {
        path: "/add-new-listing",
        element: withSuspense(
          <AuthLayout isAuthenticated>
            <ProtectedRouteLayout>
              <AddListing />
            </ProtectedRouteLayout>
          </AuthLayout>
        ),
      },
      {
        path: "/admin-dashboard",
        element: withSuspense(
          <AuthLayout isAuthenticated>
            <ProtectedRouteLayout>
              <div>Admin Dashboard</div>
            </ProtectedRouteLayout>
          </AuthLayout>
        ),
      },
    ],
  },
]);
