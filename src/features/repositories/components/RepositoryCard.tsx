import { FiGitBranch, FiStar } from "react-icons/fi";
import type { Repository } from "../types/repository";
import { formatRelativeDate } from "@/shared/utils";
import { Card } from "@/shared/ui";

type RepositoryCardProps = {
  repository: Repository;
};

export const RepositoryCard = ({ repository }: RepositoryCardProps) => {
  return (
    <Card className="flex h-full flex-col gap-4">
      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="truncate text-base font-semibold text-primary">
            {repository.name}
          </span>
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
          {repository.language && <span>{repository.language}</span>}
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
    </Card>
  );
};
