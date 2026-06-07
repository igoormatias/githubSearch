import { beforeEach, describe, expect, it, vi } from "vitest";
import { apiClient } from "@/shared/api";
import { searchUserRepositories } from "./repository-service";

vi.mock("@/shared/api", () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

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
