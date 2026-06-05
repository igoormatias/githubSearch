import { apiClient } from "@/shared/api";
import type { Repository } from "../types/repository";

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
