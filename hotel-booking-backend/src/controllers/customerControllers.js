import { prisma } from "../config/database.js";

export const getListings = async (req, res) => {
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
    const listings = await prisma.listing.findMany({
      where: {
        OR: locations?.map((loc) => ({
          address: { contains: loc?.trim(), mode: "insensitive" },
        })),
        price: priceFilter,
        facilities: facilitiesFilters,
        rating: ratingFilters,
      },
      include: { units: true, Booking: true, _count: true },
    });

    res.status(200).json(listings);
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Listing Details
export const getListingDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await prisma.listing.findUnique({
      where: { id: parseInt(id) },
      include: { units: true },
    });

    if (!listing) return res.status(404).json({ message: "Listing not found" });

    res.status(200).json(listing);
  } catch (error) {
    console.error("Error fetching listing details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create Booking
export const createBooking = async (req, res) => {
  try {
    const { listingId, unitId, startDate, endDate } = req.body;

    const unit = await prisma.unit.findUnique({ where: { id: unitId } });

    if (!unit || !unit.available) {
      return res.status(400).json({ message: "Unit not available" });
    }

    const booking = await prisma.booking.create({
      data: {
        customerId: req.user.id,
        listingId: parseInt(listingId),
        unitId: parseInt(unitId),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status: "PENDING",
      },
    });

    await prisma.unit.update({
      where: { id: unitId },
      data: { available: false },
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Booking History
export const getBookingHistory = async (req, res) => {
  const { status } = req.params;
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        customerId: req.user?.id,
        status: status.toUpperCase(),
      },
      include: {
        listing: true,
        unit: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching booking history:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
