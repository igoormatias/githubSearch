import type { FormEvent } from "react";
import { FiSearch } from "react-icons/fi";
import { Button, Input } from "@/shared/ui";

type SearchFormProps = {
  username: string;
  onUsernameChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  disabled?: boolean;
};

export const SearchForm = ({
  username,
  onUsernameChange,
  onSubmit,
  disabled = false,
}: SearchFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full flex-col gap-3 sm:flex-row sm:items-center"
    >
      <div className="relative flex-1">
        <FiSearch
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted"
          aria-hidden="true"
        />
        <Input
          id="username"
          name="username"
          type="search"
          value={username}
          onChange={(event) => onUsernameChange(event.target.value)}
          placeholder="Digite o username (ex.: torvalds)"
          className="pl-11"
          disabled={disabled}
          aria-label="Username do GitHub"
        />
      </div>
      <Button
        type="submit"
        disabled={disabled || !username.trim()}
        aria-label="Buscar usuário no GitHub"
        className="w-full sm:w-auto"
      >
        Buscar
      </Button>
    </form>
  );
};
