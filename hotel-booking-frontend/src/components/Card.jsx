import React from "react";

const Card = ({ hotel, isLoading }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-2 bg-[#ffffff] border-slate-50 border-2 hover:border-blue-500 transition-colors shadow-sm rounded-lg p-3 hover:cursor-pointer">
      <div className="w-full sm:w-[40%] md:w-[30%] max-h-[28rem] flex flex-col gap-2 justify-between">
        <div className="w-full max-h-full">
          {isLoading ? (
            <div className="animate-pulse bg-gray-400 w-full h-40 rounded-md"></div>
          ) : (
            <img
              src="./hotel1.webp"
              alt="hotel"
              className="w-full h-full object-cover rounded-md"
            />
          )}
        </div>

        <ul className="max-h-[10rem] flex gap-2 overflow-x-auto">
          {isLoading
            ? Array(3)
                .fill(0)
                .map((_, idx) => (
                  <li
                    key={idx}
                    className="h-12 w-12 animate-pulse bg-gray-400 rounded-md"
                  ></li>
                ))
            : hotel &&
              hotel?.images?.map((image, idx) => (
                <li className="h-12 w-12" key={idx}>
                  <img
                    src={image}
                    alt={hotel.name}
                    className="w-full h-auto object-cover rounded-md"
                  />
                </li>
              ))}
        </ul>
      </div>

      <div className="flex flex-col justify-between gap-6 w-full sm:w-[60%] md:w-[70%] h-full">
        <div className="flex px-3 gap-2 justify-between items-center">
          <div className="flex gap-1 items-center">
            {isLoading ? (
              <div className="w-20 h-4 bg-gray-400 animate-pulse"></div>
            ) : (
              <>
                <span>4</span> <span>⭐⭐⭐⭐ | {hotel?.type}</span>
              </>
            )}
          </div>

          <div className="flex gap-2 items-center">
            {isLoading ? (
              <div className="w-24 h-4 bg-gray-300 animate-pulse"></div>
            ) : (
              <>
                <span>22 Rating</span>
                <span className="bg-green-500 rounded p-1 text-[12px] tracking-widest text-white font-bold">
                  4.2/5
                </span>
              </>
            )}
          </div>
        </div>

        <div className="px-3 flex flex-col">
          {isLoading ? (
            <>
              <div className="w-40 h-6 bg-gray-400 animate-pulse mb-2"></div>
              <div className="w-32 h-4 bg-gray-400 animate-pulse"></div>
            </>
          ) : (
            <>
              <a itemProp="name" href="#" className="text-[1.2rem] font-bold">
                {hotel.name}
              </a>
              <div itemProp="address" className="text-[14px]">
                {hotel.address}
              </div>
            </>
          )}
        </div>

        <div className="px-3">
          {isLoading ? (
            <div className="w-64 h-12 bg-gray-400 animate-pulse"></div>
          ) : (
            <ul className="flex flex-col text-[12px]">
              <li>✅ Free Cancellation</li>
              <li>✅ Book @ ₹0 available</li>
              <li>✅ Breakfast available at extra charges</li>
            </ul>
          )}
        </div>

        <div className="px-3">
          {isLoading ? (
            <div className="w-56 h-6 bg-gray-400 animate-pulse"></div>
          ) : (
            <div className="flex gap-1 text-[13px] items-center">
              <span className="line-through">₹12,000</span>
              <strong className="text-[16px]">₹{hotel.price}</strong>+
              <span>₹850 taxes & fees per night</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
