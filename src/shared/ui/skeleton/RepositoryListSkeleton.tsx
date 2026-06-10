import { Stack } from "react-bootstrap";
import { RepositoryCardSkeleton } from "./RepositoryCardSkeleton";
import { Skeleton } from "./Skeleton";

export const RepositoryListSkeleton = () => {
  return (
    <Stack gap={4} aria-busy="true" aria-label="Carregando...">
      <Skeleton style={{ height: "2rem", width: "12rem" }} />
      <Stack gap={3}>
        <RepositoryCardSkeleton />
        <RepositoryCardSkeleton />
        <RepositoryCardSkeleton />
        <RepositoryCardSkeleton />
        <RepositoryCardSkeleton />
        <RepositoryCardSkeleton />
      </Stack>
    </Stack>
  );
};
