import { formatDate } from "@/shared/lib";
import type { RepositoryDetail } from "../../types/repository";
import { Card } from "@/shared/ui";

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
    <Card className="space-y-4 p-6">
      <h2 className="text-lg font-semibold text-foreground">Repositório</h2>
      <dl className="space-y-4">
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="flex flex-col gap-1 border-b border-border pb-4 last:border-b-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
          >
            <dt className="text-sm text-foreground-muted">{spec.label}</dt>
            <dd className="text-sm font-medium text-foreground">{spec.value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
};
