import { Skeleton } from "@/shared/ui";

export const SearchPageSkeleton = () => {
  return (
    <div
      className="mx-auto flex w-full max-w-2xl flex-col gap-8"
      aria-busy="true"
      aria-label="Carregando..."
    >
      <div className="space-y-4 text-center">
        <Skeleton className="mx-auto h-10 w-3/4" />
        <Skeleton className="mx-auto h-6 w-full" />
      </div>
      <Skeleton className="h-12 w-full" />
    </div>
  );
};
