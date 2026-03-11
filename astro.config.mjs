// @ts-check
import { defineConfig } from "astro/config";
import clerk from "@clerk/astro";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [
    clerk({
      publishableKey: import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY,
    }),
  ],
  adapter: node({ mode: "standalone" }),
  output: "server",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "it"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
