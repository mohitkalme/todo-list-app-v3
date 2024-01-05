"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button variant="secondary" size="default" type="submit">
      {pending ? "Creating Todo..." : "Create Todo"}
    </Button>
  );
}
