import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RepositoryPagination } from "./RepositoryPagination";

describe("RepositoryPagination", () => {
  it("should render page information", () => {
    render(
      <RepositoryPagination
        currentPage={2}
        totalPages={5}
        onPageChange={vi.fn()}
      />,
    );

    expect(screen.getByText("Página 2 de 5")).toBeInTheDocument();
  });

  it("should not render when totalPages is 1", () => {
    const { container } = render(
      <RepositoryPagination
        currentPage={1}
        totalPages={1}
        onPageChange={vi.fn()}
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("should disable first and previous buttons on page 1", () => {
    render(
      <RepositoryPagination
        currentPage={1}
        totalPages={3}
        onPageChange={vi.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: "Primeira página" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Página anterior" })).toBeDisabled();
  });

  it("should disable next and last buttons on last page", () => {
    render(
      <RepositoryPagination
        currentPage={3}
        totalPages={3}
        onPageChange={vi.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: "Próxima página" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Última página" })).toBeDisabled();
  });

  it("should call onPageChange when next page is clicked", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <RepositoryPagination
        currentPage={2}
        totalPages={5}
        onPageChange={onPageChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Próxima página" }));

    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("should disable all buttons when fetching", () => {
    render(
      <RepositoryPagination
        currentPage={2}
        totalPages={5}
        onPageChange={vi.fn()}
        isFetching
      />,
    );

    expect(screen.getByRole("button", { name: "Primeira página" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Próxima página" })).toBeDisabled();
  });
});
