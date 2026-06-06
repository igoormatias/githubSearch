import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useRepositories } from "./useRepositories";
import { getUserRepositories } from "../services/repository-service";
import type { Repository } from "../types/repository";

vi.mock("../services/repository-service", () => ({
  getUserRepositories: vi.fn(),
}));

const mockRepositories: Repository[] = [
  {
    id: 1,
    name: "repo-a",
    full_name: "octocat/repo-a",
    description: "First repo",
    html_url: "https://github.com/octocat/repo-a",
    language: "TypeScript",
    stargazers_count: 100,
    forks_count: 10,
    open_issues_count: 2,
    watchers_count: 50,
    default_branch: "main",
    private: false,
    created_at: "2020-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    owner: { login: "octocat" },
  },
  {
    id: 2,
    name: "repo-b",
    full_name: "octocat/repo-b",
    description: null,
    html_url: "https://github.com/octocat/repo-b",
    language: null,
    stargazers_count: 50,
    forks_count: 5,
    open_issues_count: 0,
    watchers_count: 25,
    default_branch: "main",
    private: false,
    created_at: "2021-01-01T00:00:00Z",
    updated_at: "2024-06-01T00:00:00Z",
    owner: { login: "octocat" },
  },
];

describe("useRepositories", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return loading then success", async () => {
    vi.mocked(getUserRepositories).mockResolvedValue(mockRepositories);

    const { result } = renderHook(() => useRepositories("octocat"));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.repositories).toEqual([]);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.repositories).toEqual(mockRepositories);
    expect(result.current.error).toBeNull();
    expect(getUserRepositories).toHaveBeenCalledWith("octocat");
  });

  it("should return error on failure", async () => {
    const error = new Error("API error");
    vi.mocked(getUserRepositories).mockRejectedValue(error);

    const { result } = renderHook(() => useRepositories("octocat"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.repositories).toEqual([]);
    expect(result.current.error).toBe(error);
  });

  it("should reset when username is undefined", async () => {
    vi.mocked(getUserRepositories).mockResolvedValue(mockRepositories);

    const initialProps: { username?: string } = { username: "octocat" };

    const { result, rerender } = renderHook(
      ({ username }: { username?: string }) => useRepositories(username),
      { initialProps },
    );

    await waitFor(() => {
      expect(result.current.repositories).toHaveLength(2);
    });

    rerender({ username: undefined });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.repositories).toEqual([]);
    expect(result.current.error).toBeNull();
  });
});
