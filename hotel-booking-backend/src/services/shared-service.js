import SharedDatabase from "../lib/database/shared-database.js";

class SharedService {
  constructor() {
    this.db = new SharedDatabase();
  }

  async createBooking(customerId, bookingData) {
    try {
      const booking = await this.db.create(customerId, bookingData);
      return booking;
    } catch (error) {
      throw new Error("Error creating booking: " + error.message);
    }
  }

  async getBookingHistory(customerId, status) {
    try {
      const bookingHistory = await this.db.findByUserId(customerId, status);
      return bookingHistory;
    } catch (error) {
      throw new Error("Error fetching booking history: " + error.message);
    }
  }
}
export default SharedService;
