import { fetchGitHubOverview } from "./githubService";
import { fetchLastFmSummary } from "./lastfmService";
import { GitHubOverview, LastFmSummary } from "./types";

interface CardElements {
  card: HTMLElement;
  content: HTMLElement;
}

type ContentState = "loading" | "ready" | "error" | "setup";

const SELECTOR = ".stats-cards-wrapper";

function readEnv(name: string): string | undefined {
  const env = import.meta.env as Record<string, string | undefined>;
  const value = env[name];
  if (!value || value === "undefined" || value.trim().length === 0) {
    return undefined;
  }
  return value;
}

const githubUsername = readEnv("VITE_GITHUB_USERNAME") ?? "Burhanverse";
const githubToken = readEnv("VITE_GITHUB_TOKEN");
const lastfmApiKey = readEnv("VITE_LASTFM_API_KEY");
const lastfmUsername = readEnv("VITE_LASTFM_USERNAME");

export function initializeStatsCards(): void {
  const wrapper = document.querySelector<HTMLElement>(SELECTOR);
  if (!wrapper) {
    console.warn("Stats cards container not found");
    return;
  }

  wrapper.replaceChildren();

  const githubCard = createStatCard({
    title: "GitHub Stats",
    icon: "folder_code",
    cardClass: "github-stat-card",
    contentId: "github-stats-content",
  });

  const lastFmCard = createStatCard({
    title: "Last.fm",
    icon: "equalizer",
    cardClass: "lastfm-card",
    contentId: "lastfm-content",
  });

  wrapper.append(githubCard.card, lastFmCard.card);

  renderLoadingState(githubCard.content, "Loading stats...");
  renderLoadingState(lastFmCard.content, "Loading music stats...");

  void loadGitHubStats(githubCard.content);
  void loadLastFmStats(lastFmCard.content);
}

function createStatCard(options: {
  title: string;
  icon: string;
  cardClass: string;
  contentId: string;
}): CardElements {
  const card = document.createElement("article");
  card.className = `stat-card ${options.cardClass}`;

  const header = document.createElement("header");
  header.className = "stat-card-header";

  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  icon.classList.add("stat-card-icon");
  icon.setAttribute("width", "24");
  icon.setAttribute("height", "24");
  icon.setAttribute("viewBox", "0 0 24 24");
  icon.setAttribute("xmlns", "http://www.w3.org/2000/svg");

  const iconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  iconPath.setAttribute("d", getIconPath(options.icon));
  icon.append(iconPath);

  const heading = document.createElement("h3");
  heading.className = "stat-card-title";
  heading.textContent = options.title;

  header.append(icon, heading);

  const content = document.createElement("section");
  content.className = "stat-card-content";
  content.id = options.contentId;
  content.setAttribute("aria-live", "polite");

  card.append(header, content);

  return { card, content };
}

function getIconPath(name: string): string {
  switch (name) {
    case "folder_code":
      // GitHub icon
      return "M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z";
    case "equalizer":
      // Last.fm icon
      return "M10.584 17.21l-.88-2.392s-1.43 1.594-3.573 1.594c-1.897 0-3.244-1.649-3.244-4.288 0-3.382 1.704-4.591 3.381-4.591 2.419 0 3.188 1.567 3.849 3.574l.88 2.75c.88 2.447 2.528 4.943 7.287 4.943 3.429 0 5.74-1.043 5.74-3.793 0-2.227-1.262-3.381-3.622-3.931l-1.76-.385c-1.21-.275-1.566-.77-1.566-1.594 0-.935.742-1.485 1.952-1.485 1.319 0 2.034.495 2.144 1.677l2.749-.33c-.22-2.474-1.924-3.492-4.729-3.492-2.474 0-4.893.935-4.893 3.931 0 1.87.907 3.052 3.188 3.602l1.869.44c1.402.33 1.869.907 1.869 1.704 0 1.017-.99 1.43-2.86 1.43-2.776 0-3.932-1.457-4.591-3.464l-.907-2.75c-1.155-3.573-2.997-4.893-6.653-4.893C2.144 5.333 0 7.89 0 12.233c0 4.18 2.144 6.434 5.993 6.434 3.106 0 4.591-1.457 4.591-1.457z";
    default:
      return "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5v6h4v2h-6V7h2z";
  }
}

function updateState(container: HTMLElement, state: ContentState): void {
  container.dataset.state = state;
}

function renderLoadingState(container: HTMLElement, message: string): void {
  updateState(container, "loading");
  container.innerHTML = `<div class="stat-loading">${message}</div>`;
}

async function loadGitHubStats(container: HTMLElement): Promise<void> {
  try {
    const overview = await fetchGitHubOverview(githubUsername, githubToken);
    renderGitHubContent(container, overview);
  } catch (error) {
    console.error("Failed to load GitHub stats:", error);
    renderError(container, "Failed to load stats");
  }
}

async function loadLastFmStats(container: HTMLElement): Promise<void> {
  if (!lastfmApiKey || !lastfmUsername) {
    renderLastFmSetup(container);
    return;
  }

  try {
    const summary = await fetchLastFmSummary(lastfmUsername, lastfmApiKey);
    renderLastFmContent(container, summary);
  } catch (error) {
    console.error("Failed to load Last.fm stats:", error);
    renderError(container, "Failed to load music stats");
  }
}

