import { FiAlertCircle } from "react-icons/fi";
import { Card } from "react-bootstrap";
import { Button } from "./Button";

type ErrorStateProps = {
  title?: string;
  message: string;
  onRetry?: () => void;
};

export const ErrorState = ({
  title = "Erro ao carregar dados",
  message,
  onRetry,
}: ErrorStateProps) => {
  return (
    <Card className="border text-center" role="alert">
      <Card.Body className="p-4 p-md-5 d-flex flex-column align-items-center gap-3">
        <FiAlertCircle className="text-danger" size={40} aria-hidden="true" />
        <div>
          <h2 className="h5 fw-semibold mb-2">{title}</h2>
          <p className="small text-secondary mb-0">{message}</p>
        </div>
        {onRetry && (
          <Button onClick={onRetry} aria-label="Tentar novamente">
            Tentar novamente
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};
