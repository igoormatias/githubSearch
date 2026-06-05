import type { RepositorySortOption } from "../types/repository";
import { repositorySortLabels } from "../utils/sort-repositories";

type RepositorySortSelectProps = {
  value: RepositorySortOption;
  onChange: (value: RepositorySortOption) => void;
};

export const RepositorySortSelect = ({
  value,
  onChange,
}: RepositorySortSelectProps) => {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <label htmlFor="repository-sort" className="text-sm font-medium text-foreground">
        Sort repositories
      </label>
      <select
        id="repository-sort"
        value={value}
        onChange={(event) =>
          onChange(event.target.value as RepositorySortOption)
        }
        className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground transition-colors duration-200 focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Sort repositories"
      >
        {Object.entries(repositorySortLabels).map(([option, label]) => (
          <option key={option} value={option}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};
