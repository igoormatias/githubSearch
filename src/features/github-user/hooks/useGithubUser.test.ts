import { waitFor } from "@testing-library/react";
import { AxiosError } from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderHookWithProviders } from "@/test/test-utils";
import { useGithubUser } from "./useGithubUser";
import { getUser } from "../services/user-service";
import type { GitHubUser } from "../types/user";

vi.mock("../services/user-service", () => ({
  getUser: vi.fn(),
}));

const mockUser: GitHubUser = {
  login: "octocat",
  id: 1,
  avatar_url: "https://github.com/octocat.png",
  html_url: "https://github.com/octocat",
  name: "Octocat",
  bio: "GitHub mascot",
  company: "GitHub",
  location: "San Francisco",
  email: null,
  blog: null,
  public_repos: 8,
  followers: 100,
  following: 10,
};

describe("useGithubUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return loading then success", async () => {
    vi.mocked(getUser).mockResolvedValue(mockUser);

    const { result } = renderHookWithProviders(() => useGithubUser("octocat"));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.user).toBeNull();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.error).toBeNull();
    expect(getUser).toHaveBeenCalledWith("octocat");
  });

  it("should return error on failure", async () => {
    const error = new Error("Network error");
    vi.mocked(getUser).mockRejectedValue(error);

    const { result } = renderHookWithProviders(() => useGithubUser("octocat"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.user).toBeNull();
    expect(result.current.error).toBe(error);
  });

  it("should return axios 404 error", async () => {
    const error = new AxiosError("Not Found");
    error.response = {
      status: 404,
      data: {},
      headers: {},
      statusText: "Not Found",
      config: {} as never,
    };

    vi.mocked(getUser).mockRejectedValue(error);

    const { result } = renderHookWithProviders(() => useGithubUser("missing"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.user).toBeNull();
    expect(result.current.error).toBe(error);
  });

  it("should not fetch when username is undefined", async () => {
    const { result } = renderHookWithProviders(() => useGithubUser(undefined));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.user).toBeNull();
    expect(getUser).not.toHaveBeenCalled();
  });
});
