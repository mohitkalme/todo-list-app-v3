import { prisma } from "../prisma/prisma";
import { auth } from "@clerk/nextjs";
export async function getAllTodos() {
  const { userId } = auth();
  const allTodos = await prisma.todo_List_App_Todos_V3.findMany({
    where: {
      userId: userId as string,
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return allTodos;
}
