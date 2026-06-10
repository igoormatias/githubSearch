/// <reference types="vite/client" />

const env = import.meta.env;

export const appEnv = {
  apiUrl: env.VITE_API_URL ?? "https://api.github.com",
  githubToken: env.VITE_GITHUB_TOKEN,
} as const;
