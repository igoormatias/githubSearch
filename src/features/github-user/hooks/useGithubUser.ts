import { useEffect, useState } from "react";
import { getUser } from "../services/user-service";
import type { GitHubUser } from "../types/user";

type UseGithubUserState = {
  user: GitHubUser | null;
  isLoading: boolean;
  error: unknown;
};

export const useGithubUser = (username: string | undefined) => {
  const [state, setState] = useState<UseGithubUserState>({
    user: null,
    isLoading: Boolean(username),
    error: null,
  });

  useEffect(() => {
    if (!username) {
      setState({ user: null, isLoading: false, error: null });
      return;
    }

    let cancelled = false;

    setState({ user: null, isLoading: true, error: null });

    getUser(username)
      .then((user) => {
        if (!cancelled) {
          setState({ user, isLoading: false, error: null });
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({ user: null, isLoading: false, error });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  return state;
};
