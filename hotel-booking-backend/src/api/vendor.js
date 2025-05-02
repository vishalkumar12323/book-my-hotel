import express from "express";
import multiparty from "multiparty";
import CloudinaryImageStorage from "../lib/storage.js";
import VendorService from "../services/vendor-service.js";
import { isAuthenticated, authorizeRoles } from "./middlewares/index.js";

const router = express.Router();
const vendorService = new VendorService();
const imageStorage = new CloudinaryImageStorage();
router
  .route("/listings")
  .get(isAuthenticated, authorizeRoles("VENDOR"), async (req, res) => {
    const { type, price, name, location } = req.query;
    try {
      const listings = await vendorService.getListings(req.user.id, {
        type,
        price,
        name,
        location,
      });
      res.status(200).json(listings);
    } catch (error) {
      console.error("Error fetching listings:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
  .post(isAuthenticated, async (req, res) => {
    const form = new multiparty.Form();
    form.parse(req, async (err, fields, files) => {
      if (err)
        return res.status(500).json({ error: err || "Internal server error" });

      try {
        const name = fields.name[0].toLowerCase();
        const address = fields.address[0].toLowerCase();
        const description = fields.description[0];
        const facilities = fields.facilities[0]
          .split(", ")
          .map((facilitie) => facilitie.trim().toLowerCase());
        const type = fields.type[0].toUpperCase();
        const price = parseFloat(fields.price[0]);
        const rating = fields.rating ? parseFloat(fields.rating[0]) : 4;
        const coverImage = files.coverImage[0].path;
        const folderName = name.replace(" ", "-");

        const coverImagePublicId = await imageStorage.uploadImage(
          coverImage,
          folderName
        );
        const images = files.images.map((img) =>
          imageStorage.uploadImage(img.path, folderName)
        );
        const imagesPublicId = await Promise.all(images);
        const listingData = {
          name,
          address,
          description,
          facilities,
          type,
          price,
          rating,
          coverImagePublicId,
          imagesPublicId,
          vendorId: req.user.id,
        };

        const newListing = await vendorService.createListing(listingData);
        res.status(201).json(newListing);
      } catch (error) {
        console.error("Error creating listing:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });
  });

router
  .route("/listing/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    try {
      const listing = await vendorService.getListingDetails(id);
      res.status(200).json(listing);
    } catch (error) {
      console.error("Error fetching listing details:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
  .put(isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const list = await vendorService.getListingDetails(id);

      const form = new multiparty.Form();

      form.parse(req, async (err, fields, files) => {
        const name = (fields.name && fields.name[0].toLowerCase()) || list.name;
        const address =
          (fields.address && fields.address[0].toLowerCase()) || list.address;
        const description =
          (fields.description && fields.description[0]) || list.description;
        const facilities =
          (fields.facilities &&
            fields.facilities[0]
              .split(", ")
              .map((facilitie) => facilitie.trim().toLowerCase())) ||
          list.facilities;
        const type = (fields.type && fields.type[0].toUpperCase()) || list.type;
        const price =
          (fields.price && parseFloat(fields.price[0])) || list.price;
        const rating =
          fields.rating && fields.rating
            ? parseFloat(fields.rating[0])
            : list.rating;

        let coverImagePublicId = list.coverImageId;
        let imagesPublicId = list.images;
        const folderName = list.name.replace(" ", "-");

        // Update cover image if provided
        if (files.coverImage) {
          coverImagePublicId = await imageStorage.updateImage(
            [list.coverImageId],
            files.coverImage[0].path,
            folderName
          );
        }

        // Update additional images if provided
        if (files.images) {
          const updatedImages = await Promise.all(
            files.images.map((img) =>
              imageStorage.updateImage(imagesPublicId, img.path, folderName)
            )
          );
          imagesPublicId = updatedImages;
        }

        const listingData = {
          name,
          address,
          description,
          facilities,
          type,
          price,
          rating,
          coverImagePublicId,
          imagesPublicId,
        };
        const updatedListing = await vendorService.updateListing(
          id,
          listingData
        );
        res.status(200).json(updatedListing);
      });
    } catch (error) {
      console.error("Error updating listing:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

router.route("/listing/:id").delete(async (req, res) => {
  const { id } = req.params;
  try {
    await vendorService.deleteListing(id);
    res.status(204).json({ message: "Listing deleted successfully" });
  } catch (error) {
    console.error("Error deleting listing:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
