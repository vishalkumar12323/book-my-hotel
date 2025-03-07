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
import { upload } from "../storage/multer.js";

const router = express.Router();

router.post(
  "/listings",
  isAuthenticated,
  authorizeRoles("VENDOR"),
  upload.array("images", 5),
  addListing
);

// Update Existing Listing
router.put(
  "/listings/:id",
  isAuthenticated,
  authorizeRoles("VENDOR"),
  updateListing
);

// Delete Listing
router.delete(
  "/listings/:id",
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
