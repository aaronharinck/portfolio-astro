import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Markdown case studies in `src/data/cases/*.md`.
// Replaces the removed `Astro.glob()` calls (see src/pages/cases/[slug].astro).
const cases = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.md",
    base: "./src/data/cases",
    // Use the `slug` frontmatter field as the entry id, otherwise the file name.
    generateId: ({ entry, data }) =>
      typeof data.slug === "string" ? data.slug : entry.replace(/\.md$/, ""),
  }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    excerpt: z.string(),
    date: z.union([z.number(), z.string()]),
  }),
});

export const collections = { cases };
