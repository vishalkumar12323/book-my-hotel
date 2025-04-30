import CustomerDatabase from "../lib/database/customer-database.js";

class CustomerService {
  constructor() {
    this.db = new CustomerDatabase();
  }
  async getAllListings(filters) {
    try {
      const listings = await this.db.findAll(filters);
      return listings;
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

export default CustomerService;
