import { useEffect, useState } from "react";
import { getUserRepositories } from "../services/repository-service";
import type { Repository } from "../types/repository";

type UseRepositoriesState = {
  repositories: Repository[];
  isLoading: boolean;
  error: unknown;
};

export const useRepositories = (username: string | undefined) => {
  const [state, setState] = useState<UseRepositoriesState>({
    repositories: [],
    isLoading: Boolean(username),
    error: null,
  });

  useEffect(() => {
    if (!username) {
      setState({ repositories: [], isLoading: false, error: null });
      return;
    }

    let cancelled = false;

    setState({ repositories: [], isLoading: true, error: null });

    getUserRepositories(username)
      .then((repositories) => {
        if (!cancelled) {
          setState({ repositories, isLoading: false, error: null });
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({ repositories: [], isLoading: false, error });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  return state;
};
