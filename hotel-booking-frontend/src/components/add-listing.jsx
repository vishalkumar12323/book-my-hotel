import { useState } from "react";

const AddListing = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    description: "",
    facilities: "",
    price: "",
    type: "hotel",
    coverImage: null,
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
  };

  const handleCoverImageChange = (e) => {
    setFormData({ ...formData, coverImage: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting listing:", formData);
    // Here you can send formData to your backend API
  };

  return (
    <div className="max-w-[80rem] w-full h-full mx-auto bg-white p-5 shadow-lg rounded-lg my-6">
      <h2 className="text-2xl font-bold mb-4">Add New Listing</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-4 w-full">
          <div
            className="w-full h-40 flex flex-col gap-3 border rounded-lg justify-center items-center cursor-pointer  hover:ring-2 hover:ring-blue-500"
            onDrag={(e) => console.log(e)}
            onDragOver={(e) => {
              console.log(e);
            }}
            onClick={(e) => {
              console.log(e);
            }}
          >
            <label className="block font-medium">Cover Image</label>
            <input
              type="file"
              onChange={handleCoverImageChange}
              className="w-full h-full border rounded  hidden"
              accept="image/*"
              required
            />
            <button
              type="button"
              className="bg-blue-400 hover:bg-blue-500 transition-colors px-4 py-2 rounded-lg"
              onClick={() => {}}
            >
              choose image
            </button>
            <span>or drag & drop here</span>
          </div>

          <div
            className="w-full h-40 flex flex-col gap-3 border rounded-lg justify-center items-center cursor-pointer hover:ring-2 hover:ring-blue-500 "
            onDrag={(e) => {
              console.log(e);
            }}
            onDragOver={(e) => {
              console.log(e);
            }}
            onClick={(e) => {
              console.log(e);
            }}
          >
            <label className="block font-medium">
              Additional Images (Max 5)
            </label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="w-full h-full border rounded hidden"
              accept="image/*"
            />
            <button
              type="button"
              className="bg-blue-400 hover:bg-blue-500 transition-colors px-4 py-2 rounded-lg"
              onClick={() => {}}
            >
              choose images
            </button>
            <span>or drag & drop here</span>
          </div>
        </div>

        <div className="flex space-x-4 w-full">
          <div className="w-full">
            <label className="block font-medium">Listing Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Hotel/Restaurant Name"
              required
            />
          </div>

          <div className="w-full">
            <label className="block font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Street, City, State, Country"
              required
            />
          </div>
        </div>
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-medium">
            Facilities (comma separated)
          </label>
          <input
            type="text"
            name="facilities"
            value={formData.facilities}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Wifi, Parking, Pool, etc."
            required
          />
        </div>

        <div>
          <label className="block font-medium">Price (per night/table)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Price in INR"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="HOTEL">Hotel</option>
            <option value="RESTAURANT">Restaurant</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-fit mt-4 transition-colors"
        >
          Add Listing
        </button>
      </form>
    </div>
  );
};

export default AddListing;
