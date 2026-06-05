import type { Repository } from "../types/repository";
import { RepositoryCard } from "./RepositoryCard";

type RepositoryListProps = {
  repositories: Repository[];
};

export const RepositoryList = ({ repositories }: RepositoryListProps) => {
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground">
        Repositories ({repositories.length})
      </h2>

      <div className="grid gap-4">
        {repositories.map((repository) => (
          <RepositoryCard key={repository.id} repository={repository} />
        ))}
      </div>
    </section>
  );
};
