import { FiInbox } from "react-icons/fi";
import { Card } from "react-bootstrap";

type EmptyStateProps = {
  title: string;
  message: string;
};

export const EmptyState = ({ title, message }: EmptyStateProps) => {
  return (
    <Card className="border text-center">
      <Card.Body className="p-4 p-md-5 d-flex flex-column align-items-center gap-3">
        <FiInbox className="text-secondary" size={40} aria-hidden="true" />
        <div>
          <h2 className="h5 fw-semibold mb-2">{title}</h2>
          <p className="small text-secondary mb-0">{message}</p>
        </div>
      </Card.Body>
    </Card>
  );
};
