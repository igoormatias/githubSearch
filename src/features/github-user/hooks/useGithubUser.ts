import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/user-service";

export const useGithubUser = (username: string | undefined) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user", username],
    queryFn: () => getUser(username!),
    enabled: Boolean(username),
  });

  return {
    user: data ?? null,
    isLoading,
    error,
  };
};
