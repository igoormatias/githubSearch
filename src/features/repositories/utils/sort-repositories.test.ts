import { sortRepositories } from "./sort-repositories";
import type { Repository } from "../types/repository";

const createRepository = (
  overrides: Partial<Repository> & Pick<Repository, "id" | "name" | "stargazers_count">,
): Repository => ({
  full_name: `owner/${overrides.name}`,
  description: null,
  html_url: `https://github.com/owner/${overrides.name}`,
  language: null,
  forks_count: 0,
  open_issues_count: 0,
  watchers_count: 0,
  default_branch: "main",
  private: false,
  created_at: "2020-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
  owner: { login: "owner" },
  ...overrides,
});

const repositories = [
  createRepository({ id: 1, name: "zebra", stargazers_count: 10 }),
  createRepository({ id: 2, name: "alpha", stargazers_count: 100 }),
  createRepository({ id: 3, name: "beta", stargazers_count: 50 }),
];

describe("sortRepositories", () => {
  it("should sort by stars descending", () => {
    const sorted = sortRepositories(repositories, "stars-desc");
    expect(sorted.map((repo) => repo.name)).toEqual(["alpha", "beta", "zebra"]);
  });

  it("should sort by stars ascending", () => {
    const sorted = sortRepositories(repositories, "stars-asc");
    expect(sorted.map((repo) => repo.name)).toEqual(["zebra", "beta", "alpha"]);
  });

  it("should sort by name ascending", () => {
    const sorted = sortRepositories(repositories, "name-asc");
    expect(sorted.map((repo) => repo.name)).toEqual(["alpha", "beta", "zebra"]);
  });

  it("should sort by name descending", () => {
    const sorted = sortRepositories(repositories, "name-desc");
    expect(sorted.map((repo) => repo.name)).toEqual(["zebra", "beta", "alpha"]);
  });

  it("should not mutate the original array", () => {
    const original = [...repositories];
    sortRepositories(repositories, "stars-desc");
    expect(repositories).toEqual(original);
  });

  it("should return original order for unknown sort option", () => {
    const sorted = sortRepositories(
      repositories,
      "invalid" as Parameters<typeof sortRepositories>[1],
    );
    expect(sorted.map((repo) => repo.name)).toEqual(["zebra", "alpha", "beta"]);
  });
});
