import { NextResponse } from "next/server";

export async function middleware(request) {
  const accessToken = request.cookies.get("accessToken")?.value;
  
  // ریدایرکت سریع بدون بررسی GraphQL
  if (accessToken && request.nextUrl.pathname === "/login-register") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/login-register"],
};