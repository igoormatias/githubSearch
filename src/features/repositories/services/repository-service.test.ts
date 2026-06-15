import { AxiosError } from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { apiClient } from "@/shared/api";
import {
  getUserRepositories,
  getUserRepositoriesPage,
  searchUserRepositories,
} from "./repository-service";

vi.mock("@/shared/api", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/shared/api")>();
  return {
    ...actual,
    apiClient: {
      get: vi.fn(),
    },
  };
});

const createRepo = (id: number) => ({
  id,
  name: `repo-${id}`,
  full_name: `user/repo-${id}`,
  description: null,
  html_url: `https://github.com/user/repo-${id}`,
  language: null,
  stargazers_count: id * 10,
  forks_count: 0,
  open_issues_count: 0,
  watchers_count: 0,
  default_branch: "main",
  private: false,
  created_at: "2020-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
  owner: { login: "user" },
});

describe("searchUserRepositories", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call search API with stars descending on page 1", async () => {
    const mockResponse = {
      total_count: 25,
      items: [{ id: 1, name: "repo-a" }],
    };

    vi.mocked(apiClient.get).mockResolvedValue({ data: mockResponse });

    const result = await searchUserRepositories("vercel", 1, "stars-desc");

    expect(apiClient.get).toHaveBeenCalledWith("/search/repositories", {
      params: {
        q: "user:vercel",
        sort: "stars",
        order: "desc",
        per_page: 10,
        page: 1,
      },
    });
    expect(result).toEqual(mockResponse);
  });

  it("should call search API with stars ascending on page 2", async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      data: { total_count: 25, items: [] },
    });

    await searchUserRepositories("vercel", 2, "stars-asc");

    expect(apiClient.get).toHaveBeenCalledWith("/search/repositories", {
      params: {
        q: "user:vercel",
        sort: "stars",
        order: "asc",
        per_page: 10,
        page: 2,
      },
    });
  });
});

describe("getUserRepositories", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch all pages from users repos endpoint", async () => {
    const page1 = Array.from({ length: 100 }, (_, index) => createRepo(index + 1));
    const page2 = [createRepo(101), createRepo(102)];

    vi.mocked(apiClient.get)
      .mockResolvedValueOnce({ data: page1 })
      .mockResolvedValueOnce({ data: page2 });

    const result = await getUserRepositories("vercel");

    expect(apiClient.get).toHaveBeenCalledTimes(2);
    expect(apiClient.get).toHaveBeenNthCalledWith(1, "/users/vercel/repos", {
      params: { per_page: 100, page: 1 },
    });
    expect(apiClient.get).toHaveBeenNthCalledWith(2, "/users/vercel/repos", {
      params: { per_page: 100, page: 2 },
    });
    expect(result).toHaveLength(102);
  });
});

describe("getUserRepositoriesPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return search API result on success", async () => {
    const mockResponse = {
      total_count: 1,
      items: [createRepo(1)],
    };

    vi.mocked(apiClient.get).mockResolvedValue({ data: mockResponse });

    const result = await getUserRepositoriesPage("vercel", 1, "stars-desc");

    expect(result).toEqual(mockResponse);
    expect(apiClient.get).toHaveBeenCalledTimes(1);
  });

  it("should fallback to users repos endpoint on 403", async () => {
    const rateLimitError = new AxiosError("Forbidden");
    rateLimitError.response = { status: 403 } as AxiosError["response"];

    const repos = [createRepo(3), createRepo(1), createRepo(2)];

    vi.mocked(apiClient.get)
      .mockRejectedValueOnce(rateLimitError)
      .mockResolvedValueOnce({ data: repos });

    const result = await getUserRepositoriesPage("vercel", 1, "stars-desc");

    expect(apiClient.get).toHaveBeenCalledTimes(2);
    expect(apiClient.get).toHaveBeenNthCalledWith(2, "/users/vercel/repos", {
      params: { per_page: 100, page: 1 },
    });
    expect(result.total_count).toBe(3);
    expect(result.items.map((repo) => repo.id)).toEqual([3, 2, 1]);
  });

  it("should rethrow non-403 errors", async () => {
    const serverError = new Error("API error");

    vi.mocked(apiClient.get).mockRejectedValue(serverError);

    await expect(
      getUserRepositoriesPage("vercel", 1, "stars-desc"),
    ).rejects.toThrow("API error");
  });
});
