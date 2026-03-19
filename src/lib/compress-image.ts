import { COMPRESS_MAX_DIMENSION, COMPRESS_QUALITY } from "@/lib/constants";
import type { AcceptedMimeType } from "@/types";

export interface CompressedImage {
  base64: string;
  mimeType: AcceptedMimeType;
  width: number;
  height: number;
}

/**
 * Compresses an image file using a canvas element.
 * Resizes to COMPRESS_MAX_DIMENSION on the longest side, then encodes as JPEG.
 * Returns a base64 data URI.
 */
export async function compressImage(file: File): Promise<CompressedImage> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let { width, height } = img;
      const max = COMPRESS_MAX_DIMENSION;

      if (width > max || height > max) {
        if (width > height) {
          height = Math.round((height * max) / width);
          width = max;
        } else {
          width = Math.round((width * max) / height);
          height = max;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas 2D context"));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      const base64 = canvas.toDataURL("image/jpeg", COMPRESS_QUALITY);
      resolve({ base64, mimeType: "image/jpeg", width, height });
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image for compression"));
    };

    img.src = objectUrl;
  });
}
