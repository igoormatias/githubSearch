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
        className="inline-flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-foreground-muted transition-colors duration-200 hover:bg-surface-hover hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Voltar para repositórios"
      >
        <FiArrowLeft aria-hidden="true" />
        Voltar para Repositórios
      </Link>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold wrap-anywhere text-foreground sm:text-3xl">
              {repository.full_name}
            </h1>
            {!repository.private && (
              <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-xs text-foreground-muted">
                Public
              </span>
            )}
          </div>
          <p className="max-w-3xl text-sm leading-relaxed text-foreground-muted sm:text-base">
            {repository.description?.trim() || "Sem descrição disponível."}
          </p>
        </div>

        <a
          href={repository.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Button aria-label="Abrir repositório no GitHub">
            Abrir no GitHub
            <FiExternalLink aria-hidden="true" />
          </Button>
        </a>
      </div>
    </div>
  );
};
