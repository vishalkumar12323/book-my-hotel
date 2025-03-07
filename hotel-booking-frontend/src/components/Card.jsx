import React from "react";

const Card = ({ hotel }) => {
  return (
    <div className="flex gap-2 mb-2 bg-[#ffffff] border-slate-50 border-2 hover:border-2 hover:border-blue-500 transition-colors shadow-sm rounded-lg p-3 hover:cursor-pointer">
      <div className="w-[20%] max-h-[28rem] flex flex-col gap-2 justify-between">
        <div className="w-full max-h-full">
          <img
            src="./hotel1.webp"
            alt="hotel"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <ul className="max-h-[10rem] flex gap-2">
          {hotel.images.map((image, idx) => (
            <li className="h-full w-full" key={idx}>
              <img
                src={image}
                alt={hotel.name}
                className="w-full h-auto object-cover rounded-md"
              />
            </li>
          ))}
        </ul>
      </div>
      <div className=" flex flex-col flex-wrap justify-between gap-6 w-[80%] h-full">
        <div className="flex px-3 gap-2 justify-between items-center">
          <div className="flex gap-1 items-center">
            <span>4</span> <span>⭐⭐⭐⭐ | {hotel.type} </span>
          </div>
          <div className="flex gap-2 items-center">
            <span>22 Rating</span>
            <span className="bg-green-500 rounded p-1 text-[12px] tracking-widest text-white font-bold">
              4.2/5
            </span>
          </div>
        </div>
        <div className="px-3 flex flex-col">
          <a itemProp="name" href="#" className="text-[1.2rem] font-bold">
            {hotel.name}
          </a>
          <div itemProp="address" className="text-[14px]">
            {hotel.address}
          </div>
        </div>
        <div className="px-3">
          <ul className="flex flex-col text-[12px]">
            <li>✅Free Cancellation</li>
            <li>✅Book @ ₹0 available</li>
            <li>✅Breakfast available at extra charges</li>
          </ul>
        </div>
        <div className="px-3">
          <div className="flex gap-1 text-[13px] items-center">
            <span className="line-through">₹12,000</span>
            <strong className="text-[16px]">₹{hotel.price}</strong>+
            <span>₹850 taxes &fees per night</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
