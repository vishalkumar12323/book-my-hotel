import { Hotels, Filters, Search, CardSkeleton } from "../components";
import { useGetAvailableListingsQuery } from "../app/services/hotelServices.js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { session } from "../app/store/slices/authSlice.js";
import { setHotelsData } from "../app/store/slices/hotelSlice.js";

export const HomePage = () => {
  const { isLoggedIn } = useSelector(session);
  const dispatch = useDispatch();
  const [query, setQuery] = useState({});
  const { data, isLoading, isError, error, refetch } =
    useGetAvailableListingsQuery(query);

  useEffect(() => {
    if (data) {
      dispatch(setHotelsData({ hotels: data, tHotels: 0, tRestaurants: 0 }));
    }
  }, [isLoggedIn, data, dispatch]);
  return (
    <div className="flex flex-col mx-auto my-2 h-auto px-3 md:px-4 max-w-screen-xl w-full items-start">
      <Search />
      <div className="flex flex-col md:flex-row w-full justify-center gap-4">
        <Filters
          setQuery={setQuery}
          query={query}
          error={isError}
          data={data}
        />

        {isLoading ? (
          <div className="flex flex-col w-full md:w-3/4 py-6 gap-4">
            {[...Array(2)].map((_, idx) => (
              <CardSkeleton key={idx} />
            ))}
          </div>
        ) : (
          <Hotels error={error} refetch={refetch} />
        )}
      </div>
    </div>
  );
};
