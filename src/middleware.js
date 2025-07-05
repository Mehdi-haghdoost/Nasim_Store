import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;
  
  // بررسی مسیرهای محافظت شده (نیاز به لاگین)
  const isProtectedRoute = path.startsWith('/p-user') || path.startsWith('/p-seller');
  
  // بررسی وجود کوکی‌های احراز هویت
  const hasAccessToken = request.cookies.has('accessToken') && 
                         request.cookies.get('accessToken')?.value &&
                         request.cookies.get('accessToken')?.value !== '';
                         
  const hasRefreshToken = request.cookies.has('refreshToken') && 
                          request.cookies.get('refreshToken')?.value &&
                          request.cookies.get('refreshToken')?.value !== '';

  const hasAuthCookie = hasAccessToken || hasRefreshToken;
  
  // اگر کاربر به مسیر محافظت شده دسترسی دارد ولی لاگین نیست
  if (isProtectedRoute && !hasAuthCookie) {
    return NextResponse.redirect(new URL('/login-register', request.url));
  }
  
  // اگر کاربر به صفحه لاگین دسترسی دارد ولی قبلاً لاگین کرده
  if (path === '/login-register' && hasAuthCookie) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/p-user/:path*', '/p-seller/:path*', '/login-register']
};