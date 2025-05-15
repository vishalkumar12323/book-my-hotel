import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  useCreateListingMutation,
  useUpdateListingMutation,
} from "../../app/services/vendorServices.js";
import { MdErrorOutline } from "react-icons/md";
import { Button, FileUpload, LoadingSpinner } from "../index.js";
import { IoIosCheckmarkCircle } from "react-icons/io";

const AddListing = ({ isListEditable = false, list = null }) => {
  const navigate = useNavigate();
  const [createListing, { isLoading: isCreated, isSuccess: isCreatedSuccess }] =
    useCreateListingMutation();
  const [
    updateListing,
    { isLoading: isUpdating, isSuccess: isUpdatingSuccess },
  ] = useUpdateListingMutation();

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: list?.name || "",
      address: list?.address || "",
      description: list?.description || "",
      facilities: list?.facilities || "",
      price: list?.price || "",
      type: list?.type || "HOTEL",
      hotelCoverImage: null,
      hotelImages: null,
      roomType: "",
      capacity: 1,
      originalPrice: 0,
      discountPrice: 0,
      available: true,
      roomFacility: {
        wifi: false,
        ac: false,
        tv: false,
        waterPurifier: false,
        twineBed: false,
        cityView: false,
        bathroom: false,
        kitchen: false,
      },
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("description", data.description);
    formData.append("facilities", data.facilities);
    formData.append("price", data.price);
    formData.append("type", data.type);

    data.hotelCoverImage.forEach((file) =>
      formData.append("hotelCoverImage", file)
    );
    data.hotelImages.forEach((file) => formData.append("hotelImages", file));
    formData.append("availabel", data.available);
    formData.append("capacity", data.capacity);
    formData.append("discountPrice", data.discountPrice);
    formData.append("originalPrice", data.originalPrice);
    formData.append("roomFacilities", JSON.stringify(data.roomFacility));
    formData.append("roomType", data.roomType);
    if (isListEditable && list) {
      await updateListing({
        listingId: list?.id,
        listing: formData,
      }).unwrap();

      reset();
      navigate("/vendor-dashboard");
    } else {
      await createListing(formData).unwrap();
      reset();
      navigate("/vendor-dashboard");
    }
  };
  return (
    <div className="max-w-[80rem] w-full h-full mx-auto bg-white p-5 shadow rounded-lg my-6">
      <h2 className="text-[1.1rem] md:text-[1.6rem] font-semibold mb-4">
        {isListEditable && list !== null ? (
          <>
            Update{" "}
            <span className="text-blue-500 capitalize">
              {list?.name} {list?.type}
            </span>{" "}
            Info.
          </>
        ) : (
          "Add New Hotel/Restaurant"
        )}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full mb-4">
          <div className="w-full">
            <label className="block font-medium">Listing Name *</label>
            <input
              type="text"
              name="name"
              className={`${
                errors.name
                  ? "ring-1 ring-red-600 focus:ring-1 focus:ring-red-600"
                  : "focus:ring-1 focus:ring-blue-500"
              } w-full px-1 py-2 rounded border focus:outline-none shadow`}
              placeholder="Hotel/Restaurant Name"
              {...register("name", {
                required: "Hotel name is a required feild",
                maxLength: {
                  value: 30,
                  message: "Hotel name should not greater then 30 characters",
                },
                minLength: {
                  value: 5,
                  message: "Hotel name should contain 5 characters",
                },
              })}
              aria-describedby="hotel-name-err"
            />
            {errors.name && (
              <p
                id="hotel-name-err"
                className="text-[13px] text-red-600 font-semibold flex items-center gap-1"
                role="alert"
              >
                <MdErrorOutline size={13} />
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <label className="block font-medium">Address *</label>
            <input
              type="text"
              name="address"
              className={`${
                errors.address
                  ? "ring-1 ring-red-600 focus:ring-1 focus:ring-red-600"
                  : "focus:ring-1 focus:ring-blue-500"
              } w-full px-1 py-2 rounded border focus:outline-none shadow`}
              placeholder="Street, City, State, Country"
              {...register("address", {
                required: "Hotel address is a required feild",
              })}
              aria-describedby="hotel-add-err"
            />

            {errors.address && (
              <p
                id="hotel-add-err"
                role="alert"
                className="text-[13px] text-red-600 font-semibold flex items-center gap-1"
              >
                <MdErrorOutline size={13} />
                {errors.address.message}
              </p>
            )}
          </div>
        </div>
        <div className="mb-4 w-full">
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            className={`${
              errors.description
                ? "ring-1 ring-red-600 focus:ring-1 focus:ring-red-600"
                : "focus:ring-1 focus:ring-blue-500"
            } w-full px-1 py-2 rounded border focus:outline-none shadow`}
            rows={4}
            {...register("description", {
              maxLength: {
                value: 500,
                message:
                  "Hotel description should not greater then 500 characters",
              },
              minLength: {
                value: 20,
                message: "Hotel description should contain 20 characters",
              },
            })}
            aria-describedby="hotel-des-err"
          />
          {errors.description && (
            <p
              id="hotel-des-err"
              role="alert"
              className="text-[13px] text-red-600 font-semibold flex items-center gap-1"
            >
              <MdErrorOutline size={13} />
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="facilities" className="block font-medium">
            Facilities (comma separated) *
          </label>
          <input
            id="facilities"
            type="text"
            name="facilities"
            className={`${
              errors.facilities
                ? "ring-1 ring-red-600 focus:ring-1 focus:ring-red-600"
                : "focus:ring-1 focus:ring-blue-500"
            } w-full px-1 py-2 rounded border focus:outline-none shadow`}
            placeholder="Free Wifi, Parking, Pool, etc."
            {...register("facilities", {
              required: "Hotel facilities are required",
              maxLength: {
                value: 200,
                message: "Use comma separated value, ex:<one, two, three>",
              },
              minLength: {
                value: 10,
                message: "facilities should contain 10 characters",
              },
            })}
            aria-describedby="hotel-facilitie-err"
          />

          {errors.facilities && (
            <p
              id="hotel-facilitie-err"
              role="alert"
              className="text-[13px] text-red-600 font-semibold flex items-center gap-1"
            >
              <MdErrorOutline size={13} />
              {errors.facilities.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-medium">Price (per night/table) *</label>
          <input
            type="number"
            name="price"
            className={`${
              errors.price
                ? "ring-1 ring-red-600 focus:ring-1 focus:ring-red-600"
                : "focus:ring-1 focus:ring-blue-500"
            } w-full px-1 py-2 rounded border focus:outline-none shadow`}
            placeholder="Price in INR"
            {...register("price", {
              required: "Price is a required feild.",
              min: {
                value: 799,
                message: "Price should greater then 799rs",
              },
              max: {
                value: 100000,
                message: "Price should less then 100000rs",
              },
            })}
            aria-describedby="hotel-price-err"
          />

          {errors.price && (
            <p
              id="hotel-price-err"
              role="alert"
              className="text-[13px] text-red-600 font-semibold flex items-center gap-1"
            >
              <MdErrorOutline size={13} />
              {errors.price.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-medium">Type *</label>
          <select
            name="type"
            className={`${
              errors.type
                ? "ring-1 ring-red-600 focus:ring-1 focus:ring-red-600"
                : "focus:ring-1 focus:ring-blue-500"
            } w-full px-1 py-2 rounded border focus:outline-none shadow`}
            {...register("type", { required: "This is a required feild" })}
          >
            <option value="HOTEL">Hotel</option>
            <option value="RESTAURANT" disabled>
              Restaurant
            </option>
          </select>
        </div>

        <div className="flex flex-col w-full mb-4">
          <h3 className="mb-1">
            {isListEditable ? (
              <> Update Hotels Images *</>
            ) : (
              <>Upload Hotels Images *</>
            )}
          </h3>
          <div className="w-full relative">
            <div className="w-full flex flex-col md:flex-row gap-4">
              <FileUpload
                control={control}
                name="hotelCoverImage"
                rules={{ required: true }}
                ariaFeild={"hotel-cover-image"}
                errorMessage="Hotel cover image is required."
                uploadButton="Cover Image"
              />
              <FileUpload
                control={control}
                name="hotelImages"
                rules={{ required: true }}
                ariaFeild={"hotel-images"}
                multiple={true}
                errorMessage="Hotel images are required."
                uploadButton="Hotel Images"
              />
            </div>
          </div>
        </div>

        {isListEditable && list !== null && (
          <div className="mb-4 w-full h-[20rem] flex md:flex-row flex-col gap-4">
            <div className="w-full flex justify-start items-start p-2 border shadow rounded">
              <div className="img-container w-full h-full">
                <img
                  src="/hotel1.webp"
                  alt="hotel-img"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="w-full flex gap-2 flex-wrap justify-start items-start p-2 border shadow rounded">
              <div className="img-container">
                <img
                  src="/hotel1.webp"
                  alt="hotel-img"
                  className="w-[160px] h-auto object-cover"
                />
              </div>
              <div className="img-container">
                <img
                  src="/hotel1.webp"
                  alt="hotel-img"
                  className="w-[160px] h-auto object-cover"
                />
              </div>
            </div>
          </div>
        )}

        <div className="w-full h-[1px] bg-gray-300 my-2 md:my-4"></div>
        <div>
          <div className="w-full">
            <h2 className="text-[1rem] md:text-[1.5rem] font-semibold">
              Add New Units
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="room-type"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Room Type *
              </label>
              <input
                id="room-type"
                type="text"
                {...register("roomType", {
                  required: "Room type is required",
                })}
                className={`${
                  errors.roomType
                    ? "ring-1 ring-red-600 focus:ring-1 focus:ring-red-600"
                    : "focus:ring-1 focus:ring-blue-500"
                } w-full px-1 py-2 rounded border focus:outline-none shadow`}
                placeholder="Ex. Single Bad Room"
                aria-describedby="roomType"
              />
              {errors.roomType && (
                <p id="roomType" className="mt-1 text-sm text-red-600">
                  {errors.roomType.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="capcity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Capacity *
              </label>
              <input
                id="capcity"
                type="number"
                min="1"
                {...register("capacity", {
                  required: "Capacity is required",
                  min: {
                    value: 1,
                    message: "Capacity must be at least 1",
                  },
                  valueAsNumber: true,
                })}
                className={`${
                  errors.capacity
                    ? "ring-1 ring-red-600 focus:ring-1 focus:ring-red-600"
                    : "focus:ring-1 focus:ring-blue-500"
                } w-full px-1 py-2 rounded border focus:outline-none shadow`}
              />
              {errors.capacity && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.capacity.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="original-price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Original Price *
              </label>
              <input
                id="original-price"
                type="number"
                step="100"
                min="0"
                {...register("originalPrice", {
                  required: "Original price is required",
                  min: {
                    value: 0,
                    message: "Price cannot be negative",
                  },
                  valueAsNumber: true,
                })}
                className={`${
                  errors.originalPrice
                    ? "ring-1 ring-red-600 focus:ring-1 focus:ring-red-600"
                    : "focus:ring-1 focus:ring-blue-500"
                } w-full px-1 py-2 rounded border focus:outline-none shadow`}
              />
              {errors.originalPrice && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.originalPrice.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="discount-price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Discount Price *
              </label>
              <input
                id="discount-price"
                type="number"
                step="50"
                min="0"
                {...register("discountPrice", {
                  required: "Discount price is required",
                  min: {
                    value: 0,
                    message: "Price cannot be negative",
                  },
                  validate: (value, formValues) =>
                    value <= formValues.originalPrice ||
                    "Discount price cannot be higher than original price",
                  valueAsNumber: true,
                })}
                className={`${
                  errors.discountPrice
                    ? "ring-1 ring-red-600 focus:ring-1 focus:ring-red-600"
                    : "focus:ring-1 focus:ring-blue-500"
                } w-full px-1 py-2 rounded border focus:outline-none shadow`}
              />
              {errors.discountPrice && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.discountPrice.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="availabel"
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  id="availabel"
                  type="checkbox"
                  {...register("available")}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <span className="text-sm font-medium text-gray-700">
                  Available for booking
                </span>
              </label>
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Room Facilities
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <div>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("roomFacility.wifi")}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    WiFi
                  </span>
                </label>
              </div>

              {/* AC */}
              <div>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("roomFacility.ac")}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Air Conditioning
                  </span>
                </label>
              </div>

              {/* TV */}
              <div>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("roomFacility.tv")}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">TV</span>
                </label>
              </div>

              {/* Water Purifier */}
              <div>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("roomFacility.waterPurifier")}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Water Purifier
                  </span>
                </label>
              </div>

              {/* Twin Bed */}
              <div>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("roomFacility.twineBed")}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Twin Bed
                  </span>
                </label>
              </div>

              {/* City View */}
              <div>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("roomFacility.cityView")}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    City View
                  </span>
                </label>
              </div>

              {/* Bathroom */}
              <div>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("roomFacility.bathroom")}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Bathroom
                  </span>
                </label>
              </div>

              {/* Kitchen */}
              <div>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("roomFacility.kitchen")}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Kitchen
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          buttonState={isCreated || isUpdating}
          className={`${
            isCreatedSuccess ||
            (isUpdatingSuccess &&
              "border-green-600 hover:border-green-600 text-green-600")
          } mt-6`}
        >
          {isListEditable && list && !isUpdating && !isUpdatingSuccess ? (
            <>
              <span>Update</span>
            </>
          ) : isListEditable && isUpdating ? (
            <>
              <span>Updating</span>
              <LoadingSpinner />
            </>
          ) : isListEditable && !isUpdating && isUpdatingSuccess ? (
            <>
              <span>Updated</span>
              <IoIosCheckmarkCircle size={20} color="green" />
            </>
          ) : !isListEditable && isCreatedSuccess ? (
            <>
              <span>Created</span>
              <IoIosCheckmarkCircle size={20} color="green" />
            </>
          ) : (
            <>
              <span>Create</span> {isCreated && <LoadingSpinner />}
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default AddListing;
