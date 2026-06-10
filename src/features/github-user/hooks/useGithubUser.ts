import { useQuery } from "@tanstack/react-query";
import { githubUserQueryOptions } from "../queries/github-user-query";

export const useGithubUser = (username: string | undefined) => {
  const { data, isLoading, error } = useQuery({
    ...githubUserQueryOptions(username!),
    enabled: Boolean(username),
  });

  return {
    user: data ?? null,
    isLoading,
    error,
  };
};
