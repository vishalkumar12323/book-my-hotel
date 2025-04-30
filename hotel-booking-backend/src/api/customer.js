import express from "express";
import CustomerService from "../services/customer-service.js";

const router = express.Router();
const customerService = new CustomerService();
router.route("/listings").get(async (req, res) => {
  try {
    const { location, price, rating, popularFilter } = req.query;

    // filters for popular or facilities-filter queries.
    let facilitiesFilters = undefined;
    if (popularFilter) {
      const filterOpt = popularFilter
        .split(",")
        .map((f) => f.trim().toLowerCase());

      const wordInUserQuery = new Set(
        filterOpt.flatMap((opt) => opt.split(" "))
      );

      facilitiesFilters = {
        hasSome: Array.from(wordInUserQuery),
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

    const listings = await customerService.getAllListings({
      locations,
      priceFilter,
      ratingFilters,
      facilitiesFilters,
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
    const listingDetails = await customerService.getListingDetails(id);
    res.status(200).json(listingDetails);
  } catch (error) {
    console.error("Error fetching listing details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
