import { Col, Row } from "react-bootstrap";
import { Skeleton } from "./Skeleton";

export const UserProfileSkeleton = () => {
  return (
    <aside
      className="user-sidebar user-sidebar-skeleton text-center text-lg-start"
      aria-busy="true"
      aria-label="Carregando..."
    >
      <Skeleton className="sk-avatar mb-3 mx-auto mx-lg-0" />
      <Skeleton className="sk-name mb-3 mx-auto mx-lg-0" />
      <Skeleton className="sk-bio mb-3" />
      <Row className="user-profile-stats g-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <Col xs={4} key={index} className="min-w-0">
            <Skeleton className="sk-stat" />
          </Col>
        ))}
      </Row>
    </aside>
  );
};
