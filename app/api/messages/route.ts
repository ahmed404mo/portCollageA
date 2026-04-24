import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// جلب كل الرسائل (للوحة التحكم)
export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

// حفظ رسالة جديدة (من صفحة الـ Contact)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: "Name, email, and message are required" }, { status: 400 });
    }

    const newMessage = await prisma.message.create({
      data: { name, email, subject, message }
    });

    return NextResponse.json({ success: true, data: newMessage });
  } catch (error: any) {
    console.error("POST Error (Messages):", error.message);
    return NextResponse.json({ success: false, error: "Failed to send message" }, { status: 500 });
  }
}

// حذف رسالة (هذه الدالة اللي ضفناها)
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }

    await prisma.message.delete({
      where: { id: Number(id) }
    });

    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error: any) {
    console.error("DELETE Error (Messages):", error.message);
    return NextResponse.json({ success: false, error: "Failed to delete message" }, { status: 500 });
  }
}