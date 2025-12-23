import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { put } from '@vercel/blob';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary configuration missing. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET.");
  }
  // Detect type by file extension
  const isPdf = file.type === "application/pdf";
  const endpoint = isPdf ? "raw" : "image";

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/${endpoint}/upload`;


  // const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error?.message || "Cloudinary upload failed");
  }

  return data.secure_url || data.url;
}






export async function uploadToVercelBlob(file: File): Promise<string> {
  // if (!process.env.BLOB_READ_WRITE_TOKEN) {
  //   throw new Error("Vercel Blob configuration missing. Set BLOB_READ_WRITE_TOKEN in your environment variables.");
  // }

  // Optional: Customize pathname (e.g., add folder or timestamp)
  // const pathname = `uploads/${Date.now()}-${file.name}`;
  // Or just use the original filename with random suffix for uniqueness

  const { url } = await put(file.name, file, {
    access: 'public',          // 'public' for direct access, 'private' if you need token-based access
    // addRandomSuffix: true,     // Appends random suffix to avoid conflicts (e.g., myfile-abc123.pdf)
    token: process.env.BLOB_READ_WRITE_TOKEN, // Not needed if set as env var
  });

  // Returns the public URL, e.g., https://....vercel-storage.com/myfile-abc123.pdf
  return url;

  // If you want a URL that always forces download (even for images/PDFs):
  // const { downloadUrl } = await put(...);
  // return downloadUrl;
}