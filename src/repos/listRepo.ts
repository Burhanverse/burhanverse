import { githubApi } from "./githubApi";
import { RepoRenderer } from "./repoRenderer";

/**
 * Initialize and load repositories
 */
async function loadRepositories(): Promise<void> {
  const renderer = new RepoRenderer(".repos-list-wrapper");

  try {
    renderer.showLoading();

    // Fetch 8 repos from Burhanverse, burhancodes, and fagramdesktop
    // Total: 24 repos mixed and sorted by update time
    const repos = await githubApi.fetchAndMergeRepositories(
      ["Burhanverse", "burhancodes", "fagramdesktop"],
      {
        Burhanverse: 8,
        burhancodes: 8,
        fagramdesktop: 8,
      },
    );

    // Render all repositories (24 total)
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
