import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";
import { MemoryRouter } from "react-router-dom";

type RenderWithRouterOptions = RenderOptions & {
  route?: string;
};

export const renderWithRouter = (
  ui: ReactElement,
  { route = "/", ...options }: RenderWithRouterOptions = {},
) => {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>, options);
};
