"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma/prisma";
import type { Todo } from "./todos/page";

type TCreateTodoAction = {
  formData: FormData;
  newTodo: {
    id: string;
    completed: boolean;
    text: string;
    userId: string;
  };
};
export async function createTodoAction({
  formData,
  newTodo,
}: TCreateTodoAction) {
  const text = formData.get("text") as string;

  try {
    await prisma.todos.create({
      data: {
        id: newTodo.id,
        text: text.trim(),
        userId: newTodo.userId,
      },
    });
  } catch (error) {
    return {
      error: "something went wrong.",
    };
  } finally {
    revalidatePath("/");
  }
}

export async function editTodoAction(todo: Todo) {
  try {
    await prisma.todos.update({
      where: {
        id: todo.id,
      },
      data: {
        updated_at: new Date(),
        text: todo.text,
      },
    });
  } catch (e) {
    return {
      message: "Failed to Edit Todo",
    };
  } finally {
    revalidatePath("/");
  }
}
export async function deleteTodoAction(id: string) {
  try {
    await prisma.todos.delete({
      where: {
        id,
      },
    });
  } catch (e) {
    return {
      error: JSON.stringify(e),
    };
  } finally {
    revalidatePath("/");
  }
}

export async function toggleTodoAction(id: string, completed: boolean) {
  await prisma.todos.update({
    where: {
      id,
    },
    data: {
      completed: !completed,
    },
  });
  revalidatePath("/");
}
