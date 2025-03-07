import React, { useEffect, useState } from "react";
import { MdPlayArrow } from "react-icons/md";

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
];

const Filters = ({ query, setQuery }) => {
  const [openFilters, setOpenFilters] = useState({ popular: true });
  const [isChecked, setIsChecked] = useState({ checked: false });

  const toggleFilterList = (listId) => {
    setOpenFilters((prevState) => {
      return {
        ...prevState,
        [listId]: !prevState[listId],
      };
    });
  };

  const handleQueryUpdates = (q, queryType, listId) => {
    setIsChecked((prevState) => ({
      ...prevState,
      [listId]: !prevState[listId],
    }));

    if (q && queryType) {
      const newQuery = {};
      newQuery[queryType] = q;
      setQuery((preQuery) => {
        return { ...preQuery, ...newQuery };
      });
    }
  };

  return (
    <aside className="py-6 w-[25%] h-full flex justify-center items-start flex-col">
      <div className="w-full p-3 bg-[#ffffff] rounded-lg">
        <div className="mb-4 w-full flex justify-between items-center">
          <h2 className="text-xl font-bold uppercase">Filters</h2>
          <div
            className="bg-blue-600/10 hover:bg-blue-600/20 transition-colors cursor-pointer px-2 py-1 rounded-xl shadow-md"
            onClick={() => {
              setIsChecked({});
              setQuery({});
            }}
          >
            <span className="text-[11px] uppercase select-none">clear</span>
          </div>
        </div>

        <div className="my-2 w-full h-[1px] bg-gray-300"></div>

        {filterOptions.map((filter) => (
          <div key={filter.id}>
            <div
              className="flex gap-1 items-center justify-start cursor-pointer select-none"
              onClick={() => toggleFilterList(filter.id)}
            >
              <MdPlayArrow
                size={18}
                className={`transform ${
                  openFilters[filter.id] ? "rotate-90" : "rotate-0"
                } duration-300 z-0`}
              />
              <span className="text-[16px] font-bold">{filter.type}</span>
            </div>

            <ul
              className={`p-2 flex flex-col space-y-1 text-[12px] font-semibold text-gray-700 transition-all duration-300 select-none ${
                openFilters[filter.id] ? "block" : "hidden"
              }`}
            >
              {filter.options.map((option) => (
                <li
                  className="flex items-center gap-1 cursor-pointer"
                  key={option}
                  onClick={() =>
                    handleQueryUpdates(option, filter.type, option)
                  }
                >
                  {isChecked[option] ? <CheckBoxFill /> : <CheckBox />}
                  <span htmlFor={option}>{option}</span>
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

const CheckBox = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      fill="currentColor"
      className="bi bi-square"
      viewBox="0 0 16 16"
    >
      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
    </svg>
  );
};

const CheckBoxFill = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      fill="blue"
      className="bi bi-check-square-fill"
      viewBox="0 0 16 16"
    >
      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z" />
    </svg>
  );
};
