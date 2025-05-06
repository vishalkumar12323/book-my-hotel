import Card from "./Card.jsx";
import { useSelector } from "react-redux";
import { hotelsData } from "../app/store/slices/hotelSlice.js";

const Hotels = ({ error }) => {
  const { hotels } = useSelector(hotelsData);
  if (error && !hotels) {
    return (
      <>
        <div className="w-full h-[50vh] flex justify-center items-center text-2xl">
          <div className="flex flex-col space-y-2">
            <span>Failed to fetch hotels</span>
            <button
              className="bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded shadow-md"
              onClick={() => {
                console.log("refetching...");
              }}
            >
              <span className="text-[15px] capitalize text-white dark:text-text">
                Try, again
              </span>
            </button>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="py-3 md:py-6 w-full">
      {hotels && hotels?.length > 0 ? (
        hotels.map((hotel) => <Card hotel={hotel} key={hotel.id} />)
      ) : (
        <div className="w-full h-[50vh] flex justify-center items-center text-2xl">
          <div className="text-[16px] text-center leading-tight">
            <strong>
              <span className="capitalize text-[18px]">thankyou</span> for your
              interest,
            </strong>{" "}
            <br />
            but currently there are no hotels and restaurant for booking
          </div>
        </div>
      )}
    </div>
  );
};

export default Hotels;
