import { Stack } from "react-bootstrap";
import { RepositoryCardSkeleton } from "./RepositoryCardSkeleton";
import { Skeleton } from "./Skeleton";

export const RepositoryListSkeleton = () => {
  return (
    <Stack gap={4} aria-busy="true" aria-label="Carregando...">
      <Skeleton className="sk-list-header" />
      <Stack gap={3}>
        {Array.from({ length: 6 }).map((_, index) => (
          <RepositoryCardSkeleton key={index} />
        ))}
      </Stack>
    </Stack>
  );
};
