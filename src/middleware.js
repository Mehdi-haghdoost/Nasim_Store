// import { NextResponse } from 'next/server';

// export function middleware(request) {

//   const path = request.nextUrl.pathname;
  

//   const isProtectedRoute = path.startsWith('/p-user') || path.startsWith('/p-seller');
  

//   const hasAuthCookie = request.cookies.has('accessToken') || request.cookies.has('refreshToken');
  

//   if (isProtectedRoute && !hasAuthCookie) {

//     return NextResponse.redirect(new URL('/login-register', request.url));
//   }
  

//   if (path === '/login-register' && hasAuthCookie) {

//     return NextResponse.redirect(new URL('/', request.url));
//   }
  

//   return NextResponse.next();
// }


// export const config = {
//   matcher: ['/p-user/:path*', '/p-seller/:path*', '/login-register']
// };


// src/middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;
  
  // فقط در development فعال باشد
  if (process.env.NODE_ENV === 'development') {
    const isProtectedRoute = path.startsWith('/p-user') || path.startsWith('/p-seller');
    const hasAuthCookie = request.cookies.has('accessToken') || request.cookies.has('refreshToken');
    
    if (isProtectedRoute && !hasAuthCookie) {
      return NextResponse.redirect(new URL('/login-register', request.url));
    }
    
    if (path === '/login-register' && hasAuthCookie) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  
  // در production، همه چیز client-side handle شود
  return NextResponse.next();
}

export const config = {
  matcher: ['/p-user/:path*', '/p-seller/:path*', '/login-register']
};