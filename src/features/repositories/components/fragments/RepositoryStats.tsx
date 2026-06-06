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
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.label}
            className="flex h-full min-h-[88px] flex-col justify-between p-4 hover:bg-surface-hover sm:p-5"
          >
            <div className="flex items-center gap-2 text-foreground-muted">
              <Icon className="shrink-0" aria-hidden="true" />
              <span className="text-sm font-medium">{stat.label}</span>
            </div>
            <p className="text-xl font-semibold text-foreground sm:text-2xl">
              {stat.value}
            </p>
          </Card>
        );
      })}
    </div>
  );
};
