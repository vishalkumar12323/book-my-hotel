import { useState } from "react";
import { ManageListings } from "../components";
import { BookingRequests } from "../components";

export const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState("listings");

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Vendor Dashboard</h1>

        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab("listings")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "listings"
                ? "bg-blue-600 text-white hover:bg-blue-700 transition"
                : "bg-white text-gray-800"
            }`}
          >
            Manage Listings
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "bookings"
                ? "bg-blue-600 text-white hover:bg-blue-700 transition"
                : "bg-white text-gray-800"
            }`}
          >
            Booking Requests
          </button>
        </div>

        <div>
          {activeTab === "listings" ? <ManageListings /> : <BookingRequests />}
        </div>
      </div>
    </div>
  );
};
