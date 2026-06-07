import { screen } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { UserPage } from "./UserPage";
import { useGithubUser } from "../hooks/useGithubUser";
import { useRepositories } from "@/features/repositories";
import { isNotFoundError } from "@/shared/api";
import { renderWithProviders } from "@/test/test-utils";
import type { GitHubUser } from "../types/user";
import type { Repository } from "@/features/repositories";

vi.mock("../hooks/useGithubUser");
vi.mock("../hooks/useUserPageParams", () => ({
  useUserPageParams: () => ({
    page: 1,
    sort: "stars-desc" as const,
    handlePageChange: vi.fn(),
    handleSortChange: vi.fn(),
  }),
}));
vi.mock("@/features/repositories", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/features/repositories")>();
  return {
    ...actual,
    useRepositories: vi.fn(),
  };
});
vi.mock("@/shared/api", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/shared/api")>();
  return {
    ...actual,
    isNotFoundError: vi.fn(),
  };
});

const mockUser: GitHubUser = {
  login: "octocat",
  id: 1,
  avatar_url: "https://github.com/octocat.png",
  html_url: "https://github.com/octocat",
  name: "Octocat",
  bio: "GitHub mascot",
  company: null,
  location: null,
  email: null,
  blog: null,
  public_repos: 2,
  followers: 100,
  following: 10,
};

const mockRepository: Repository = {
  id: 1,
  name: "hello-world",
  full_name: "octocat/hello-world",
  description: "My first repo",
  html_url: "https://github.com/octocat/hello-world",
  language: "TypeScript",
  stargazers_count: 100,
  forks_count: 10,
  open_issues_count: 0,
  watchers_count: 50,
  default_branch: "main",
  private: false,
  created_at: "2020-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
  owner: { login: "octocat" },
};

const renderUserPage = (route: string) => {
  renderWithProviders(
    <Routes>
      <Route path="/user/:username" element={<UserPage />} />
    </Routes>,
    { route },
  );
};

describe("UserPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(isNotFoundError).mockReturnValue(false);
  });

  it("should render loading skeleton initially", () => {
    vi.mocked(useGithubUser).mockReturnValue({
      user: null,
      isLoading: true,
      error: null,
    });
    vi.mocked(useRepositories).mockReturnValue({
      repositories: [],
      totalCount: 0,
      isLoading: true,
      isFetching: false,
      error: null,
    });

    renderUserPage("/user/octocat");

    expect(screen.getAllByLabelText("Carregando...").length).toBeGreaterThan(0);
  });

  it("should render user profile and repositories on success", () => {
    vi.mocked(useGithubUser).mockReturnValue({
      user: mockUser,
      isLoading: false,
      error: null,
    });
    vi.mocked(useRepositories).mockReturnValue({
      repositories: [mockRepository],
      totalCount: 1,
      isLoading: false,
      isFetching: false,
      error: null,
    });

    renderUserPage("/user/octocat");

    expect(screen.getByText("Octocat")).toBeInTheDocument();
    expect(screen.getByText("Repositórios (1)")).toBeInTheDocument();
    expect(screen.getByText("hello-world")).toBeInTheDocument();
  });

  it("should render not found when user returns 404", () => {
    vi.mocked(isNotFoundError).mockReturnValue(true);
    vi.mocked(useGithubUser).mockReturnValue({
      user: null,
      isLoading: false,
      error: new Error("Not Found"),
    });
    vi.mocked(useRepositories).mockReturnValue({
      repositories: [],
      totalCount: 0,
      isLoading: false,
      isFetching: false,
      error: null,
    });

    renderUserPage("/user/missing");

    expect(screen.getByText("Usuário não encontrado")).toBeInTheDocument();
    expect(screen.getByText(/"missing"/)).toBeInTheDocument();
  });

  it("should render repository error without hiding profile", () => {
    vi.mocked(useGithubUser).mockReturnValue({
      user: mockUser,
      isLoading: false,
      error: null,
    });
    vi.mocked(useRepositories).mockReturnValue({
      repositories: [],
      totalCount: 0,
      isLoading: false,
      isFetching: false,
      error: new Error("Search API rate limit"),
    });

    renderUserPage("/user/octocat");

    expect(screen.getByText("Octocat")).toBeInTheDocument();
    expect(screen.getByText("Erro ao carregar repositórios")).toBeInTheDocument();
  });

  it("should render error state when user is missing after load", () => {
    vi.mocked(useGithubUser).mockReturnValue({
      user: null,
      isLoading: false,
      error: null,
    });
    vi.mocked(useRepositories).mockReturnValue({
      repositories: [],
      totalCount: 0,
      isLoading: false,
      isFetching: false,
      error: null,
    });

    renderUserPage("/user/octocat");

    expect(
      screen.getByText("Não foi possível carregar o perfil do usuário."),
    ).toBeInTheDocument();
  });
});
