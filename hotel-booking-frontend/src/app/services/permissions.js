const protectedRoutes = {
  ADMIN: ["/", "/admin-dashboard", "/vendor-dashboard", "/my-bookings"],
  VENDOR: ["/", "/vendor-dashboard", "/my-bookings"],
  CUSTOMER: ["/", "/my-bookings"],
  GUEST: ["/", "/login", "/register"],
};

export { protectedRoutes };
