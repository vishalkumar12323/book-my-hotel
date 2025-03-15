import Card from "./Card.jsx";

const Hotels = ({ data, error }) => {
  if (data?.length === 0) {
    return (
      <div className="w-full h-[50vh] flex justify-center items-center text-2xl">
        <div className="text-[16px] text-center leading-tight">
          <strong>
            <span className="capitalize text-[18px]">thankyou</span> for your
            interest,
          </strong>{" "}
          <br />
          but currently there are no hotels and restaurant for booking
        </div>
      </div>
    );
  }
  return (
    <div className="py-6 w-full md:w-3/4">
      {data ? (
        data?.map((hotel) => <Card hotel={hotel} key={hotel.id} />)
      ) : (
        <div className="w-full h-full flex justify-center items-center text-2xl">
          {error ? (
            <div className="flex flex-col space-y-2">
              <span>Failed to fetch hotels</span>
              <button className="bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded shadow-md">
                <span className="text-[15px] capitalize text-white dark:text-text">
                  Retry
                </span>
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Hotels;
