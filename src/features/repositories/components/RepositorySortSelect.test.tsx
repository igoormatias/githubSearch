import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RepositorySortSelect } from "./RepositorySortSelect";

describe("RepositorySortSelect", () => {
  it("should render all sort options", () => {
    render(<RepositorySortSelect value="stars-desc" onChange={vi.fn()} />);

    expect(screen.getByLabelText("Ordenar repositórios")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "⭐ Mais estrelas" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "⭐ Menos estrelas" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "🔤 Nome (A-Z)" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "🔤 Nome (Z-A)" })).toBeInTheDocument();
  });

  it("should call onChange when sort option changes", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<RepositorySortSelect value="stars-desc" onChange={onChange} />);

    await user.selectOptions(
      screen.getByLabelText("Ordenar repositórios"),
      "name-asc",
    );

    expect(onChange).toHaveBeenCalledWith("name-asc");
  });
});
