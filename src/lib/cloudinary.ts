import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import fs from "fs";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "../shared/config/env";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export class CloudinaryService {
  static async upload(
    localFilePath: string,
    resourceType: "auto" | "image" | "raw" = "auto"
  ): Promise<UploadApiResponse | null> {
    if (!localFilePath) return null;

    try {
      const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type: resourceType,
      });

      fs.unlinkSync(localFilePath);
      return response;
    } catch (error) {
      fs.unlinkSync(localFilePath);
      console.error("Cloudinary upload error:", error);
      return null;
    }
  }

  static delete(imageUrl: string): void {
    if (!imageUrl) return;

    const publicId = this.extractPublicIdFromUrl(imageUrl);
    if (!publicId) return;

    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        console.error(`Error deleting image from Cloudinary: ${error.message}`);
      } else {
        console.log(`Deleted image from Cloudinary: ${publicId}`);
      }
    });
  }

  private static extractPublicIdFromUrl(url: string): string | null {
    const matches = url.match(/\/([^/]+?)$/);
    return matches ? matches[1].split(".")[0] : null;
  }
}
