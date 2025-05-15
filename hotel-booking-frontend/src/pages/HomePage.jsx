import {
  Hotels,
  Filters,
  Search,
  HotelsCardSkeleton,
} from "../components/index.js";
import { useGetAvailableListingsQuery } from "../app/services/listingServices.js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setListingsData,
  listingsData,
} from "../app/store/slices/listingsSlice.js";

export const HomePage = () => {
  const { totalHotels, totelRestaurants } = useSelector(listingsData);
  const dispatch = useDispatch();
  const [query, setQuery] = useState({});
  const { data, isLoading, isError, error } =
    useGetAvailableListingsQuery(query);

  useEffect(() => {
    if (data) {
      dispatch(
        setListingsData({ listings: data, tHotels: 0, tRestaurants: 0 })
      );
    }
  }, [data, dispatch]);

  return (
    <div className="flex flex-col mx-auto my-2 min-h-screen h-auto px-3 md:px-4 max-w-screen-xl w-full items-start">
      <Search setQuery={setQuery} />
      <div className="flex flex-col md:flex-row w-full justify-center gap-4">
        <Filters setQuery={setQuery} query={query} error={isError} />

        <div className="w-full h-auto my-3 md:my-6 rounded-md">
          {totalHotels > 0 && totelRestaurants > 0 && (
            <div className="w-full mb-2 flex justify-end px-2 gap-2 md:gap-3 bg-white rounded-md">
              <div>
                Hotels{" "}
                <strong className="text-[15px] md:text-[19px]">
                  {totalHotels}
                </strong>
              </div>{" "}
              |
              <div className="">
                Restaurants
                <strong className="text-[15px] md:text-[19px]">
                  {" "}
                  {totelRestaurants}
                </strong>
              </div>
            </div>
          )}

          <div className="max-h-[90vh] overflow-y-auto w-full">
            {isLoading ? (
              <div className="flex flex-col w-full py-3 md:py-6 gap-4 mb-4 md:mb-2">
                {[...Array(2)].map((_, idx) => (
                  <HotelsCardSkeleton key={idx} />
                ))}
              </div>
            ) : (
              <Hotels error={error} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
