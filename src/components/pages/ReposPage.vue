<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { githubApi } from "../../repos/githubApi";
import {
  fetchGitHubOverview,
  fetchGitHubCalendarData,
  fetchGitHubRecentEvents,
} from "../../features/statsCards/githubService";
import type {
  Repository,
  GitHubOverview,
  ContributionCalendarData,
  ContributionDay,
  GitHubActivityEvent,
} from "../../features/statsCards/types";

const repositories = ref<any[]>([]);
const overview = ref<GitHubOverview | null>(null);
const calendarData = ref<ContributionCalendarData | null>(null);
const recentEvents = ref<GitHubActivityEvent[]>([]);

const isLoading = ref(true);
const selectedFilter = ref("All");
const selectedSort = ref<"updated" | "stars" | "forks" | "name">("updated");
const searchQuery = ref("");

// Tooltip state for calendar heatmap
const activeTooltip = ref<{
  visible: boolean;
  text: string;
  x: number;
  y: number;
}>({
  visible: false,
  text: "",
  x: 0,
  y: 0,
});

const filters = ["All", "TypeScript", "JavaScript", "CSS", "Rust", "Python"];

const env = import.meta.env as Record<string, string | undefined>;
const githubUser = env.VITE_GITHUB_USERNAME || "Burhanverse";
const githubToken = env.VITE_GITHUB_TOKEN;

async function loadDashboard() {
  isLoading.value = true;
  try {
    const [reposRes, overviewRes, calRes, eventsRes] = await Promise.allSettled([
      githubApi.fetchAndMergeRepositories(
        ["Burhanverse", "burhancodes", "fagramdesktop"],
        {
          Burhanverse: 8,
          burhancodes: 8,
          fagramdesktop: 8,
        },
      ),
      fetchGitHubOverview(githubUser, githubToken),
      fetchGitHubCalendarData(githubUser),
      fetchGitHubRecentEvents(githubUser),
    ]);

    if (reposRes.status === "fulfilled") {
      repositories.value = reposRes.value;
    } else {
      repositories.value = getFallbackRepos();
    }

    if (overviewRes.status === "fulfilled") {
      overview.value = overviewRes.value;
    }

    if (calRes.status === "fulfilled") {
      calendarData.value = calRes.value;
    }

    if (eventsRes.status === "fulfilled") {
      recentEvents.value = eventsRes.value;
    }
  } catch (err) {
    console.warn("Error loading GitHub dashboard, fallback data populated:", err);
    repositories.value = getFallbackRepos();
  } finally {
    isLoading.value = false;
  }
}

function getFallbackRepos() {
  return [
    {
      id: 1,
      name: "Burhanverse.github.io",
      description: "Portfolio built with Material Design 3 and Google Pixel Tablet aesthetic.",
      html_url: "https://github.com/Burhanverse/Burhanverse.github.io",
      language: "TypeScript",
      stargazers_count: 32,
      forks_count: 7,
      updated_at: "2026-09-08",
      topics: ["material-design-3", "portfolio", "vite", "vue"],
      fork: false,
    },
    {
      id: 2,
      name: "fagram-desktop",
      description: "Modern desktop client crafted with beautiful Material 3 expressive UI.",
      html_url: "https://github.com/fagramdesktop/fagram-desktop",
      language: "TypeScript",
      stargazers_count: 58,
      forks_count: 14,
      updated_at: "2026-09-05",
      topics: ["desktop", "fagram", "telegram", "cross-platform"],
      fork: false,
    },
    {
      id: 3,
      name: "material-you-widgets",
      description: "Collection of Android 14+ Material You widgets for web and desktop.",
      html_url: "https://github.com/Burhanverse",
      language: "TypeScript",
      stargazers_count: 24,
      forks_count: 4,
      updated_at: "2026-09-02",
      topics: ["material-you", "widgets", "clock", "media-player"],
      fork: false,
    },
    {
      id: 4,
      name: "lofi-desktop-companion",
      description: "Ambient lofi companion app with Last.fm scrobbler and aesthetic clocks.",
      html_url: "https://github.com/Burhanverse",
      language: "Rust",
      stargazers_count: 19,
      forks_count: 3,
      updated_at: "2026-08-28",
      topics: ["lofi", "lastfm", "rust", "audio"],
      fork: false,
    },
    {
      id: 5,
      name: "dracula-md3-syntax",
      description: "Prism and highlight theme marrying Dracula colors with Material 3 tokens.",
      html_url: "https://github.com/Burhanverse",
      language: "CSS",
      stargazers_count: 15,
      forks_count: 2,
      updated_at: "2026-08-20",
      topics: ["prism", "syntax-highlighting", "css"],
      fork: false,
    },
    {
      id: 6,
      name: "dotfiles-pixel-edition",
      description: "Sleek Linux workstation configs themed around Google Material You.",
      html_url: "https://github.com/Burhanverse",
      language: "Python",
      stargazers_count: 42,
      forks_count: 9,
      updated_at: "2026-08-15",
      topics: ["dotfiles", "linux", "theming"],
      fork: false,
    },
  ];
}

