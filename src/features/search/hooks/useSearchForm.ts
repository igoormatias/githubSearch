import { useState } from "react";
import type { FormEvent } from "react";

export const useSearchForm = () => {
  const [username, setUsername] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return {
    username,
    setUsername,
    handleSubmit,
  };
};
