import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ユーザーの作成
  const actor = await prisma.actor.create({
    data: {
      name: "Alice",
    },
  });

  console.log("Actor created:", actor);

  // すべてのユーザーを取得
  const actors = await prisma.actor.findMany();
  console.log("Actors:", actors);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
