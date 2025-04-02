import { useForm } from "react-hook-form";
import { useCreateListingMutation } from "../app/services/vendorServices.js";
import { MdErrorOutline } from "react-icons/md";
import FileUpload from "./file-uploader.jsx";

const AddListing = () => {
  const [createLIsting] = useCreateListingMutation();

  const { handleSubmit, control, register, formState } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    data.hotelCoverImage.forEach((file) =>
      formData.append("hotelCoverImage", file)
    );
    data.hotelImages.forEach((file) => formData.append("hotelImages", file));

    console.log(data);
  };
  return (
    <div className="max-w-[80rem] w-full h-full mx-auto bg-white p-5 shadow-lg rounded-lg my-6">
      <h2 className="text-2xl font-bold mb-4">Add New Hotel/Restaurant</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex space-x-4 w-full mb-4">
          <div className="w-full">
            <label className="block font-medium">Listing Name</label>
            <input
              type="text"
              name="name"
              className={`${
                formState.errors.name
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
            {formState.errors.name && (
              <p
                id="hotel-name-err"
                className="text-[13px] text-red-600 font-semibold flex items-center gap-1"
                role="alert"
              >
                <MdErrorOutline size={13} />
                {formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <label className="block font-medium">Address</label>
            <input
              type="text"
              name="address"
              className={`${
                formState.errors.address
                  ? "ring-1 ring-red-600 focus:ring-1 focus:ring-red-600"
                  : "focus:ring-1 focus:ring-blue-500"
              } w-full px-1 py-2 rounded border focus:outline-none shadow`}
              placeholder="Street, City, State, Country"
              {...register("address", {
                required: "Hotel address is a required feild",
              })}
              aria-describedby="hotel-add-err"
            />

            {formState.errors.address && (
              <p
                id="hotel-add-err"
                role="alert"
                className="text-[13px] text-red-600 font-semibold flex items-center gap-1"
              >
                <MdErrorOutline size={13} />
                {formState.errors.address.message}
              </p>
            )}
          </div>
        </div>
        <div className="mb-4 w-full">
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            className={`${
              formState.errors.description
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
          {formState.errors.description && (
            <p
              id="hotel-des-err"
              role="alert"
              className="text-[13px] text-red-600 font-semibold flex items-center gap-1"
            >
              <MdErrorOutline size={13} />
              {formState.errors.description.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-medium">
            Facilities (comma separated)
          </label>
          <input
            type="text"
            name="facilities"
            className={`${
              formState.errors.facilities
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

          {formState.errors.facilities && (
            <p
              id="hotel-facilitie-err"
              role="alert"
              className="text-[13px] text-red-600 font-semibold flex items-center gap-1"
            >
              <MdErrorOutline size={13} />
              {formState.errors.facilities.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-medium">Price (per night/table)</label>
          <input
            type="number"
            name="price"
            className={`${
              formState.errors.price
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

          {formState.errors.price && (
            <p
              id="hotel-price-err"
              role="alert"
              className="text-[13px] text-red-600 font-semibold flex items-center gap-1"
            >
              <MdErrorOutline size={13} />
              {formState.errors.price.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-medium">Type</label>
          <select
            name="type"
            className={`${
              formState.errors.type
                ? "ring-1 ring-red-600 focus:ring-1 focus:ring-red-600"
                : "focus:ring-1 focus:ring-blue-500"
            } w-full px-1 py-2 rounded border focus:outline-none shadow`}
            {...register("type", { required: "This is a required feild" })}
          >
            <option value="HOTEL">Hotel</option>
            <option value="RESTAURANT">Restaurant</option>
          </select>
        </div>

        <div className="flex flex-col w-full mb-4">
          <h3 className="mb-1">Upload Hotels Images</h3>
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

/*

const coverImageRef = useRef(null);
  const imagesRef = useRef(null);
  const [previewCoverImage, setPreviewCoverImage] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);

  const { register, handleSubmit, reset, setValue, trigger, formState } =
    useForm({ mode: "onChange" });

  const handleCoverImageChange = (e) => {
    const files = Object.values(e.target.file);

    console.log(e);
    setValue("coverImage", files);
    trigger("coverImage");
  };

  const handleImagesChange = (e) => {
    const files = Object.values(e.target.files);

    console.log(e);

    setValue("images", files);
    trigger("images");
  };

  const handleCoverImageDrop = useCallback(
    (event) => {
      event.preventDefault();
      const files = event.dataTransfer.files;
      if (files && files.length > 0) {
        setValue("coverImage", files[0], { shouldValidate: true });
        trigger("coverImage");
        setPreviewCoverImage(URL.createObjectURL(files[0]));
      }
    },
    [setValue, trigger]
  );

  const handleImagesDrop = useCallback(
    (event) => {
      event.preventDefault();
      const files = Object.values(event.dataTransfer.files);
      if (files && files.length > 0) {
        setValue("images", files, { shouldValidate: true });
        trigger("images");
      }
    },
    [setValue, trigger]
  );
  const submitForm = async (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("description", data.description);
    formData.append("facilities", data.facilities);
    formData.append("price", data.price);
    formData.append("type", data.type);
    formData.append("coverImage", data.coverImage[0]);
    Array.from(data.images).forEach((image) => {
      formData.append("images", image);
    });

    console.log(data);

    // const response = await createLIsting(formData).unwrap();
    // console.log(response);

    // reset();
  };

  useEffect(() => {
    return () => {
      if (previewCoverImage) {
        URL.revokeObjectURL(previewCoverImage);
      }
    };
  }, [previewCoverImage]);
  // console.log(previewCoverImage);

*/
