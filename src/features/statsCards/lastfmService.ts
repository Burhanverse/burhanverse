import { LastFmSummary, LastFmTrack } from "./types";

const API_BASE = "https://ws.audioscrobbler.com/2.0/";

type RecentTracksResponse = {
  recenttracks?: {
    track?:
      | Array<{
          name: string;
          artist: { "#text": string } | string;
          album: { "#text": string };
          image?: Array<{ "#text": string }>;
          url: string;
          "@attr"?: { nowplaying?: string };
        }>
      | {
          name: string;
          artist: { "#text": string } | string;
          album: { "#text": string };
          image?: Array<{ "#text": string }>;
          url: string;
          "@attr"?: { nowplaying?: string };
        };
  };
};

type UserInfoResponse = {
  user?: {
    playcount?: string;
  };
};

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Last.fm request failed (${response.status})`);
  }

  return (await response.json()) as T;
}

function extractTrack(
  data: RecentTracksResponse["recenttracks"],
): LastFmTrack | null {
  if (!data?.track) return null;

  const track = Array.isArray(data.track) ? data.track[0] : data.track;
  if (!track) return null;

  const artist =
    typeof track.artist === "string"
      ? track.artist
      : (track.artist?.["#text"] ?? "Unknown");
  const album = track.album?.["#text"] ?? "Unknown Album";
  const image =
    track.image?.[3]?.["#text"] ?? track.image?.[2]?.["#text"] ?? "";
  const nowPlaying = track["@attr"]?.nowplaying === "true";

  return {
    name: track.name,
    artist,
    album,
    image,
    url: track.url,
    nowPlaying,
  };
}

export async function fetchLastFmSummary(
  username: string,
  apiKey: string,
): Promise<LastFmSummary> {
  if (!username || !apiKey) {
    throw new Error("Missing Last.fm credentials");
  }

  const params = new URLSearchParams({
    user: username,
    api_key: apiKey,
    format: "json",
  });

  const [recent, userInfo] = await Promise.all([
    fetchJson<RecentTracksResponse>(
      `${API_BASE}?${params.toString()}&method=user.getrecenttracks&limit=1`,
    ),
    fetchJson<UserInfoResponse>(
      `${API_BASE}?${params.toString()}&method=user.getinfo`,
    ),
  ]);

  return {
    track: extractTrack(recent.recenttracks),
    playcount: Number(userInfo.user?.playcount ?? 0),
    username,
  };
}
