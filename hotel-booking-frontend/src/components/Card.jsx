import React, { useState } from "react";
import { Link } from "react-router-dom";
import { cld } from "../app/services/cloudinary";
import { AdvancedImage } from "@cloudinary/react";
import { quality, format } from "@cloudinary/url-gen/actions/delivery";

const Card = ({ hotel }) => {
  const [mainImage, setMainImage] = useState(hotel?.images?.[0] || null);
  return (
    <Link to={`/hotels/${hotel.id}/${hotel.name}`}>
      <div className="flex flex-col sm:flex-row gap-2 mb-2 bg-white border-slate-50 border-2 hover:border-blue-500  transition-colors shadow-sm rounded-lg p-3 hover:cursor-pointer">
        <div className="w-full sm:w-[35%] md:w-[26%] max-h-[28rem] flex flex-col gap-2 justify-between">
          <div className="w-full max-h-full img-container">
            {mainImage ? (
              <AdvancedImage
                cldImg={cld
                  .image(mainImage)
                  .delivery(quality("auto"))
                  .delivery(format("auto"))}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <img
                src="./hotel1.webp"
                alt="hotel"
                className="w-full h-full object-cover rounded-md"
              />
            )}
          </div>

          <ul className="max-h-[10rem] flex gap-2 overflow-x-auto">
            {hotel?.images?.map((imgId) => (
              <li
                className="h-12 w-12 img-container"
                key={imgId}
                onMouseEnter={() => setMainImage(imgId)}
                onMouseLeave={() => setMainImage(hotel.images[0])}
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

        <div className="flex flex-col justify-between gap-6 w-full sm:w-[60%] md:w-[70%] h-full">
          <div className="flex px-[6px] md:px-3 gap-2 justify-between items-center text-[13px] md:text-[15px]">
            <div className="flex gap-1 items-center ">
              <span>4</span> <span>⭐⭐⭐⭐ | {hotel.type}</span>
            </div>

            <div className="flex gap-2 items-center">
              <span>22 Rating</span>
              <span className="bg-green-500 rounded p-1 text-[12px] tracking-widest text-white font-bold">
                {hotel.rating}/5
              </span>
            </div>
          </div>

          <div className="px-[6px] md:px-3 flex flex-col">
            <span
              itemProp="name"
              href="#"
              className="capitalize text-[16px] md:text-[1.2rem] font-bold"
            >
              {hotel.name}
            </span>
            <div itemProp="address" className="text-[12px] md:text-[14px]">
              {hotel.address}
            </div>
          </div>

          <div className="px-[6px] md:px-3">
            <ul className="flex flex-col text-[12px]">
              {hotel.facilities.map((faciliti) => (
                <li key={faciliti}>✅ {faciliti}</li>
              ))}
            </ul>
          </div>

          <div className="px-[6px] md:px-3">
            <div className="flex gap-1 text-[12px] md:text-[13px] items-center">
              <span className="line-through">₹12,000</span>
              <strong className="text-[16px]">₹{hotel.price}</strong>+
              <span>₹850 taxes & fees per night</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
