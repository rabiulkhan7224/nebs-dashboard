'use server';

import { put } from '@vercel/blob';
export async function uploadToVercelBlob(file: File): Promise<string> {
  // if (!process.env.BLOB_READ_WRITE_TOKEN) {
  //   throw new Error("Vercel Blob configuration missing. Set BLOB_READ_WRITE_TOKEN in your environment variables.");
  // }

  // Optional: Customize pathname (e.g., add folder or timestamp)
  // const pathname = `uploads/${Date.now()}-${file.name}`;
  // Or just use the original filename with random suffix for uniqueness

  const { url } = await put(file.name, file, {
    access: 'public',          // 'public' for direct access, 'private' if you need token-based access
    addRandomSuffix: true,     // Appends random suffix to avoid conflicts (e.g., myfile-abc123.pdf)
    token: process.env.BLOB_READ_WRITE_TOKEN, // Not needed if set as env var
  });

  // Returns the public URL, e.g., https://....vercel-storage.com/myfile-abc123.pdf
  return url;

  // If you want a URL that always forces download (even for images/PDFs):
  // const { downloadUrl } = await put(...);
  // return downloadUrl;
}