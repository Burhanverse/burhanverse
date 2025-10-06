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
  iconPath.setAttribute("d", getMaterialIconPath(options.icon));
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

function getMaterialIconPath(name: string): string {
  switch (name) {
    case "folder_code":
      return "M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2zm2 4h6v10H6V6h3.17l2 2z";
    case "equalizer":
      return "M6 2h2v20H6zm5 6h2v14h-2zm5 4h2v10h-2z";
    case "music_note":
      return "M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z";
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
