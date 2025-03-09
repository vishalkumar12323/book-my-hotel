import { Hotels, Filters, Search, CardSkeleton } from "../components";
import { useGetAvailableListingsQuery } from "../app/services/hotelServices.js";
import { useState } from "react";

export const HomePage = () => {
  const [query, setQuery] = useState({});
  const { data, isLoading, isError } = useGetAvailableListingsQuery(query);

  return (
    <div className="flex flex-col mx-auto my-2 h-auto px-3 md:px-4 max-w-screen-xl w-full items-start">
      <Search />
      <div className="flex flex-col md:flex-row w-full justify-center gap-4">
        <Filters setQuery={setQuery} query={query} error={isError} />

        {isLoading ? (
          <div className="flex flex-col w-full md:w-3/4 py-6 gap-4">
            {[...Array(2)].map((_, idx) => (
              <CardSkeleton key={idx} />
            ))}
          </div>
        ) : (
          <Hotels data={data} error={isError} />
        )}
      </div>
    </div>
  );
};
