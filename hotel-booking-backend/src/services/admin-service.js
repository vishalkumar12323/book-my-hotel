import AdminDatabase from "../lib/database/admin-database.js";
class AdminService {
  constructor() {
    this.db = new AdminDatabase();
  }

  async approveListing(id) {
    return await this.db.update(id);
  }
  async getAllUsers() {
    return await this.db.findAllUser();
  }
  async getAllBookings() {
    return await this.db.findAllBookings();
  }
}

export default AdminService;
