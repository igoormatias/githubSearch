import { Skeleton } from "./Skeleton";

export const UserProfileSkeleton = () => {
  return (
    <aside
      className="space-y-6 text-center lg:text-left"
      aria-busy="true"
      aria-label="Carregando..."
    >
      <Skeleton className="mx-auto h-24 w-24 sm:h-28 sm:w-28 lg:mx-0 lg:h-64 lg:w-full" />
      <Skeleton className="mx-auto h-8 w-3/4 lg:mx-0" />
      <Skeleton className="mx-auto h-4 w-1/2 lg:mx-0" />
      <Skeleton className="h-16 w-full" />
      <div className="grid grid-cols-3 gap-2 px-1">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    </aside>
  );
};
