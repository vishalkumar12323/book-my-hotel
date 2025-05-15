import VendorDatabase from "../lib/database/vendor-database.js";

class VendorService {
  constructor() {
    this.db = new VendorDatabase();
  }

  async getListings(vendorId, filters) {
    return await this.db.findAll(vendorId, filters);
  }
  async getListingDetails(id) {
    return await this.db.findById(id);
  }
  async createListing(listingData) {
    return await this.db.createList(listingData);
  }
  async createUnit(unitData) {
    return await this.db.createUnit(unitData);
  }
  async updateListing(id, listingData) {
    return await this.db.update(id, listingData);
  }
  async deleteListing(id) {
    return await this.db.delete(id);
  }
}

export default VendorService;
