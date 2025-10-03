import type { GitHubConfig } from "./types";

export const config: GitHubConfig = {
  username: import.meta.env.VITE_GITHUB_USERNAME || "Burhanverse",
  token: import.meta.env.VITE_GITHUB_TOKEN,
};
