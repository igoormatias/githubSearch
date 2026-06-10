import { FiAlertCircle, FiEye, FiGitBranch, FiStar } from "react-icons/fi";
import { Card, Col, Row } from "react-bootstrap";
import type { RepositoryDetail } from "../../types/repository";
import { formatNumber } from "@/shared/lib";

type RepositoryStatsProps = {
  repository: RepositoryDetail;
};

type StatItem = {
  label: string;
  value: string;
  icon: typeof FiStar;
};

export const RepositoryStats = ({ repository }: RepositoryStatsProps) => {
  const stats: StatItem[] = [
    {
      label: "Stars",
      value: formatNumber(repository.stargazers_count),
      icon: FiStar,
    },
    {
      label: "Forks",
      value: formatNumber(repository.forks_count),
      icon: FiGitBranch,
    },
    {
      label: "Issues",
      value: formatNumber(repository.open_issues_count),
      icon: FiAlertCircle,
    },
    {
      label: "Watchers",
      value: formatNumber(repository.watchers_count),
      icon: FiEye,
    },
  ];

  return (
    <Row className="g-2">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Col key={stat.label} xs={6} lg={3} className="d-flex">
            <Card className="border flex-fill card-interactive">
              <Card.Body className="stat-card-body d-flex flex-column justify-content-between p-3">
                <div className="d-flex align-items-center gap-2 text-secondary small fw-medium mb-1">
                  <Icon className="flex-shrink-0" aria-hidden="true" />
                  <span>{stat.label}</span>
                </div>
                <p className="fs-4 fw-bold mb-0">{stat.value}</p>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};
