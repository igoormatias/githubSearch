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

export type RepositorySortOption =
  | "stars-desc"
  | "stars-asc"
  | "name-asc"
  | "name-desc";
