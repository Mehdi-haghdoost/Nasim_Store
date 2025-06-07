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

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  
  const isProtectedRoute = path.startsWith('/p-user') || path.startsWith('/p-seller');
  const isLoginRoute = path === '/login-register';
  
  // در development از cookies استفاده کن
  if (process.env.NODE_ENV === 'development') {
    const hasAuthCookie = request.cookies.has('accessToken') || request.cookies.has('refreshToken');
    
    if (isProtectedRoute && !hasAuthCookie) {
      return NextResponse.redirect(new URL('/login-register', request.url));
    }
    
    if (isLoginRoute && hasAuthCookie) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    return NextResponse.next();
  }
  
  // در production از GraphQL API استفاده کن
  if (isLoginRoute) {
    try {
      // چک کردن authentication با GraphQL
      const response = await fetch('https://nasim-backend.up.railway.app/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': request.headers.get('cookie') || ''
        },
        body: JSON.stringify({
          query: `query Me { me { _id username } }`
        })
      });
      
      const result = await response.json();
      
      if (result.data && result.data.me) {
        // کاربر لاگین است، هدایت به صفحه اصلی
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (error) {
      // اگر خطا داشت، اجازه ادامه بده (کاربر لاگین نیست)
      console.log('Auth check failed, allowing access to login page');
    }
  }
  
  // برای protected routes در production، بررسی نکن (client-side handle شود)
  return NextResponse.next();
}

export const config = {
  matcher: ['/p-user/:path*', '/p-seller/:path*', '/login-register']
};