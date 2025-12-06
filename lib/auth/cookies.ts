"use server";
import { cookies } from "next/headers";

const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

export async function setAuthCookies(access: string, refresh: string, role?: string) {
  const cookieStore = await cookies();
  // set access / refresh tokens
  cookieStore.set(ACCESS_TOKEN, access, {
    httpOnly: true,
    secure: false,                 // ❗ MUST be false on VPS without HTTPS
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  });
  cookieStore.set(REFRESH_TOKEN, refresh, {
    httpOnly: true,
     secure: false,                 // ❗ MUST be false on VPS without HTTPS
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  });
  // optionally store a small non-httpOnly role cookie so middleware can read it
  if (role) {
    cookieStore.set('user_role', role, {
      httpOnly: false,
       secure: false,                 // ❗ MUST be false on VPS without HTTPS
    sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });
  }
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN);
  cookieStore.delete(REFRESH_TOKEN);
  cookieStore.delete('accessToken');
  cookieStore.delete('refresh_token');

}

export async function getRefreshToken() {
  const cookieStore = await cookies();
  return cookieStore.get(REFRESH_TOKEN)?.value;
}

export async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get(ACCESS_TOKEN)?.value;
}