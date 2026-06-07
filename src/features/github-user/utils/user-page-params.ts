import {
  DEFAULT_REPOSITORY_SORT,
  isRepositorySortOption,
} from "@/features/repositories";
import type { RepositorySortOption } from "@/features/repositories";

export const parsePageParam = (value: string | null): number => {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 1) {
    return 1;
  }

  return parsed;
};

export const parseSortParam = (value: string | null): RepositorySortOption => {
  return isRepositorySortOption(value) ? value : DEFAULT_REPOSITORY_SORT;
};
