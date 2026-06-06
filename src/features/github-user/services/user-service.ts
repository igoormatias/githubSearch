import { apiClient } from "@/shared/api";
import type { GitHubUser } from "../types/user";

export const getUser = async (username: string): Promise<GitHubUser> => {
  const response = await apiClient.get<GitHubUser>(`/users/${username}`);
  return response.data;
};
