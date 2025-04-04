const PendingBookings = ({ bookings, isLoading, error }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-semibold">Pending Bookings</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error?.error?.message}</p>}
      {bookings && (
        <div className="mt-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="border-b border-gray-200 py-4">
              <div className="flex justify-between">
                <p className="text-lg font-semibold">
                  {booking.room.roomType} - {booking.room.roomNumber}
                </p>
                <p className="text-lg font-semibold">${booking.room.price}</p>
              </div>
              <p className="text-gray-600 mt-2">
                {new Date(booking.checkInDate).toLocaleDateString()} -{" "}
                {new Date(booking.checkOutDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingBookings;
