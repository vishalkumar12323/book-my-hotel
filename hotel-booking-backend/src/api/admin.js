import express from "express";
import AdminService from "../services/admin-service.js";

const router = express.Router();
const adminService = new AdminService();

router.route("/listings/:id/approve").put(async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await adminService.approveListing(id);
    res.status(200).json(listing);
  } catch (error) {
    console.error("Error approving listing:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.route("/users").get(async (req, res) => {
  try {
    const users = await adminService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.route("/bookings").get(async (req, res) => {
  try {
    const bookings = await adminService.getAllBookings();
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
