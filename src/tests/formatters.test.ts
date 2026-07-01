import { describe, it, expect } from "vitest";
import { formatFollowers, formatEngagementRate } from "../utils/formatters";

describe("formatFollowers", () => {
  it("formats millions correctly", () => {
    expect(formatFollowers(678500000)).toBe("678.5M");
    expect(formatFollowers(1000000)).toBe("1.0M");
  });

  it("formats thousands correctly", () => {
    expect(formatFollowers(250000)).toBe("250.0K");
    expect(formatFollowers(1200)).toBe("1.2K");
  });

  it("leaves small numbers formatted as strings", () => {
    expect(formatFollowers(999)).toBe("999");
    expect(formatFollowers(0)).toBe("0");
  });
});

describe("formatEngagementRate", () => {
  it("formats engagement decimal to percentage with decimals", () => {
    expect(formatEngagementRate(0.0248)).toBe("2.48%");
    expect(formatEngagementRate(0.12)).toBe("12.00%");
  });

  it("returns N/A if undefined", () => {
    expect(formatEngagementRate(undefined)).toBe("N/A");
  });
});
