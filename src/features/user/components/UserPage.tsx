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
import { Container } from "@/shared/layout";
import type { UserPageData } from "../types/user-page";

export const UserPage = () => {
  const { user } = useLoaderData() as UserPageData;
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
      <UserProfile user={user} />
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
