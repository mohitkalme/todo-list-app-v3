import { prisma } from "../prisma/prisma";
import { auth } from "@clerk/nextjs";
export async function getAllTodos() {
  const { userId } = auth();
  const allTodos = await prisma.todos.findMany({
    where: {
      userId: userId as string,
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return allTodos;
}
