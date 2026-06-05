import { Link } from "react-router-dom";
import { FiArrowLeft, FiExternalLink } from "react-icons/fi";
import type { RepositoryDetail } from "../../types/repository";
import { Button } from "@/shared/ui";

type RepositoryHeaderProps = {
  repository: RepositoryDetail;
};

export const RepositoryHeader = ({ repository }: RepositoryHeaderProps) => {
  return (
    <div className="space-y-4">
      <Link
        to={`/user/${repository.owner.login}`}
        className="inline-flex items-center gap-2 text-sm text-foreground-muted transition-colors duration-200 hover:text-primary"
      >
        <FiArrowLeft aria-hidden="true" />
        Back to repositories
      </Link>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              {repository.full_name}
            </h1>
            {!repository.private && (
              <span className="rounded-full border border-border px-2 py-0.5 text-xs text-foreground-muted">
                Public
              </span>
            )}
          </div>
          {repository.description && (
            <p className="max-w-3xl text-foreground-muted">
              {repository.description}
            </p>
          )}
        </div>

        <a
          href={repository.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0"
        >
          <Button aria-label="Open repository on GitHub">
            Open on GitHub
            <FiExternalLink aria-hidden="true" />
          </Button>
        </a>
      </div>
    </div>
  );
};
