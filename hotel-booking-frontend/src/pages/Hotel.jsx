import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaMapMarkerAlt, FaBed } from "react-icons/fa";
import { PiArrowFatLinesDown } from "react-icons/pi";
import { useGetHotelByIdQuery } from "../app/services/hotelServices";
import { useDispatch, useSelector } from "react-redux";
import { setHotelInfo, hotelData } from "../app/store/slices/hotelInfoSlice.js";
import { HotelCardSkeleton } from "../components";

export const Hotel = () => {
  const { hotel } = useSelector(hotelData);
  const params = useParams();
  const dispatch = useDispatch();
  const roomsRef = useRef(null);

  const { data, isLoading } = useGetHotelByIdQuery(params.hotelId);

  useEffect(() => {
    if (data) {
      dispatch(setHotelInfo(data));
    }
  }, [data, dispatch]);
  return (
    <>
      {isLoading ? (
        <HotelCardSkeleton />
      ) : (
        <section className="my-6 md:my-10 flex flex-col p-2 md:p-4 border shadow max-w-screen-xl mx-auto h-auto w-screen rounded">
          <div className="flex flex-col gap-2 w-full h-full">
            <div className="flex justify-between items-start w-full">
              <div className="flex flex-col w-full">
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
              <div className="flex flex-col gap-2 w-full justify-start items-end">
                <button
                  className="flex gap-1 items-center text-center justify-center bg-blue-500 w-[295px] uppercase font-semibold hover:bg-blue-600 transition-colors text-white py-2 px-4 rounded-md"
                  onClick={() => {
                    if (roomsRef.current)
                      roomsRef.current.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span>view room option</span>{" "}
                  <PiArrowFatLinesDown size={20} />
                </button>
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
              <div className="flex gap-2 w-full h-full">
                <div className="img-container">
                  <img
                    src="/hotel1.webp"
                    alt="hotel"
                    className="w-full md:h-[180px] md:w-[180px] object-cover"
                  />
                </div>
                <div className="img-container h-full">
                  <img
                    src="/hotel1.webp"
                    alt="hotel"
                    className="w-full md:h-[180px] md:w-[180px] object-cover"
                  />
                </div>
                <div className="img-container h-full">
                  <img
                    src="/hotel1.webp"
                    alt="hotel"
                    className="w-full md:h-[180px] md:w-[180px] object-cover"
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
            </div>
          </div>

          <div className="h-[0.8px] my-4 w-full bg-slate-400"></div>

          <div className="w-full mt-2 mb-3 p-2" ref={roomsRef}>
            <div className="w-full flex justify-between items-center gap-4 py-4">
              <div className="w-full flex justify-start items-center text-xl capitalize font-semibold text-slate-900">
                Rooms
              </div>
              <div className="w-full flex justify-start items-center text-xl capitalize font-semibold text-slate-900">
                Facilities
              </div>
              <div className="w-full flex justify-start items-center text-xl capitalize font-semibold text-slate-900">
                price
              </div>
            </div>

            <div className="mb-3 flex gap-4 justify-center items-start h-full w-full border shadow p-4">
              <div className="w-full flex justify-between items-center">
                <div className="img-container w-full">
                  <img
                    src="/hotel7.webp"
                    alt="hotel"
                    className="w-full h-[200px] object-cover"
                  />
                </div>
              </div>
              <div className="w-full h-full flex justify-between items-start">
                <div className="w-full h-full flex flex-col justify-center items-start">
                  <h3 className="text-[18px] capitalize font-medium text-slate-900">
                    single bed room
                  </h3>
                  <span className="text-[14px] text-green-700 font-medium">
                    2 Guest
                  </span>

                  <div className="text-[14px] text-slate-700 mt-4 font-normal">
                    <ul>
                      <li>✅free cancellation before 1 april, 2025</li>
                      <li>✅free breakfast</li>
                      <li>✅free wifi</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-between items-center">
                <div className="w-full flex flex-col justify-center items-start gap-2">
                  <div className="text-[13px] md:text-[15px] font-medium">
                    <p>
                      <span className="line-through">₹6,000</span>,{" "}
                      <strong> ₹3,250</strong> <br />{" "}
                      <span className="text-[13px] pl-1">
                        240 taxes fees per night
                      </span>
                    </p>
                  </div>
                  <button className="flex gap-1 items-center text-center justify-center border border-blue-500 text-blue-500 w-fit capitalize font-semibold hover:bg-blue-600 transition-colors hover:text-white py-2 px-4 rounded-md">
                    <span>book now</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-3 flex gap-4 justify-center items-start h-full w-full border shadow p-4">
              <div className="w-full flex justify-between items-center">
                <div className="img-container w-full">
                  <img
                    src="/hotel7.webp"
                    alt="hotel"
                    className="w-full h-[200px] object-cover"
                  />
                </div>
              </div>
              <div className="w-full h-full flex justify-between items-start">
                <div className="w-full h-full flex flex-col justify-center items-start">
                  <h3 className="text-[18px] capitalize font-medium text-slate-900">
                    single bed room
                  </h3>
                  <span className="text-[14px] text-green-700 font-medium">
                    2 Guest
                  </span>

                  <div className="text-[14px] text-slate-700 mt-4 font-normal">
                    <ul>
                      <li>✅free cancellation before 1 april, 2025</li>
                      <li>✅free breakfast</li>
                      <li>✅free wifi</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-between items-center">
                <div className="w-full flex flex-col justify-center items-start gap-2">
                  <div className="text-[13px] md:text-[15px] font-medium">
                    <p>
                      <span className="line-through">₹6,000</span>,{" "}
                      <strong> ₹3,250</strong> <br />{" "}
                      <span className="text-[13px] pl-1">
                        240 taxes fees per night
                      </span>
                    </p>
                  </div>
                  <button className="flex gap-1 items-center text-center justify-center border border-blue-500 text-blue-500 w-fit capitalize font-semibold hover:bg-blue-600 transition-colors hover:text-white py-2 px-4 rounded-md">
                    <span>book now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
