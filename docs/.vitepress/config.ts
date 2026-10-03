import { defineConfig } from "vitepress";

// GitHub Pages serves project sites under /<repo>/. Set DOCS_BASE=/ for a custom domain.
export default defineConfig({
  title: "template-ts-package",
  description: "TypeScript package template: pnpm, tsup, vitest, Biome, mise, lefthook, CI, npm release and a VitePress docs site.",
  base: process.env.DOCS_BASE ?? "/template-ts-package/",
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    nav: [{ text: "Guide", link: "/guide/getting-started" }],
    sidebar: [
      { text: "Guide", items: [{ text: "Getting started", link: "/guide/getting-started" }] },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/alliecatowo/template-ts-package" }],
    search: { provider: "local" },
  },
});
