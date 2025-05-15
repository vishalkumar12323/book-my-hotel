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
  async createList(listingData) {
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
  async createUnit(unitData) {
    const {
      listingId,
      roomType,
      capacity,
      isAvailabel,
      originalPrice,
      discountPrice,
      roomFacilities: {
        wifi,
        ac,
        tv,
        waterPurifier,
        twineBed,
        cityView,
        bathroom,
        kitchen,
      },
    } = unitData;

    return await this.prisma.unit.create({
      data: {
        listingId,
        capacity,
        discountPrice,
        originalPrice,
        available: isAvailabel,
        roomFacility: {
          create: {
            wifi: wifi ? Boolean(wifi) : false,
            ac: ac ? Boolean(ac) : false,
            tv: tv ? Boolean(tv) : false,
            waterPurifier: waterPurifier ? Boolean(waterPurifier) : false,
            twineBed: twineBed ? Boolean(twineBed) : false,
            cityView: cityView ? Boolean(cityView) : false,
            bathroom: bathroom ? Boolean(bathroom) : false,
            kitchen: kitchen ? Boolean(kitchen) : false,
          },
        },
        type: roomType,
      },
      include: {
        roomFacility: true,
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
