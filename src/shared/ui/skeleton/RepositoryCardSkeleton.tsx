import { Card } from "react-bootstrap";
import { Skeleton } from "./Skeleton";

export const RepositoryCardSkeleton = () => {
  return (
    <Card className="border">
      <Card.Body>
        <Skeleton className="mb-3" style={{ height: "1.25rem", width: "40%" }} />
        <Skeleton className="mb-2" style={{ height: "1rem", width: "100%" }} />
        <Skeleton className="mb-3" style={{ height: "1rem", width: "80%" }} />
        <div className="d-flex gap-3 pt-2">
          <Skeleton style={{ height: "1rem", width: "4rem" }} />
          <Skeleton style={{ height: "1rem", width: "3rem" }} />
          <Skeleton style={{ height: "1rem", width: "3rem" }} />
        </div>
      </Card.Body>
    </Card>
  );
};
