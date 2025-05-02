import { prisma } from "../db-client.js";

class AdminDatabase {
  constructor() {
    this.prisma = prisma;
  }

  async update(id) {
    try {
      const listing = await this.prisma.listing.update({
        where: { id: id },
        data: { isApproved: true },
      });
      return listing;
    } catch (error) {
      console.error("Error approving listing:", error);
      throw new Error("Internal Server Error");
    }
  }
  async findAllUser() {
    try {
      const users = await this.prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          roles: true,
        },
      });
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Internal Server Error");
    }
  }
  async findAllBookings() {
    try {
      const bookings = await this.prisma.booking.findMany({
        include: {
          listing: {
            select: {
              id: true,
              name: true,
              createdAt: true,
              type: true,
            },
          },
          customer: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
      return bookings;
    } catch (error) {
      console.error("Error fetching bookings:", error);
      throw new Error("Internal Server Error");
    }
  }
}

export default AdminDatabase;
