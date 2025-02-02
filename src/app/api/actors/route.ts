import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// GETリクエストの処理（すべての actors を取得）
export async function GET() {
  try {
    const actors = await prisma.actor.findMany();
    return NextResponse.json(actors, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch actors" }, { status: 500 });
  }
}