function renderGitHubContent(container: HTMLElement, overview: GitHubOverview): void {
  updateState(container, "ready");

  const languageBars = overview.languageStats.length
    ? overview.languageStats
        .map((lang) =>
          `<div class="language-bar" style="width: ${lang.percentage.toFixed(1)}%; background-color: ${lang.color};" title="${lang.name}: ${lang.percentage.toFixed(1)}%"></div>`,
        )
        .join("")
    : '<div class="language-bar language-bar--empty" style="width: 100%; background-color: var(--md-sys-color-surface-variant);"></div>';

  const languageList = overview.languageStats.length
    ? overview.languageStats
        .map((lang) =>
          `<div class="language-item"><span class="language-dot" style="background-color: ${lang.color};"></span><span class="language-name">${lang.name}</span><span class="language-percent">${lang.percentage.toFixed(1)}%</span></div>`,
        )
        .join("")
    : '<div class="language-empty-message">Language data is not available yet.</div>';

  container.innerHTML = `
    <div class="github-stats-wrapper">
      <div class="stat-grid-primary">
        ${renderPrimaryStat("star", formatNumber(overview.totalStars), "Total Stars")}
        ${renderPrimaryStat("folder", formatNumber(overview.totalRepos), "Repositories")}
      </div>

      <div class="stat-grid-secondary">
        ${renderSecondaryStat("group", formatNumber(overview.followers), "Followers")}
        ${renderSecondaryStat("call_split", formatNumber(overview.totalForks), "Total Forks")}
        ${renderSecondaryStat("description", formatNumber(overview.publicGists), "Public Gists")}
        ${renderSecondaryStat(
          "emoji_events",
          overview.contributions > 0 ? formatNumber(overview.contributions) : "N/A",
          "Total Contributions",
        )}
      </div>

      <div class="language-stats">
        <div class="language-stats-header">
          <span class="material-symbols-rounded">code</span>
          <span>Top Languages</span>
        </div>
        <div class="language-progress-bar">${languageBars}</div>
        <div class="language-list">${languageList}</div>
      </div>
    </div>
  `;
}

function renderPrimaryStat(icon: string, value: string, label: string): string {
  return `
    <div class="stat-item-large">
      <div class="stat-value-large">${value}</div>
      <div class="stat-label"><span class="material-symbols-rounded">${icon}</span> ${label}</div>
    </div>
  `;
}

function renderSecondaryStat(icon: string, value: string, label: string): string {
  return `
    <div class="stat-item-small">
      <span class="material-symbols-rounded stat-icon">${icon}</span>
      <div>
        <div class="stat-value-small">${value}</div>
        <div class="stat-sublabel">${label}</div>
      </div>
    </div>
  `;
}

function renderLastFmContent(container: HTMLElement, summary: LastFmSummary): void {
  updateState(container, "ready");

  if (!summary.track) {
    container.innerHTML = `
      <div class="lastfm-not-playing">
        <span class="material-symbols-rounded lastfm-idle-icon">music_off</span>
        <p>No recent tracks</p>
      </div>
    `;
    return;
  }

  const track = summary.track;
  const statusBadge = track.nowPlaying
    ? '<span class="lastfm-live-badge">🔴 Now Playing</span>'
    : '<span class="lastfm-recent-badge">Recently Played</span>';

  container.innerHTML = `
    <div class="lastfm-track">
      ${track.image ? `<img src="${track.image}" alt="${escapeHtml(track.album)}" class="lastfm-album-art" />` : '<div class="lastfm-no-image"><span class="material-symbols-rounded">album</span></div>'}
      <div class="lastfm-track-info">
        ${statusBadge}
        <a href="${track.url}" target="_blank" rel="noopener noreferrer" class="lastfm-track-title">${escapeHtml(
          track.name,
        )}</a>
        <p class="lastfm-track-artist">${escapeHtml(track.artist)}</p>
        <div class="lastfm-stats-row">
          <span class="lastfm-playcount">
            <span class="material-symbols-rounded">play_circle</span>
            ${formatNumber(summary.playcount)} scrobbles
          </span>
        </div>
      </div>
    </div>
  `;
}

function renderLastFmSetup(container: HTMLElement): void {
  updateState(container, "setup");
  container.innerHTML = `
    <div class="lastfm-setup">
      <span class="material-symbols-rounded">info</span>
      <p>Set up Last.fm API key in your <code>.env</code> file.</p>
      <p style="font-size: 1.2rem; margin-top: 0.8rem; opacity: 0.8;">Check <code>.env.example</code> for details.</p>
    </div>
  `;
}

function renderError(container: HTMLElement, message: string): void {
  updateState(container, "error");
  container.innerHTML = `<div class="stat-error">${message}</div>`;
}

function formatNumber(value: number | string): string {
  if (typeof value === "string") return value;
  try {
    return value.toLocaleString();
  } catch {
    return String(value);
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
