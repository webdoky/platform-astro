import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  vite: {
    resolve: {
      preserveSymlinks: true,
    },
  },
  markdown: {
    syntaxHighlight: "prism",
  },
});
