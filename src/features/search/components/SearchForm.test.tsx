import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { describe, expect, it, vi } from "vitest";
import { SearchForm } from "./SearchForm";
import {
  SEARCH_MESSAGES,
  searchSchema,
  type SearchFormValues,
} from "../schemas/search.schema";

const SearchFormHarness = ({
  onSubmit = vi.fn(),
  defaultValues = { username: "" },
}: {
  onSubmit?: (values: SearchFormValues) => void | Promise<void>;
  defaultValues?: SearchFormValues;
}) => {
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  return <SearchForm form={form} onSubmit={onSubmit} />;
};

describe("SearchForm", () => {
  it("should enable submit button when form is idle", () => {
    render(<SearchFormHarness />);

    expect(
      screen.getByRole("button", { name: "Buscar usuário no GitHub" }),
    ).toBeEnabled();
  });

  it("should update username on input", async () => {
    const user = userEvent.setup();
    render(<SearchFormHarness />);

    await user.type(screen.getByLabelText("Username do GitHub"), "torvalds");

    expect(screen.getByLabelText("Username do GitHub")).toHaveValue("torvalds");
  });

  it("should call onSubmit with valid username", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<SearchFormHarness onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText("Username do GitHub"), "torvalds");
    await user.click(screen.getByRole("button", { name: "Buscar usuário no GitHub" }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        { username: "torvalds" },
        expect.anything(),
      );
    });
  });

  it("should display validation error for invalid username", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<SearchFormHarness onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText("Username do GitHub"), "<>");
    await user.click(screen.getByRole("button", { name: "Buscar usuário no GitHub" }));

    expect(await screen.findByText(SEARCH_MESSAGES.invalidFormat)).toBeVisible();
    expect(screen.getByLabelText("Username do GitHub")).toHaveClass("is-invalid");
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should display required message for empty submit", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<SearchFormHarness onSubmit={onSubmit} />);

    await user.click(screen.getByRole("button", { name: "Buscar usuário no GitHub" }));

    expect(await screen.findByText(SEARCH_MESSAGES.required)).toBeVisible();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should reserve feedback area in the DOM", () => {
    render(<SearchFormHarness />);

    expect(document.getElementById("username-error")).toBeInTheDocument();
    expect(document.getElementById("username-error")).toHaveClass(
      "search-field-feedback",
    );
  });

  it("should link input to feedback via aria-describedby", () => {
    render(<SearchFormHarness />);

    expect(screen.getByLabelText("Username do GitHub")).toHaveAttribute(
      "aria-describedby",
      "username-error",
    );
  });
});
