import type { RepositorySortOption } from "../types/repository";

export const mapSortToSearchOrder = (
  sort: RepositorySortOption,
): "desc" | "asc" => {
  return sort === "stars-desc" ? "desc" : "asc";
};
