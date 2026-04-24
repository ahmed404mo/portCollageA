import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 1. البحث عن الأدمن في الداتابيز
    const admin = await prisma.admin.findUnique({
      where: { email: email },
    });

    // 2. التحقق من وجود الحساب
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "البريد الإلكتروني غير مسجل" },
        { status: 401 }
      );
    }

    // 3. التحقق من كلمة المرور (مقارنة المشفر)
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: "كلمة المرور غير صحيحة" },
        { status: 401 }
      );
    }

    // 4. إنشاء توكن الدخول (JWT)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ email: admin.email, id: admin.id })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(secret);

    // 5. إعداد الرد وحفظ التوكن في الكوكيز
    const response = NextResponse.json({
      success: true,
      message: "تم تسجيل الدخول بنجاح",
    });

    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // يوم واحد
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { success: false, error: "حدث خطأ في السيرفر: " + error.message },
      { status: 500 }
    );
  }
}