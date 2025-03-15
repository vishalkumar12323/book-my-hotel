import { prisma } from "../config/database.js";

export const approveListing = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await prisma.listing.update({
      where: { id: parseInt(id) },
      data: { approved: true },
    });

    res.status(200).json(listing);
  } catch (error) {
    console.error("Error approving listing:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllUsers = async (_req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllBookings = async (_req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: { listing: true, customer: true, unit: true },
    });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
