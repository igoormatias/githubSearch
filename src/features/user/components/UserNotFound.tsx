import { Link } from "react-router-dom";
import { FiUserX } from "react-icons/fi";
import { Button } from "@/shared/ui";

type UserNotFoundProps = {
  username: string;
};

export const UserNotFound = ({ username }: UserNotFoundProps) => {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-surface p-8 text-center">
      <FiUserX className="h-10 w-10 text-foreground-muted" aria-hidden="true" />
      <div className="space-y-2">
        <h1 className="text-xl font-semibold text-foreground">User not found</h1>
        <p className="text-sm text-foreground-muted">
          The GitHub user &quot;{username}&quot; does not exist.
        </p>
      </div>
      <Link to="/">
        <Button aria-label="Back to search">Back to search</Button>
      </Link>
    </div>
  );
};
