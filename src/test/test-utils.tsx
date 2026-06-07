import { render, renderHook, type RenderOptions } from "@testing-library/react";
import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactElement, ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { createTestQueryClient } from "@/app/providers/query-client";

type RenderWithProvidersOptions = RenderOptions & {
  route?: string;
};

const createWrapper = (route: string) => {
  const queryClient = createTestQueryClient();

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
    </QueryClientProvider>
  );

  return Wrapper;
};

export const renderWithProviders = (
  ui: ReactElement,
  { route = "/", ...options }: RenderWithProvidersOptions = {},
) => {
  return render(ui, { wrapper: createWrapper(route), ...options });
};

export const renderWithRouter = (
  ui: ReactElement,
  { route = "/", ...options }: RenderWithProvidersOptions = {},
) => renderWithProviders(ui, { route, ...options });

export const renderHookWithProviders = <T,>(
  hook: () => T,
  { route = "/" }: { route?: string } = {},
) => {
  return renderHook(hook, { wrapper: createWrapper(route) });
};
