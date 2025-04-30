import { prisma } from "../db-client.js";

class SharedDatabase {
  constructor() {
    this.prisma = prisma;
  }

  async create(customerId, bookingData) {
    return await this.prisma.booking.create({
      data: {
        customerId: customerId,
        listingId: bookingData.listingId,
        unitId: bookingData.unitId,
        startDate: new Date(bookingData.startDate),
        endDate: new Date(bookingData.endDate),
        status: "PENDING",
      },
    });
  }

  async findByUserId(customerId, status) {
    return await this.prisma.booking.findMany({
      where: {
        customerId: customerId,
        status: status,
      },
      include: {
        listing: true,
        unit: true,
      },
    });
  }
}

export default SharedDatabase;
