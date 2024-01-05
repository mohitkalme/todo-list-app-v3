import { getAllTodos } from "@/data-access/todos";

//components
import ClientComponent from "@/components/client-component";
import { Toaster } from "@/components/ui/toaster";

export type Todo = {
  id: string;
  completed: boolean;
  text: string;
  userId: string;
  sending?: boolean;
};

export type TOptimisticAction = {
  type: string;
  payload: {
    id: string;
    completed: boolean;
    text: string;
    userId: string;
  };
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const allTodos: Todo[] = await getAllTodos();

  return (
    <>
      <main className="mx-auto max-w-xl p-4 font-sans">
        <ClientComponent allTodos={allTodos} />
      </main>
      <Toaster />
    </>
  );
}
