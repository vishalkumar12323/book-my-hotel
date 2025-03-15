import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import { ErrorPage, Navbar, Footer, ProtectedRoutes } from "./components";
import { AuthLayout } from "./components/AuthLayout";
import { store } from "./app/store/store.js";
import { Provider } from "react-redux";

import {
  AboutPage,
  AdminDashboard,
  CustomerDashboard,
  HomePage,
  LoginPage,
  RegisterPage,
  VendorDashboard,
} from "./pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Provider store={store}>
        <Navbar />
        <App />
        <Footer />
      </Provider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout isAuthenticated={false}>
            <LoginPage />
          </AuthLayout>
        ),
      },
      {
        path: "/register",
        element: (
          <AuthLayout isAuthenticated={false}>
            <RegisterPage />
          </AuthLayout>
        ),
      },
      {
        path: "/bookings/my-bookings",
        element: (
          <AuthLayout isAuthenticated>
            <ProtectedRoutes routes={"/bookings/my-bookings"}>
              <CustomerDashboard />
            </ProtectedRoutes>
          </AuthLayout>
        ),
      },

      {
        path: "/vendor-dashboard",
        element: (
          <AuthLayout isAuthenticated>
            <ProtectedRoutes routes={"/vendor-dashboard"}>
              <VendorDashboard />
            </ProtectedRoutes>
          </AuthLayout>
        ),
      },
      {
        path: "/admin-dashboard",
        element: (
          <AuthLayout isAuthenticated>
            <ProtectedRoutes routes={"/admin-dashboard"}>
              <AdminDashboard />
            </ProtectedRoutes>
          </AuthLayout>
        ),
      },
    ],
  },
]);
