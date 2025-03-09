import { useState } from "react";

const filterOptions = [
  {
    id: "popular",
    type: "popular-filters",
    options: ["free cancellation", "couple friendly", "free breakfast"],
  },
  {
    id: "location",
    type: "location",
    options: ["Station Road", "Mumbai", "New Delhi", "Gurugram", "Lucknow"],
  },
  {
    id: "price",
    type: "price",
    options: [
      "0 to 1500",
      "1500 to 3000",
      "3000 to 7000",
      "7000 to 12000",
      "12000 to 20000",
    ],
  },
  {
    id: "rating",
    type: "rating",
    options: [3, 4, 5],
  },
];

import { MdPlayArrow } from "react-icons/md";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";

const Filters = ({ query, setQuery, error }) => {
  const [openFilters, setOpenFilters] = useState({ popular: true });
  const [checkedFilters, setCheckedFilters] = useState({});

  const toggleFilterList = (listId) =>
    setOpenFilters((prev) => ({ ...prev, [listId]: !prev[listId] }));

  const handleFilterUpdate = (option, type) => {
    if (error) return;

    console.log("error");
    const key = type === "popular-filters" ? "popularFilter" : type;
    const isActive = query[key]?.includes(option);

    setCheckedFilters((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));

    setQuery((prev) => ({
      ...prev,
      [key]: isActive
        ? prev[key].filter((item) => item !== option)
        : [...(prev[key] || []), option],
    }));
  };

  const clearFilters = () => {
    setCheckedFilters({});
    setQuery({});
  };

  return (
    <aside className="py-6 w-[25%] h-full flex justify-center items-start flex-col">
      <div className="w-full p-3 bg-white rounded-lg">
        <div className="mb-4 w-full flex justify-between items-center">
          <h2 className="text-xl font-bold uppercase">Filters</h2>
          <button
            className="bg-blue-600/10 hover:bg-blue-600/20 px-2 py-1 rounded-xl shadow-md"
            onClick={clearFilters}
          >
            <span className="text-[11px] uppercase">Clear</span>
          </button>
        </div>

        {filterOptions.map((filter) => (
          <div key={filter.id}>
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => toggleFilterList(filter.id)}
            >
              <MdPlayArrow
                size={18}
                className={`transform ${
                  openFilters[filter.id] ? "rotate-90" : "rotate-0"
                } transition-transform`}
              />
              <span className="text-[16px] font-bold">{filter.type}</span>
            </div>

            <ul
              className={`p-2 space-y-1 text-[13px] ${
                openFilters[filter.id] ? "block" : "hidden"
              }`}
            >
              {filter.options.map((option) => (
                <li
                  key={option}
                  onClick={() => handleFilterUpdate(option, filter.type)}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  {checkedFilters[option] ? (
                    <FaCheckSquare color="blue" />
                  ) : (
                    <FaRegSquare />
                  )}
                  <span>{option}</span>
                  {filter.type === "rating" &&
                    Array(parseInt(option))
                      .fill(0)
                      .map((_, idx) => <span key={idx}>⭐</span>)}
                </li>
              ))}
            </ul>
            <div className="my-2 w-full h-[0.8px] bg-gray-300"></div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Filters;
