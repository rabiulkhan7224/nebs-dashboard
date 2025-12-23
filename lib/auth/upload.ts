"use server";
import { put } from '@vercel/blob';

export async function uploadToVercelBlob(file: File): Promise<string> {
  // if (!process.env.BLOB_READ_WRITE_TOKEN) {
  //   throw new Error("Vercel Blob configuration missing. Set BLOB_READ_WRITE_TOKEN in your environment variables.");
  // }

  

  const { url } = await put(file.name, file, {
    access: 'public',         
    addRandomSuffix: true,

       
        
    token: process.env.BLOB_READ_WRITE_TOKEN, 
  });

  
  return url;

  
}