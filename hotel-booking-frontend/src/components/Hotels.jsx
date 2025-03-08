import Card from "./Card.jsx";

const Hotels = ({ data }) => {
  return (
    <div className="py-6 w-full md:w-3/4">
      {data?.map((hotel) => (
        <Card hotel={hotel} key={hotel.id} />
      ))}
    </div>
  );
};

export default Hotels;
