const PendingBookingSkeleton = () => {
  return (
    <>
      <tr className="min-w-full shadow ">
        <td className="">
          <div className="animate-pulse flex justify-center space-x-4">
            <div className="h-4 bg-[#a4d3f3] rounded w-1/2"></div>
          </div>
        </td>
        <td className="py-3 px-2 border-b">
          <div className="animate-pulse flex justify-center space-x-4">
            <div className="h-4 bg-[#a4d3f3] rounded w-1/3"></div>
          </div>
        </td>
        <td className="py-3 px-2 border-b">
          <div className="animate-pulse flex justify-center space-x-4">
            <div className="h-4 bg-[#a4d3f3] rounded w-1/3"></div>
          </div>
        </td>
        <td className="py-3 px-2 border-b">
          <div className="animate-pulse flex justify-center space-x-4">
            <div className="h-4 bg-[#a4d3f3] rounded w-1/3"></div>
          </div>
        </td>
        <td className="py-3 px-2 border-b">
          <div className="animate-pulse flex justify-center space-x-4">
            <div className="h-4 bg-[#a4d3f3] rounded w-1/3"></div>
          </div>
        </td>
        <td className="py-3 px-2 border-b">
          <div className="animate-pulse flex justify-center space-x-4">
            <div className="h-4 bg-[#a4d3f3] rounded w-1/5"></div>
          </div>
        </td>
        <td>
          <div className="animate-pulse flex justify-center pr-4">
            <div className="h-4 bg-[#a4d3f3] rounded w-full"></div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default PendingBookingSkeleton;
