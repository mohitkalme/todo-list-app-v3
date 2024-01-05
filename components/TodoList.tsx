//Server Actions
import { deleteTodoAction, toggleTodoAction } from "../app/action";

//Hooks
import { useState, useTransition } from "react";

//Icons
import {
  DotsVerticalIcon,
  Pencil2Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import CheckSquareIcon from "@/icons/CheckSquareIcon";
import SquareIcon from "@/icons/SquareIcon";

//Components
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { Todo, TOptimisticAction } from "@/app/todos/page";
import EditTodo from "./EditTodo";

//Type for TodoList Component Only
type PropTypeTodoList = {
  filteredTodos: Todo[];
  dispatchOptimisticTodos: (action: TOptimisticAction) => void;
};

//Component for TodoList
export default function TodoList({
  filteredTodos,
  dispatchOptimisticTodos,
}: PropTypeTodoList) {
  return (
    <div>
      <ul>
        {filteredTodos.map((todo) => {
          return (
            <TodoListItem
              key={todo.id}
              todo={todo}
              dispatchOptimisticTodos={dispatchOptimisticTodos}
            />
          );
        })}
      </ul>
    </div>
  );
}

//Type for TodoListItem only
type PropTypeTodoListItem = {
  todo: Todo;
  dispatchOptimisticTodos: (action: TOptimisticAction) => void;
};
//Component TodoListItem
function TodoListItem({ todo, dispatchOptimisticTodos }: PropTypeTodoListItem) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <li className="my-2 flex items-center justify-center gap-4 rounded-md bg-muted p-3">
      <button
        onClick={async () => {
          startTransition(() => {
            dispatchOptimisticTodos({
              type: "UPDATE",
              payload: {
                ...todo,
                completed: !todo.completed,
              },
            });
          });

          await toggleTodoAction(todo.id, todo.completed);
        }}
        className={`flex-none ${todo.sending ? "opacity-60" : ""}`}
        disabled={!!todo.sending}
        aria-disabled={!!todo.sending}
      >
        {todo.completed ? <CheckSquareIcon /> : <SquareIcon />}
      </button>

      <div className="grow break-all">
        {isEditing ? (
          <EditTodo
            todo={todo}
            setIsEditing={setIsEditing}
            dispatchOptimisticTodos={dispatchOptimisticTodos}
          />
        ) : (
          <p>{todo.text}</p>
        )}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger
          disabled={!!todo.sending}
          aria-disabled={!!todo.sending}
          className={`flex-none ${todo.sending ? "opacity-60" : ""}`}
          asChild
        >
          <Button
            className="rounded-full border-none border-transparent outline-none "
            variant="outline"
            size="icon"
          >
            <DotsVerticalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={() => {
              setIsEditing((prevState) => !prevState);
            }}
          >
            {" "}
            <Pencil2Icon className="h-4 w-4" /> Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={async () => {
              startTransition(() => {
                dispatchOptimisticTodos({
                  type: "DELETE",
                  payload: todo,
                });
              });

              await deleteTodoAction(todo.id);
            }}
          >
            <TrashIcon className="h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
}
