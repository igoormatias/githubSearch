import {
  useLoaderData,
  useNavigation,
  useParams,
  useRouteError,
  isRouteErrorResponse,
} from "react-router-dom";
import { UserProfile } from "./UserProfile";
import { UserProfileSkeleton } from "./UserProfileSkeleton";
import { UserNotFound } from "./UserNotFound";
import { RepositoryList } from "@/features/repositories";
import { Container } from "@/shared/layout";
import type { UserPageData } from "../types/user-page";

export const UserPage = () => {
  const { user, repositories } = useLoaderData() as UserPageData;
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  if (isLoading) {
    return (
      <Container>
        <UserProfileSkeleton />
      </Container>
    );
  }

  return (
    <Container>
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <UserProfile user={user} />
        <RepositoryList repositories={repositories} />
      </div>
    </Container>
  );
};

export const UserPageError = () => {
  const error = useRouteError();
  const { username = "unknown" } = useParams();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <Container>
        <UserNotFound username={username} />
      </Container>
    );
  }

  return (
    <Container>
      <p className="text-foreground-muted">Unable to load user profile.</p>
    </Container>
  );
};
