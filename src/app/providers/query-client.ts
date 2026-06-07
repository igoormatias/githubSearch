import { QueryClient } from "@tanstack/react-query";

const MILLISECONDS_IN_MINUTE = 60_000;
const QUERY_STALE_TIME_MINUTES = 5;
const QUERY_STALE_TIME_MS = QUERY_STALE_TIME_MINUTES * MILLISECONDS_IN_MINUTE;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_STALE_TIME_MS,
      retry: false,
    },
  },
});

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