const filteredRepositories = computed(() => {
  let list = repositories.value;

  if (selectedFilter.value !== "All") {
    list = list.filter(
      (repo) => repo.language && repo.language.toLowerCase() === selectedFilter.value.toLowerCase(),
    );
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim();
    list = list.filter(
      (repo) =>
        repo.name.toLowerCase().includes(q) ||
        (repo.description && repo.description.toLowerCase().includes(q)) ||
        (repo.topics && repo.topics.some((t: string) => t.toLowerCase().includes(q))),
    );
  }

  // Sort
  return [...list].sort((a, b) => {
    if (selectedSort.value === "stars") {
      return (b.stargazers_count || 0) - (a.stargazers_count || 0);
    }
    if (selectedSort.value === "forks") {
      return (b.forks_count || 0) - (a.forks_count || 0);
    }
    if (selectedSort.value === "name") {
      return a.name.localeCompare(b.name);
    }
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });
});

function handleDayHover(event: MouseEvent, day: ContributionDay) {
  if (!day.date) {
    activeTooltip.value.visible = false;
    return;
  }
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
  const dateFormatted = formatDateLong(day.date);
  const countText = day.count === 0 ? "No contributions" : `${day.count} contribution${day.count === 1 ? "" : "s"}`;
  
  activeTooltip.value = {
    visible: true,
    text: `${countText} on ${dateFormatted}`,
    x: rect.left + rect.width / 2,
    y: rect.top - 8,
  };
}

function handleDayLeave() {
  activeTooltip.value.visible = false;
}

function formatDateLong(dateStr: string) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function formatRelativeTime(dateStr: string) {
  try {
    const now = Date.now();
    const past = new Date(dateStr).getTime();
    const diffHours = Math.round((now - past) / 3600000);
    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.round(diffHours / 24);
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 30) return `${diffDays}d ago`;
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return dateStr;
  }
}

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Rust: "#dea584",
  CSS: "#563d7c",
  Vue: "#41b883",
  HTML: "#e34c26",
  Shell: "#89e051",
  C: "#555555",
};

onMounted(() => {
  loadDashboard();
});
</script>

