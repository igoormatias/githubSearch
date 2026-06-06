import { Link } from "react-router-dom";
import { FiGitBranch, FiStar } from "react-icons/fi";
import type { Repository } from "../types/repository";
import { formatNumber, formatRelativeDate } from "@/shared/lib";
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
    <Card className="flex h-full w-full max-w-full min-w-0 flex-col gap-2 !p-4 hover:bg-surface-hover sm:gap-3 sm:!p-5 lg:!p-6">
      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to={`/repository/${repository.owner.login}/${repository.name}`}
            className="cursor-pointer truncate text-base font-semibold text-primary transition-colors duration-200 hover:underline"
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

      <div className="mt-auto flex flex-col gap-2 text-sm text-foreground-muted sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
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
            {formatNumber(repository.stargazers_count)} Stars
          </span>
          <span className="inline-flex items-center gap-1">
            <FiGitBranch aria-hidden="true" />
            {formatNumber(repository.forks_count)} Forks
          </span>
        </div>
        <span className="shrink-0 text-xs sm:text-sm">
          Atualizado em {formatRelativeDate(repository.updated_at)}
        </span>
      </div>

      <Link
        to={`/repository/${repository.owner.login}/${repository.name}`}
        className="inline-flex min-h-[44px] w-full cursor-pointer items-center justify-center rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:hidden"
      >
        Ver detalhes
      </Link>
    </Card>
  );
};
