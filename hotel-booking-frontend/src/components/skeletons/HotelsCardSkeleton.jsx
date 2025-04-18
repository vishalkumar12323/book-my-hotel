import React from "react";

const HotelsCardSkeleton = () => {
  return (
    <div className="w-full h-full flex">
      <div className="bg-white flex w-full h-[317px] rounded-md">
        <div className="flex flex-col h-full w-1/3 space-y-4 p-3">
          <div className="animate-pulse w-full h-52 rounded bg-[#a4d3f3]"></div>
          <div className="flex space-x-3 items-center">
            <div className="animate-pulse w-full h-16 rounded bg-[#a4d3f3]"></div>
            <div className="animate-pulse w-full h-16 rounded bg-[#a4d3f3]"></div>
            <div className="animate-pulse w-full h-16 rounded bg-[#a4d3f3]"></div>
          </div>
        </div>

        <div className="p-3 flex flex-col justify-between w-full">
          <div className="flex gap-2 items-start w-full">
            <div className="flex gap-2 items-center w-full">
              <div className="w-20 h-3 animate-pulse bg-[#a4d3f3] rounded"></div>
              <div className="w-16 h-3 animate-pulse bg-[#a4d3f3] rounded"></div>
            </div>
            <div className="w-20 h-10 animate-pulse bg-[#a4d3f3] rounded"></div>
          </div>
          <div className="flex flex-col gap-2  w-full">
            <div className="w-32 h-5 animate-pulse bg-[#a4d3f3] rounded"></div>
            <div className="w-52 h-3 animate-pulse bg-[#a4d3f3] rounded"></div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-44 h-4 animate-pulse bg-[#a4d3f3] rounded"></div>
            <div className="w-52 h-4 animate-pulse bg-[#a4d3f3] rounded"></div>
            <div className="w-60 h-4 animate-pulse bg-[#a4d3f3] rounded"></div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-80 h-3 animate-pulse bg-[#a4d3f3] rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelsCardSkeleton;
