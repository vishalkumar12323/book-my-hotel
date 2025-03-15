import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ErrorPage } from "./components";
import { CustomerDashboard } from "./pages/CustomerDashboard";
import { VendorDashboard } from "./pages/VendorDashboard";
import { AboutPage } from "./pages/AboutPage.jsx";
import { AuthLayout } from "./components/AuthLayout";
import { store } from "./app/store/store.js";
import { Provider } from "react-redux";

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
            <CustomerDashboard />
          </AuthLayout>
        ),
      },

      {
        path: "/vendor-dashboard",
        element: (
          <AuthLayout isAuthenticated>
            <VendorDashboard />
          </AuthLayout>
        ),
      },
    ],
  },
]);
