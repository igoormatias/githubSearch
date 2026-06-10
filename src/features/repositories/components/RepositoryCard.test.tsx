import { screen } from "@testing-library/react";
import { RepositoryCard } from "./RepositoryCard";
import type { Repository } from "../types/repository";
import { renderWithRouter } from "@/test/test-utils";

const mockRepository: Repository = {
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

describe("RepositoryCard", () => {
  it("should render repository data", () => {
    renderWithRouter(<RepositoryCard repository={mockRepository} />);

    expect(screen.getByText("hello-world")).toBeVisible();
    expect(screen.getByText("My first repository")).toBeVisible();
    expect(screen.getByText("TypeScript")).toBeVisible();
    expect(screen.getByText("1.500 estrelas")).toBeVisible();
    expect(screen.getByText("200 forks")).toBeVisible();
    expect(screen.getByText(/Atualizado em/)).toBeVisible();
  });

  it("should link to repository detail page", () => {
    renderWithRouter(<RepositoryCard repository={mockRepository} />);

    const links = screen.getAllByRole("link", { name: /hello-world|Ver detalhes/ });
    links.forEach((link) => {
      expect(link).toHaveAttribute("href", "/repository/octocat/hello-world");
    });
  });
});
