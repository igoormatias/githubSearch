import type { ReactNode } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";

type RepositoryPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isFetching?: boolean;
};

type PaginationButtonProps = {
  disabled: boolean;
  label: string;
  onClick: () => void;
  children: ReactNode;
};

const PaginationButton = ({
  disabled,
  label,
  onClick,
  children,
}: PaginationButtonProps) => (
  <li className={`page-item${disabled ? " disabled" : ""}`}>
    <button
      type="button"
      className="page-link"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      {children}
    </button>
  </li>
);

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
  const isPrevDisabled = isFirstPage || isFetching;
  const isNextDisabled = isLastPage || isFetching;

  return (
    <nav
      aria-label="Paginação de repositórios"
      className="pagination-wrapper d-flex justify-content-center"
    >
      <ul className="pagination pagination-github mb-0 flex-wrap justify-content-center">
        <PaginationButton
          disabled={isPrevDisabled}
          label="Primeira página"
          onClick={() => onPageChange(1)}
        >
          <FiChevronsLeft aria-hidden="true" />
        </PaginationButton>
        <PaginationButton
          disabled={isPrevDisabled}
          label="Página anterior"
          onClick={() => onPageChange(currentPage - 1)}
        >
          <FiChevronLeft aria-hidden="true" />
        </PaginationButton>
        <li className="page-item active">
          <span className="page-link">
            Página {currentPage} de {totalPages}
          </span>
        </li>
        <PaginationButton
          disabled={isNextDisabled}
          label="Próxima página"
          onClick={() => onPageChange(currentPage + 1)}
        >
          <FiChevronRight aria-hidden="true" />
        </PaginationButton>
        <PaginationButton
          disabled={isNextDisabled}
          label="Última página"
          onClick={() => onPageChange(totalPages)}
        >
          <FiChevronsRight aria-hidden="true" />
        </PaginationButton>
      </ul>
    </nav>
  );
};
