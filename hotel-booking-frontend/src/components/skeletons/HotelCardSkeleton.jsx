const HotelCardSkeleton = () => {
  return (
    <section className="my-6 md:my-10 flex flex-col p-2 md:p-4 border shadow max-w-screen-xl mx-auto h-auto w-screen rounded">
      <div className="flex flex-col gap-2 w-full h-full">
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col w-full">
            <div className="w-[9rem] h-8 rounded bg-[#a4d3f3] animate-pulse mb-2"></div>
            <div className="flex items-center gap-3 text-sm">
              <div className="animate-pulse rounded bg-[#a4d3f3]"></div>
              <div className="w-24 h-4 rounded bg-[#a4d3f3] animate-pulse"></div>
              <div className="bg-[#a4d3f3] w-24 h-4 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="animate-pulse w-64 h-10 rounded bg-[#a4d3f3]"></div>
        </div>
        <div className="flex flex-col gap-2 w-full h-full">
          <div className="w-full h-[400px] animate-pulse rounded bg-[#a4d3f3]"></div>
          <div className="flex gap-2 w-full h-full">
            <div className="animate-pulse w-[180px] h-[180px] rounded bg-[#a4d3f3]"></div>

            <div className="animate-pulse w-[180px] h-[180px] rounded bg-[#a4d3f3]"></div>
            <div className="animate-pulse w-[180px] h-[180px] rounded bg-[#a4d3f3]"></div>
          </div>
        </div>

        <div className="my-2 md:my-3 flex md:flex-row flex-col justify-between gap-2">
          <div className="flex flex-col gap-2 w-full">
            <div className="w-40 h-6 animate-pulse bg-[#a4d3f3] rounded"></div>
            <div className="">
              <ul className="flex flex-col gap-2">
                {[...Array(4)].map((_, i) => {
                  const randomWidth = Math.floor(Math.random() * 200) + 1;
                  return (
                    <li
                      style={{ width: `${randomWidth}px` }}
                      key={i}
                      className="animate-pulse rounded bg-[#a4d3f3] w-32 h-4"
                    ></li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[0.8px] my-4 w-full bg-slate-400"></div>

      <div className="w-full mt-2 mb-3 p-2">
        <div className="w-full flex justify-between items-center gap-4 py-4">
          <div className="animate-pulse rounded bg-[#a4d3f3] w-52 h-7"></div>
          <div className="animate-pulse rounded bg-[#a4d3f3] w-48 h-7"></div>
          <div className="animate-pulse rounded bg-[#a4d3f3] w-52 h-7"></div>
        </div>

        <div className="mb-3 flex gap-4 justify-center items-start h-full w-full border shadow p-4">
          <div className="w-full flex justify-between items-center">
            <div className="w-full animate-pulse h-[200px] bg-[#a4d3f3]"></div>
          </div>
          <div className="w-full h-full flex justify-between items-start">
            <div className="w-full h-full flex flex-col justify-center items-start">
              <div className=" animate-pulse rounded bg-[#a4d3f3] w-52 h-6 mb-2"></div>
              <span className="animate-pulse rounded bg-[#a4d3f3] w-48 h-5"></span>

              <div className="mt-3">
                <ul className="flex flex-col gap-2">
                  {[...Array(3)].map((_, i) => {
                    const randomWidth = Math.floor(Math.random() * 200) + 1;
                    return (
                      <li
                        style={{ width: `${randomWidth}px` }}
                        key={i}
                        className="animate-pulse rounded bg-[#a4d3f3] w-32 h-4"
                      ></li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="w-full flex flex-col justify-center items-start gap-2">
              <div className=" animate-pulse rounded bg-[#a4d3f3] w-44 h-6"></div>
              <div className=" animate-pulse rounded bg-[#a4d3f3] w-40 h-5"></div>

              <div className=" animate-pulse rounded bg-[#a4d3f3] w-32 h-10 mt-2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotelCardSkeleton;
