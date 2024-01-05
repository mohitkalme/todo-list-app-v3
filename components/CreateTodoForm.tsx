"use client";

import { nanoid } from "nanoid";
import { useAuth } from "@clerk/nextjs";

//Server Actions
import { createTodoAction } from "../app/action";

//hooks
import { useState, useTransition } from "react";
import { useToast } from "@/components/ui/use-toast";

//Components
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/SubmitButton";

//Types
import type { TOptimisticAction } from "@/app/todos/page";

type PropType = {
  dispatchOptimisticTodos: (action: TOptimisticAction) => void;
};

export default function CreateTodoForm({ dispatchOptimisticTodos }: PropType) {
  const { userId } = useAuth();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const [text, setText] = useState("");

  return (
    <>
      <form
        className="py-4"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);
          const inputText = formData.get("text") as string;

          if (!inputText.trim()) {
            toast({
              variant: "destructive",
              title: "Text must be at least 1 character long.",
            });
            return;
          }
          const randomIdForTodo = nanoid();
          const newTodo = {
            id: randomIdForTodo,
            completed: false,
            text: inputText.trim(),
            userId: userId as string,
          };

          startTransition(() => {
            dispatchOptimisticTodos({
              type: "ADD",
              payload: newTodo,
            });
          });

          setText("");

          await createTodoAction({
            formData,
            newTodo,
          });
        }}
      >
        <div className="flex w-full items-center space-x-2">
          <Input
            className="my-4 focus-visible:ring-1 focus-visible:ring-offset-0"
            value={text}
            onChange={(e) => setText(e.target.value)}
            name="text"
            type="text"
            placeholder="Add Todos"
            aria-label="Add Todos"
          />
          <SubmitButton />
        </div>
      </form>
    </>
  );
}
