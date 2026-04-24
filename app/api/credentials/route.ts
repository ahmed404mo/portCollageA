import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 1. جلب كل الشهادات
export async function GET() {
  try {
    const credentials = await prisma.credential.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(credentials);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch credentials" }, { status: 500 });
  }
}

// 2. إضافة شهادة جديدة
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, issuer, date, description, imageUrl, link } = body;

    const newCredential = await prisma.credential.create({
      data: { title, issuer, date, description, imageUrl, link }
    });

    return NextResponse.json({ success: true, data: newCredential });
  } catch (error: any) {
    console.error("POST Error:", error.message);
    return NextResponse.json({ success: false, error: "Failed to add credential" }, { status: 500 });
  }
}

// 3. تعديل شهادة موجودة (هذه الدالة كانت مفقودة)
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, issuer, date, description, imageUrl, link } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }

    const updatedCredential = await prisma.credential.update({
      where: { id: Number(id) },
      data: { title, issuer, date, description, imageUrl, link }
    });

    return NextResponse.json({ success: true, data: updatedCredential });
  } catch (error: any) {
    console.error("PUT Error:", error.message);
    return NextResponse.json({ success: false, error: "Failed to update credential" }, { status: 500 });
  }
}

// 4. حذف شهادة (هذه الدالة كانت مفقودة)
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }

    await prisma.credential.delete({
      where: { id: Number(id) }
    });

    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error: any) {
    console.error("DELETE Error:", error.message);
    return NextResponse.json({ success: false, error: "Failed to delete credential" }, { status: 500 });
  }
}