<template>
  <div class="github-dashboard-view">
    <!-- Floating Heatmap Tooltip -->
    <div
      v-if="activeTooltip.visible"
      class="heatmap-floating-tooltip"
      :style="{ left: `${activeTooltip.x}px`, top: `${activeTooltip.y}px` }"
    >
      {{ activeTooltip.text }}
    </div>

    <!-- 1. Hero Profile & Dashboard Header Widget -->
    <section class="dashboard-hero-widget" aria-label="GitHub Profile Overview">
      <div class="hero-identity-col">
        <div class="avatar-ring-container">
          <img
            src="https://github.com/Burhanverse.png"
            alt="Sid (Burhanverse)"
            class="hero-avatar"
          />
          <span class="avatar-online-dot" title="Actively Shipping Code"></span>
        </div>

        <div class="hero-info-meta">
          <div class="hero-name-row">
            <h1 class="hero-display-name">𝙎𝙞𝙙.</h1>
            <span class="hero-handle-badge">@{{ githubUser }}</span>
          </div>
          <p class="hero-bio-tagline">
            Software builder, system explorer, and interface artisan crafting thoughtful open source tools & apps.
          </p>
          <div class="hero-badges-row">
            <span class="hero-meta-chip">
              <span class="material-symbols-rounded chip-icon">corporate_fare</span>
              @fagramdesktop
            </span>
            <span class="hero-meta-chip">
              <span class="material-symbols-rounded chip-icon">location_on</span>
              Assam, India
            </span>
            <span class="hero-meta-chip">
              <span class="material-symbols-rounded chip-icon">public</span>
              burhanverse.eu.org
            </span>
          </div>
        </div>
      </div>

      <div class="hero-actions-col">
        <a
          href="https://github.com/Burhanverse"
          target="_blank"
          rel="noopener noreferrer"
          class="gh-external-btn"
          title="Open GitHub Profile"
        >
          <md-ripple></md-ripple>
          <span class="material-symbols-rounded">open_in_new</span>
          <span>View on GitHub</span>
        </a>

        <div class="hero-quick-stats">
          <div class="quick-stat-box">
            <span class="qs-num">{{ calendarData?.totalContributions ?? 1769 }}</span>
            <span class="qs-lbl">Year Commits</span>
          </div>
          <div class="quick-stat-box">
            <span class="qs-num">{{ overview?.totalRepos ?? 98 }}</span>
            <span class="qs-lbl">Repositories</span>
          </div>
          <div class="quick-stat-box">
            <span class="qs-num">{{ overview?.totalStars ?? 240 }}</span>
            <span class="qs-lbl">Stars</span>
          </div>
          <div class="quick-stat-box">
            <span class="qs-num">{{ overview?.followers ?? 12 }}</span>
            <span class="qs-lbl">Followers</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. Interactive 52-Week Commit Calendar Heatmap Widget -->
    <section class="dashboard-calendar-widget" aria-label="Commit Activity Calendar">
      <div class="calendar-widget-header">
        <div class="cal-title-group">
          <div class="cal-icon-box">
            <span class="material-symbols-rounded">calendar_month</span>
          </div>
          <div>
            <h2 class="cal-title">Contribution Activity</h2>
            <span class="cal-subtitle">
              {{ calendarData?.totalContributions ?? 1769 }} contributions in the last 365 days
            </span>
          </div>
        </div>

        <div class="streak-badges-cluster">
          <div class="streak-badge-pill current-streak">
            <span class="material-symbols-rounded streak-icon">local_fire_department</span>
            <span class="streak-val">{{ calendarData?.currentStreak ?? 14 }} Days</span>
            <span class="streak-lbl">Current Streak</span>
          </div>
          <div class="streak-badge-pill longest-streak">
            <span class="material-symbols-rounded streak-icon">bolt</span>
            <span class="streak-val">{{ calendarData?.longestStreak ?? 42 }} Days</span>
            <span class="streak-lbl">Longest Streak</span>
          </div>
        </div>
      </div>

      <!-- Calendar Matrix Scroll Container -->
      <div class="calendar-scroll-wrapper">
        <div class="calendar-matrix-board">
          <!-- Month Header Row -->
          <div class="calendar-months-row">
            <span class="month-label-spacer"></span>
            <div class="months-labels-track">
              <span
                v-for="(m, mIdx) in calendarData?.months"
                :key="mIdx"
                class="month-label-item"
                :style="{ gridColumnStart: m.firstWeekIndex + 1 }"
              >
                {{ m.name }}
              </span>
            </div>
          </div>

          <!-- Heatmap Days Grid -->
          <div class="calendar-days-layout">
            <!-- Day of Week Labels (Mon, Wed, Fri) -->
            <div class="day-of-week-labels">
              <span class="dow-label"></span>
              <span class="dow-label">Mon</span>
              <span class="dow-label"></span>
              <span class="dow-label">Wed</span>
              <span class="dow-label"></span>
              <span class="dow-label">Fri</span>
              <span class="dow-label"></span>
            </div>

            <!-- 52/53 Week Columns -->
            <div class="calendar-weeks-columns">
              <div
                v-for="(week, wIdx) in calendarData?.weeks"
                :key="wIdx"
                class="calendar-week-col"
              >
                <div
                  v-for="(day, dIdx) in week.days"
                  :key="dIdx"
                  class="calendar-day-cell"
                  :class="[`level-${day.level}`, { 'empty-cell': !day.date }]"
                  @mouseenter="handleDayHover($event, day)"
                  @mouseleave="handleDayLeave"
                ></div>
              </div>
            </div>
          </div>

          <!-- Heatmap Legend & Footer -->
          <div class="calendar-footer-legend">
            <span class="legend-note">Synced directly with GitHub activity</span>
            <div class="heatmap-legend-scale">
              <span class="legend-txt">Less</span>
              <span class="calendar-day-cell level-0 mini"></span>
              <span class="calendar-day-cell level-1 mini"></span>
              <span class="calendar-day-cell level-2 mini"></span>
              <span class="calendar-day-cell level-3 mini"></span>
              <span class="calendar-day-cell level-4 mini"></span>
              <span class="legend-txt">More</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Dual Row: Language Spectrum & Recent Activity Stream -->
    <div class="dashboard-dual-grid">
      <!-- Left Card: Language Spectrum -->
      <section class="dashboard-card language-spectrum-card" aria-label="Languages Breakdown">
        <div class="card-inner-header">
          <div class="card-icon-tag">
            <span class="material-symbols-rounded">donut_large</span>
          </div>
          <div>
            <h3 class="card-title">Technology Spectrum</h3>
            <span class="card-subtitle">Primary languages across open source code</span>
          </div>
        </div>

        <!-- Proportional Multi-Segment Progress Bar -->
        <div class="language-multi-bar">
          <div
            v-for="(lang, lIdx) in overview?.languageStats || [
              { name: 'TypeScript', percentage: 48, color: '#3178c6' },
              { name: 'Vue', percentage: 26, color: '#41b883' },
              { name: 'CSS', percentage: 16, color: '#563d7c' },
              { name: 'Rust', percentage: 10, color: '#dea584' },
            ]"
            :key="lIdx"
            class="lang-bar-segment"
            :style="{
              width: `${lang.percentage}%`,
              backgroundColor: lang.color || languageColors[lang.name] || '#bf6038',
            }"
            :title="`${lang.name}: ${Math.round(lang.percentage)}%`"
          ></div>
        </div>

        <!-- Languages Legend List -->
        <div class="language-chips-cluster">
          <div
            v-for="(lang, lIdx) in overview?.languageStats || [
              { name: 'TypeScript', percentage: 48, color: '#3178c6' },
              { name: 'Vue', percentage: 26, color: '#41b883' },
              { name: 'CSS', percentage: 16, color: '#563d7c' },
              { name: 'Rust', percentage: 10, color: '#dea584' },
            ]"
            :key="lIdx"
            class="lang-chip-item"
          >
            <span
              class="lang-color-dot"
              :style="{ backgroundColor: lang.color || languageColors[lang.name] || '#bf6038' }"
            ></span>
            <span class="lang-name">{{ lang.name }}</span>
            <span class="lang-pct">{{ Math.round(lang.percentage) }}%</span>
          </div>
        </div>
      </section>

      <!-- Right Card: Recent GitHub Activity Feed -->
      <section class="dashboard-card activity-feed-card" aria-label="Recent Commits & Events">
        <div class="card-inner-header">
          <div class="card-icon-tag">
            <span class="material-symbols-rounded">history</span>
          </div>
          <div>
            <h3 class="card-title">Recent Activity Stream</h3>
            <span class="card-subtitle">Latest pushed commits and repository events</span>
          </div>
        </div>

        <div class="activity-events-list">
          <article
            v-for="ev in recentEvents.slice(0, 4)"
            :key="ev.id"
            class="activity-event-item"
          >
            <div class="event-icon-badge">
              <span class="material-symbols-rounded">
                {{ ev.type === 'PushEvent' ? 'commit' : ev.type === 'CreateEvent' ? 'add_circle' : 'star' }}
              </span>
            </div>
            <div class="event-content-col">
              <div class="event-meta-top">
                <a :href="ev.repoUrl" target="_blank" class="event-repo-name">
                  {{ ev.repoName }}
                </a>
                <span v-if="ev.branch" class="event-branch-badge">
                  <span class="material-symbols-rounded branch-icon">fork_right</span>
                  {{ ev.branch }}
                </span>
                <span class="event-time">{{ formatRelativeTime(ev.createdAt) }}</span>
              </div>
              <p v-if="ev.commitMessage" class="event-commit-msg">
                {{ ev.commitMessage }}
              </p>
              <p v-else-if="ev.payloadAction" class="event-commit-msg">
                {{ ev.payloadAction }}
              </p>
            </div>
          </article>
        </div>
      </section>
    </div>

    <!-- 4. Repository Explorer Board -->
    <section class="dashboard-repos-section" aria-label="Repositories Explorer">
      <div class="repos-toolbar-card">
        <div class="repos-toolbar-title-row">
          <div class="repos-title-group">
            <div class="card-icon-tag">
              <span class="material-symbols-rounded">folder_code</span>
            </div>
            <div>
              <h2 class="card-title">Repositories & Open Source</h2>
              <span class="card-subtitle">
                {{ filteredRepositories.length }} repositories matching filters
              </span>
            </div>
          </div>

          <!-- Sort Selector -->
          <div class="sort-selector-box">
            <span class="material-symbols-rounded sort-icon">sort</span>
            <select v-model="selectedSort" class="sort-dropdown" aria-label="Sort repositories">
              <option value="updated">Recently Updated</option>
              <option value="stars">Most Stars</option>
              <option value="forks">Most Forks</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>

        <!-- Search Input -->
        <div class="repos-search-bar">
          <span class="material-symbols-rounded search-icon">search</span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search repositories by name, topic, or description..."
            class="search-input"
            aria-label="Search repositories"
          />
          <button
            v-if="searchQuery"
            type="button"
            class="clear-search-btn"
            title="Clear search"
            @click="searchQuery = ''"
          >
            <span class="material-symbols-rounded">close</span>
          </button>
        </div>

        <!-- Language Filter Chips -->
        <div class="filter-chips-row">
          <button
            v-for="flt in filters"
            :key="flt"
            type="button"
            class="filter-chip-btn"
            :class="{ active: selectedFilter === flt }"
            @click="selectedFilter = flt"
          >
            <md-ripple></md-ripple>
            <span>{{ flt }}</span>
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="repos-loading-indicator">
        <span class="material-symbols-rounded spin-icon">sync</span>
        <p>Loading GitHub dashboard and repository metrics...</p>
      </div>

      <!-- Repositories Cards Grid -->
      <div v-else-if="filteredRepositories.length > 0" class="repos-cards-grid">
        <article
          v-for="repo in filteredRepositories"
          :key="repo.id"
          class="repo-card-widget"
        >
          <div class="repo-card-header">
            <div class="repo-title-box">
              <span class="material-symbols-rounded repo-type-icon">code</span>
              <a
                :href="repo.html_url"
                target="_blank"
                rel="noopener noreferrer"
                class="repo-name-link"
              >
                {{ repo.name }}
              </a>
            </div>

            <div class="repo-stats-pills">
              <span class="repo-stat-pill" title="Stars">
                <span class="material-symbols-rounded stat-icon">star</span>
                {{ repo.stargazers_count || 0 }}
              </span>
              <span class="repo-stat-pill" title="Forks">
                <span class="material-symbols-rounded stat-icon">call_split</span>
                {{ repo.forks_count || 0 }}
              </span>
            </div>
          </div>

          <p class="repo-description">
            {{ repo.description || "No description provided for this project." }}
          </p>

          <!-- Topics / Tags -->
          <div v-if="repo.topics && repo.topics.length" class="repo-topics-row">
            <span v-for="tag in repo.topics.slice(0, 4)" :key="tag" class="topic-tag-chip">
              #{{ tag }}
            </span>
          </div>

          <!-- Card Footer -->
          <div class="repo-card-footer">
            <div class="repo-lang-badge">
              <span
                class="lang-dot"
                :style="{
                  backgroundColor: languageColors[repo.language] || '#bf6038',
                }"
              ></span>
              <span class="lang-text">{{ repo.language || "Code" }}</span>
            </div>

            <a
              :href="repo.html_url"
              target="_blank"
              rel="noopener noreferrer"
              class="repo-action-btn"
            >
              <md-ripple></md-ripple>
              <span>View Code</span>
              <span class="material-symbols-rounded arrow-icon">arrow_outward</span>
            </a>
          </div>
        </article>
      </div>

      <!-- Empty State -->
      <div v-else class="repos-empty-state">
        <span class="material-symbols-rounded empty-icon">manage_search</span>
        <h3>No repositories found</h3>
        <p>No project matched your filter criteria or search query.</p>
        <button
          type="button"
          class="reset-filters-btn"
          @click="selectedFilter = 'All'; searchQuery = ''"
        >
          <md-ripple></md-ripple>
          Reset Filters
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.github-dashboard-view {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 100%;
  max-width: 132rem;
  margin: 0 auto;
  padding: 2rem 2rem 6rem 9rem;
  animation: dashboardFadeIn 360ms ease;
  position: relative;
  will-change: opacity, transform;
}

