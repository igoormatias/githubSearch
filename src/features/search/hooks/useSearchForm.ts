import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export const useSearchForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      return;
    }

    navigate(`/user/${trimmedUsername}`);
  };

  return {
    username,
    setUsername,
    handleSubmit,
  };
};
