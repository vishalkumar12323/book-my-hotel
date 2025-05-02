import { prisma } from "../db-client.js";

class CustomerDatabase {
  constructor() {
    this.prisma = prisma;
  }

  async findAll({ locations, priceFilter, ratingFilters, facilitiesFilters }) {
    return await this.prisma.listing.findMany({
      where: {
        OR: locations?.map((loc) => ({
          address: { contains: loc?.trim(), mode: "insensitive" },
        })),
        price: priceFilter,
        facilities: facilitiesFilters,
        rating: ratingFilters,
        isApproved: true,
      },
      include: { units: true, Booking: true, _count: true },
    });
  }
  async findById(id) {
    return await this.prisma.listing.findUnique({
      where: { id },
      include: { units: true, Booking: true, _count: true },
    });
  }
}

export default CustomerDatabase;
