import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { searchUserRepositories } from "../services/repository-service";
import type { RepositorySortOption } from "../types/repository";

export const useRepositories = (
  username: string | undefined,
  page: number,
  sort: RepositorySortOption,
) => {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["repositories", username, page, sort],
    queryFn: () => searchUserRepositories(username!, page, sort),
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
