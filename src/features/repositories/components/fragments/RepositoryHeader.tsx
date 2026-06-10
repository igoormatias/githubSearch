import { Link } from "react-router-dom";
import { FiArrowLeft, FiExternalLink } from "react-icons/fi";
import { Stack } from "react-bootstrap";
import type { RepositoryDetail } from "../../types/repository";
import { Button as AppButton } from "@/shared/ui";

type RepositoryHeaderProps = {
  repository: RepositoryDetail;
};

export const RepositoryHeader = ({ repository }: RepositoryHeaderProps) => {
  return (
    <Stack gap={2}>
      <Link
        to={`/user/${repository.owner.login}`}
        className="btn btn-link text-secondary text-decoration-none p-0 d-inline-flex align-items-center gap-2 small"
        aria-label="Voltar para repositórios"
      >
        <FiArrowLeft aria-hidden="true" />
        Voltar para Repositórios
      </Link>

      <div className="d-flex flex-column flex-md-row align-items-md-start justify-content-md-between gap-3">
        <div className="min-w-0 flex-grow-1">
          <div className="d-flex flex-wrap align-items-center gap-2 mb-1">
            <h1 className="h4 fw-bold mb-0 text-break">
              {repository.full_name}
            </h1>
            {!repository.private && (
              <span className="repo-public-badge">Public</span>
            )}
          </div>
          <p className="text-secondary mb-0 small">
            {repository.description?.trim() || "Sem descrição disponível."}
          </p>
        </div>

        <a
          href={repository.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 text-decoration-none w-100 w-md-auto"
        >
          <AppButton
            className="w-100 w-md-auto"
            aria-label="Abrir repositório no GitHub"
          >
            Abrir no GitHub
            <FiExternalLink aria-hidden="true" />
          </AppButton>
        </a>
      </div>
    </Stack>
  );
};
