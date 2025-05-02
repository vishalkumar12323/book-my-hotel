import { prisma } from "../db-client.js";

class VendorDatabase {
  constructor() {
    this.prisma = prisma;
  }

  async findAll(vendorId, { type, price, name, location }) {
    return await this.prisma.listing.findMany({
      where: {
        vendorId,
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
  }
  async findById(id) {
    return await this.prisma.listing.findUnique({
      where: { id },
      // include: {
      //   Booking: true,
      //   Vendor: true,
      // },
    });
  }
  async create(listingData) {
    const {
      name,
      address,
      description,
      facilities,
      type,
      price,
      rating,
      coverImagePublicId,
      imagesPublicId,
      vendorId,
    } = listingData;
    return await this.prisma.listing.create({
      data: {
        name,
        address,
        description,
        facilities,
        type,
        price,
        rating,
        coverImageId: coverImagePublicId,
        images: imagesPublicId.map((id) => id),
        vendorId,
      },
    });
  }
  async update(id, listingData) {
    const {
      name,
      address,
      description,
      facilities,
      type,
      price,
      rating,
      coverImagePublicId,
      imagesPublicId,
    } = listingData;
    return await this.prisma.listing.update({
      where: { id },
      data: {
        name,
        address,
        description,
        facilities,
        type,
        price,
        rating,
        coverImageId: coverImagePublicId,
        images: imagesPublicId.map((id) => id),
      },
    });
  }
  async delete(id) {
    return await this.prisma.listing.delete({
      where: { id },
    });
  }
}

export default VendorDatabase;
