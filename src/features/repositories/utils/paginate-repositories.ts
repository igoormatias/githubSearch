import type { Repository } from "../types/repository";
import { REPOSITORIES_PER_PAGE } from "../types/repository";

export const paginateRepositories = (repos: Repository[], page: number) => ({
  total_count: repos.length,
  items: repos.slice(
    (page - 1) * REPOSITORIES_PER_PAGE,
    page * REPOSITORIES_PER_PAGE,
  ),
});
