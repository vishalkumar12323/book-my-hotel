import { useNavigate } from "react-router-dom";
import { useGetListingsQuery } from "../../app/services/vendorServices";
import {
  selectListings,
  setListings,
} from "../../app/store/slices/vendorServiceSlice";
const ManageListings = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useGetListingsQuery();
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Manage Listings</h2>
        <button
          onClick={() => navigate("/add-new-listing")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-4 hover:bg-blue-700 transition"
        >
          Add New Listing
        </button>

        <div className="rounded shadow mt-4">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="text-center bg-gray-100">
                <th className="py-3 px-2 border-b">Hotel Name</th>
                <th className="py-3 px-2 border-b">Location</th>
                <th className="py-3 px-2 border-b">Price</th>
                <th className="py-3 px-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center border">
                <td className="py-3 px-2 border">Hotel ABC</td>
                <td className="py-3 px-2 border">
                  New York, Holiway DC Taxes Hello world
                </td>
                <td className="py-3 px-2 border">$200</td>
                <td className="py-3 px-2">
                  <button className="text-blue-600 hover:underline">
                    Edit
                  </button>{" "}
                  |{" "}
                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageListings;
