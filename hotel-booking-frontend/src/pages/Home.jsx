import { Hotels, Filters, Search, HotelsCardSkeleton } from "../components";
import { useGetAvailableListingsQuery } from "../app/services/hotelServices.js";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setHotelsData } from "../app/store/slices/hotelSlice.js";

export const HomePage = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState({});
  const { data, isLoading, isError, error } =
    useGetAvailableListingsQuery(query);

  useEffect(() => {
    if (data) {
      dispatch(setHotelsData({ hotels: data, tHotels: 0, tRestaurants: 0 }));
    }
  }, [data, dispatch]);

  return (
    <div className="flex flex-col mx-auto my-2 h-auto px-3 md:px-4 max-w-screen-xl w-full items-start">
      <Search setQuery={setQuery} />
      <div className="flex flex-col md:flex-row w-full justify-center gap-4">
        <Filters setQuery={setQuery} query={query} error={isError} />

        {isLoading ? (
          <div className="flex flex-col w-full md:w-3/4 py-6 gap-4">
            {[...Array(2)].map((_, idx) => (
              <HotelsCardSkeleton key={idx} />
            ))}
          </div>
        ) : (
          <Hotels error={error} />
        )}
      </div>
    </div>
  );
};
