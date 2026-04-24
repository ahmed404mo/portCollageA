import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const about = await prisma.about.findFirst();
    return NextResponse.json(about);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch about data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, yearsOfExp, location, imageUrl } = body; // ضفنا imageUrl هنا

    const about = await prisma.about.upsert({
      where: { id: 1 },
      update: { title, description, yearsOfExp, location, imageUrl }, // وتحديث هنا
      create: { id: 1, title, description, yearsOfExp, location, imageUrl }, // وإنشاء هنا
    });

    return NextResponse.json({ success: true, data: about });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update" }, { status: 500 });
  }
}
