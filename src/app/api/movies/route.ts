import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

// GETリクエストの処理（すべての movie を取得）
export async function GET() {
  try {
    const movies = await prisma.wishList.findMany();
    return NextResponse.json(movies, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch movies. ${error}` },
      { status: 500 }
    );
  }
}

// POSTリクエストの処理（新しい movie を作成）
export async function POST(req: Request) {
  const body = await req.json();
  const { id, movieId, title } = body;

  if (!movieId || !title) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const newMovie = await prisma.wishList.create({
      data: {
        id,
        movieId,
        title,
        likes: 0,
      },
    });
    return NextResponse.json(newMovie, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to create a new movie. ${error}` },
      { status: 500 }
    );
  }
}

// PUTリクエストの処理（指定された movie を更新）
export async function PUT(req: Request) {
  const body = await req.json();
  const {id, movieId, likes } = body;

  if (!movieId) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const updatedMovie = await prisma.wishList.update({
      where: { id },
      data: { likes },
    });
    return NextResponse.json(updatedMovie, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to update the movie. ${error}` },
      { status: 500 }
    );
  }
}