import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // نستخدم النسخة اللي عملناها بـ Prisma

// 1. جلب كل المشاريع
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' } // الأحدث يظهر الأول
    });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

// 2. إضافة مشروع جديد
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, imageUrl, tags, githubLink, liveLink } = body;

    // التحقق من البيانات الأساسية
    if (!title || !description) {
      return NextResponse.json(
        { success: false, error: "العنوان والوصف مطلوبان" },
        { status: 400 }
      );
    }

    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        imageUrl, 
        tags,     
        githubLink,
        liveLink,
      },
    });

    return NextResponse.json({
      success: true,
      message: "تمت إضافة المشروع بنجاح!",
      data: newProject,
    });

  } catch (error: any) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { success: false, error: "حدث خطأ أثناء حفظ المشروع: " + error.message },
      { status: 500 }
    );
  }
}

// 3. تعديل مشروع موجود
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, description, imageUrl, tags, githubLink, liveLink } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Project ID is required" }, { status: 400 });
    }

    const updatedProject = await prisma.project.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        imageUrl,
        tags,
        githubLink,
        liveLink,
      },
    });

    return NextResponse.json({ success: true, message: "Project updated!", data: updatedProject });
  } catch (error: any) {
    console.error("Update Error:", error);
    return NextResponse.json({ success: false, error: "Failed to update project" }, { status: 500 });
  }
}

// 4. حذف مشروع (هذه هي الدالة المطلوبة)
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: "Project ID is required" }, { status: 400 });
    }

    await prisma.project.delete({
      where: { id: Number(id) }
    });

    return NextResponse.json({ success: true, message: "Project deleted successfully!" });
  } catch (error: any) {
    console.error("Delete Error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete project" }, { status: 500 });
  }
}