import { Skeleton } from "./Skeleton";

export const RepositoryCardSkeleton = () => {
  return (
    <div className="rounded-xl border border-border bg-surface p-6">
      <div className="space-y-4">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <div className="flex gap-4 pt-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
    </div>
  );
};
