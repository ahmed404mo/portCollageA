import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const profile = await prisma.profile.findFirst();
    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
// app/api/profile/route.ts
const { 
  name, 
  headline, 
  bio, 
  email, // تأكد إن الاسم كدة
  githubUrl, 
  linkedinUrl, 
  resumeUrl, // تأكد إن الاسم كدة مش cvUrl مثلاً
  avatarUrl 
} = body;

const profile = await prisma.profile.upsert({
  where: { id: 1 },
  update: { 
    name, headline, bio, email, githubUrl, linkedinUrl, resumeUrl, avatarUrl 
  },
  create: { 
    id: 1, name, headline, bio, email, githubUrl, linkedinUrl, resumeUrl, avatarUrl 
  },
});

    return NextResponse.json({ success: true, data: profile });
  } catch (error: any) {
    console.error("Profile API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}