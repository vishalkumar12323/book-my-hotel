import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "hotel-image-storage",
    allowed_formates: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

export { upload };
