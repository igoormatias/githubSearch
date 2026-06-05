import { apiClient } from "@/shared/api";
import type { Repository, RepositoryDetail } from "../types/repository";

export const getUserRepositories = async (
  username: string,
): Promise<Repository[]> => {
  const response = await apiClient.get<Repository[]>(
    `/users/${username}/repos`,
    {
      params: {
        per_page: 100,
        sort: "updated",
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
