import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { category: 'asc' }
    });
    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, category, level } = body;

    const newSkill = await prisma.skill.create({
      data: { name, category, level: parseInt(level) }
    });

    return NextResponse.json({ success: true, data: newSkill });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to add skill" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, category, level } = body;

    if (!id) return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });

    const updatedSkill = await prisma.skill.update({
      where: { id: Number(id) },
      data: { name, category, level: parseInt(level) }
    });

    return NextResponse.json({ success: true, data: updatedSkill });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update skill" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });

    await prisma.skill.delete({
      where: { id: Number(id) }
    });

    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete skill" }, { status: 500 });
  }
}