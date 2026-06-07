import { describe, expect, it } from "vitest";
import { parsePageParam, parseSortParam } from "./user-page-params";

describe("parsePageParam", () => {
  it("should return 1 for null", () => {
    expect(parsePageParam(null)).toBe(1);
  });

  it("should return parsed page for valid values", () => {
    expect(parsePageParam("2")).toBe(2);
    expect(parsePageParam("10")).toBe(10);
  });

  it("should return 1 for invalid values", () => {
    expect(parsePageParam("abc")).toBe(1);
    expect(parsePageParam("-5")).toBe(1);
    expect(parsePageParam("0")).toBe(1);
    expect(parsePageParam("1.5")).toBe(1);
  });
});

describe("parseSortParam", () => {
  it("should return stars-desc by default", () => {
    expect(parseSortParam(null)).toBe("stars-desc");
    expect(parseSortParam("invalid")).toBe("stars-desc");
  });

  it("should return valid sort options", () => {
    expect(parseSortParam("stars-asc")).toBe("stars-asc");
    expect(parseSortParam("stars-desc")).toBe("stars-desc");
  });
});
