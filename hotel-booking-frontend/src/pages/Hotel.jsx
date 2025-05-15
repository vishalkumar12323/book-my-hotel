import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaMapMarkerAlt, FaBed } from "react-icons/fa";
import { PiArrowFatLinesDown } from "react-icons/pi";
import { useGetListingByIdQuery } from "../app/services/listingServices.js";
import { useDispatch, useSelector } from "react-redux";
import {
  listingData,
  setListingInfo,
} from "../app/store/slices/listingInfoSlice.js";
import { HotelCardSkeleton } from "../components";
import { cld } from "../app/services/cloudinary.js";
import { AdvancedImage } from "@cloudinary/react";
import { quality, format } from "@cloudinary/url-gen/actions/delivery";

export const Hotel = () => {
  const { listing } = useSelector(listingData);
  const params = useParams();
  const dispatch = useDispatch();
  const roomsRef = useRef(null);

  const { units } = listing;
  const { data, isLoading } = useGetListingByIdQuery(params.hotelId);

  useEffect(() => {
    if (data) {
      dispatch(setListingInfo(data));
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
                <h2 className="capitalize text-3xl md:text-4xl font-bold mb-2 text-slate-900">
                  {listing?.name}
                </h2>
                <div className="w-full md:w-fit flex flex-col md:flex-row items-start md:items-center gap-[10px] md:gap-3 text-sm">
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-500" />
                    <span>
                      {listing?.rating} Star {listing?.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaMapMarkerAlt className="text-blue-500" />{" "}
                    <span>{listing?.address}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaBed size={16} /> <span>Duplex Bed</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full justify-start items-end">
                <button
                  className="flex gap-1 items-center text-center justify-center bg-blue-500 w-fit md:w-[295px] uppercase font-semibold hover:bg-blue-600 transition-colors text-white py-2 px-4 rounded-md"
                  onClick={() => {
                    if (roomsRef.current)
                      roomsRef.current.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span className="text-[13px] md:text-[16px]">
                    view room option
                  </span>{" "}
                  <PiArrowFatLinesDown size={20} />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full h-full">
              <div className="w-full h-full object-cover img-container">
                <AdvancedImage
                  cldImg={cld
                    .image(listing?.coverImageId)
                    .delivery(quality("auto"))
                    .delivery(format("auto"))}
                />
              </div>
              <div className="flex gap-2 w-full h-full">
                <ul className="flex gap-2">
                  {listing &&
                    listing?.images?.map((imgId) => (
                      <li
                        className="w-full md:h-[180px] md:w-[180px] object-cover img-container"
                        key={imgId}
                      >
                        <AdvancedImage
                          cldImg={cld
                            .image(imgId)
                            .delivery(quality("auto"))
                            .delivery(format("auto"))}
                        />
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            <div className="my-2 md:my-3 flex md:flex-row flex-col justify-between gap-2">
              <div className="flex flex-col gap-2 w-full">
                <h3 className="text-2xl font-semibold text-slate-900">
                  Facilities
                </h3>
                <ul className="text-slate-700 text-[15px] flex flex-col">
                  {listing &&
                    listing?.facilities?.map((faciliti) => (
                      <li key={faciliti}>✅{faciliti}</li>
                    ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="h-[0.8px] my-4 w-full bg-slate-400"></div>

          <div className="w-full mt-2 mb-3 p-1 md:p-2" ref={roomsRef}>
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

            {units && units.length > 0 ? (
              units.map((unit, idx) => {
                const {
                  ac,
                  tv,
                  waterPurifier,
                  bathroom,
                  kitchen,
                  wifi,
                  twineBed,
                  cityView,
                } = unit.roomFacility;
                return (
                  <div
                    className="mb-3 flex gap-4 justify-center items-start h-full w-full border shadow md:p-4"
                    key={unit.id}
                  >
                    <div className="w-full">
                      <div className="img-container w-full">
                        <li
                          className="w-full md:h-[225px] md:w-[300px] object-cover"
                          key={listing.images[idx]}
                        >
                          <AdvancedImage
                            cldImg={cld
                              .image(listing.images[idx])
                              .delivery(quality("auto"))
                              .delivery(format("auto"))}
                          />
                        </li>
                      </div>
                    </div>
                    <div className="w-full h-full flex justify-between items-start">
                      <div className="w-full h-full flex flex-col justify-center items-start">
                        <h3 className="text-[15px] md:text-[18px] capitalize font-medium text-slate-900">
                          {unit.type}
                        </h3>
                        <span className="text-[13px] md:text-[14px] text-green-700 font-medium">
                          {unit.capacity} People
                        </span>

                        <div className="w-full justify-start text-[13px] md:text-[14px] text-slate-700 mt-4 font-normal flex md:gap-4 flex-col  md:flex-row">
                          <div className="w-full flex gap-1 flex-col">
                            {kitchen && <div>Kitchen ✅</div>}
                            {wifi && <div>Wifi ✅</div>}
                            {waterPurifier && <div>Water purifier ✅</div>}
                            {ac && <div>Ac ✅</div>}
                          </div>
                          <div className="w-full flex gap-1 flex-col">
                            {bathroom && <div>Bathroom ✅</div>}
                            {cityView && <div>City view ✅</div>}
                            {twineBed && <div>twine Bed ✅</div>}
                            {tv && <div>Tv ✅</div>}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <div className="w-full flex flex-col justify-center items-start gap-2">
                        <div className="text-[13px] md:text-[15px] font-medium">
                          <p>
                            <span className="line-through">
                              ₹{unit.originalPrice}
                            </span>
                            ,{" "}
                            <strong>
                              {" "}
                              ₹{unit.originalPrice - unit.discountPrice}
                            </strong>{" "}
                            <br />{" "}
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
                );
              })
            ) : (
              <h1>No any units</h1>
            )}
          </div>
        </section>
      )}
    </>
  );
};
