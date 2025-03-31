import express from "express";
import {
  isAuthenticated,
  authorizeRoles,
} from "../middlewares/authentication.js";
import {
  addListing,
  deleteListing,
  manageBookings,
  updateListing,
} from "../controllers/vendorControllers.js";

const router = express.Router();

router.post("/listings", isAuthenticated, authorizeRoles("VENDOR"), addListing);

// Update Existing Listing
router.put(
  "/listing/:id",
  isAuthenticated,
  authorizeRoles("VENDOR"),
  updateListing
);

// Delete Listing
router.delete(
  "/listing/:id",
  isAuthenticated,
  authorizeRoles("VENDOR"),
  deleteListing
);

// Manage Bookings
router.get(
  "/bookings",
  isAuthenticated,
  authorizeRoles("VENDOR", "CUSTOMER"),
  manageBookings
);

export default router;
