import { RepositoryCardSkeleton } from "./RepositoryCardSkeleton";
import { Skeleton } from "./Skeleton";

export const RepositoryListSkeleton = () => {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Carregando...">
      <Skeleton className="h-8 w-48" />
      <div className="grid w-full gap-4">
        <RepositoryCardSkeleton />
        <RepositoryCardSkeleton />
        <RepositoryCardSkeleton />
        <RepositoryCardSkeleton />
        <RepositoryCardSkeleton />
        <RepositoryCardSkeleton />
      </div>
    </div>
  );
};
