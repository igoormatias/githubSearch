import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { UserAvatar } from "./UserAvatar";
import { renderWithRouter } from "@/test/test-utils";

describe("UserAvatar", () => {
  it("should show skeleton until image loads", () => {
    const { container } = renderWithRouter(
      <UserAvatar
        src="https://github.com/octocat.png"
        alt="Avatar de octocat"
        login="octocat"
      />,
    );

    expect(screen.getByAltText("Avatar de octocat")).toBeInTheDocument();
    expect(container.querySelector(".sk-avatar")).toBeInTheDocument();
  });

  it("should hide skeleton after image loads", () => {
    const { container } = renderWithRouter(
      <UserAvatar
        src="https://github.com/octocat.png"
        alt="Avatar de octocat"
        login="octocat"
      />,
    );

    const image = screen.getByAltText("Avatar de octocat");
    fireEvent.load(image);

    expect(container.querySelector(".sk-avatar")).not.toBeInTheDocument();
    expect(image).toBeVisible();
  });

  it("should show initials fallback when image fails to load", () => {
    renderWithRouter(
      <UserAvatar
        src="https://github.com/invalid.png"
        alt="Avatar de octocat"
        login="octocat"
      />,
    );

    fireEvent.error(screen.getByAltText("Avatar de octocat"));

    expect(screen.getByText("OC")).toBeVisible();
    expect(
      screen.getByRole("img", { name: "Avatar de octocat" }),
    ).toHaveAttribute("aria-label", "Avatar de octocat");
  });
});
