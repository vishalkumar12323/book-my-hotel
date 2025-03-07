import React, { useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");
  return (
    <div className="flex justify-between items-center space-y-2 w-full mx-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="w-full flex gap-2"
      >
        <input
          type="text"
          name="query"
          id="query"
          className="w-full py-2 px-1 focus:ring-1 outline-none focus:ring-blue-600 transition rounded shadow border"
          placeholder="search hotels or restaurants by name, location or property..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="w-[140px] text-[14px] shadow rounded border bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          update search
        </button>
      </form>
    </div>
  );
};

export default Search;
