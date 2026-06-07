import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import { Button } from "@/shared/ui";

type RepositoryPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isFetching?: boolean;
};

export const RepositoryPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  isFetching = false,
}: RepositoryPaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <nav
      aria-label="Paginação de repositórios"
      className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
    >
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          variant="secondary"
          className="min-h-[44px] min-w-[44px] px-3"
          onClick={() => onPageChange(1)}
          disabled={isFirstPage || isFetching}
          aria-label="Primeira página"
        >
          <FiChevronsLeft aria-hidden="true" />
        </Button>

        <Button
          variant="secondary"
          className="min-h-[44px] min-w-[44px] px-3"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isFirstPage || isFetching}
          aria-label="Página anterior"
        >
          <FiChevronLeft aria-hidden="true" />
        </Button>

        <span className="min-w-[120px] px-3 text-center text-sm font-medium text-foreground-muted">
          Página {currentPage} de {totalPages}
        </span>

        <Button
          variant="secondary"
          className="min-h-[44px] min-w-[44px] px-3"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLastPage || isFetching}
          aria-label="Próxima página"
        >
          <FiChevronRight aria-hidden="true" />
        </Button>

        <Button
          variant="secondary"
          className="min-h-[44px] min-w-[44px] px-3"
          onClick={() => onPageChange(totalPages)}
          disabled={isLastPage || isFetching}
          aria-label="Última página"
        >
          <FiChevronsRight aria-hidden="true" />
        </Button>
      </div>
    </nav>
  );
};
