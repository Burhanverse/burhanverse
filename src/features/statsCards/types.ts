export interface LanguageStat {
  name: string;
  percentage: number;
  color: string;
}

export interface GitHubOverview {
  totalStars: number;
  totalRepos: number;
  followers: number;
  following: number;
  publicGists: number;
  totalForks: number;
  contributions: number;
  currentStreak: number;
  longestStreak: number;
  languageStats: LanguageStat[];
  accountCreatedAt: string;
}

export interface LastFmTrack {
  name: string;
  artist: string;
  album: string;
  image: string;
  url: string;
  nowPlaying: boolean;
  playedAt?: string;
}

export interface LastFmSummary {
  track: LastFmTrack | null;
  playcount: number;
  username: string;
}

export interface AnilistMediaList {
  count: number;
  meanScore: number;
  chapters?: number; // For manga
  episodes?: number; // For anime
}

export interface AnilistStats {
  totalWatchedAnimeEpisodes: number;
  totalCompletedAnime: number;
  totalCompletedMangaChapters: number;
  totalCompletedManga: number;
  meanScoreAnime: number;
  meanScoreManga: number;
  daysWatched: number;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionWeek {
  days: ContributionDay[];
}

export interface ContributionCalendarData {
  totalContributions: number;
  weeks: ContributionWeek[];
  months: Array<{
    name: string;
    firstWeekIndex: number;
  }>;
  currentStreak: number;
  longestStreak: number;
}

export interface GitHubActivityEvent {
  id: string;
  type: string;
  repoName: string;
  repoUrl: string;
  createdAt: string;
  payloadAction?: string;
  commitCount?: number;
  commitMessage?: string;
  branch?: string;
}
