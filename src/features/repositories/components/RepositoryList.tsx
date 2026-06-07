import type { Repository, RepositorySortOption } from "../types/repository";
import { REPOSITORIES_PER_PAGE } from "../types/repository";
import { RepositoryCard } from "./RepositoryCard";
import { RepositoryPagination } from "./RepositoryPagination";
import { RepositorySortSelect } from "./RepositorySortSelect";
import { EmptyState } from "@/shared/ui";

type RepositoryListProps = {
  repositories: Repository[];
  totalCount: number;
  page: number;
  sort: RepositorySortOption;
  onSortChange: (sort: RepositorySortOption) => void;
  onPageChange: (page: number) => void;
  isFetching?: boolean;
};

export const RepositoryList = ({
  repositories,
  totalCount,
  page,
  sort,
  onSortChange,
  onPageChange,
  isFetching = false,
}: RepositoryListProps) => {
  const totalPages = Math.ceil(totalCount / REPOSITORIES_PER_PAGE);

  if (totalCount === 0) {
    return (
      <EmptyState
        title="Nenhum repositório encontrado"
        message="Este usuário não possui repositórios públicos."
      />
    );
  }

  return (
    <section
      className="w-full min-w-0 space-y-6"
      aria-busy={isFetching}
      aria-label="Lista de repositórios"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-foreground">
          Repositórios ({totalCount})
        </h2>
        <RepositorySortSelect value={sort} onChange={onSortChange} />
      </div>

      <div className="grid w-full gap-4">
        {repositories.map((repository) => (
          <RepositoryCard key={repository.id} repository={repository} />
        ))}
      </div>

      <RepositoryPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
        isFetching={isFetching}
      />
    </section>
  );
};
