import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const email = "mo879938@gmail.com";
    const plainPassword = "0100adminmo@g";
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const admin = await prisma.admin.upsert({
      where: { email },
      update: { password: hashedPassword },
      create: { email, password: hashedPassword },
    });

    return NextResponse.json({ success: true, message: "✅ تم الإعداد بنجاح!" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}