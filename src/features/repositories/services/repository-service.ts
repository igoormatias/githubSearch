import { apiClient, isRateLimitError } from "@/shared/api";
import type {
  Repository,
  RepositoryDetail,
  RepositoryListResponse,
  RepositorySortOption,
} from "../types/repository";
import { REPOSITORIES_PER_PAGE } from "../types/repository";
import { paginateRepositories } from "../utils/paginate-repositories";
import { sortRepositories } from "../utils/sort-repositories";

const GITHUB_REPOS_PER_PAGE = 100;

const mapSortToSearchOrder = (
  sort: RepositorySortOption,
): "desc" | "asc" => {
  return sort === "stars-desc" ? "desc" : "asc";
};

export const searchUserRepositories = async (
  username: string,
  page: number,
  sort: RepositorySortOption,
): Promise<RepositoryListResponse> => {
  const order = mapSortToSearchOrder(sort);
  const response = await apiClient.get<RepositoryListResponse>(
    "/search/repositories",
    {
      params: {
        q: `user:${username}`,
        sort: "stars",
        order,
        per_page: REPOSITORIES_PER_PAGE,
        page,
      },
    },
  );

  return response.data;
};

export const getUserRepositories = async (
  username: string,
): Promise<Repository[]> => {
  const allRepositories: Repository[] = [];
  let page = 1;

  while (true) {
    const response = await apiClient.get<Repository[]>(
      `/users/${username}/repos`,
      {
        params: {
          per_page: GITHUB_REPOS_PER_PAGE,
          page,
        },
      },
    );

    allRepositories.push(...response.data);

    if (response.data.length < GITHUB_REPOS_PER_PAGE) {
      break;
    }

    page += 1;
  }

  return allRepositories;
};

export const getUserRepositoriesPage = async (
  username: string,
  page: number,
  sort: RepositorySortOption,
): Promise<RepositoryListResponse> => {
  try {
    return await searchUserRepositories(username, page, sort);
  } catch (error) {
    if (isRateLimitError(error)) {
      const allRepositories = await getUserRepositories(username);
      const sorted = sortRepositories(allRepositories, sort);
      return paginateRepositories(sorted, page);
    }

    throw error;
  }
};

export const getRepository = async (
  owner: string,
  repo: string,
): Promise<RepositoryDetail> => {
  const response = await apiClient.get<RepositoryDetail>(
    `/repos/${owner}/${repo}`,
  );

  return response.data;
};
