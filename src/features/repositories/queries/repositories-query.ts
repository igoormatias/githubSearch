import { getUserRepositoriesPage } from "../services/repository-service";
import type { RepositorySortOption } from "../types/repository";

export const repositoriesQueryKey = (
  username: string,
  page: number,
  sort: RepositorySortOption,
) => ["repositories", username, page, sort] as const;

export const repositoriesQueryOptions = (
  username: string,
  page: number,
  sort: RepositorySortOption,
) => ({
  queryKey: repositoriesQueryKey(username, page, sort),
  queryFn: () => getUserRepositoriesPage(username, page, sort),
});
