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
}

export interface LastFmSummary {
  track: LastFmTrack | null;
  playcount: number;
  username: string;
}
