const ManageListings = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Manage Listings</h2>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-4 hover:bg-blue-700 transition">
        Add New Listing
      </button>
      <div>
        {/* Listing cards with edit and delete actions will be shown here */}
      </div>
    </div>
  );
};

export default ManageListings;
