import { useLoaderData, useNavigation } from "react-router-dom";
import type { RepositoryDetail } from "../types/repository";
import { RepositoryHeader } from "./fragments/RepositoryHeader";
import { RepositorySpecs } from "./fragments/RepositorySpecs";
import { RepositoryStats } from "./fragments/RepositoryStats";
import { Container } from "@/shared/layout";
import { Card, Skeleton } from "@/shared/ui";

export const RepositoryPage = () => {
  const repository = useLoaderData() as RepositoryDetail;
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  if (isLoading) {
    return (
      <Container>
        <div className="mx-auto max-w-3xl space-y-6" aria-busy="true">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mx-auto max-w-3xl space-y-8">
        <Card className="space-y-8">
          <RepositoryHeader repository={repository} />
          <RepositoryStats repository={repository} />
          <RepositorySpecs repository={repository} />
        </Card>
      </div>
    </Container>
  );
};
