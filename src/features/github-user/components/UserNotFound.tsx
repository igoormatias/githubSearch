import { Link } from "react-router-dom";
import { FiUserX } from "react-icons/fi";
import { Card } from "react-bootstrap";
import { Button } from "@/shared/ui";

type UserNotFoundProps = {
  username: string;
};

export const UserNotFound = ({ username }: UserNotFoundProps) => {
  return (
    <Card className="border text-center">
      <Card.Body className="p-4 p-md-5 d-flex flex-column align-items-center gap-3">
        <FiUserX className="text-secondary" size={40} aria-hidden="true" />
        <div>
          <h1 className="h5 fw-semibold mb-2">Usuário não encontrado</h1>
          <p className="small text-secondary mb-0">
            O usuário &quot;{username}&quot; não existe no GitHub.
          </p>
        </div>
        <Link to="/">
          <Button aria-label="Voltar para busca">Voltar</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};
