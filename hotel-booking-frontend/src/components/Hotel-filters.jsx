import { useState } from "react";
import { MdPlayArrow } from "react-icons/md";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";

const filterOptions = [
  {
    id: "popular",
    type: "popular-filters",
    options: ["free cancellation", "couple friendly", "free breakfast"],
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

const Filters = ({ query, setQuery, error, data }) => {
  const [openFilters, setOpenFilters] = useState({ popular: true });
  const [checkedFilters, setCheckedFilters] = useState({});

  const toggleFilterList = (listId) =>
    setOpenFilters((prev) => ({ ...prev, [listId]: !prev[listId] }));

  const handleFilterUpdate = (option, type) => {
    // if (error || data?.length === 0) return;

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
    <aside className="py-6 w-full md:w-[25%] h-full flex justify-center items-start flex-col">
      <div className="w-full p-3 bg-white rounded-lg">
        <div className="mb-4 w-full flex justify-between items-center">
          <h2 className=" text-[16px] md:text-xl font-bold uppercase">
            Filters
          </h2>
          <button
            className="bg-blue-600/10 hover:bg-blue-600/20 px-[6px] md:px-2 py-[3px] md:py-1 rounded-xl shadow-md"
            onClick={clearFilters}
          >
            <span className="text-[10px] md:text-[11px] uppercase">Clear</span>
          </button>
        </div>

        <div className="w-full grid grid-cols-2 md:grid-cols-none space-x-2">
          {filterOptions.map((filter) => (
            <div key={filter.id} className="w-fit">
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
                <span className="text-[14px] md:text-[16px] font-bold">
                  {filter.type}
                </span>
              </div>

              <ul
                className={`p-2 space-y-1 text-[11px] md:text-[13px] ${
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
              <div className="my-2 w-full h-[0.8px] bg-gray-300 hidden md:block"></div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Filters;
