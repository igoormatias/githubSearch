import { waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderHookWithProviders } from "@/test/test-utils";
import { useRepositories } from "./useRepositories";
import { searchUserRepositories } from "../services/repository-service";
import type { Repository } from "../types/repository";

vi.mock("../services/repository-service", () => ({
  searchUserRepositories: vi.fn(),
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
];

describe("useRepositories", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return loading then success with totalCount", async () => {
    vi.mocked(searchUserRepositories).mockResolvedValue({
      total_count: 1,
      items: mockRepositories,
    });

    const { result } = renderHookWithProviders(() =>
      useRepositories("octocat", 1, "stars-desc"),
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.repositories).toEqual([]);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.repositories).toEqual(mockRepositories);
    expect(result.current.totalCount).toBe(1);
    expect(result.current.error).toBeNull();
    expect(searchUserRepositories).toHaveBeenCalledWith(
      "octocat",
      1,
      "stars-desc",
    );
  });

  it("should return error on failure", async () => {
    const error = new Error("API error");
    vi.mocked(searchUserRepositories).mockRejectedValue(error);

    const { result } = renderHookWithProviders(() =>
      useRepositories("octocat", 1, "stars-desc"),
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.repositories).toEqual([]);
    expect(result.current.totalCount).toBe(0);
    expect(result.current.error).toBe(error);
  });

  it("should not fetch when username is undefined", async () => {
    const { result } = renderHookWithProviders(() =>
      useRepositories(undefined, 1, "stars-desc"),
    );

    expect(result.current.isLoading).toBe(false);
    expect(result.current.repositories).toEqual([]);
    expect(searchUserRepositories).not.toHaveBeenCalled();
  });
});
