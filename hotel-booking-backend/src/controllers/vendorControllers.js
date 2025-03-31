import { prisma } from "../config/database.js";
import multiparty from "multiparty";
import cloudinary from "../config/cloudinary.js";

export const addListing = async (req, res) => {
  const form = new multiparty.Form();

  form.parse(req, async (err, feild, files) => {
    if (err) {
      return res.status(500).json({ error: "feiled to parse form data" });
    }

    try {
      const name = feild.name[0].toLowerCase();
      const address = feild.address[0].toLowerCase();
      const description = feild.description[0];
      const facilities = feild.facilities[0]
        .split(", ")
        .map((facilitie) => facilitie.trim().toLowerCase());
      const type = feild.type[0].toUpperCase();
      const price = parseFloat(feild.price[0]);
      const rating = feild.rating ? parseFloat(feild.rating[0]) : 4;

      const coverImage = files.coverImage[0].path;
      const coverImageResult = await cloudinary.uploader.upload(coverImage, {
        folder: "hotel-image-storage",
      });
      const images = files.images.map((img) =>
        cloudinary.uploader.upload(img.path, { folder: "hotel-image-storage" })
      );
      const uploadImagesResult = await Promise.all(images);

      const listing = await prisma.listing.create({
        data: {
          vendorId: req.user.id,
          name,
          address,
          description,
          facilities,
          type,
          price,
          rating,
          coverImageId: coverImageResult.public_id,
          images: uploadImagesResult.map((img) => img.public_id),
        },
        omit: {
          coverImageId: true,
        },
      });
      res.status(200).json({ listing });
    } catch (error) {
      console.error("Error creating listing:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
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
