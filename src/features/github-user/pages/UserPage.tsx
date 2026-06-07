import { useParams } from "react-router-dom";
import { UserProfile } from "../components/UserProfile";
import { UserNotFound } from "../components/UserNotFound";
import { useGithubUser } from "../hooks/useGithubUser";
import { useUserPageParams } from "../hooks/useUserPageParams";
import {
  RepositoryList,
  useRepositories,
} from "@/features/repositories";
import {
  UserProfileSkeleton,
  RepositoryListSkeleton,
  ErrorState,
} from "@/shared/ui";
import { getErrorMessage, isNotFoundError } from "@/shared/api";
import { Container } from "@/app/layouts";

export const UserPage = () => {
  const { username } = useParams();
  const { page, sort, handlePageChange, handleSortChange } =
    useUserPageParams(username);

  const { user, isLoading: isUserLoading, error: userError } =
    useGithubUser(username);
  const {
    repositories,
    totalCount,
    isLoading: isRepositoriesLoading,
    isFetching: isRepositoriesFetching,
    error: repositoriesError,
  } = useRepositories(username, page, sort);

  const isInitialLoading =
    isUserLoading ||
    (isRepositoriesLoading && repositories.length === 0 && !repositoriesError);

  if (isInitialLoading) {
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

  if (userError) {
    if (isNotFoundError(userError)) {
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
          message={getErrorMessage(userError)}
        />
      </Container>
    );
  }

  if (!user) {
    return (
      <Container>
        <ErrorState
          title="Erro ao carregar dados"
          message="Não foi possível carregar o perfil do usuário."
        />
      </Container>
    );
  }

  return (
    <Container>
      <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,280px)_1fr]">
        <UserProfile user={user} />
        <div className="min-w-0">
          {repositoriesError ? (
            <ErrorState
              title="Erro ao carregar repositórios"
              message={getErrorMessage(repositoriesError)}
            />
          ) : (
            <RepositoryList
              repositories={repositories}
              totalCount={totalCount}
              page={page}
              sort={sort}
              onSortChange={handleSortChange}
              onPageChange={handlePageChange}
              isFetching={isRepositoriesFetching}
            />
          )}
        </div>
      </div>
    </Container>
  );
};
