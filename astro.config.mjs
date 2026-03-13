// @ts-check
import { defineConfig } from "astro/config";
import clerk from "@clerk/astro";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  integrations: [
    clerk({
      publishableKey: import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY,
      signInUrl: "/sign-in",
      signUpUrl: "/sign-up",
    }),
  ],
  // edgeMiddleware: false tells Vercel to run middleware as Node.js
  // instead of an Edge Function — required for Clerk which uses
  // Node.js modules (fs, path, crypto etc) that Edge doesn't support
  adapter: vercel({ edgeMiddleware: false }),
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
