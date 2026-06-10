import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Stack } from "react-bootstrap";
import { Container } from "@/app/layouts";
import { Button, ErrorState } from "@/shared/ui";
import { getErrorMessage } from "@/shared/api";

export const RootErrorBoundary = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <Container className="py-5">
        <Stack gap={3} className="mx-auto text-center max-w-lg">
          <ErrorState
            title="Página não encontrada"
            message="A página que você procura não existe."
          />
          <Link to="/">
            <Button aria-label="Voltar para busca">Voltar</Button>
          </Link>
        </Stack>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="mx-auto max-w-lg">
        <ErrorState
          title="Erro ao carregar dados"
          message={getErrorMessage(error)}
        />
      </div>
    </Container>
  );
};
