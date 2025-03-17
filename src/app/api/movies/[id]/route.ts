import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

// TODO: エラーが出たため、コメントアウト
// GETリクエストの処理（指定されたIDの映画を取得）
// export async function GET(
//     request: Request,
//     { params }: { params: { id: string } }
//   ) {
//     const { id } = params;
  
//     if (!id) {
//       return NextResponse.json({ error: "ID is required" }, { status: 400 });
//     }
  
//     try {
//       const movie = await prisma.wishList.findUnique({
//         where: { id },
//       });
  
//       if (!movie) {
//         return NextResponse.json({ error: "Movie not found" }, { status: 404 });
//       }
  
//       return NextResponse.json(movie, { status: 200 });
//     } catch (error) {
//       return NextResponse.json(
//         { error: `Failed to fetch movie. ${error}` },
//         { status: 500 }
//       );
//     }
//   }

// DELETEリクエストの処理（指定された movie を削除）
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    await prisma.wishList.delete({
      where: { id },
    });
    return NextResponse.json(
      { message: "Movie deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to delete movie. ${error}` },
      { status: 500 }
    );
  }
}
