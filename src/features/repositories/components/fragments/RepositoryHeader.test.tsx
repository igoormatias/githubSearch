import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RepositoryHeader } from "./RepositoryHeader";
import type { RepositoryDetail } from "../../types/repository";
import { renderWithRouter } from "@/test/test-utils";

const baseRepository: RepositoryDetail = {
  id: 1,
  name: "hello-world",
  full_name: "octocat/hello-world",
  description: "My first repository",
  html_url: "https://github.com/octocat/hello-world",
  language: "TypeScript",
  stargazers_count: 1500,
  forks_count: 200,
  open_issues_count: 5,
  watchers_count: 800,
  default_branch: "main",
  private: false,
  created_at: "2020-01-01T00:00:00Z",
  updated_at: "2024-06-01T00:00:00Z",
  owner: { login: "octocat" },
};

describe("RepositoryHeader", () => {
  it("should render repository name, description and public badge", () => {
    renderWithRouter(<RepositoryHeader repository={baseRepository} />);

    expect(screen.getByRole("heading", { name: "octocat/hello-world" })).toBeVisible();
    expect(screen.getByText("My first repository")).toBeVisible();
    expect(screen.getByText("Público")).toBeVisible();
  });

  it("should hide public badge for private repositories", () => {
    renderWithRouter(
      <RepositoryHeader repository={{ ...baseRepository, private: true }} />,
    );

    expect(screen.queryByText("Público")).not.toBeInTheDocument();
  });

  it("should show fallback when description is empty", () => {
    renderWithRouter(
      <RepositoryHeader repository={{ ...baseRepository, description: "  " }} />,
    );

    expect(screen.getByText("Sem descrição disponível.")).toBeVisible();
  });

  it("should link back to user repositories", () => {
    renderWithRouter(<RepositoryHeader repository={baseRepository} />);

    expect(
      screen.getByRole("link", { name: "Voltar para repositórios" }),
    ).toHaveAttribute("href", "/user/octocat");
  });

  it("should render external GitHub button", () => {
    renderWithRouter(<RepositoryHeader repository={baseRepository} />);

    const githubButton = screen.getByRole("button", {
      name: "Abrir repositório no GitHub",
    });

    expect(githubButton).toHaveAttribute(
      "href",
      "https://github.com/octocat/hello-world",
    );
    expect(githubButton).toHaveAttribute("target", "_blank");
    expect(githubButton).toHaveAttribute("rel", "noopener noreferrer");
  });
});
