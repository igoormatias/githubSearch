import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import type { RepositorySortOption } from "@/features/repositories";
import { parsePageParam, parseSortParam } from "../utils/user-page-params";

export const useUserPageParams = (username: string | undefined) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parsePageParam(searchParams.get("page"));
  const sort = parseSortParam(searchParams.get("sort"));
  const previousUsernameRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (
      previousUsernameRef.current !== undefined &&
      previousUsernameRef.current !== username
    ) {
      setSearchParams({}, { replace: true });
    }

    previousUsernameRef.current = username;
  }, [username, setSearchParams]);

  const updateSearchParams = (
    updates: Record<string, string | number | null>,
  ) => {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        nextParams.delete(key);
        return;
      }

      nextParams.set(key, String(value));
    });

    setSearchParams(nextParams);
  };

  const handlePageChange = (newPage: number) => {
    updateSearchParams({ page: newPage });
  };

  const handleSortChange = (newSort: RepositorySortOption) => {
    updateSearchParams({ sort: newSort, page: 1 });
  };

  return {
    page,
    sort,
    handlePageChange,
    handleSortChange,
  };
};
