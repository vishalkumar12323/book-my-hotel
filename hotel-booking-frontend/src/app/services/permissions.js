const protectedRoutes = {
  ADMIN: ["/", "/admin-dashboard", "/vendor-dashboard", "/my-bookings"],
  VENDOR: ["/", "/vendor-dashboard", "/my-bookings", "/add-new-listing"],
  CUSTOMER: ["/", "/my-bookings"],
  GUEST: ["/", "/login", "/register"],
};

export { protectedRoutes };
