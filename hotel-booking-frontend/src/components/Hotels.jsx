import Card from "./Card.jsx";

const Hotels = ({ data }) => {
  return (
    <div className="py-6 w-3/4">
      {data &&
        data.map((hotel) => {
          return <Card key={hotel.id} hotel={hotel} />;
        })}
    </div>
  );
};

export default Hotels;
