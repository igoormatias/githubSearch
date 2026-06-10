import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getUser } from "@/features/github-user";
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

vi.mock("@/features/github-user", () => ({
  getUser: vi.fn(),
}));

vi.mock("@/shared/api", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/shared/api")>();
  return {
    ...actual,
    isNotFoundError: vi.fn(),
  };
});

describe("useSearchForm", () => {
  beforeEach(() => {
    navigate.mockClear();
    vi.mocked(getUser).mockReset();
    vi.mocked(isNotFoundError).mockReturnValue(false);
  });

  it("should navigate to user page after successful lookup", async () => {
    vi.mocked(getUser).mockResolvedValue({
      login: "torvalds",
    } as Awaited<ReturnType<typeof getUser>>);

    const { result } = renderHook(() => useSearchForm());

    act(() => {
      result.current.form.setValue("username", "torvalds");
    });

    await act(async () => {
      await result.current.form.handleSubmit(result.current.onSubmit)();
    });

    expect(getUser).toHaveBeenCalledWith("torvalds");
    expect(navigate).toHaveBeenCalledWith("/user/torvalds");
  });

  it("should trim username before lookup", async () => {
    vi.mocked(getUser).mockResolvedValue({
      login: "torvalds",
    } as Awaited<ReturnType<typeof getUser>>);

    const { result } = renderHook(() => useSearchForm());

    act(() => {
      result.current.form.setValue("username", "  torvalds  ");
    });

    await act(async () => {
      await result.current.form.handleSubmit(result.current.onSubmit)();
    });

    expect(getUser).toHaveBeenCalledWith("torvalds");
  });

  it("should set validation error for invalid username", async () => {
    const { result } = renderHook(() => useSearchForm());

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

    const { result } = renderHook(() => useSearchForm());

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

  it("should set api error for other failures", async () => {
    vi.mocked(getUser).mockRejectedValue(new Error("Network error"));
    vi.mocked(isNotFoundError).mockReturnValue(false);

    const { result } = renderHook(() => useSearchForm());

    act(() => {
      result.current.form.setValue("username", "torvalds");
    });

    await act(async () => {
      await result.current.form.handleSubmit(result.current.onSubmit)();
    });

    expect(result.current.form.formState.errors.username?.message).toBe(
      "Não foi possível consultar o GitHub.",
    );
  });

  it("should submit suggestion through the same flow", async () => {
    vi.mocked(getUser).mockResolvedValue({
      login: "diego3g",
    } as Awaited<ReturnType<typeof getUser>>);

    const { result } = renderHook(() => useSearchForm());

    await act(async () => {
      result.current.submitUsername("diego3g");
    });

    await waitFor(() => {
      expect(getUser).toHaveBeenCalledWith("diego3g");
    });
    expect(result.current.form.getValues("username")).toBe("diego3g");
  });
});
