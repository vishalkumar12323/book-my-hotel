import { Link, useNavigate } from "react-router-dom";
import { useGetListingsQuery } from "../../app/services/vendorServices";
import { useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";

import {
  selectListings,
  setListings,
} from "../../app/store/slices/vendorServiceSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
const ManageListings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { listings } = useSelector(selectListings);
  const [query, setQuery] = useState({});

  const { register, handleSubmit, formState, resetField } = useForm({
    mode: "onSubmit",
  });

  const { data, isLoading } = useGetListingsQuery(query);

  const onSubmit = (data) => {
    const { value, queryType } = data;
    setQuery(() => ({
      [queryType]: value,
    }));

    resetField("value", { defaultValue: "" });
  };

  useEffect(() => {
    if (data) {
      dispatch(setListings(data));
    }
  }, [data, dispatch]);

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Manage Listings</h2>
            <button
              onClick={() => navigate("/add-new-listing")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-4 hover:bg-blue-700 transition"
            >
              Add New Listing
            </button>
          </div>

          <FilterListings
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
            formState={formState}
            register={register}
          />
        </div>

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
              {listings &&
                listings?.length > 0 &&
                listings.map((hotel) => (
                  <tr className="text-center border" key={1}>
                    <td className="py-3 px-2 border">{hotel.name}</td>
                    <td className="py-3 px-2 border">{hotel.address}</td>
                    <td className="py-3 px-2 border">{hotel.price}</td>
                    <td className="py-3 px-2">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() =>
                          navigate(`/edit-list/${hotel.id}/${hotel.name}`, {
                            replace: true,
                          })
                        }
                      >
                        Edit
                      </button>{" "}
                      |{" "}
                      <button className="text-red-600 hover:underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageListings;

const FilterListings = ({ onSubmit, handleSubmit, register, formState }) => {
  const [queryType, setQueryType] = useState("name");

  return (
    <form className="flex items-start gap-2" onSubmit={handleSubmit(onSubmit)}>
      <div className={`w-full flex-col gap-[2px] items-center`}>
        <div
          className={`${
            formState.errors?.value && "border-red-600"
          } flex items-center gap-[2px] w-full border border-gray-300 px-2 rounded`}
        >
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            type="text"
            {...register("value", {
              required: {
                value: true,
                message: "Name, type, location, price filters are required.",
              },
            })}
            name="value"
            placeholder="Search by name, type, location..."
            className="w-full rounded py-2 outline-none border-none capitalize"
            autoComplete="off"
            aria-describedby="search-input"
          />
          <button aria-label="search" type="submit">
            <CiSearch size={25} />
          </button>
        </div>
        {formState.errors?.value && (
          <span
            id="search-input"
            className="text-red-600 text-xs font-semibold"
          >
            {formState.errors.value.message}
          </span>
        )}
      </div>
      <select
        {...register("queryType")}
        name="queryType"
        value={queryType}
        className="border border-gray-300 rounded px-4 py-2 w-64"
        onChange={(e) => {
          setQueryType(e.target.value);
        }}
      >
        <option value="name">Name</option>
        <option value="location">Location</option>
        <option value="type">Type</option>
        <option value="price">Price</option>
        <option value="rating">Rating</option>
      </select>
    </form>
  );
};
