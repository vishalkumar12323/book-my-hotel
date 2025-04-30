import express from "express";
import { isAuthenticated } from "./middlewares/index.js";
import SharedService from "../services/shared-service.js";

const router = express.Router();
const sharedService = new SharedService();

// create a booking
router.route("/booking/create").post(isAuthenticated, async (req, res) => {
  const { listingId, unitId, startDate, endDate } = req.body;

  try {
    const bookingData = {
      listingId,
      unitId,
      startDate,
      endDate,
    };

    const booking = await sharedService.createBooking(
      req.user?.id,
      bookingData
    );
    res.status(201).json(booking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// get booking history by status
router
  .route("/bookings/history/:status")
  .get(isAuthenticated, async (req, res) => {
    const { status } = req.params;
    try {
      const bookings = await sharedService.getBookingHistory(
        req.user?.id,
        status
      );
      res.status(200).json(bookings);
    } catch (error) {
      console.error("Error fetching booking history:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

export default router;
