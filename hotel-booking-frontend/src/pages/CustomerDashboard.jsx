import { useState } from "react";
import {
  PendingBookings,
  CompletedBookings,
  CancelledBookings,
} from "../components";
import { session } from "../app/store/slices/authSlice";
import { useSelector } from "react-redux";

export const CustomerDashboard = () => {
  const { user } = useSelector(session);
  const [activeTab, setActiveTab] = useState("pending");

  console.log("user", user?.Booking);
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Booking History</h1>

        <div className="flex space-x-4 mb-8">
          <StatusButton
            setTab={setActiveTab}
            activeTab={activeTab}
            tab="pending"
          >
            Pending
          </StatusButton>
          <StatusButton
            setTab={setActiveTab}
            activeTab={activeTab}
            tab="completed"
          >
            completed
          </StatusButton>
          <StatusButton
            setTab={setActiveTab}
            activeTab={activeTab}
            tab="cancelled"
          >
            cancelled
          </StatusButton>
        </div>

        <div>
          {activeTab === "pending" ? (
            <PendingBookings />
          ) : activeTab === "completed" ? (
            <CompletedBookings />
          ) : (
            <CancelledBookings />
          )}
        </div>
      </div>
    </div>
  );
};

const StatusButton = ({ setTab, activeTab, tab, children }) => {
  return (
    <>
      <button
        onClick={() => setTab(tab)}
        className={`px-4 py-2 rounded-lg ${
          activeTab === tab
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-800"
        }`}
      >
        {children}
      </button>
    </>
  );
};
