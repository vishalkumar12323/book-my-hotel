import ConfirmedBookingsSkeleton from "../skeletons/bookings-skeleton";

const ConfirmedBookings = ({ bookings, isLoading, error }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex gap-2">
        <h1 className="text-2xl font-semibold">Completed Bookings</h1>
        <p className="text-gray-700 text-[14px] mt-2">
          You have {bookings?.length} completed bookings.
        </p>
      </div>
      <hr className="mt-2" />
      <div className="mt-6">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="text-center bg-gray-200">
              <th>Hotel</th>
              <th className="py-3 px-2 border-b">Room No.</th>
              <th className="py-3 px-2 border-b">Room Type</th>
              <th className="py-3 px-2 border-b">Check In</th>
              <th className="py-3 px-2 border-b">Check Out</th>
              <th className="py-3 px-2 border-b">Room Price</th>
              <th className="py-3 px-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody className="border">
            {isLoading ? (
              <>
                <ConfirmedBookingsSkeleton />
                <ConfirmedBookingsSkeleton />
              </>
            ) : bookings && bookings?.length > 0 ? (
              bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="text-center shadow text-[13px] md:text-[15px]"
                >
                  <td>
                    <Link
                      to={`/hotel/${booking.hotelId}`}
                      className="font-semibold hover:underline hover:text-blue-500"
                    >
                      {booking.hotelName}
                    </Link>
                  </td>
                  <td className="py-3 px-2 border-b">{booking.roomNo}</td>
                  <td className="py-3 px-2 border-b">{booking.roomType}</td>
                  <td className="py-3 px-2 border-b">
                    {new Date(booking.checkIn).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-2 border-b">
                    {new Date(booking.checkOut).toLocaleDateString()}
                  </td>
                  <td>{booking.roomPrice}</td>
                  <td>
                    <button className="text-red-600 hover:underline">
                      withdrow booking
                    </button>
                  </td>
                </tr>
              ))
            ) : error ? (
              <tr className="text-center">
                <td colSpan={7} className="py-4 text-red-500">
                  {error || "An error occurred while fetching bookings."}
                </td>
              </tr>
            ) : (
              <tr className="text-center">
                <td colSpan={7} className="py-4 text-gray-500">
                  No pending bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConfirmedBookings;
