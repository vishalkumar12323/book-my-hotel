import express from "express";
import ListingService from "../services/listing-service.js";

const router = express.Router();
const listingService = new ListingService();
router.route("/get-all-listings").get(async (req, res) => {
  try {
    const { location, price, rating, popularFilter, hotelName } = req.query;
    // filters for popular or facilities-filter queries.
    let facilitiesFilters = undefined;
    if (popularFilter) {
      const filterOpt = popularFilter
        .split(",")
        .map((f) => f.trim().toLowerCase());

      const worldInFilterOpt = new Set(
        filterOpt.flatMap((opt) => opt.split(" "))
      );
      facilitiesFilters = {
        hasSome: Array.from(worldInFilterOpt),
      };
    }

    // filters for location queries.
    const locations = location ? location.split(",") : undefined;

    // filters for price queries.
    let priceFilter = undefined;
    if (price) {
      const priceRange = price.match(/\d+/g);
      if (priceRange && priceRange.length === 2) {
        const [minPrice, maxPrice] = priceRange.map(Number);
        priceFilter = { gte: minPrice, lte: maxPrice };
      }
    }

    // filters for rating queries.
    let ratingFilters = undefined;
    if (rating) {
      const ratingNumber = parseFloat(rating);

      if (ratingNumber === 5) {
        ratingFilters = { gte: 4.5 };
      } else if (ratingNumber === 4) {
        ratingFilters = { gte: 4.0 };
      } else if (ratingNumber === 3) {
        ratingFilters = { gte: 3.0 };
      }
    }

    const listings = await listingService.getAllListings({
      locations,
      priceFilter,
      ratingFilters,
      facilitiesFilters,
      hotelName,
    });

    res.status(200).json(listings);
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.route("/listing/:id").get(async (req, res) => {
  try {
    const { id } = req.params;
    const listingDetails = await listingService.getListingDetails(id);
    res.status(200).json(listingDetails);
  } catch (error) {
    console.error("Error fetching listing details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
