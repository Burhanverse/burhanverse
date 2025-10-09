import { Octokit } from "@octokit/rest";
import type { Repository, GitHubConfig } from "../types";
import { config } from "../config";

class GitHubAPI {
  private octokit: Octokit;
  private config: GitHubConfig;

  constructor(configuration: GitHubConfig) {
    this.config = configuration;
    this.octokit = new Octokit({
      auth: this.config.token,
      userAgent: "Burhanverse Portfolio v1.0.0",
    });
  }

  /**
   * Fetch all public repositories for the configured user
   */
  async fetchRepositories(): Promise<Repository[]> {
    try {
      const response = await this.octokit.repos.listForUser({
        username: this.config.username,
        type: "owner",
        sort: "updated",
        per_page: 100,
      });

      return response.data.map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        language: repo.language || null,
        stargazers_count: repo.stargazers_count || 0,
        forks_count: repo.forks_count || 0,
        updated_at: repo.updated_at || "",
        topics: repo.topics || [],
        fork: repo.fork || false,
      }));
    } catch (error) {
      console.error("Error fetching repositories:", error);
      throw new Error("Failed to fetch repositories from GitHub API");
    }
  }

  /**
   * Fetch repositories from a specific username
   */
  async fetchRepositoriesFromUser(
    username: string,
    limit?: number,
  ): Promise<Repository[]> {
    try {
      const response = await this.octokit.repos.listForUser({
        username: username,
        type: "owner",
        sort: "updated",
        per_page: limit || 100,
      });

      return response.data.map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        language: repo.language || null,
        stargazers_count: repo.stargazers_count || 0,
        forks_count: repo.forks_count || 0,
        updated_at: repo.updated_at || "",
        topics: repo.topics || [],
        fork: repo.fork || false,
      }));
    } catch (error) {
      console.error(`Error fetching repositories from ${username}:`, error);
      throw new Error(`Failed to fetch repositories from ${username}`);
    }
  }

  /**
   * Fetch and merge repositories from multiple users, sorted by update time
   */
  async fetchAndMergeRepositories(
    usernames: string[],
    limitsPerUser?: { [key: string]: number },
  ): Promise<Repository[]> {
    try {
      const repoPromises = usernames.map((username) =>
        this.fetchRepositoriesFromUser(username, limitsPerUser?.[username]),
      );

      const repoArrays = await Promise.all(repoPromises);
      const allRepos = repoArrays.flat();

      // Sort by updated_at in descending order (most recent first)
      return allRepos.sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
      );
    } catch (error) {
      console.error("Error fetching and merging repositories:", error);
      throw new Error("Failed to fetch repositories from multiple users");
    }
  }

  /**
   * Fetch user profile information
   */
  async fetchUserProfile() {
    try {
      const response = await this.octokit.users.getByUsername({
        username: this.config.username,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  }
}

// Export singleton instance
export const githubApi = new GitHubAPI(config);
