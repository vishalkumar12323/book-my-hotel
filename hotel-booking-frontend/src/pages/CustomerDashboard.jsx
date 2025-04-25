import { useEffect, useState } from "react";
import {
  PendingBookings,
  ConfirmedBookings,
  CancelledBookings,
} from "../components";
import { useGetUserBookingsQuery } from "../app/services/hotelServices.js";
import {
  setCancelledBookings,
  setConfirmedBookings,
  setPandingBookings,
  bookings,
} from "../app/store/slices/userBookingSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { session } from "../app/store/slices/authSlice.js";

export const CustomerDashboard = () => {
  const { pandingBookings, confirmedBookings, cancelledBookings } =
    useSelector(bookings);

  const { isLoggedIn } = useSelector(session);
  const dispatch = useDispatch();
  const [bookingStatus, setBookingStatus] = useState("pending");
  const { data, isLoading, isError } = useGetUserBookingsQuery(bookingStatus, {
    skip: !isLoggedIn,
  });

  useEffect(() => {
    if (data && bookingStatus === "pending") {
      dispatch(setPandingBookings(data));
    } else if (data && bookingStatus === "confirmed") {
      dispatch(setConfirmedBookings(data));
    } else if (data && bookingStatus === "cancelled") {
      dispatch(setCancelledBookings(data));
    }
  }, [data, dispatch, bookingStatus, isLoggedIn]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Booking History</h1>

        <div className="flex space-x-4 mb-8">
          <StatusButton
            setTab={setBookingStatus}
            bookingStatus={bookingStatus}
            tab="pending"
          >
            Pending
          </StatusButton>
          <StatusButton
            setTab={setBookingStatus}
            bookingStatus={bookingStatus}
            tab="confirmed"
          >
            Confirmed
          </StatusButton>
          <StatusButton
            setTab={setBookingStatus}
            bookingStatus={bookingStatus}
            tab="cancelled"
          >
            Cancelled
          </StatusButton>
        </div>

        <div>
          {bookingStatus === "pending" && (
            <PendingBookings
              bookings={pandingBookings}
              isLoading={isLoading}
              isError={isError}
            />
          )}
          {bookingStatus === "confirmed" && (
            <ConfirmedBookings
              bookings={confirmedBookings}
              isLoading={isLoading}
              isError={isError}
            />
          )}
          {bookingStatus === "cancelled" && (
            <CancelledBookings
              bookings={cancelledBookings}
              isLoading={isLoading}
              isError={isError}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const StatusButton = ({ setTab, bookingStatus, tab, children }) => {
  return (
    <>
      <button
        onClick={() => setTab(tab)}
        className={`px-4 py-2 rounded-lg ${
          bookingStatus === tab
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-800"
        }`}
      >
        {children}
      </button>
    </>
  );
};
