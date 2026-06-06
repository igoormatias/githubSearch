import {
  formatDate,
  formatNumber,
  formatRelativeDate,
} from "./format";

describe("format", () => {
  describe("formatDate", () => {
    it("should format ISO date in pt-BR", () => {
      expect(formatDate("2024-03-15T12:00:00Z")).toMatch(/15\/03\/2024/);
    });
  });

  describe("formatNumber", () => {
    it("should format numbers in pt-BR", () => {
      expect(formatNumber(1234567)).toBe("1.234.567");
    });
  });

  describe("formatRelativeDate", () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2024-06-05T12:00:00Z"));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should return "hoje" for same day', () => {
      expect(formatRelativeDate("2024-06-05T08:00:00Z")).toBe("hoje");
    });

    it('should return "há 1 dia" for yesterday', () => {
      expect(formatRelativeDate("2024-06-04T12:00:00Z")).toBe("há 1 dia");
    });

    it("should return days for less than 30 days", () => {
      expect(formatRelativeDate("2024-06-01T12:00:00Z")).toBe("há 4 dias");
    });

    it('should return "há 1 mês" for one month', () => {
      expect(formatRelativeDate("2024-05-05T12:00:00Z")).toBe("há 1 mês");
    });

    it("should return months for less than 12 months", () => {
      expect(formatRelativeDate("2024-03-05T12:00:00Z")).toBe("há 3 meses");
    });

    it('should return "há 1 ano" for one year', () => {
      expect(formatRelativeDate("2023-06-05T12:00:00Z")).toBe("há 1 ano");
    });

    it("should return years for multiple years", () => {
      expect(formatRelativeDate("2022-06-05T12:00:00Z")).toBe("há 2 anos");
    });
  });
});
