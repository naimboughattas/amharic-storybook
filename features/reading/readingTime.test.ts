import { getRemainingMinutes } from "@/features/reading/readingTime";

const evenPages = ["a".repeat(100), "a".repeat(100), "a".repeat(100), "a".repeat(100)];

describe("getRemainingMinutes", () => {
  it("reports the full duration on an untouched reading", () => {
    expect(getRemainingMinutes(evenPages, 0, 20)).toBe(20);
  });

  it("decreases as pages of equal length are turned", () => {
    expect(getRemainingMinutes(evenPages, 1, 20)).toBe(15);
    expect(getRemainingMinutes(evenPages, 2, 20)).toBe(10);
    expect(getRemainingMinutes(evenPages, 3, 20)).toBe(5);
  });

  it("never drops below one minute", () => {
    expect(getRemainingMinutes(evenPages, 3, 1)).toBe(1);
    expect(getRemainingMinutes(["short"], 0, 0)).toBe(1);
  });

  it("weighs long pages more than short ones", () => {
    // A section title followed by a full page: turning past the title should
    // barely move the estimate, while turning past the body should end it.
    const pages = ["Section", "a".repeat(1000)];

    expect(getRemainingMinutes(pages, 0, 10)).toBe(10);
    expect(getRemainingMinutes(pages, 1, 10)).toBe(10);
  });

  it("does not treat a short page as a full share of the reading", () => {
    const pages = ["a".repeat(1000), "x", "x", "x"];
    const evenSplitEstimate = Math.ceil((3 / 4) * 20); // 15, what page count alone would say

    expect(getRemainingMinutes(pages, 1, 20)).toBeLessThan(evenSplitEstimate);
    expect(getRemainingMinutes(pages, 1, 20)).toBe(1);
  });

  it("clamps an out-of-range page instead of returning a negative estimate", () => {
    expect(getRemainingMinutes(evenPages, 99, 20)).toBe(5);
    expect(getRemainingMinutes(evenPages, -3, 20)).toBe(20);
  });

  it("falls back to an even split when every page is empty", () => {
    expect(getRemainingMinutes(["", "", "", ""], 2, 20)).toBe(10);
  });

  it("handles a reading with no pages", () => {
    expect(getRemainingMinutes([], 0, 12)).toBe(12);
  });
});
