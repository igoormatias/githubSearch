import { describe, expect, it } from "vitest";
import { mapSortToSearchOrder } from "./map-sort-to-search-order";

describe("mapSortToSearchOrder", () => {
  it("should map stars-desc to desc", () => {
    expect(mapSortToSearchOrder("stars-desc")).toBe("desc");
  });

  it("should map stars-asc to asc", () => {
    expect(mapSortToSearchOrder("stars-asc")).toBe("asc");
  });
});
