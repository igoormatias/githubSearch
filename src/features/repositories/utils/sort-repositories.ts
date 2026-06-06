import type { Repository, RepositorySortOption } from "../types/repository";

export const repositorySortLabels = {
  "stars-desc": " Mais estrelas",
  "stars-asc": " Menos estrelas",
  "name-asc": " Nome (A-Z)",
  "name-desc": " Nome (Z-A)",
} as const;

export const sortRepositories = (
  repositories: Repository[],
  sortOption: RepositorySortOption,
): Repository[] => {
  const sorted = [...repositories];

  switch (sortOption) {
    case "stars-desc":
      return sorted.sort((a, b) => b.stargazers_count - a.stargazers_count);
    case "stars-asc":
      return sorted.sort((a, b) => a.stargazers_count - b.stargazers_count);
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return sorted;
  }
};
