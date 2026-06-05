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
        title="No repositories"
        message="This user does not have any public repositories."
      />
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-foreground">
          Repositories ({repositories.length})
        </h2>
        <RepositorySortSelect value={sortOption} onChange={setSortOption} />
      </div>

      <div className="grid gap-4">
        {sortedRepositories.map((repository) => (
          <RepositoryCard key={repository.id} repository={repository} />
        ))}
      </div>
    </section>
  );
};
