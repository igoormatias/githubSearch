import { Link } from "react-router-dom";
import { FiGitBranch, FiStar } from "react-icons/fi";
import type { Repository } from "../types/repository";
import { formatRelativeDate } from "@/shared/utils";
import { Card } from "@/shared/ui";

type RepositoryCardProps = {
  repository: Repository;
};

const languageColors: Record<string, string> = {
  TypeScript: "bg-primary",
  JavaScript: "bg-tertiary",
  Python: "bg-success",
  Go: "bg-secondary",
  Rust: "bg-danger",
};

export const RepositoryCard = ({ repository }: RepositoryCardProps) => {
  const languageColor =
    languageColors[repository.language ?? ""] ?? "bg-secondary";

  return (
    <Card className="flex h-full flex-col gap-4 hover:bg-surface-hover">
      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to={`/repository/${repository.owner.login}/${repository.name}`}
            className="truncate text-base font-semibold text-primary transition-colors duration-200 hover:underline"
          >
            {repository.name}
          </Link>
          {!repository.private && (
            <span className="rounded-full border border-border px-2 py-0.5 text-xs text-foreground-muted">
              Public
            </span>
          )}
        </div>
        {repository.description && (
          <p className="line-clamp-2 text-sm text-foreground-muted">
            {repository.description}
          </p>
        )}
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-4 text-sm text-foreground-muted">
        <div className="flex flex-wrap items-center gap-4">
          {repository.language && (
            <span className="inline-flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${languageColor}`}
                aria-hidden="true"
              />
              {repository.language}
            </span>
          )}
          <span className="inline-flex items-center gap-1">
            <FiStar aria-hidden="true" />
            {repository.stargazers_count.toLocaleString()}
          </span>
          <span className="inline-flex items-center gap-1">
            <FiGitBranch aria-hidden="true" />
            {repository.forks_count.toLocaleString()}
          </span>
        </div>
        <span>Updated {formatRelativeDate(repository.updated_at)}</span>
      </div>

      <Link
        to={`/repository/${repository.owner.login}/${repository.name}`}
        className="inline-flex w-full items-center justify-center rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:hidden"
      >
        View Details
      </Link>
    </Card>
  );
};
