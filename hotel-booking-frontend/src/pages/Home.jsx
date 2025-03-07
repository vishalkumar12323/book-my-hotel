import { Hotels, Filters, Search } from "../components";
import { useGetAvailableListingsQuery } from "../app/services/hotelServices.js";
import { useEffect, useState } from "react";

export const HomePage = () => {
  const [query, setQuery] = useState({});
  const { data, isLoading } = useGetAvailableListingsQuery(query);

  useEffect(() => {
    console.log(query);
  }, [query]);
  return (
    <div className="flex flex-col mx-auto my-2 h-auto px-3 md:px-4 max-w-screen-xl w-full items-start">
      <Search />
      <div className="flex flex-col md:flex-row w-full justify-center gap-4">
        <Filters setQuery={setQuery} query={query} />
        <Hotels data={data} isLoading={isLoading} />
      </div>
    </div>
  );
};
