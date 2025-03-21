import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaMapMarkerAlt, FaBed } from "react-icons/fa";
import { PiArrowFatLinesDown } from "react-icons/pi";
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
    <section className="my-6 md:my-10 flex flex-col p-2 md:p-4 border shadow max-w-screen-xl mx-auto h-auto w-screen rounded">
      <div className="flex flex-col gap-2 w-full h-full">
        <div className="flex flex-col">
          <h2 className="text-4xl font-bold mb-2 text-slate-900">
            Hotel Villaruk
          </h2>
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              <FaStar className="text-yellow-500" />
              <span>4.5 Star Hotel</span>
            </div>
            <div className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-blue-500" />{" "}
              <span>Mumbai, India</span>
            </div>
            <div className="flex items-center gap-1">
              <FaBed size={16} /> <span>Duplex Bed</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full h-full">
          <div className="w-full h-full img-container">
            <img
              src="/hotel-alewaria.jpg"
              alt="hotel"
              className="w-full h-full md:h-[500px] object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2 w-full h-full">
            <div className="img-container">
              <img
                src="/hotel1.webp"
                alt="hotel"
                className="w-full md:h-[250px] object-cover"
              />
            </div>
            <div className="img-container h-full">
              <img
                src="/hotel1.webp"
                alt="hotel"
                className="w-full md:h-[250px] object-cover"
              />
            </div>
            <div className="img-container h-full">
              <img
                src="/hotel1.webp"
                alt="hotel"
                className="w-full md:h-[250px] object-cover"
              />
            </div>
          </div>
        </div>

        <div className="my-2 md:my-3 flex md:flex-row flex-col justify-between gap-2">
          <div className="flex flex-col gap-2 w-full">
            <h3 className="text-2xl font-semibold text-slate-900">
              Facilities
            </h3>
            <div className="text-slate-700 text-[15px]">
              <p>✅Swimming Pool</p>
              <p>✅Free Wifi</p>
              <p>✅Free Parking</p>
              <p>✅Spa</p>
              <p>✅Restaurant</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full justify-end items-end">
            <p className="text-[13px] md:text-[15px]">
              <span className="line-through">₹12,000</span>,{" "}
              <span>
                {" "}
                <strong>₹5,550</strong> + 440 taxes&fees per night
              </span>
            </p>

            <button className="flex gap-1 items-center text-center justify-center bg-blue-500 w-[295px] uppercase font-semibold hover:bg-blue-600 transition-colors text-white py-2 px-4 rounded-md">
              <span>view room option</span> <PiArrowFatLinesDown size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="h-[0.5px] my-4 w-full bg-slate-400"></div>

      <div className=""></div>
    </section>
  );
};
