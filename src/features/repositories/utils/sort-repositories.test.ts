import { describe, expect, it } from "vitest";
import type { Repository } from "../types/repository";
import { sortRepositories } from "./sort-repositories";

const createRepo = (id: number, stars: number): Repository => ({
  id,
  name: `repo-${id}`,
  full_name: `user/repo-${id}`,
  description: null,
  html_url: `https://github.com/user/repo-${id}`,
  language: null,
  stargazers_count: stars,
  forks_count: 0,
  open_issues_count: 0,
  watchers_count: 0,
  default_branch: "main",
  private: false,
  created_at: "2020-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
  owner: { login: "user" },
});

describe("sortRepositories", () => {
  it("should sort by stars descending", () => {
    const repos = [createRepo(1, 10), createRepo(2, 50), createRepo(3, 25)];

    const result = sortRepositories(repos, "stars-desc");

    expect(result.map((repo) => repo.stargazers_count)).toEqual([50, 25, 10]);
  });

  it("should sort by stars ascending", () => {
    const repos = [createRepo(1, 10), createRepo(2, 50), createRepo(3, 25)];

    const result = sortRepositories(repos, "stars-asc");

    expect(result.map((repo) => repo.stargazers_count)).toEqual([10, 25, 50]);
  });

  it("should not mutate the original array", () => {
    const repos = [createRepo(1, 10), createRepo(2, 50)];

    sortRepositories(repos, "stars-desc");

    expect(repos[0].stargazers_count).toBe(10);
  });
});
