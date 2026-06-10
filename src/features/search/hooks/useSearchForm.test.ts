import { act, renderHook, waitFor } from "@testing-library/react";
import { QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { createElement, type ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createTestQueryClient } from "@/app/providers/query-client";
import { githubUserQueryKey } from "@/features/github-user/queries/github-user-query";
import { getUser } from "@/features/github-user/services/user-service";
import type { GitHubUser } from "@/features/github-user/types/user";
import { isNotFoundError } from "@/shared/api";
import { SEARCH_MESSAGES } from "../schemas/search.schema";
import { useSearchForm } from "./useSearchForm";

const navigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: () => navigate,
  };
});

vi.mock("@/features/github-user/services/user-service", () => ({
  getUser: vi.fn(),
}));

vi.mock("@/shared/api", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/shared/api")>();
  return {
    ...actual,
    isNotFoundError: vi.fn(),
  };
});

const mockUser: GitHubUser = {
  login: "torvalds",
  id: 1,
  avatar_url: "https://github.com/torvalds.png",
  html_url: "https://github.com/torvalds",
  name: "Linus Torvalds",
  bio: null,
  company: null,
  location: null,
  email: null,
  blog: null,
  public_repos: 1,
  followers: 100,
  following: 0,
};

const renderUseSearchForm = () => {
  const queryClient = createTestQueryClient();

  const wrapper = ({ children }: { children: ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);

  const hook = renderHook(() => useSearchForm(), { wrapper });

  return { ...hook, queryClient };
};

describe("useSearchForm", () => {
  beforeEach(() => {
    navigate.mockClear();
    vi.mocked(getUser).mockReset();
    vi.mocked(isNotFoundError).mockReturnValue(false);
  });

  it("should navigate to user page after successful lookup", async () => {
    vi.mocked(getUser).mockResolvedValue(mockUser);

    const { result } = renderUseSearchForm();

    act(() => {
      result.current.form.setValue("username", "torvalds");
    });

    await act(async () => {
      await result.current.form.handleSubmit(result.current.onSubmit)();
    });

    expect(getUser).toHaveBeenCalledWith("torvalds");
    expect(navigate).toHaveBeenCalledWith("/user/torvalds");
  });

  it("should populate query cache after successful lookup", async () => {
    vi.mocked(getUser).mockResolvedValue(mockUser);

    const { result, queryClient } = renderUseSearchForm();

    act(() => {
      result.current.form.setValue("username", "torvalds");
    });

    await act(async () => {
      await result.current.form.handleSubmit(result.current.onSubmit)();
    });

    expect(queryClient.getQueryData(githubUserQueryKey("torvalds"))).toEqual(
      mockUser,
    );
  });

  it("should trim username before lookup", async () => {
    vi.mocked(getUser).mockResolvedValue(mockUser);

    const { result } = renderUseSearchForm();

    act(() => {
      result.current.form.setValue("username", "  torvalds  ");
    });

    await act(async () => {
      await result.current.form.handleSubmit(result.current.onSubmit)();
    });

    expect(getUser).toHaveBeenCalledWith("torvalds");
  });

  it("should set validation error for invalid username", async () => {
    const { result } = renderUseSearchForm();

    act(() => {
      result.current.form.setValue("username", "-invalid");
    });

    await act(async () => {
      await result.current.form.handleSubmit(result.current.onSubmit)();
    });

    expect(getUser).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
    expect(result.current.form.formState.errors.username?.message).toBe(
      SEARCH_MESSAGES.invalidFormat,
    );
  });

  it("should set not found error when user does not exist", async () => {
    const error = new Error("Not found");
    vi.mocked(getUser).mockRejectedValue(error);
    vi.mocked(isNotFoundError).mockReturnValue(true);

    const { result } = renderUseSearchForm();

    act(() => {
      result.current.form.setValue("username", "ghost-user");
    });

    await act(async () => {
      await result.current.form.handleSubmit(result.current.onSubmit)();
    });

    expect(navigate).not.toHaveBeenCalled();
    expect(result.current.form.formState.errors.username?.message).toBe(
      "Usuário não encontrado.",
    );
  });

  it("should set rate limit error when API returns 403", async () => {
    const error = new axios.AxiosError("Forbidden");
    error.response = {
      status: 403,
      data: {},
      statusText: "Forbidden",
      headers: {},
      config: {} as never,
    };
    vi.mocked(getUser).mockRejectedValue(error);
    vi.mocked(isNotFoundError).mockReturnValue(false);

    const { result } = renderUseSearchForm();

    act(() => {
      result.current.form.setValue("username", "torvalds");
    });

    await act(async () => {
      await result.current.form.handleSubmit(result.current.onSubmit)();
    });

    expect(navigate).not.toHaveBeenCalled();
    expect(result.current.form.formState.errors.username?.message).toBe(
      "Limite de requisições da API do GitHub excedido.",
    );
  });

  it("should set api error for other failures", async () => {
    vi.mocked(getUser).mockRejectedValue(new Error("Network error"));
    vi.mocked(isNotFoundError).mockReturnValue(false);

    const { result } = renderUseSearchForm();

    act(() => {
      result.current.form.setValue("username", "torvalds");
    });

    await act(async () => {
      await result.current.form.handleSubmit(result.current.onSubmit)();
    });

    expect(result.current.form.formState.errors.username?.message).toBe(
      "Network error",
    );
  });

  it("should submit suggestion through the same flow", async () => {
    vi.mocked(getUser).mockResolvedValue({
      ...mockUser,
      login: "diego3g",
    });

    const { result } = renderUseSearchForm();

    await act(async () => {
      result.current.submitUsername("diego3g");
    });

    await waitFor(() => {
      expect(getUser).toHaveBeenCalledWith("diego3g");
    });
    expect(result.current.form.getValues("username")).toBe("diego3g");
  });
});
