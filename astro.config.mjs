// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import db from "@astrojs/db";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "https://code.altie122.xyz",
  integrations: [react(), sitemap(), db()],
  adapter: vercel(),
  output: "server",
  vite: {
    plugins: [tailwindcss()],
  },
});
