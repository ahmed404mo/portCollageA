import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/request'

export function middleware(request: NextRequest) {
  // 1. نجيب التوكن من الكوكيز
  const token = request.cookies.get('auth_token')?.value

  // 2. نحدد المسارات اللي محتاجة حماية (الـ Admin Dashboard)
  const isDashboardPage = request.nextUrl.pathname.startsWith('/admin')

  // 3. لو بيحاول يدخل الداشبورد وهو مش معاه توكن، نرجعه للـ login
  if (isDashboardPage && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 4. لو معاه توكن وبيحاول يروح لصفحة الـ login، نرجعه للداشبورد (اختياري)
  if (request.nextUrl.pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/admin/projects', request.url))
  }

  return NextResponse.next()
}

// 5. نحدد للـ Middleware يشتغل على أي مسارات بالظبط
export const config = {
  matcher: ['/admin/:path*', '/login'],
}