import express from "express";
import AdminService from "../services/admin-service.js";
import { authorizeRoles, isAuthenticated } from "./middlewares/index.js";

const router = express.Router();
const adminService = new AdminService();

router
  .route("/listings/approve/:id")
  .put(isAuthenticated, authorizeRoles("ADMIN"), async (req, res) => {
    try {
      const { id } = req.params;
      const listing = await adminService.approveListing(id);
      res.status(200).json(listing);
    } catch (error) {
      console.error("Error approving listing:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

router
  .route("/get-all-users")
  .get(isAuthenticated, authorizeRoles("ADMIN"), async (req, res) => {
    try {
      const users = await adminService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

router
  .route("/get-all-bookings")
  .get(isAuthenticated, authorizeRoles("ADMIN"), async (req, res) => {
    try {
      const bookings = await adminService.getAllBookings();
      if (!bookings || bookings.length === 0)
        return res.status(404).json({ data: "No any bookings found." });
      res.status(200).json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

export default router;
