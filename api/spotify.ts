/**
 * Serverless function to get Spotify now playing
 * Works with Vercel, Netlify, or any Node.js serverless platform
 * 
 * Environment variables needed:
 * - SPOTIFY_CLIENT_ID
 * - SPOTIFY_CLIENT_SECRET
 * - SPOTIFY_REFRESH_TOKEN
 */

const SPOTIFY_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const SPOTIFY_NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

/**
 * Get access token using refresh token
 */
async function getAccessToken(clientId: string, clientSecret: string, refreshToken: string): Promise<string> {
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  
  const response = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to get access token');
  }

  const data: SpotifyTokenResponse = await response.json();
  return data.access_token;
}

/**
 * Get currently playing track
 */
async function getNowPlaying(accessToken: string) {
  const response = await fetch(SPOTIFY_NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 204 || response.status === 202) {
    // Not playing anything
    return { isPlaying: false };
  }

  if (!response.ok) {
    throw new Error('Failed to get now playing');
  }

  const data = await response.json();

  if (!data.item) {
    return { isPlaying: false };
  }

  return {
    isPlaying: data.is_playing,
    title: data.item.name,
    artist: data.item.artists.map((artist: any) => artist.name).join(', '),
    album: data.item.album.name,
    albumArt: data.item.album.images[0]?.url || '',
    songUrl: data.item.external_urls.spotify,
    progress: data.progress_ms,
    duration: data.item.duration_ms,
  };
}

/**
 * Main handler for Vercel/Netlify
 */
export default async function handler(req: any, res: any) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken) {
      res.status(500).json({ 
        error: 'Spotify credentials not configured',
        isPlaying: false 
      });
      return;
    }

    const accessToken = await getAccessToken(clientId, clientSecret, refreshToken);
    const nowPlaying = await getNowPlaying(accessToken);

    res.status(200).json(nowPlaying);
  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    res.status(500).json({ 
      error: 'Failed to fetch Spotify data',
      isPlaying: false 
    });
  }
}
