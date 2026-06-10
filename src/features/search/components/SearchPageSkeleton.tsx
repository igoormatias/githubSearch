import { Stack } from "react-bootstrap";
import { Skeleton } from "@/shared/ui";

export const SearchPageSkeleton = () => {
  return (
    <Stack
      gap={4}
      className="mx-auto w-100 max-w-2xl"
      aria-busy="true"
      aria-label="Carregando..."
    >
      <Stack gap={3} className="text-center">
        <Skeleton className="mx-auto" style={{ height: "2.5rem", width: "75%" }} />
        <Skeleton className="mx-auto" style={{ height: "1.5rem", width: "100%" }} />
      </Stack>
      <Skeleton style={{ height: "3rem", width: "100%" }} />
    </Stack>
  );
};
