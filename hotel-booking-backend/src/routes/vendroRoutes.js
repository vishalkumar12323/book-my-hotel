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
  getListings,
  getListing,
} from "../controllers/vendorControllers.js";

const router = express.Router();
//
router.get("/listings", isAuthenticated, authorizeRoles("VENDOR"), getListings);
router.post("/listings", isAuthenticated, authorizeRoles("VENDOR"), addListing);

router.get(
  "/listing/:id",
  isAuthenticated,
  authorizeRoles("VENDOR"),
  getListing
);
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
