import type { Repository, RepositorySortOption } from "../types/repository";

export const sortRepositories = (
  repos: Repository[],
  sort: RepositorySortOption,
): Repository[] =>
  [...repos].sort((a, b) =>
    sort === "stars-desc"
      ? b.stargazers_count - a.stargazers_count
      : a.stargazers_count - b.stargazers_count,
  );
