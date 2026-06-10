import { describe, expect, it } from "vitest";
import { GITHUB_USERNAME_REGEX, SEARCH_MESSAGES, searchSchema } from "./search.schema";

describe("GITHUB_USERNAME_REGEX", () => {
  it("should accept valid usernames", () => {
    expect(GITHUB_USERNAME_REGEX.test("torvalds")).toBe(true);
    expect(GITHUB_USERNAME_REGEX.test("lucasmontano")).toBe(true);
    expect(GITHUB_USERNAME_REGEX.test("user-name")).toBe(true);
    expect(GITHUB_USERNAME_REGEX.test("a")).toBe(true);
  });

  it("should reject invalid usernames", () => {
    expect(GITHUB_USERNAME_REGEX.test("-invalid")).toBe(false);
    expect(GITHUB_USERNAME_REGEX.test("invalid-")).toBe(false);
    expect(GITHUB_USERNAME_REGEX.test("user--name")).toBe(false);
    expect(GITHUB_USERNAME_REGEX.test("user name")).toBe(false);
    expect(GITHUB_USERNAME_REGEX.test("user@name")).toBe(false);
    expect(GITHUB_USERNAME_REGEX.test("<>")).toBe(false);
    expect(GITHUB_USERNAME_REGEX.test("")).toBe(false);
  });

  it("should reject usernames longer than 39 characters", () => {
    expect(GITHUB_USERNAME_REGEX.test("a".repeat(40))).toBe(false);
    expect(GITHUB_USERNAME_REGEX.test("a".repeat(39))).toBe(true);
  });
});

describe("searchSchema", () => {
  it("should return required message for empty username", () => {
    const result = searchSchema.safeParse({ username: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(SEARCH_MESSAGES.required);
    }
  });

  it("should return required message for whitespace-only username", () => {
    const result = searchSchema.safeParse({ username: "   " });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(SEARCH_MESSAGES.required);
    }
  });

  it("should return invalid format message for bad username", () => {
    const result = searchSchema.safeParse({ username: "-bad" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(SEARCH_MESSAGES.invalidFormat);
    }
  });

  it("should accept valid username", () => {
    const result = searchSchema.safeParse({ username: "torvalds" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.username).toBe("torvalds");
    }
  });

  it("should trim username", () => {
    const result = searchSchema.safeParse({ username: "  torvalds  " });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.username).toBe("torvalds");
    }
  });
});
