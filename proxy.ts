import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  role?: string;
  exp?: number;
}

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Protect dashboard routes
  if (!path.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("accessToken")?.value;
  console.log("token:", token);

  // No token → redirect
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", path);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    console.log("decoded:", decoded);

    // Expired token check
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      throw new Error("Token expired");
    }

    // Only admin & hr allowed
    if (decoded.role === "admin" || decoded.role === "hr") {
      return NextResponse.next();
    }

    // Unauthorized → redirect
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("error", "unauthorized");
    return NextResponse.redirect(loginUrl);

  } catch (err) {
    console.log("Invalid/expired token → redirect");

    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("accessToken");
    return response;
  }
}

export const config = {
  matcher: "/dashboard/:path*",
};