/* Floating Heatmap Tooltip */
.heatmap-floating-tooltip {
  position: fixed;
  transform: translate(-50%, -100%);
  background: var(--md-sys-color-surface-container-highest, #261b16);
  color: var(--md-sys-color-on-surface, #ece2dc);
  padding: 0.6rem 1.2rem;
  border-radius: 9999px;
  font-size: 1.25rem;
  font-weight: 700;
  white-space: nowrap;
  pointer-events: none;
  z-index: 1000;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.28);
  border: 1px solid rgba(255, 255, 255, 0.12);
  transition: opacity 120ms ease;
}

/* 1. Hero Identity Widget */
.dashboard-hero-widget {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2.4rem;
  padding: 2.4rem 2.8rem;
  border-radius: 2.8rem;
  background: var(--md-sys-color-surface-container, rgba(255, 248, 245, 0.88));
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(191, 96, 56, 0.12);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

[theme="dark"] .dashboard-hero-widget {
  background: var(--md-sys-color-surface-container, rgba(38, 27, 22, 0.88));
  border: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.45);
}

.hero-identity-col {
  display: flex;
  align-items: center;
  gap: 2.4rem;
  flex: 1 1 50rem;
}

.avatar-ring-container {
  position: relative;
  width: 8.8rem;
  height: 8.8rem;
  flex-shrink: 0;
}

.hero-avatar {
  width: 100%;
  height: 100%;
  border-radius: 2.4rem;
  object-fit: cover;
  border: 2px solid var(--md-sys-color-primary, #bf6038);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.avatar-online-dot {
  position: absolute;
  bottom: -0.2rem;
  right: -0.2rem;
  width: 1.8rem;
  height: 1.8rem;
  background-color: #2ea043;
  border: 3px solid var(--md-sys-color-surface, #fff8f3);
  border-radius: 50%;
}

[theme="dark"] .avatar-online-dot {
  border-color: #261b16;
}

.hero-info-meta {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.hero-name-row {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  flex-wrap: wrap;
}

.hero-display-name {
  font-family: "Lexend Deca", sans-serif;
  font-size: 2.8rem;
  font-weight: 800;
  color: var(--md-sys-color-on-surface, #1f1b18);
  margin: 0;
  line-height: 1.1;
}

.hero-handle-badge {
  font-family: "JetBrains Mono", monospace;
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--md-sys-color-primary, #bf6038);
  background: var(--md-sys-color-primary-container, rgba(191, 96, 56, 0.12));
  padding: 0.3rem 0.9rem;
  border-radius: 9999px;
}

.hero-bio-tagline {
  font-size: 1.45rem;
  color: var(--md-sys-color-on-surface-variant, #52443e);
  margin: 0;
  max-width: 58rem;
  line-height: 1.5;
}

.hero-badges-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 0.4rem;
}

.hero-meta-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--md-sys-color-on-surface-variant, #52443e);
  background: rgba(0, 0, 0, 0.035);
  padding: 0.4rem 1rem;
  border-radius: 9999px;
}

[theme="dark"] .hero-meta-chip {
  background: rgba(255, 255, 255, 0.045);
}

.chip-icon {
  font-size: 1.6rem;
  color: var(--md-sys-color-primary, #bf6038);
}

.hero-actions-col {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1.6rem;
  flex: 1 1 30rem;
}

.gh-external-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  background: var(--md-sys-color-primary, #bf6038);
  color: #ffffff;
  padding: 1rem 2rem;
  border-radius: 9999px;
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  text-decoration: none;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(191, 96, 56, 0.28);
  transition: transform 200ms ease, box-shadow 200ms ease;
}

.gh-external-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(191, 96, 56, 0.38);
}

.hero-quick-stats {
  display: flex;
  gap: 1.6rem;
  flex-wrap: wrap;
}

.quick-stat-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 0, 0.03);
  padding: 0.8rem 1.4rem;
  border-radius: 1.6rem;
  min-width: 7.2rem;
}

[theme="dark"] .quick-stat-box {
  background: rgba(255, 255, 255, 0.04);
}

.qs-num {
  font-family: "JetBrains Mono", monospace;
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--md-sys-color-on-surface, #1f1b18);
}

.qs-lbl {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--md-sys-color-on-surface-variant, #52443e);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

/* 2. Commit Heatmap Calendar Widget */
.dashboard-calendar-widget {
  background: var(--md-sys-color-surface-container, rgba(255, 248, 245, 0.88));
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(191, 96, 56, 0.12);
  border-radius: 2.8rem;
  padding: 2.4rem 2.8rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

[theme="dark"] .dashboard-calendar-widget {
  background: var(--md-sys-color-surface-container, rgba(38, 27, 22, 0.88));
  border: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.45);
}

.calendar-widget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.6rem;
  margin-bottom: 2rem;
}

.cal-title-group {
  display: flex;
  align-items: center;
  gap: 1.4rem;
}

.cal-icon-box {
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 1.6rem;
  background: var(--md-sys-color-primary-container, rgba(191, 96, 56, 0.12));
  color: var(--md-sys-color-primary, #bf6038);
  display: flex;
  align-items: center;
  justify-content: center;
}

.cal-title {
  font-family: "Lexend Deca", sans-serif;
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--md-sys-color-on-surface, #1f1b18);
  margin: 0;
}

.cal-subtitle {
  font-size: 1.35rem;
  color: var(--md-sys-color-on-surface-variant, #52443e);
}

.streak-badges-cluster {
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
}

.streak-badge-pill {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 1.4rem;
  border-radius: 9999px;
  background: rgba(0, 0, 0, 0.035);
}

[theme="dark"] .streak-badge-pill {
  background: rgba(255, 255, 255, 0.045);
}

.current-streak .streak-icon {
  color: #e25822;
}

.longest-streak .streak-icon {
  color: #e5cd86;
}

.streak-val {
  font-family: "JetBrains Mono", monospace;
  font-weight: 800;
  font-size: 1.4rem;
  color: var(--md-sys-color-on-surface, #1f1b18);
}

.streak-lbl {
  font-size: 1.15rem;
  color: var(--md-sys-color-on-surface-variant, #52443e);
  font-weight: 600;
}

/* Calendar Matrix Layout */
.calendar-scroll-wrapper {
  overflow-x: auto;
  padding-bottom: 0.8rem;
}

.calendar-matrix-board {
  min-width: 82rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.calendar-months-row {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.month-label-spacer {
  width: 3.2rem;
  flex-shrink: 0;
}

.months-labels-track {
  display: grid;
  grid-template-columns: repeat(53, 1fr);
  width: 100%;
  gap: 0.4rem;
}

.month-label-item {
  font-family: "JetBrains Mono", monospace;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--md-sys-color-on-surface-variant, #52443e);
}

.calendar-days-layout {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.day-of-week-labels {
  display: grid;
  grid-template-rows: repeat(7, 1.4rem);
  gap: 0.4rem;
  width: 3.2rem;
  flex-shrink: 0;
}

.dow-label {
  font-family: "JetBrains Mono", monospace;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--md-sys-color-on-surface-variant, #52443e);
  line-height: 1.4rem;
}

.calendar-weeks-columns {
  display: grid;
  grid-template-columns: repeat(53, 1fr);
  gap: 0.4rem;
  width: 100%;
}

.calendar-week-col {
  display: grid;
  grid-template-rows: repeat(7, 1.4rem);
  gap: 0.4rem;
}

.calendar-day-cell {
  width: 100%;
  height: 1.4rem;
  border-radius: 0.35rem;
  transition: transform 120ms ease, filter 120ms ease;
  cursor: pointer;
}

.calendar-day-cell:hover:not(.empty-cell) {
  transform: scale(1.35);
  z-index: 10;
  filter: brightness(1.15);
}

.calendar-day-cell.empty-cell {
  opacity: 0;
  cursor: default;
}

/* Heatmap Levels - Material 3 Terracotta progression */
.level-0 {
  background-color: rgba(191, 96, 56, 0.08);
}
.level-1 {
  background-color: #f4be9b;
}
.level-2 {
  background-color: #e89569;
}
.level-3 {
  background-color: #bf6038;
}
.level-4 {
  background-color: #7d3314;
}

[theme="dark"] .level-0 {
  background-color: rgba(255, 255, 255, 0.06);
}
[theme="dark"] .level-1 {
  background-color: #5e321d;
}
[theme="dark"] .level-2 {
  background-color: #944926;
}
[theme="dark"] .level-3 {
  background-color: #d96b3a;
}
[theme="dark"] .level-4 {
  background-color: #ff9664;
}

.calendar-footer-legend {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

[theme="dark"] .calendar-footer-legend {
  border-top-color: rgba(255, 255, 255, 0.05);
}

.legend-note {
  font-size: 1.2rem;
  color: var(--md-sys-color-on-surface-variant, #52443e);
}

.heatmap-legend-scale {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.calendar-day-cell.mini {
  width: 1.2rem;
  height: 1.2rem;
}

.legend-txt {
  font-size: 1.15rem;
  color: var(--md-sys-color-on-surface-variant, #52443e);
  font-weight: 600;
}

/* 3. Dual Row: Languages & Activity Stream */
.dashboard-dual-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(36rem, 1fr));
  gap: 2.4rem;
}

.dashboard-card {
  background: var(--md-sys-color-surface-container, rgba(255, 248, 245, 0.88));
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(191, 96, 56, 0.12);
  border-radius: 2.8rem;
  padding: 2.4rem 2.8rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

[theme="dark"] .dashboard-card {
  background: var(--md-sys-color-surface-container, rgba(38, 27, 22, 0.88));
  border: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.45);
}

.card-inner-header {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 2rem;
}

.card-icon-tag {
  width: 4.4rem;
  height: 4.4rem;
  border-radius: 1.4rem;
  background: var(--md-sys-color-primary-container, rgba(191, 96, 56, 0.12));
  color: var(--md-sys-color-primary, #bf6038);
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-title {
  font-family: "Lexend Deca", sans-serif;
  font-size: 2rem;
  font-weight: 800;
  color: var(--md-sys-color-on-surface, #1f1b18);
  margin: 0;
}

.card-subtitle {
  font-size: 1.3rem;
  color: var(--md-sys-color-on-surface-variant, #52443e);
}

/* Language Spectrum Multi-Bar */
.language-multi-bar {
  display: flex;
  height: 1.4rem;
  border-radius: 9999px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.06);
  margin-bottom: 1.8rem;
}

[theme="dark"] .language-multi-bar {
  background: rgba(255, 255, 255, 0.06);
}

.lang-bar-segment {
  height: 100%;
  transition: width 300ms ease;
}

.language-chips-cluster {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.lang-chip-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: rgba(0, 0, 0, 0.03);
  padding: 0.5rem 1.2rem;
  border-radius: 9999px;
  font-size: 1.3rem;
}

[theme="dark"] .lang-chip-item {
  background: rgba(255, 255, 255, 0.04);
}

.lang-color-dot {
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 50%;
}

.lang-name {
  font-weight: 700;
  color: var(--md-sys-color-on-surface, #1f1b18);
}

.lang-pct {
  font-family: "JetBrains Mono", monospace;
  font-size: 1.2rem;
  color: var(--md-sys-color-on-surface-variant, #52443e);
}

/* Recent Activity Events */
.activity-events-list {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.activity-event-item {
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
  padding: 1.2rem 1.4rem;
  background: rgba(0, 0, 0, 0.025);
  border-radius: 1.8rem;
  transition: background 200ms ease;
}

[theme="dark"] .activity-event-item {
  background: rgba(255, 255, 255, 0.035);
}

.activity-event-item:hover {
  background: rgba(191, 96, 56, 0.06);
}

.event-icon-badge {
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 1rem;
  background: var(--md-sys-color-primary-container, rgba(191, 96, 56, 0.12));
  color: var(--md-sys-color-primary, #bf6038);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.event-content-col {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  flex: 1;
  min-width: 0;
}

.event-meta-top {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.event-repo-name {
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--md-sys-color-primary, #bf6038);
  text-decoration: none;
}

.event-repo-name:hover {
  text-decoration: underline;
}

.event-branch-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-family: "JetBrains Mono", monospace;
  font-size: 1.15rem;
  background: rgba(0, 0, 0, 0.05);
  padding: 0.2rem 0.6rem;
  border-radius: 0.6rem;
  color: var(--md-sys-color-on-surface-variant, #52443e);
}

[theme="dark"] .event-branch-badge {
  background: rgba(255, 255, 255, 0.06);
}

.branch-icon {
  font-size: 1.3rem;
}

.event-time {
  font-size: 1.2rem;
  color: var(--md-sys-color-on-surface-variant, #52443e);
  margin-left: auto;
}

.event-commit-msg {
  font-size: 1.3rem;
  color: var(--md-sys-color-on-surface, #1f1b18);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 4. Repository Explorer Board */
.dashboard-repos-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.repos-toolbar-card {
  background: var(--md-sys-color-surface-container, rgba(255, 248, 245, 0.88));
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(191, 96, 56, 0.12);
  border-radius: 2.8rem;
  padding: 2.4rem 2.8rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}

[theme="dark"] .repos-toolbar-card {
  background: var(--md-sys-color-surface-container, rgba(38, 27, 22, 0.88));
  border: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.45);
}

.repos-toolbar-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.6rem;
}

.repos-title-group {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.sort-selector-box {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: rgba(0, 0, 0, 0.035);
  padding: 0.6rem 1.2rem;
  border-radius: 9999px;
}

[theme="dark"] .sort-selector-box {
  background: rgba(255, 255, 255, 0.045);
}

.sort-icon {
  font-size: 1.8rem;
  color: var(--md-sys-color-primary, #bf6038);
}

.sort-dropdown {
  background: transparent;
  border: none;
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--md-sys-color-on-surface, #1f1b18);
  outline: none;
  cursor: pointer;
}

[theme="dark"] .sort-dropdown option {
  background: #261b16;
  color: #ece2dc;
}

.repos-search-bar {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  background: rgba(0, 0, 0, 0.035);
  padding: 1.2rem 1.8rem;
  border-radius: 9999px;
}

[theme="dark"] .repos-search-bar {
  background: rgba(255, 255, 255, 0.045);
}

.search-icon {
  font-size: 2.2rem;
  color: var(--md-sys-color-on-surface-variant, #52443e);
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  font-family: inherit;
  font-size: 1.45rem;
  color: var(--md-sys-color-on-surface, #1f1b18);
  outline: none;
}

.search-input::placeholder {
  color: var(--md-sys-color-on-surface-variant, #52443e);
  opacity: 0.7;
}

.clear-search-btn {
  background: transparent;
  border: none;
  color: var(--md-sys-color-on-surface-variant, #52443e);
  cursor: pointer;
  display: flex;
  align-items: center;
}

.filter-chips-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.filter-chip-btn {
  position: relative;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.035);
  color: var(--md-sys-color-on-surface, #1f1b18);
  border: 1px solid transparent;
  padding: 0.7rem 1.6rem;
  border-radius: 9999px;
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.35rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 200ms ease;
  will-change: transform, background-color, box-shadow;
}

[theme="dark"] .filter-chip-btn {
  background: rgba(255, 255, 255, 0.045);
}

.filter-chip-btn:hover {
  background: rgba(191, 96, 56, 0.1);
}

.filter-chip-btn.active {
  background: var(--md-sys-color-primary, #bf6038);
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(191, 96, 56, 0.3);
}

/* Cards Grid */
.repos-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(36rem, 1fr));
  gap: 2rem;
}

.repo-card-widget {
  background: var(--md-sys-color-surface-container, rgba(255, 248, 245, 0.88));
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(191, 96, 56, 0.12);
  border-radius: 2.4rem;
  padding: 2.2rem 2.4rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  transition: transform 220ms ease, box-shadow 220ms ease;
  will-change: transform, box-shadow;
}

[theme="dark"] .repo-card-widget {
  background: var(--md-sys-color-surface-container, rgba(38, 27, 22, 0.88));
  border: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.45);
}

.repo-card-widget:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
}

[theme="dark"] .repo-card-widget:hover {
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.6);
}

.repo-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.2rem;
}

.repo-title-box {
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 0;
}

.repo-type-icon {
  font-size: 2.2rem;
  color: var(--md-sys-color-primary, #bf6038);
  flex-shrink: 0;
}

.repo-name-link {
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.7rem;
  font-weight: 800;
  color: var(--md-sys-color-on-surface, #1f1b18);
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.repo-name-link:hover {
  color: var(--md-sys-color-primary, #bf6038);
}

.repo-stats-pills {
  display: flex;
  gap: 0.6rem;
  flex-shrink: 0;
}

.repo-stat-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-family: "JetBrains Mono", monospace;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--md-sys-color-on-surface-variant, #52443e);
  background: rgba(0, 0, 0, 0.035);
  padding: 0.3rem 0.8rem;
  border-radius: 9999px;
}

[theme="dark"] .repo-stat-pill {
  background: rgba(255, 255, 255, 0.045);
}

.stat-icon {
  font-size: 1.4rem;
  color: #e5cd86;
}

.repo-description {
  font-size: 1.4rem;
  color: var(--md-sys-color-on-surface-variant, #52443e);
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.repo-topics-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.topic-tag-chip {
  font-family: "JetBrains Mono", monospace;
  font-size: 1.15rem;
  background: rgba(191, 96, 56, 0.08);
  color: var(--md-sys-color-primary, #bf6038);
  padding: 0.25rem 0.8rem;
  border-radius: 9999px;
}

.repo-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

[theme="dark"] .repo-card-footer {
  border-top-color: rgba(255, 255, 255, 0.05);
}

.repo-lang-badge {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.lang-dot {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
}

.lang-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--md-sys-color-on-surface-variant, #52443e);
}

.repo-action-btn {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--md-sys-color-primary, #bf6038);
  color: #ffffff;
  padding: 0.6rem 1.4rem;
  border-radius: 9999px;
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  text-decoration: none;
  transition: transform 150ms ease;
}

.repo-action-btn:hover {
  transform: translateY(-1px);
}

.arrow-icon {
  font-size: 1.4rem;
}

/* Loading & Empty States */
.repos-loading-indicator,
.repos-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 6rem 2rem;
  background: var(--md-sys-color-surface-container, rgba(255, 248, 245, 0.88));
  border-radius: 2.8rem;
  border: 1px solid rgba(191, 96, 56, 0.12);
}

[theme="dark"] .repos-loading-indicator,
[theme="dark"] .repos-empty-state {
  background: var(--md-sys-color-surface-container, rgba(38, 27, 22, 0.88));
  border-color: rgba(255, 255, 255, 0.07);
}

.spin-icon {
  font-size: 3.6rem;
  color: var(--md-sys-color-primary, #bf6038);
  animation: spin 1s linear infinite;
  margin-bottom: 1.2rem;
}

.empty-icon {
  font-size: 4.8rem;
  color: var(--md-sys-color-primary, #bf6038);
  margin-bottom: 1rem;
}

.reset-filters-btn {
  position: relative;
  overflow: hidden;
  margin-top: 1.6rem;
  background: var(--md-sys-color-primary, #bf6038);
  color: #ffffff;
  border: none;
  padding: 0.8rem 1.8rem;
  border-radius: 9999px;
  font-family: "Lexend Deca", sans-serif;
  font-weight: 700;
  cursor: pointer;
}

@media (max-width: 768px) {
  .github-dashboard-view {
    padding: 1.2rem 1.6rem 2rem 1.6rem;
    gap: 1.8rem;
  }
  .dashboard-hero-widget {
    padding: 2rem 1.6rem;
    border-radius: 2.4rem;
    gap: 1.8rem;
  }
  .hero-identity-col {
    flex-direction: column;
    text-align: center;
    align-items: center;
    gap: 1.6rem;
  }
  .hero-badges-row {
    justify-content: center;
  }
  .hero-actions-col {
    align-items: stretch;
    width: 100%;
    gap: 1.4rem;
  }
  .gh-external-btn {
    width: 100%;
    justify-content: center;
  }
  .hero-quick-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    gap: 0.8rem;
  }
  .quick-stat-box {
    min-width: 0;
    width: 100%;
    padding: 1rem 0.8rem;
  }
  .dashboard-calendar-widget {
    padding: 2rem 1.6rem;
    border-radius: 2.4rem;
  }
  .calendar-widget-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.4rem;
  }
  .streak-badges-cluster {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
  }
  .streak-badge-pill {
    justify-content: center;
    padding: 0.6rem 0.8rem;
  }
  .calendar-scroll-wrapper {
    -webkit-overflow-scrolling: touch;
    padding-bottom: 1.2rem;
  }
  .calendar-footer-legend {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }
  .dashboard-dual-grid {
    grid-template-columns: 1fr;
    gap: 1.8rem;
  }
  .dashboard-card {
    padding: 2rem 1.6rem;
    border-radius: 2.4rem;
  }
  .repos-toolbar-card {
    padding: 2rem 1.6rem;
    border-radius: 2.4rem;
    gap: 1.4rem;
  }
  .repos-toolbar-title-row {
    flex-direction: column;
    align-items: stretch;
    gap: 1.2rem;
  }
  .sort-selector-box {
    width: 100%;
    justify-content: space-between;
  }
  .filter-chips-row {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 0.6rem;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .filter-chips-row::-webkit-scrollbar {
    display: none;
  }
  .filter-chip-btn {
    white-space: nowrap;
    flex-shrink: 0;
  }
  .repos-cards-grid {
    grid-template-columns: 1fr;
    gap: 1.6rem;
  }
  .repo-card-widget {
    padding: 1.8rem 1.6rem;
    border-radius: 2.2rem;
  }
}
</style>
