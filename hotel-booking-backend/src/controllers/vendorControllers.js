import { prisma } from "../config/database.js";
import multiparty from "multiparty";
import cloudinary from "../config/cloudinary.js";

export const getListings = async (req, res) => {
  const { type, price, name, location } = req.query;
  try {
    const listings = await prisma.listing.findMany({
      where: {
        vendorId: req.user.id,
        type: type ? { contains: type, mode: "insensitive" } : undefined,
        price: price ? { gte: parseFloat(price) } : undefined,
        name: name ? { contains: name, mode: "insensitive" } : undefined,
        address: location
          ? { contains: location, mode: "insensitive" }
          : undefined,
      },
      select: {
        id: true,
        name: true,
        address: true,
        price: true,
        type: true,
        Booking: true,
      },
    });

    res.status(200).json(listings);
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getListing = async (req, res) => {
  const param = req.params;

  console.log(param);

  setTimeout(() => {
    res.status(200).json({ msg: "listing" });
  }, 3000);
};

export const addListing = async (req, res) => {
  const form = new multiparty.Form();

  form.parse(req, async (err, feild, files) => {
    if (err)
      return res.status(500).json({ error: err || "Internal server error" });

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
  const { id } = req.params.id;
  const form = new multiparty.Form();

  const list = await prisma.listing.findUnique({ where: { id } });

  form.parse(req, async (err, feild, files) => {
    if (err)
      return res.status(500).json({ error: err || "Internal server error" });

    try {
      const name = feild.name[0].toLowerCase() || list.name;
      const address = feild.address[0].toLowerCase() || list.address;
      const description = feild.description[0] || list.description;
      const facilities =
        feild.facilities[0]
          .split(", ")
          .map((facilitie) => facilitie.trim().toLowerCase()) ||
        list.facilities;
      const type = feild.type[0].toUpperCase() || list.type;
      const price = parseFloat(feild.price[0]) || list.price;
      const rating = feild.rating ? parseFloat(feild.rating[0]) : list.rating;

      const coverImage = files.coverImage && files.coverImage[0].path;

      const coverImageResult = await cloudinary.uploader.upload(coverImage, {
        folder: "hotel-image-storage",
        public_id: list.coverImageId,
        invalidate: true,
      });
      const images =
        files.images.length > 0 &&
        files.images.map((file, idx) =>
          cloudinary.uploader.upload(file.path, {
            folder: "hotel-image-storage",
            public_id: list.images[idx],
            invalidate: true,
          })
        );

      const uploadImagesResult = await Promise.all(images);
      const updatedList = await prisma.listing.update({
        where: { id },
        data: {
          vendorId: req.user.id,
          name,
          address,
          description,
          facilities,
          type,
          rating,
          price,
          coverImageId: coverImageResult.public_id,
          images: uploadImagesResult.map((res) => res.public_id),
        },
      });

      res.status(200).json({ listing: updatedList });
    } catch (err) {
      console.error("Error creating listing:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
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
