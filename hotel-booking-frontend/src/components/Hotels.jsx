import Card from "./Card.jsx";

const Hotels = ({ data, isLoading }) => {
  return (
    <div className="py-6 w-full md:w-3/4">
      {data &&
        data.map((hotel) => {
          return <Card key={hotel.id} hotel={hotel} isLoading={isLoading} />;
        })}
    </div>
  );
};

export default Hotels;
