import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "@/test/test-utils";
import { RepositoryList } from "./RepositoryList";
import type { Repository } from "../types/repository";

const createRepository = (
  overrides: Partial<Repository> & Pick<Repository, "id" | "name">,
): Repository => ({
  full_name: `owner/${overrides.name}`,
  description: "Description",
  html_url: `https://github.com/owner/${overrides.name}`,
  language: "TypeScript",
  stargazers_count: 100,
  forks_count: 10,
  open_issues_count: 0,
  watchers_count: 50,
  default_branch: "main",
  private: false,
  created_at: "2020-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
  owner: { login: "owner" },
  ...overrides,
});

describe("RepositoryList", () => {
  it("should render total count and repositories", () => {
    const repositories = [
      createRepository({ id: 1, name: "repo-a" }),
      createRepository({ id: 2, name: "repo-b" }),
    ];

    renderWithProviders(
      <RepositoryList
        repositories={repositories}
        totalCount={25}
        page={1}
        sort="stars-desc"
        onSortChange={vi.fn()}
        onPageChange={vi.fn()}
      />,
    );

    expect(screen.getByText("Repositórios (25)")).toBeInTheDocument();
    expect(screen.getByText("repo-a")).toBeInTheDocument();
    expect(screen.getByText("repo-b")).toBeInTheDocument();
    expect(screen.getByText("Página 1 de 3")).toBeInTheDocument();
  });

  it("should render empty state when totalCount is 0", () => {
    renderWithProviders(
      <RepositoryList
        repositories={[]}
        totalCount={0}
        page={1}
        sort="stars-desc"
        onSortChange={vi.fn()}
        onPageChange={vi.fn()}
      />,
    );

    expect(screen.getByText("Nenhum repositório encontrado")).toBeInTheDocument();
  });
});
