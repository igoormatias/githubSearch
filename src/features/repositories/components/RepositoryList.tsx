import { useMemo, useState } from "react";
import type { Repository, RepositorySortOption } from "../types/repository";
import { sortRepositories } from "../utils/sort-repositories";
import { RepositoryCard } from "./RepositoryCard";
import { RepositorySortSelect } from "./RepositorySortSelect";
import { EmptyState } from "@/shared/ui";

type RepositoryListProps = {
  repositories: Repository[];
};

export const RepositoryList = ({ repositories }: RepositoryListProps) => {
  const [sortOption, setSortOption] =
    useState<RepositorySortOption>("stars-desc");

  const sortedRepositories = useMemo(
    () => sortRepositories(repositories, sortOption),
    [repositories, sortOption],
  );

  if (repositories.length === 0) {
    return (
      <EmptyState
        title="Nenhum repositório encontrado"
        message="Este usuário não possui repositórios públicos."
      />
    );
  }

  return (
    <section className="w-full min-w-0 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-foreground">
          Repositórios ({repositories.length})
        </h2>
        <RepositorySortSelect value={sortOption} onChange={setSortOption} />
      </div>

      <div className="grid w-full gap-4">
        {sortedRepositories.map((repository) => (
          <RepositoryCard key={repository.id} repository={repository} />
        ))}
      </div>
    </section>
  );
};
