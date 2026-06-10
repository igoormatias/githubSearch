import { Col, Row, Stack } from "react-bootstrap";
import { Skeleton } from "./Skeleton";

export const RepositoryPageSkeleton = () => {
  return (
    <Stack
      gap={3}
      className="mx-auto w-100 min-w-0 max-w-detail"
      aria-busy="true"
      aria-label="Carregando..."
    >
      <Skeleton className="sk-repo-title" />
      <Skeleton className="sk-repo-header" />
      <Row className="g-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Col xs={6} lg={3} key={index}>
            <Skeleton className="sk-stat-card" />
          </Col>
        ))}
      </Row>
      <Skeleton className="sk-repo-body" />
    </Stack>
  );
};
