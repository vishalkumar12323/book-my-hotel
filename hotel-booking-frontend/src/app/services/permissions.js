const protectedRoutes = {
  ADMIN: [
    "/",
    "/admin-dashboard",
    "/vendor-dashboard",
    "/bookings/my-bookings",
  ],
  VENDOR: ["/", "/vendor-dashboard", "/bookings/my-bookings"],
  CUSTOMER: ["/", "/bookings/my-bookings"],
  GUEST: ["/", "/login", "/register"],
};

export { protectedRoutes };
