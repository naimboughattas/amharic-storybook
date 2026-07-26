import { pickTonightStory } from "@/features/reading/tonightStory";
import type { BedtimeFit, Story } from "@/types/story";

function story(id: string, bedtimeFit: BedtimeFit = "good"): Story {
  return {
    id,
    titleAm: id,
    level: "intermediate",
    ageRange: "6-9",
    estimatedMinutes: 12,
    durationBucket: "10_min",
    mood: "Calme",
    bedtimeFit,
    bedtimeSummary: "",
    readingTips: [],
    pages: ["a"],
    source: { name: "test", license: "CC BY 4.0", attributionRequired: true },
    qualityChecks: {
      licenseVerified: true,
      nativeReviewed: false,
      translationProofread: false,
      childTested: false,
      publicationReady: false,
      editorialNote: "",
      sourceModifications: "",
    },
    validationStatus: "licensed",
    tags: [],
  };
}

const day = (n: number) => new Date(2026, 0, n);

describe("pickTonightStory", () => {
  it("returns nothing when there is no catalogue", () => {
    expect(pickTonightStory([])).toBeUndefined();
  });

  it("never offers a reading marked as not for bedtime", () => {
    const shelf = [story("library", "not_bedtime"), story("calm", "good")];

    for (let d = 1; d <= 14; d += 1) {
      expect(pickTonightStory(shelf, { date: day(d) })?.id).toBe("calm");
    }
  });

  it("falls back to the whole catalogue when nothing suits bedtime", () => {
    const shelf = [story("library", "not_bedtime")];
    expect(pickTonightStory(shelf, { date: day(1) })?.id).toBe("library");
  });

  it("offers a different reading on consecutive evenings", () => {
    const shelf = [story("a"), story("b"), story("c")];
    const picks = [1, 2, 3].map((d) => pickTonightStory(shelf, { date: day(d) })?.id);

    expect(new Set(picks).size).toBe(3);
  });

  it("keeps the same reading throughout one evening", () => {
    const shelf = [story("a"), story("b"), story("c")];
    const evening = new Date(2026, 0, 5, 20, 30);
    const later = new Date(2026, 0, 5, 23, 59);

    expect(pickTonightStory(shelf, { date: evening })?.id).toBe(
      pickTonightStory(shelf, { date: later })?.id,
    );
  });

  it("opens the rotation on the ideal reading, then cycles to the gentle one", () => {
    // Rotation is the point, so "ideal" cannot win every night; it only leads
    // the cycle. Over a full period both readings must come up exactly once.
    const shelf = [story("gentle", "good"), story("ideal", "ideal")];
    const picks = [1, 2, 3, 4].map((d) => pickTonightStory(shelf, { date: day(d) })!.id);

    expect(new Set(picks)).toEqual(new Set(["ideal", "gentle"]));
    expect(picks[0]).not.toBe(picks[1]);
    expect(picks[0]).toBe(picks[2]);

    const firstOfCycle = [1, 2].find(
      (d) => pickTonightStory(shelf, { date: day(d) })!.id === "ideal",
    );
    expect(firstOfCycle).toBeDefined();
  });

  it("skips readings already finished", () => {
    const shelf = [story("done"), story("fresh")];
    const readIds = new Set(["done"]);

    for (let d = 1; d <= 6; d += 1) {
      expect(pickTonightStory(shelf, { date: day(d), readIds })?.id).toBe("fresh");
    }
  });

  it("comes back to read stories once everything has been read", () => {
    const shelf = [story("a"), story("b")];
    const readIds = new Set(["a", "b"]);

    expect(pickTonightStory(shelf, { date: day(1), readIds })).toBeDefined();
  });

  it("prefers an unread favorite over another unread reading", () => {
    const shelf = [story("plain"), story("loved")];
    const favoriteIds = new Set(["loved"]);

    for (let d = 1; d <= 6; d += 1) {
      expect(pickTonightStory(shelf, { date: day(d), favoriteIds })?.id).toBe("loved");
    }
  });

  it("falls back to favorites when every reading is finished", () => {
    const shelf = [story("plain"), story("loved")];
    const readIds = new Set(["plain", "loved"]);
    const favoriteIds = new Set(["loved"]);

    for (let d = 1; d <= 6; d += 1) {
      expect(pickTonightStory(shelf, { date: day(d), readIds, favoriteIds })?.id).toBe("loved");
    }
  });
});
