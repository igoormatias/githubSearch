import type { Repository, RepositorySortOption } from "../types/repository";

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

export const repositorySortLabels: Record<RepositorySortOption, string> = {
  "stars-desc": "Stars (High to Low)",
  "stars-asc": "Stars (Low to High)",
  "name-asc": "Name (A-Z)",
  "name-desc": "Name (Z-A)",
};
