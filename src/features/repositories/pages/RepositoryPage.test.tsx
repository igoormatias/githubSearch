import { render, screen } from "@testing-library/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { createTestQueryClient } from "@/app/providers/query-client";
import { RepositoryPage } from "./RepositoryPage";
import type { RepositoryDetail } from "../types/repository";

const mockRepository: RepositoryDetail = {
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

const renderRepositoryPage = () => {
  const router = createMemoryRouter(
    [
      {
        path: "/repository/:owner/:repo",
        element: <RepositoryPage />,
        loader: () => mockRepository,
      },
    ],
    { initialEntries: ["/repository/octocat/hello-world"] },
  );

  return render(
    <QueryClientProvider client={createTestQueryClient()}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
};

describe("RepositoryPage", () => {
  it("should render repository details from loader", async () => {
    renderRepositoryPage();

    expect(await screen.findByText("octocat/hello-world")).toBeVisible();
    expect(screen.getByText("My first repository")).toBeVisible();
    expect(screen.getByText("Estrelas")).toBeVisible();
    expect(screen.getByText("Linguagem principal")).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Abrir repositório no GitHub" }),
    ).toHaveAttribute("href", "https://github.com/octocat/hello-world");
  });
});
