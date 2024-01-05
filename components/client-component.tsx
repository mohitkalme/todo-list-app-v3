"use client";

//clerk authentication component
import { UserButton } from "@clerk/nextjs";

//hooks
import { useOptimistic, useState } from "react";

//Components
import CreateTodoForm from "@/components/CreateTodoForm";
import FilterTodos from "../components/FilterTodos";
import TodoList from "../components/TodoList";

//Types
import type { Todo, TOptimisticAction } from "@/app/todos/page";

const FILTER_MAP: {
  [key: string]: (todo: Todo) => boolean;
} = {
  All: (todo: Todo) => true,
  Active: (todo: Todo) => !todo.completed,
  Completed: (todo: Todo) => todo.completed,
};

//Type for ClientComponent Props
type PropTypes = {
  allTodos: Todo[];
};

const ClientComponent = ({ allTodos }: PropTypes) => {
  const [optimisticTodos, dispatchOptimisticTodos] = useOptimistic(
    allTodos,
    (state, action: TOptimisticAction) => {
      switch (action.type) {
        case "UPDATE": {
          return state.map((todo) =>
            todo.id === action.payload.id ? action.payload : todo,
          );
        }
        case "DELETE": {
          return state.filter((todo) => todo.id !== action.payload.id);
        }

        case "ADD": {
          return [{ ...action.payload, sending: true }, ...state];
        }
        case "EDIT": {
          return state.map((todo) =>
            todo.id === action.payload.id ? action.payload : todo,
          );
        }
        default: {
          return [...state, action.payload];
        }
      }
    },
  );

  const [filter, setFilter] = useState("All");

  const filteredTodos = optimisticTodos.filter(FILTER_MAP[filter]);

  return (
    <>
      <div className="flex justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
      <CreateTodoForm dispatchOptimisticTodos={dispatchOptimisticTodos} />
      <FilterTodos setFilter={setFilter} />
      <TodoList
        filteredTodos={filteredTodos}
        dispatchOptimisticTodos={dispatchOptimisticTodos}
      />
    </>
  );
};

export default ClientComponent;
