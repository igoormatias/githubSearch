import { apiClient } from "@/shared/api";
import type {
  RepositoryDetail,
  RepositorySearchResponse,
  RepositorySortOption,
} from "../types/repository";
import { REPOSITORIES_PER_PAGE } from "../types/repository";
import { mapSortToSearchOrder } from "../utils/map-sort-to-search-order";

export const searchUserRepositories = async (
  username: string,
  page: number,
  sort: RepositorySortOption,
): Promise<RepositorySearchResponse> => {
  const order = mapSortToSearchOrder(sort);
  const response = await apiClient.get<RepositorySearchResponse>(
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

export const getRepository = async (
  owner: string,
  repo: string,
): Promise<RepositoryDetail> => {
  const response = await apiClient.get<RepositoryDetail>(
    `/repos/${owner}/${repo}`,
  );

  return response.data;
};
