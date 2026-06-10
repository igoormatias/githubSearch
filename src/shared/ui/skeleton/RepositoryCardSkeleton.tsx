import { Card } from "react-bootstrap";
import { Skeleton } from "./Skeleton";

export const RepositoryCardSkeleton = () => {
  return (
    <Card className="border">
      <Card.Body>
        <Skeleton className="sk-repo-card-title mb-3" />
        <Skeleton className="sk-repo-card-line mb-2" />
        <Skeleton className="sk-repo-card-line-short mb-3" />
        <div className="d-flex gap-3 pt-2">
          <Skeleton className="sk-repo-card-meta" />
          <Skeleton className="sk-repo-card-meta-sm" />
          <Skeleton className="sk-repo-card-meta-sm" />
        </div>
      </Card.Body>
    </Card>
  );
};
