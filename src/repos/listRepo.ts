import { githubApi } from "./githubApi";
import { RepoRenderer } from "./repoRenderer";

/**
 * Initialize and load repositories
 */
async function loadRepositories(): Promise<void> {
  const renderer = new RepoRenderer(".repos-list-wrapper");

  try {
    renderer.showLoading();

    // Fetch 8 repos from both Burhanverse and burhancodes accounts
    // Total: 16 repos mixed and sorted by update time
    const repos = await githubApi.fetchAndMergeRepositories(
      ["Burhanverse", "burhancodes"],
      { 
        Burhanverse: 9,
        burhancodes: 9 
      }
    );

    // Render all repositories (16 total)
    renderer.renderRepos(repos);
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
