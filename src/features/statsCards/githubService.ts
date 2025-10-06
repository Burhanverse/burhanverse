import { GitHubOverview, LanguageStat } from "./types";

const REST_API_BASE = "https://api.github.com";
const GRAPHQL_API = "https://api.github.com/graphql";

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Go: "#00ADD8",
  Rust: "#dea584",
  C: "#555555",
  "C++": "#f34b7d",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  Dart: "#00B4AB",
  Shell: "#89e051",
  Scala: "#c22d40",
};

interface GitHubUserResponse {
  followers: number;
  following: number;
  public_gists: number;
  public_repos: number;
  created_at: string;
}

interface GitHubRepoResponse {
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  size: number;
}

interface GraphQLContributionResponse {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions?: number;
        };
      };
    };
  };
  errors?: Array<{ message?: string }>;
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);

  if (!response.ok) {
    const message = await safeReadErrorMessage(response);
    throw new Error(`GitHub request failed (${response.status}): ${message}`);
  }

  return (await response.json()) as T;
}

async function safeReadErrorMessage(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as { message?: string };
    return body?.message ?? response.statusText;
  } catch {
    return response.statusText;
  }
}

function computeLanguageStats(repos: GitHubRepoResponse[]): LanguageStat[] {
  const languageTotals: Record<string, number> = {};
  let total = 0;

  repos.forEach((repo) => {
    if (!repo.language) return;

    const size = repo.size && repo.size > 0 ? repo.size : 1;
    languageTotals[repo.language] = (languageTotals[repo.language] ?? 0) + size;
    total += size;
  });

  if (total === 0) {
    return [];
  }

  return Object.entries(languageTotals)
    .map<LanguageStat>(([name, size]) => ({
      name,
      percentage: (size / total) * 100,
      color: LANGUAGE_COLORS[name] ?? "#8257e5",
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 4);
}

async function fetchContributionRange(
  username: string,
  from: Date,
  to: Date,
  token: string,
): Promise<number> {
  const query = `
    query($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
          }
        }
      }
    }
  `;

  const response = await fetch(GRAPHQL_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query,
      variables: {
        login: username,
        from: from.toISOString(),
        to: to.toISOString(),
      },
    }),
  });

  if (!response.ok) {
    const message = await safeReadErrorMessage(response);
    throw new Error(`GitHub GraphQL request failed (${response.status}): ${message}`);
  }

  const payload = (await response.json()) as GraphQLContributionResponse;

  if (payload.errors?.length) {
    const firstError = payload.errors[0]?.message ?? "Unknown error";
    throw new Error(`GitHub GraphQL returned errors: ${firstError}`);
  }

  return (
    payload.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions ?? 0
  );
}

async function fetchGitHubContributions(
  username: string,
  accountCreatedAt: string,
  token?: string,
): Promise<number> {
  if (!token) {
    // Token is optional; gracefully fall back when missing
    return 0;
  }

  try {
    const createdDate = new Date(accountCreatedAt);
    const today = new Date();

    let totalContributions = 0;
    for (let year = createdDate.getFullYear(); year <= today.getFullYear(); year += 1) {
      const from = year === createdDate.getFullYear() ? createdDate : new Date(year, 0, 1);
      const to =
        year === today.getFullYear()
          ? today
          : new Date(year, 11, 31, 23, 59, 59, 999);

      // Sequential requests keep us within GitHub's secondary rate limits
      const yearly = await fetchContributionRange(username, from, to, token);
      totalContributions += yearly;
    }

    return totalContributions;
  } catch (error) {
    console.warn("Failed to fetch GitHub contributions:", error);
    return 0;
  }
}

export async function fetchGitHubOverview(username: string, token?: string): Promise<GitHubOverview> {
  const [user, repos] = await Promise.all([
    fetchJson<GitHubUserResponse>(`${REST_API_BASE}/users/${username}`),
    fetchJson<GitHubRepoResponse[]>(`${REST_API_BASE}/users/${username}/repos?per_page=100&sort=updated`),
  ]);

  const contributions = await fetchGitHubContributions(username, user.created_at, token);
  const languageStats = computeLanguageStats(repos);

  const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count ?? 0), 0);
  const totalForks = repos.reduce((sum, repo) => sum + (repo.forks_count ?? 0), 0);

  return {
    totalStars,
    totalRepos: user.public_repos,
    followers: user.followers,
    following: user.following,
    publicGists: user.public_gists,
    totalForks,
    contributions,
    languageStats,
    accountCreatedAt: user.created_at,
  };
}
