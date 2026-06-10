import { Card } from "react-bootstrap";
import { formatDate } from "@/shared/lib";
import type { RepositoryDetail } from "../../types/repository";

type RepositorySpecsProps = {
  repository: RepositoryDetail;
};

export const RepositorySpecs = ({ repository }: RepositorySpecsProps) => {
  const specs = [
    {
      label: "Primary Language",
      value: repository.language ?? "Não informado",
    },
    { label: "Default Branch", value: repository.default_branch },
    { label: "Criado em", value: formatDate(repository.created_at) },
    { label: "Atualizado em", value: formatDate(repository.updated_at) },
  ];

  return (
    <Card className="border card-interactive">
      <Card.Body className="p-4">
        <h2 className="h5 fw-semibold mb-4">Repositório</h2>
        <dl className="mb-0">
          {specs.map((spec, index) => (
            <div
              key={spec.label}
              className={`d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between gap-1 py-3 ${index < specs.length - 1 ? "border-bottom" : ""}`}
              style={{ borderColor: "var(--border-color)" }}
            >
              <dt className="small text-secondary mb-0">{spec.label}</dt>
              <dd className="small fw-semibold mb-0">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </Card.Body>
    </Card>
  );
};
