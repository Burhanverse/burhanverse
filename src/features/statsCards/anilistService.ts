import { AnilistStats } from "./types";

const ANILIST_API_URL = "https://graphql.anilist.co";

interface AnilistUserResponse {
  data: {
    User: {
      statistics: {
        anime: {
          count: number;
          episodesWatched: number;
          meanScore: number;
          minutesWatched: number;
        };
        manga: {
          count: number;
          chaptersRead: number;
          meanScore: number;
          volumesRead: number;
        };
      };
    };
  };
}

export async function fetchAnilistStats(username: string): Promise<AnilistStats> {
  const query = `
    query ($username: String) {
      User(name: $username) {
        statistics {
          anime {
            count
            episodesWatched
            meanScore
            minutesWatched
          }
          manga {
            count
            chaptersRead
            meanScore
            volumesRead
          }
        }
      }
    }
  `;

  const variables = {
    username,
  };

  const response = await fetch(ANILIST_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`Anilist API error: ${response.statusText}`);
  }

  const json = (await response.json()) as AnilistUserResponse;
  const userStats = json.data.User.statistics;

  const daysWatched = Math.floor(userStats.anime.minutesWatched / 1440);

  return {
    totalWatchedAnimeEpisodes: userStats.anime.episodesWatched,
    totalCompletedAnime: userStats.anime.count,
    totalCompletedMangaChapters: userStats.manga.chaptersRead,
    totalCompletedManga: userStats.manga.count,
    meanScoreAnime: userStats.anime.meanScore,
    meanScoreManga: userStats.manga.meanScore,
    daysWatched,
  };
}
