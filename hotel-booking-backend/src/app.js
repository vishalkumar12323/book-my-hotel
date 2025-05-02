import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "djoqwxocw",
  api_key: "856984274177691",
  api_secret: "uRZkcRx4nc2zyDUTla7vvvURcRU",
});

cloudinary.uploader
  .upload(
    "https://res.cloudinary.com/djoqwxocw/image/upload/v1743315852/cld-sample-3.jpg",
    {
      folder: "my-folder",
    }
  )
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
