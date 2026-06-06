import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Container } from "@/app/layouts";
import { Button, ErrorState } from "@/shared/ui";
import { getErrorMessage } from "@/shared/api";

export const RootErrorBoundary = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <Container className="py-12">
        <div className="mx-auto max-w-lg space-y-4 text-center">
          <ErrorState
            title="Página não encontrada"
            message="A página que você procura não existe."
          />
          <Link to="/">
            <Button aria-label="Voltar para busca">Voltar</Button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <div className="mx-auto max-w-lg">
        <ErrorState
          title="Erro ao carregar dados"
          message={getErrorMessage(error)}
        />
      </div>
    </Container>
  );
};
