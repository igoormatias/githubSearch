import { useNavigation } from "react-router-dom";
import { Stack } from "react-bootstrap";
import { RepositoryHeader } from "../components/fragments/RepositoryHeader";
import { RepositorySpecs } from "../components/fragments/RepositorySpecs";
import { RepositoryStats } from "../components/fragments/RepositoryStats";
import { useRepositoryLoaderData } from "../hooks/useRepositoryLoaderData";
import { Container } from "@/app/layouts";
import { Card, RepositoryPageSkeleton } from "@/shared/ui";

export const RepositoryPage = () => {
  const repository = useRepositoryLoaderData();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  if (isLoading) {
    return (
      <Container>
        <RepositoryPageSkeleton />
      </Container>
    );
  }

  return (
    <Container>
      <div className="mx-auto w-100 min-w-0 max-w-detail">
        <Card className="p-3 p-md-4 p-lg-4">
          <Stack gap={3}>
            <RepositoryHeader repository={repository} />
            <RepositoryStats repository={repository} />
            <RepositorySpecs repository={repository} />
          </Stack>
        </Card>
      </div>
    </Container>
  );
};
