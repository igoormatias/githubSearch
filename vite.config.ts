/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "localhost",
    port: 3000,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      provider: "v8",
      include: [
        "src/features/github-user/hooks/**",
        "src/features/github-user/utils/**",
        "src/features/github-user/pages/UserPage.tsx",
        "src/features/repositories/hooks/**",
        "src/features/repositories/utils/**",
        "src/features/repositories/services/**",
        "src/features/repositories/components/RepositoryCard.tsx",
        "src/features/repositories/components/RepositoryList.tsx",
        "src/features/repositories/components/RepositoryPagination.tsx",
        "src/features/repositories/components/RepositorySortSelect.tsx",
        "src/features/search/components/SearchForm.tsx",
        "src/shared/lib/**",
      ],
    },
  },
});
