import { prisma } from "../config/database.js";

export const addListing = async (req, res) => {
  try {
    const { name, address, description, facilities, price, type, rating } =
      req.body;
    const coverImageUrl = req.files["coverImage"]
      ? req.files["coverImage"][0].path
      : "";
    const imageUrls = req.files["images"]
      ? req.files["images"].map((image) => image.path)
      : [];

    const newListing = await prisma.listing.create({
      data: {
        vendorId: req.user.id,
        name,
        address,
        description,
        facilities: facilities
          ? facilities.split(",").map((facilitie) => facilitie.trim())
          : [],
        price: parseInt(price),
        type,
        coverImage: coverImageUrl,
        images: imageUrls,
        rating: parseFloat(rating),
      },
      omit: {
        coverImage: true,
      },
    });

    res.status(201).json(newListing);
  } catch (error) {
    console.error("Error adding listing:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateListing = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedListing = await prisma.listing.update({
      where: { id: parseInt(id), vendorId: req.user.id },
      data: updates,
    });

    res.status(200).json(updatedListing);
  } catch (error) {
    console.error("Error updating listing:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.listing.delete({
      where: { id: parseInt(id), vendorId: req.user.id },
    });

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting listing:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const manageBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { listing: { vendorId: req.user.id } },
      include: { listing: true, customer: true },
    });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching vendor bookings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
