import "dotenv/config.js";
import { v2 as cloudinary } from "cloudinary";

class CloudinaryImageStorage {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
  }

  async uploadImage(imagePath, folder = "book-my-hotel") {
    try {
      const result = await cloudinary.uploader.upload(imagePath, {
        folder,
      });
      return result.public_id;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw new Error("Image upload failed");
    }
  }

  async deleteImage(publicId) {
    try {
      await cloudinary.uploader.destroy(`${publicId}`, {
        invalidate: true,
      });
    } catch (error) {
      console.error("Error deleting image from Cloudinary:", error);
      throw new Error("Image deletion failed");
    }
  }

  async getImageUrl(publicId) {
    try {
      const url = cloudinary.url(publicId, {
        secure: true,
        transformation: [{ width: 500, height: 500, crop: "fit" }],
      });
      return url;
    } catch (error) {
      console.error("Error getting image URL from Cloudinary:", error);
      throw new Error("Image URL retrieval failed");
    }
  }

  async updateImage(publicIds, newImagePath, folder = "book-my-hotel") {
    try {
      // Delete existing images if they exist
      if (publicIds && publicIds.length > 0) {
        await Promise.all(publicIds.map((id) => this.deleteImage(id)));
      }

      // Upload new image
      if (newImagePath) {
        const result = await cloudinary.uploader.upload(newImagePath, {
          folder,
        });
        return result.public_id;
      }

      return null;
    } catch (error) {
      console.error("Error updating image on Cloudinary:", error);
      throw new Error("Image update failed");
    }
  }
}

export default CloudinaryImageStorage;
