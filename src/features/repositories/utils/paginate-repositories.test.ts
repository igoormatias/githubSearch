import { describe, expect, it } from "vitest";
import type { Repository } from "../types/repository";
import { paginateRepositories } from "./paginate-repositories";

const createRepo = (id: number): Repository => ({
  id,
  name: `repo-${id}`,
  full_name: `user/repo-${id}`,
  description: null,
  html_url: `https://github.com/user/repo-${id}`,
  language: null,
  stargazers_count: id,
  forks_count: 0,
  open_issues_count: 0,
  watchers_count: 0,
  default_branch: "main",
  private: false,
  created_at: "2020-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
  owner: { login: "user" },
});

describe("paginateRepositories", () => {
  const repos = Array.from({ length: 25 }, (_, index) => createRepo(index + 1));

  it("should return first page with 10 items", () => {
    const result = paginateRepositories(repos, 1);

    expect(result.total_count).toBe(25);
    expect(result.items).toHaveLength(10);
    expect(result.items[0].id).toBe(1);
    expect(result.items[9].id).toBe(10);
  });

  it("should return second page with remaining items", () => {
    const result = paginateRepositories(repos, 2);

    expect(result.total_count).toBe(25);
    expect(result.items).toHaveLength(10);
    expect(result.items[0].id).toBe(11);
  });

  it("should return partial last page", () => {
    const result = paginateRepositories(repos, 3);

    expect(result.total_count).toBe(25);
    expect(result.items).toHaveLength(5);
    expect(result.items[0].id).toBe(21);
  });

  it("should return empty items for page beyond range", () => {
    const result = paginateRepositories(repos, 10);

    expect(result.total_count).toBe(25);
    expect(result.items).toHaveLength(0);
  });

  it("should handle empty repository list", () => {
    const result = paginateRepositories([], 1);

    expect(result.total_count).toBe(0);
    expect(result.items).toHaveLength(0);
  });
});
