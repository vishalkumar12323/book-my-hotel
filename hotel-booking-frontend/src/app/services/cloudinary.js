import { Cloudinary } from "@cloudinary/url-gen";
import { config } from "../../config";

export const cld = new Cloudinary({
  cloud: {
    apiKey: config.cloudinary_api_key,
    apiSecret: config.cloudinary_api_secret,
    cloudName: config.cloudinary_cloud_name,
  },
});
