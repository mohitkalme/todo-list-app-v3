import type { Todo, TOptimisticAction } from "@/app/todos/page";
import {
  useState,
  type Dispatch,
  type SetStateAction,
  useTransition,
} from "react";

import { Button } from "./ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { editTodoAction } from "@/app/action";

type PropType = {
  todo: Todo;
  dispatchOptimisticTodos: (action: TOptimisticAction) => void;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};
const EditTodo = ({
  todo,
  setIsEditing,
  dispatchOptimisticTodos,
}: PropType) => {
  const { toast } = useToast();

  const [editInputtext, setEditInputText] = useState(todo.text);
  const [isPending, startTransition] = useTransition();

  async function handleSave() {
    if (!editInputtext.trim()) {
      toast({
        variant: "destructive",
        title: "Text must be at least 1 character long.",
      });
      return;
    }
    const EditedTodo = {
      ...todo,
      text: editInputtext.trim(),
    };
    startTransition(() => {
      dispatchOptimisticTodos({
        type: "EDIT",
        payload: EditedTodo,
      });
    });

    setIsEditing(false);

    await editTodoAction(EditedTodo);
  }
  return (
    <div className="flex w-full items-center space-x-2">
      <Input
        value={editInputtext}
        type="text"
        onChange={(e) => setEditInputText(e.target.value)}
      />
      <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
        Cancel
      </Button>
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
};

export default EditTodo;
