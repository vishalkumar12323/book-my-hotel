import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaMapMarkerAlt, FaSun, FaBed } from "react-icons/fa";
import { useGetHotelByIdQuery } from "../app/services/hotelServices";
import { useDispatch, useSelector } from "react-redux";
import { setHotelInfo, hotelData } from "../app/store/slices/hotelInfoSlice.js";

export const Hotel = () => {
  const { hotel } = useSelector(hotelData);
  const params = useParams();
  const dispatch = useDispatch();

  const { data } = useGetHotelByIdQuery(params.hotelId);

  useEffect(() => {
    if (data) {
      dispatch(setHotelInfo(data));
    }
  }, [data, dispatch]);
  return (
    <div className="flex flex-col md:flex-row mx-auto my-2 h-auto px-3 md:px-4 py-2 md:py-4 max-w-screen-xl w-full items-start rounded-lg shadow-lg border">
      <div className="w-3/4">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <h2 className="text-xl font-extrabold">{hotel?.name}</h2>
            <div className="flex items-center text-gray-600 text-sm space-x-2">
              <FaStar className="text-yellow-500" /> <span>3-Star Hotel</span>
              <FaMapMarkerAlt /> <span>Bani Park, Jaipur</span>
              <FaSun /> <span>7 minutes walk to Collectorate Campus</span>
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <img
            src="/hotel13.webp"
            alt="Hotel Main"
            className="rounded-lg w-full h-64 object-cover md:col-span-2"
          />
          <div className="grid gap-2">
            <div className="h-32 bg-black rounded-lg flex justify-center items-center text-white">
              Videos (2)
            </div>
            <div className="h-32 bg-gray-300 rounded-lg flex justify-center items-center">
              Traveller Photos (282)
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-4">
          <div className="text-green-600 font-semibold text-lg">
            4.5/5 - View Reviews
          </div>
        </div>
      </div>

      <div className="md:mt-11 pl-4 pr-2 py-4 flex justify-between flex-col space-y-5">
        <h3 className="text-xl font-semibold">Deluxe Room</h3>
        <div className="flex flex-col space-y-[6px] justify-start">
          <p className="text-gray-600 flex items-center">
            <FaBed className="mr-2" /> 2 Guests | 1 Room
          </p>
          <p className="text-green-600 text-sm">✅ Free Breakfast Included</p>
          <p className="text-green-600 text-sm">
            ✅ Free Cancellation Till 11-Apr-2025 12:59
          </p>
        </div>
        <div>
          <div className="text-2xl font-bold mt-2">₹3,329</div>
          <p className="text-gray-500 text-sm">+461 taxes & fees per night</p>
        </div>
        <button className="bg-orange-500 text-white px-6 py-2 rounded-md mt-4 w-full">
          VIEW 4 ROOM OPTIONS
        </button>
      </div>
    </div>
  );
};
