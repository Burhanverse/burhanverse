import { githubApi } from "./githubApi";
import { RepoRenderer } from "./repoRenderer";

/**
 * Initialize and load repositories
 */
async function loadRepositories(): Promise<void> {
  const renderer = new RepoRenderer(".repos-list-wrapper");

  try {
    renderer.showLoading();

    const repos = await githubApi.fetchRepositories();
    const first9Repos = repos.slice(0, 9);

    // Render repositories
    renderer.renderRepos(first9Repos);
  } catch (error) {
    console.error("Failed to load repositories:", error);
    renderer.showError("Failed to load repositories. Please try again later.");
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadRepositories);
} else {
  loadRepositories();
}

export { loadRepositories };
