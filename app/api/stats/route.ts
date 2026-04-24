import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // تشغيل كل الـ Counts في وقت واحد لضمان السرعة
    const [projectsCount, skillsCount, credentialsCount] = await Promise.all([
      prisma.project.count(),
      prisma.skill.count(),
      prisma.credential.count(),
    ]);

    return NextResponse.json({
      success: true,
      stats: [
        { number: `${projectsCount}+`, label: "Projects Completed" },
        { number: `${credentialsCount}+`, label: "Certificates Earned" },
        { number: `${skillsCount}+`, label: "Skills Mastered" },
      ],
    });
  } catch (error) {
    console.error("Stats API Error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch stats" }, { status: 500 });
  }
}