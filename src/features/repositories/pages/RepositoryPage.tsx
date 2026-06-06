import { useLoaderData, useNavigation } from "react-router-dom";
import type { RepositoryDetail } from "../types/repository";
import { RepositoryHeader } from "../components/fragments/RepositoryHeader";
import { RepositorySpecs } from "../components/fragments/RepositorySpecs";
import { RepositoryStats } from "../components/fragments/RepositoryStats";
import { Container } from "@/app/layouts";
import { Card, Skeleton } from "@/shared/ui";

export const RepositoryPage = () => {
  const repository = useLoaderData() as RepositoryDetail;
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  if (isLoading) {
    return (
      <Container>
        <div
          className="mx-auto w-full min-w-0 max-w-3xl space-y-6"
          aria-busy="true"
          aria-label="Carregando..."
        >
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-10 w-full" />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
          <Skeleton className="h-48 w-full" />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mx-auto w-full min-w-0 max-w-3xl space-y-8">
        <Card className="space-y-8 p-6">
          <RepositoryHeader repository={repository} />
          <RepositoryStats repository={repository} />
          <RepositorySpecs repository={repository} />
        </Card>
      </div>
    </Container>
  );
};
