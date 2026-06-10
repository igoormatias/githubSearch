import { screen } from "@testing-library/react";
import { UserProfile } from "./UserProfile";
import type { GitHubUser } from "../types/user";
import { renderWithRouter } from "@/test/test-utils";

const baseUser: GitHubUser = {
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

describe("UserProfile", () => {
  it("should show email fallback when email is not public", () => {
    renderWithRouter(<UserProfile user={baseUser} />);

    expect(screen.getByText("Email não público")).toBeVisible();
  });

  it("should show public email as mailto link", () => {
    renderWithRouter(
      <UserProfile user={{ ...baseUser, email: "octocat@github.com" }} />,
    );

    const emailLink = screen.getByRole("link", { name: "octocat@github.com" });
    expect(emailLink).toHaveAttribute("href", "mailto:octocat@github.com");
  });
});
