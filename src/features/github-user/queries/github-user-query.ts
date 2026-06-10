import { getUser } from "../services/user-service";

export const githubUserQueryKey = (username: string) =>
  ["user", username] as const;

export const githubUserQueryOptions = (username: string) => ({
  queryKey: githubUserQueryKey(username),
  queryFn: () => getUser(username),
});
