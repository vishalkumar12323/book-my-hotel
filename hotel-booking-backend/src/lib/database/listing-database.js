import { prisma } from "../db-client.js";

class ListingDatabase {
  constructor() {
    this.prisma = prisma;
  }

  async findAll({
    locations,
    priceFilter,
    ratingFilters,
    facilitiesFilters,
    hotelName,
  }) {
    return await this.prisma.listing.findMany({
      where: {
        name: hotelName
          ? { contains: hotelName.toLowerCase(), mode: "insensitive" }
          : undefined,
        OR: locations?.map((loc) => ({
          address: { contains: loc?.trim(), mode: "insensitive" },
        })),
        price: priceFilter,
        facilities: facilitiesFilters,
        rating: ratingFilters,
      },
    });
  }
  async findById(id) {
    return await this.prisma.listing.findUnique({
      where: { id },
      include: {
        units: {
          include: {
            roomFacility: {
              omit: {
                unitId: true,
              },
            },
          },
        },
        Booking: true,
        _count: true,
      },
    });
  }
}

export default ListingDatabase;
