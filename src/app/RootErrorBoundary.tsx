import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Container } from "@/shared/layout";
import { Button, ErrorState } from "@/shared/ui";
import { getErrorMessage } from "@/shared/api";

export const RootErrorBoundary = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <Container className="py-12">
        <div className="mx-auto max-w-lg space-y-4 text-center">
          <ErrorState
            title="Page not found"
            message="The page you are looking for does not exist."
          />
          <Link to="/">
            <Button aria-label="Back to home">Back to search</Button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <div className="mx-auto max-w-lg">
        <ErrorState message={getErrorMessage(error)} />
      </div>
    </Container>
  );
};
