import { Skeleton } from "@/shared/ui";

export const UserProfileSkeleton = () => {
  return (
    <aside className="space-y-6" aria-busy="true" aria-label="Loading user profile">
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-16 w-full" />
    </aside>
  );
};
