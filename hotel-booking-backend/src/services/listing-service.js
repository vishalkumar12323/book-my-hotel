import ListingDatabase from "../lib/database/listing-database.js";

class ListingService {
  constructor() {
    this.db = new ListingDatabase();
  }
  async getAllListings(filters) {
    try {
      return await this.db.findAll(filters);
    } catch (error) {
      throw new Error("Error fetching listings: " + error.message);
    }
  }

  async getListingDetails(id) {
    try {
      return await this.db.findById(id);
    } catch (error) {
      throw new Error("Error fetching listing details: " + error.message);
    }
  }
}

export default ListingService;
