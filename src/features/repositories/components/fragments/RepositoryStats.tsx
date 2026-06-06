import { FiAlertCircle, FiEye, FiGitBranch, FiStar } from "react-icons/fi";
import type { RepositoryDetail } from "../../types/repository";
import { formatNumber } from "@/shared/lib";
import { Card } from "@/shared/ui";

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
      label: "Open Issues",
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
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card key={stat.label} className="space-y-2 hover:bg-surface-hover">
            <div className="flex items-center gap-2 text-foreground-muted">
              <Icon aria-hidden="true" />
              <span className="text-xs uppercase tracking-wide">{stat.label}</span>
            </div>
            <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
          </Card>
        );
      })}
    </div>
  );
};
