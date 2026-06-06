import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { FormEvent } from "react";
import { useState } from "react";
import { SearchForm } from "./SearchForm";

const SearchFormWrapper = () => {
  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(username.trim());
  };

  return (
    <div>
      <SearchForm
        username={username}
        onUsernameChange={setUsername}
        onSubmit={handleSubmit}
      />
      {submitted && <p>Submitted: {submitted}</p>}
    </div>
  );
};

describe("SearchForm", () => {
  it("should disable submit button when username is empty", () => {
    render(
      <SearchForm
        username=""
        onUsernameChange={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: "Buscar usuário no GitHub" })).toBeDisabled();
  });

  it("should update username on input", async () => {
    const user = userEvent.setup();
    const onUsernameChange = vi.fn();

    render(
      <SearchForm
        username=""
        onUsernameChange={onUsernameChange}
        onSubmit={vi.fn()}
      />,
    );

    await user.type(screen.getByLabelText("Username do GitHub"), "torvalds");

    expect(onUsernameChange).toHaveBeenCalled();
  });

  it("should submit form with trimmed username", async () => {
    const user = userEvent.setup();

    render(<SearchFormWrapper />);

    await user.type(screen.getByLabelText("Username do GitHub"), "torvalds");
    await user.click(screen.getByRole("button", { name: "Buscar usuário no GitHub" }));

    expect(screen.getByText("Submitted: torvalds")).toBeVisible();
  });
});
