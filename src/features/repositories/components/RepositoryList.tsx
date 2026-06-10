import { Col, Row, Stack } from "react-bootstrap";
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
      className="w-100 min-w-0"
      aria-busy={isFetching}
      aria-label="Lista de repositórios"
    >
      <Stack gap={3}>
        <Row className="align-items-center g-2">
          <Col xs={12} md={6} lg="auto">
            <h2 className="h5 fw-semibold mb-0">
              Repositórios ({totalCount})
            </h2>
          </Col>
          <Col xs={12} md={6} lg="auto" className="ms-lg-auto">
            <RepositorySortSelect value={sort} onChange={onSortChange} />
          </Col>
        </Row>

        <Stack className="repo-list gap-3 gap-lg-4">
          {repositories.map((repository) => (
            <RepositoryCard key={repository.id} repository={repository} />
          ))}
        </Stack>

        <RepositoryPagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
          isFetching={isFetching}
        />
      </Stack>
    </section>
  );
};
