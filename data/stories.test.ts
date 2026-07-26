import { asbLongReadingImages } from "@/data/asbLongReadingImages";
import { asbLongReadingPages } from "@/data/asbLongReadingPages";
import { stories } from "@/data/stories";

describe("story pages", () => {
  it.each(stories.map((story) => [story.id, story] as const))(
    "%s keeps illustrations aligned with pages",
    (_id, story) => {
      // A shorter or longer list would not fail loudly: it would quietly shift
      // every illustration after the gap onto the wrong page.
      expect(story.pageIllustrations).toHaveLength(story.pages.length);
    },
  );

  it.each(stories.map((story) => [story.id, story] as const))(
    "%s describes every illustration it declares",
    (_id, story) => {
      for (const illustration of story.pageIllustrations ?? []) {
        if (!illustration) {
          continue;
        }

        expect(illustration.source).toBeDefined();
        expect(illustration.aspectRatio).toBeGreaterThan(0);
        expect(Number.isFinite(illustration.aspectRatio)).toBe(true);
      }
    },
  );

  it.each(stories.map((story) => [story.id, story] as const))(
    "%s leaves its section headings unillustrated",
    (_id, story) => {
      story.pages.forEach((text, index) => {
        if (text.startsWith("ክፍል፦")) {
          expect(story.pageIllustrations?.[index]).toBeUndefined();
        }
      });
    },
  );

  it("carries at least one illustration per reading", () => {
    for (const story of stories) {
      expect(story.pageIllustrations?.some(Boolean)).toBe(true);
    }
  });
});

describe("imported album illustrations", () => {
  it("matches the album page counts they are aligned with", () => {
    for (const [album, illustrations] of Object.entries(asbLongReadingImages)) {
      expect(album in asbLongReadingPages).toBe(true);
      expect(illustrations).toHaveLength(
        asbLongReadingPages[album as keyof typeof asbLongReadingPages].length,
      );
    }
  });
});
