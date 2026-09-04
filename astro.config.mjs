import { defineConfig } from "astro/config";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  // Astro 7 defaults to "jsx" whitespace rules, which strips the spaces around
  // inline elements that span multiple lines (e.g. the links in AboutSection).
  // `true` keeps the pre-v7 behaviour: minify HTML without changing rendering.
  compressHTML: true,
});
