const PendingBookings = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Pending</h2>
      <input
        type="text"
        placeholder="Search by location..."
        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
        Search
      </button>
      <div className="mt-6">Pending bookings will be displayed here</div>
    </div>
  );
};

export default PendingBookings;
