import { Link } from "react-router-dom";
import { FiGitBranch, FiStar } from "react-icons/fi";
import { Card } from "react-bootstrap";
import type { Repository } from "../types/repository";
import { formatNumber, formatRelativeDate } from "@/shared/lib";

type RepositoryCardProps = {
  repository: Repository;
};

const languageColorClass: Record<string, string> = {
  TypeScript: "language-dot-typescript",
  JavaScript: "language-dot-javascript",
  Python: "language-dot-python",
  Go: "language-dot-go",
  Rust: "language-dot-rust",
};

export const RepositoryCard = ({ repository }: RepositoryCardProps) => {
  const languageClass =
    languageColorClass[repository.language ?? ""] ?? "language-dot-default";

  return (
    <Card className="border repo-card">
      <Card.Body className="repo-card-body d-flex flex-column">
        <div className="d-flex flex-wrap align-items-center gap-2">
          <Link
            to={`/repository/${repository.owner.login}/${repository.name}`}
            className="repo-card-title text-primary text-decoration-none text-truncate"
          >
            {repository.name}
          </Link>
          {!repository.private && (
            <span className="repo-public-badge">Público</span>
          )}
        </div>

        {repository.description && (
          <p className="repo-card-description text-secondary mb-0 line-clamp-2">
            {repository.description}
          </p>
        )}

        <div className="repo-card-footer d-flex flex-column flex-sm-row flex-sm-wrap align-items-sm-center justify-content-sm-between gap-2">
          <div className="d-flex flex-wrap align-items-center gap-2 gap-sm-3">
            {repository.language && (
              <span className="repo-meta-item d-inline-flex align-items-center gap-1">
                <span
                  className={`language-dot ${languageClass}`}
                  aria-hidden="true"
                />
                {repository.language}
              </span>
            )}
            <span className="repo-meta-item d-inline-flex align-items-center gap-1">
              <FiStar aria-hidden="true" />
              {formatNumber(repository.stargazers_count)} estrelas
            </span>
            <span className="repo-meta-item d-inline-flex align-items-center gap-1">
              <FiGitBranch aria-hidden="true" />
              {formatNumber(repository.forks_count)} forks
            </span>
          </div>
          <span className="repo-meta-item flex-shrink-0">
            Atualizado em {formatRelativeDate(repository.updated_at)}
          </span>
        </div>

        <Link
          to={`/repository/${repository.owner.login}/${repository.name}`}
          className="btn btn-outline-secondary touch-target repo-details-btn d-lg-none"
        >
          Ver detalhes
        </Link>
      </Card.Body>
    </Card>
  );
};
