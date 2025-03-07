import express from "express";
import {
  isAuthenticated,
  authorizeRoles,
} from "../middlewares/authentication.js";
import {
  approveListing,
  getAllBookings,
  getAllUsers,
} from "../controllers/adminControllers.js";

const router = express.Router();

// Approve Listings
router.put(
  "/listings/:id/approve",
  isAuthenticated,
  authorizeRoles("ADMIN"),
  approveListing
);

// Get All Users
router.get("/users", isAuthenticated, authorizeRoles("ADMIN"), getAllUsers);

// Get All Bookings
router.get(
  "/bookings",
  isAuthenticated,
  authorizeRoles("ADMIN"),
  getAllBookings
);

export default router;
