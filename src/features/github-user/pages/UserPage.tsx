import { useParams } from "react-router-dom";
import { UserProfile } from "../components/UserProfile";
import { UserNotFound } from "../components/UserNotFound";
import { useGithubUser } from "../hooks/useGithubUser";
import { RepositoryList } from "@/features/repositories";
import { useRepositories } from "@/features/repositories";
import {
  UserProfileSkeleton,
  RepositoryListSkeleton,
  ErrorState,
} from "@/shared/ui";
import { getErrorMessage, isNotFoundError } from "@/shared/api";
import { Container } from "@/app/layouts";

export const UserPage = () => {
  const { username } = useParams();
  const { user, isLoading: isUserLoading, error: userError } =
    useGithubUser(username);
  const {
    repositories,
    isLoading: isRepositoriesLoading,
    error: repositoriesError,
  } = useRepositories(username);

  const isLoading = isUserLoading || isRepositoriesLoading;
  const error = userError ?? repositoriesError;

  if (isLoading) {
    return (
      <Container>
        <div
          className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,280px)_1fr]"
          aria-busy="true"
          aria-label="Carregando..."
        >
          <UserProfileSkeleton />
          <RepositoryListSkeleton />
        </div>
      </Container>
    );
  }

  if (error) {
    if (isNotFoundError(error)) {
      return (
        <Container>
          <UserNotFound username={username ?? "unknown"} />
        </Container>
      );
    }

    return (
      <Container>
        <ErrorState
          title="Erro ao carregar dados"
          message={getErrorMessage(error)}
        />
      </Container>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Container>
      <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,280px)_1fr]">
        <UserProfile user={user} />
        <div className="min-w-0">
          <RepositoryList repositories={repositories} />
        </div>
      </div>
    </Container>
  );
};
