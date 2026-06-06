import { FiChevronDown } from "react-icons/fi";
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
    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
      <label
        htmlFor="repository-sort"
        className="cursor-pointer text-sm font-medium text-foreground"
      >
        Ordenar por
      </label>
      <div className="relative w-full cursor-pointer sm:w-auto">
        <select
          id="repository-sort"
          value={value}
          onChange={(event) =>
            onChange(event.target.value as RepositorySortOption)
          }
          className="min-h-[44px] w-full cursor-pointer appearance-none rounded-xl border border-border bg-surface py-2.5 pl-4 pr-10 text-base text-foreground transition-colors duration-200 hover:cursor-pointer hover:bg-surface-hover focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:min-w-[220px]"
          aria-label="Ordenar repositórios"
        >
          {Object.entries(repositorySortLabels).map(([option, label]) => (
            <option key={option} value={option} className="cursor-pointer">
              {label}
            </option>
          ))}
        </select>
        <FiChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};
