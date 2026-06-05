import { Skeleton } from "@/shared/ui";

export const RepositoryListSkeleton = () => {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading repositories">
      <Skeleton className="h-8 w-48" />
      <div className="grid gap-4">
        <Skeleton className="h-36 w-full" />
        <Skeleton className="h-36 w-full" />
        <Skeleton className="h-36 w-full" />
        <Skeleton className="h-36 w-full" />
      </div>
    </div>
  );
};
