import express from "express";
import {
  createBooking,
  getBookingHistory,
  getListings,
  getListingDetails,
} from "../controllers/customerControllers.js";
import {
  isAuthenticated,
  authorizeRoles,
} from "../middlewares/authentication.js";

const router = express.Router();

router.get("/listings", getListings);

router.get("/listing/:id", getListingDetails);

router.post(
  "/bookings",
  isAuthenticated,
  authorizeRoles("CUSTOMER", "VENDOR"),
  createBooking
);

router.get(
  "/bookings/history/:status",
  isAuthenticated,
  authorizeRoles("CUSTOMER", "VENDOR"),
  getBookingHistory
);

export default router;
