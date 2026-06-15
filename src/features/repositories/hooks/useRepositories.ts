import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { repositoriesQueryOptions } from "../queries/repositories-query";
import type { RepositorySortOption } from "../types/repository";

export const useRepositories = (
  username: string | undefined,
  page: number,
  sort: RepositorySortOption,
) => {
  const { data, isLoading, isFetching, error } = useQuery({
    ...repositoriesQueryOptions(username!, page, sort),
    enabled: Boolean(username),
    placeholderData: keepPreviousData,
  });

  return {
    repositories: data?.items ?? [],
    totalCount: data?.total_count ?? 0,
    isLoading,
    isFetching,
    error,
  };
};
