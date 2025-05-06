import { useState } from "react";
import { MdPlayArrow } from "react-icons/md";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import { useSelector } from "react-redux";
import { hotelsData } from "../app/store/slices/hotelSlice.js";

const filterOptions = [
  {
    id: "popular",
    type: "popular-filters",
    options: [
      "free cancellation",
      "couple friendly",
      "free breakfast",
      "swimming pool",
    ],
  },
  {
    id: "location",
    type: "location",
    options: ["Mumbai", "New Delhi", "Gurugram"],
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

const Filters = ({ query, setQuery, error }) => {
  const { hotels } = useSelector(hotelsData);
  const [openFilters, setOpenFilters] = useState({ popular: true });
  const [checkedFilters, setCheckedFilters] = useState({});

  const toggleFilterList = (listId) =>
    setOpenFilters((prev) => ({ ...prev, [listId]: !prev[listId] }));

  const handleFilterUpdate = (option, type) => {
    if (error && hotels.length <= 0) return;

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

  const calculateTotalFilters = (queries) => {
    if (!queries) return 0;
    const {
      popularFilter = [],
      location = [],
      price = [],
      rating = [],
    } = queries;
    const totalFilters = [
      ...(popularFilter || []),
      ...(location || []),
      ...(price || []),
      ...(rating || []),
    ].length;

    return totalFilters;
  };
  return (
    <aside className="py-3 md:py-6 w-full md:w-[25%] h-full flex justify-start items-start flex-col">
      <div className="w-full p-3 bg-white rounded-lg">
        <div className="mb-4 w-full flex justify-between items-center">
          <h2 className=" text-[16px] md:text-xl font-bold uppercase text-slate-900">
            Filters
          </h2>
          <button
            onClick={clearFilters}
            className={`${
              calculateTotalFilters(query) > 0
                ? "bg-blue-200 hover:bg-blue-300"
                : "bg-transparent"
            } p-1 rounded-md duration-500 transition-colors shadow `}
          >
            <span className="text-[10px] md:text-[11px] text-gray-700 uppercase">
              Clear {calculateTotalFilters(query)}
            </span>
          </button>
        </div>
        <div className="w-full h-[0.8px] bg-gray-300 hidden md:block"></div>

        <div className="w-full grid grid-cols-2 md:grid-cols-none mt-4">
          {filterOptions.map((filter) => (
            <div key={filter.id} className="w-full">
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => toggleFilterList(filter.id)}
              >
                <MdPlayArrow
                  size={18}
                  className={`transform ${
                    openFilters[filter.id] ? "rotate-90" : "rotate-0"
                  } transition-transform z-0`}
                />
                <span className="text-[14px] md:text-[16px] font-bold capitalize text-slate-900">
                  {filter.type}
                </span>
              </div>

              <ul
                className={`p-2 space-y-2 text-[11px] md:text-[13px] ${
                  openFilters[filter.id] ? "block" : "hidden"
                }`}
              >
                {filter.options.map((option) => (
                  <li
                    key={option}
                    onClick={() => handleFilterUpdate(option, filter.type)}
                    className="flex items-center gap-1 cursor-pointer filter-list"
                  >
                    {checkedFilters[option] ? (
                      <FaCheckSquare color="blue" />
                    ) : (
                      <FaRegSquare />
                    )}
                    <span className="hover:font-medium">{option}</span>
                    {filter.type === "rating" && (
                      <span className="capitalize text-[13px] hover:font-medium">
                        star
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              <div className="my-3 w-full h-[0.8px] bg-gray-300 hidden md:block"></div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Filters;
