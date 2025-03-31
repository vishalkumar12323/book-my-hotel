import { useRef } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useCreateListingMutation } from "../app/services/vendorServices.js";

const AddListing = () => {
  const coverImageRef = useRef(null);
  const imagesRef = useRef(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [createLIsting, { isLoading }] = useCreateListingMutation();
  const handleCoverImageChange = (e) => {
    const files = e.target.files;

    if (files) {
      const file = Object.values(files);
      setValue("coverImage", file);
    }
  };

  const handleImagesChange = (e) => {
    const files = Object.values(e.target.files);
    setValue("images", files);
  };
  const submitForm = async (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("description", data.description);
    formData.append("facilities", data.facilities);
    formData.append("price", data.price);
    formData.append("type", data.type);
    formData.append("coverImage", data.coverImage[0]); // Append cover image
    Array.from(data.images).forEach((image) => {
      formData.append("images", image); // Append multiple images
    });

    // console.log(data.coverImage);
    console.log(formData);
    const response = await createLIsting(formData).unwrap();
    console.log(response);
  };
  return (
    <div className="max-w-[80rem] w-full h-full mx-auto bg-white p-5 shadow-lg rounded-lg my-6">
      <h2 className="text-2xl font-bold mb-4">Add New Hotel/Restaurant</h2>

      <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
        <div className="flex space-x-4 w-full mb-4">
          <div className="w-full">
            <label className="block font-medium">Listing Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Hotel/Restaurant Name"
              {...register("name", {
                required: true,
                maxLength: 50,
                minLength: 5,
              })}
              required
            />
          </div>

          <div className="w-full">
            <label className="block font-medium">Address</label>
            <input
              type="text"
              name="address"
              className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Street, City, State, Country"
              required
              {...register("address", {
                required: true,
                maxLength: 100,
                minLength: 10,
              })}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
            rows={4}
            {...register("description", {
              required: true,
              maxLength: 500,
              minLength: 20,
            })}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">
            Facilities (comma separated)
          </label>
          <input
            type="text"
            name="facilities"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Free Wifi, Parking, Pool, etc."
            required
            {...register("facilities", {
              required: true,
              maxLength: 100,
              minLength: 10,
            })}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Price (per night/table)</label>
          <input
            type="number"
            name="price"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Price in INR"
            required
            {...register("price", { required: true, min: 100, max: 100000 })}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Type</label>
          <select
            name="type"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
            {...register("type", { required: true })}
          >
            <option value="HOTEL">Hotel</option>
            <option value="RESTAURANT">Restaurant</option>
          </select>
        </div>

        <div className="flex flex-col w-full mb-4">
          <h3 className="mb-1">Upload Hotels Images</h3>
          <div className="w-full flex space-x-4">
            <div
              className="w-full h-60 flex flex-col gap-3 border rounded-lg justify-center items-center cursor-pointer  hover:ring-1 hover:ring-blue-500 relative"
              onDrop={(e) => {
                e.preventDefault();
                const files = e.dataTransfer.files;
                if (coverImageRef.current) {
                  const dataTransfer = new DataTransfer();
                  Array.from(files).forEach((file) => {
                    dataTransfer.items.add(file);
                  });
                  coverImageRef.current.file = dataTransfer.files;
                  const changeEvent = new Event("change", { bubbles: true });
                  coverImageRef.current.dispatchEvent(changeEvent);
                }
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              <IoCloudUploadOutline size={50} className="text-gray-500" />
              <label className="block font-medium">Cover Image</label>
              <input
                ref={coverImageRef}
                type="file"
                name="coverImage"
                {...register("coverImage")}
                // onChange={handleCoverImageChange}
                className="w-full h-full border rounded absolute"
                accept="image/*"
              />
              <button
                type="button"
                className="shadow-md border border-slate-300 hover:border-blue-500 transition-colors px-4 py-2 rounded-lg z-50"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (coverImageRef.current) {
                    coverImageRef.current.click();
                  }
                }}
              >
                upload
              </button>
              <span>or drag & drop here</span>
            </div>

            <div
              className="w-full h-60 flex flex-col gap-3 border rounded-lg justify-center items-center cursor-pointer hover:ring-1 hover:ring-blue-500 relative"
              onDrop={(e) => {
                e.preventDefault();
                const files = e.dataTransfer.files;
                if (imagesRef.current) {
                  const dataTransfer = new DataTransfer();
                  Array.from(files).forEach((file) => {
                    dataTransfer.items.add(file);
                  });
                  imagesRef.current.files = dataTransfer.files;

                  const changeEvent = new Event("change", { bubbles: true });
                  imagesRef.current.dispatchEvent(changeEvent);
                }
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              <IoCloudUploadOutline size={50} className="text-gray-500" />
              <label className="block font-medium">
                Additional Images (Max 5)
              </label>
              <input
                ref={imagesRef}
                type="file"
                multiple
                name="images"
                {...register("images")}
                // onChange={handleImagesChange}
                className="w-full h-full border rounded absolute"
                accept="image/*"
              />
              <button
                type="button"
                className="shadow-md border border-slate-300 hover:border-blue-500 transition-colors px-4 py-2 rounded-lg"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  if (imagesRef.current) {
                    imagesRef.current.click();
                  }
                }}
              >
                upload images
              </button>
              <span>or drag & drop here</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="shadow-md border border-slate-300 hover:border-blue-500 px-4 py-2 rounded-lg w-fit mt-4 transition-colors"
        >
          Add Listing
        </button>
      </form>
    </div>
  );
};

export default AddListing;
