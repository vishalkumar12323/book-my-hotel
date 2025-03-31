export const config = {
  api_base_url: String(import.meta.env.VITE_API_BASE_URL),
  cloudinary_cloud_name: String(import.meta.env.VITE_CLOUDINARY_CLOUD_NAME),
  cloudinary_api_key: String(import.meta.env.VITE_CLOUDINARY_API_KEY),
  cloudinary_api_secret: String(import.meta.env.VITE_CLOUDINARY_API_SECRET),
};
