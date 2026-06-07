export type Repository = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  watchers_count: number;
  default_branch: string;
  private: boolean;
  created_at: string;
  updated_at: string;
  owner: {
    login: string;
  };
};

export type RepositoryDetail = Repository;

export type RepositorySortOption = "stars-desc" | "stars-asc";

export type RepositorySearchResponse = {
  total_count: number;
  items: Repository[];
};

export const REPOSITORIES_PER_PAGE = 10;

export const repositorySortLabels: Record<RepositorySortOption, string> = {
  "stars-desc": "⭐ Mais estrelas",
  "stars-asc": "⭐ Menos estrelas",
};

export const DEFAULT_REPOSITORY_SORT: RepositorySortOption = "stars-desc";

export const isRepositorySortOption = (
  value: string | null,
): value is RepositorySortOption => {
  return value === "stars-desc" || value === "stars-asc";
};
