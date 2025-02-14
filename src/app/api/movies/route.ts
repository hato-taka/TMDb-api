import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

// GETリクエストの処理（すべての movie を取得）
export async function GET() {
  try {
    const movies = await prisma.wishList.findMany();
    return NextResponse.json(movies, { status: 200 });
    // return NextResponse.json({movies: "test"}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `Failed to fetch movies. ${error}` }, { status: 500 });
  }
}