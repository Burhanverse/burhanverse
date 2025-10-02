/**
 * Stats cards for GitHub and Last.fm
 */

interface GitHubStats {
  totalStars: number;
  totalRepos: number;
  followers: number;
  following: number;
  publicGists: number;
  totalForks: number;
  contributions: number;
  languageStats: { name: string; percentage: number; color: string }[];
}

interface LastFmStats {
  recentTrack: {
    name: string;
    artist: string;
    album: string;
    image: string;
    url: string;
    nowPlaying: boolean;
  };
  playcount: number;
  username: string;
}

/**
 * Fetch total contributions since account creation using GitHub GraphQL API
 */
async function fetchGitHubContributions(username: string, accountCreatedAt: string): Promise<number> {
  try {
    const today = new Date();
    const createdDate = new Date(accountCreatedAt);
    
    // GitHub's GraphQL API only allows fetching 1 year at a time
    // So we need to fetch year by year and sum them up
    let totalContributions = 0;
    let currentYear = createdDate.getFullYear();
    const currentYearNow = today.getFullYear();
    
    while (currentYear <= currentYearNow) {
      const fromDate = currentYear === createdDate.getFullYear() 
        ? createdDate 
        : new Date(currentYear, 0, 1);
      
      const toDate = currentYear === currentYearNow 
        ? today 
        : new Date(currentYear, 11, 31, 23, 59, 59);
      
      const query = `
        query {
          user(login: "${username}") {
            contributionsCollection(from: "${fromDate.toISOString()}", to: "${toDate.toISOString()}") {
              contributionCalendar {
                totalContributions
              }
            }
          }
        }
      `;
      
      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_GITHUB_TOKEN || ''}`
        },
        body: JSON.stringify({ query })
      });
      
      const data = await response.json();
      
      if (data.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions !== undefined) {
        totalContributions += data.data.user.contributionsCollection.contributionCalendar.totalContributions;
      }
      
      currentYear++;
    }
    
    return totalContributions;
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error);
    return 0;
  }
}

/**
 * Fetch GitHub stats from API
 */
async function fetchGitHubStats(username: string): Promise<GitHubStats | null> {
  try {
    const userResponse = await fetch(`https://api.github.com/users/${username}`);
    const userData = await userResponse.json();
    
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    const reposData = await reposResponse.json();
    
    const totalStars = reposData.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);
    const totalForks = reposData.reduce((acc: number, repo: any) => acc + repo.forks_count, 0);
    
    // Calculate language statistics
    const languageCount: { [key: string]: number } = {};
    let totalSize = 0;
    
    reposData.forEach((repo: any) => {
      if (repo.language) {
        languageCount[repo.language] = (languageCount[repo.language] || 0) + (repo.size || 1);
        totalSize += repo.size || 1;
      }
    });
    
    const languageColors: { [key: string]: string } = {
      TypeScript: '#3178c6',
      JavaScript: '#f1e05a',
      Python: '#3572A5',
      Java: '#b07219',
      HTML: '#e34c26',
      CSS: '#563d7c',
      Go: '#00ADD8',
      Rust: '#dea584',
      C: '#555555',
      'C++': '#f34b7d',
      Ruby: '#701516',
      PHP: '#4F5D95'
    };
    
    const languageStats = Object.entries(languageCount)
      .map(([name, size]) => ({
        name,
        percentage: (size / totalSize) * 100,
        color: languageColors[name] || '#8257e5'
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 4); // Top 4 languages
    
    // Fetch total contributions since account creation
    const contributions = await fetchGitHubContributions(username, userData.created_at);
    
    return {
      totalStars,
      totalRepos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      publicGists: userData.public_gists,
      totalForks,
      contributions,
      languageStats
    };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return null;
  }
}



/**
 * Render GitHub stats card
 */
export function renderGitHubStatsCard(): string {
  return `
    <div class="stat-card github-stat-card">
      <div class="stat-card-header">
        <svg class="stat-card-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
        <h3 class="stat-card-title">GitHub Stats</h3>
      </div>
      <div class="stat-card-content" id="github-stats-content">
        <div class="stat-loading">Loading stats...</div>
      </div>
    </div>
  `;
}

/**
 * Fetch Last.fm stats
 */
async function fetchLastFmStats(username: string, apiKey: string): Promise<LastFmStats | null> {
  try {
    // Fetch recent tracks
    const recentTracksResponse = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`
    );
    const recentData = await recentTracksResponse.json();
    
    // Fetch user info for playcount
    const userInfoResponse = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${username}&api_key=${apiKey}&format=json`
    );
    const userInfo = await userInfoResponse.json();
    
    if (recentData.recenttracks && recentData.recenttracks.track) {
      const track = recentData.recenttracks.track[0] || recentData.recenttracks.track;
      const nowPlaying = track['@attr']?.nowplaying === 'true';
      
      return {
        recentTrack: {
          name: track.name,
          artist: typeof track.artist === 'string' ? track.artist : track.artist['#text'],
          album: track.album['#text'] || 'Unknown Album',
          image: track.image?.[3]?.['#text'] || track.image?.[2]?.['#text'] || '',
          url: track.url,
          nowPlaying
        },
        playcount: parseInt(userInfo.user.playcount) || 0,
        username
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching Last.fm stats:', error);
    return null;
  }
}

/**
 * Render Last.fm card
 */
export function renderLastFmCard(): string {
  return `
    <div class="stat-card lastfm-card">
      <div class="stat-card-header">
        <svg class="stat-card-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.599 17.211l-.881-2.393s-1.433 1.596-3.579 1.596c-1.9 0-3.249-1.652-3.249-4.296 0-3.385 1.691-4.596 3.43-4.596 2.418 0 3.188 1.567 3.849 3.567l.88 2.749c.88 2.666 2.529 4.81 7.281 4.81 3.409 0 5.719-1.044 5.719-3.793 0-2.227-1.273-3.381-3.643-3.891l-1.754-.379c-1.217-.269-1.572-.755-1.572-1.558 0-.9.715-1.423 1.88-1.423 1.273 0 1.953.469 2.057 1.618l2.867-.349c-.213-2.321-1.809-3.742-4.8-3.742-2.492 0-4.918 .94-4.918 4.078 0 1.938.883 3.173 3.233 3.702l1.809.391c1.359.304 1.821.856 1.821 1.663 0 1.002-.817 1.458-2.675 1.458-2.598 0-3.808-1.374-4.447-3.458l-.911-2.951c-1.156-3.629-3.004-4.866-6.286-4.866C2.72 3.129 0 5.516 0 9.989 0 14.064 2.161 17 6.043 17c2.885 0 4.556-1.789 4.556-1.789"/>
        </svg>
        <h3 class="stat-card-title">Last.fm</h3>
      </div>
      <div class="stat-card-content" id="lastfm-content">
        <div class="stat-loading">Loading music stats...</div>
      </div>
    </div>
  `;
}

/**
 * Update GitHub stats with real data
 */
/**
 * Update GitHub stats with real data
 */
async function updateGitHubStats(username: string): Promise<void> {
  const contentElement = document.querySelector('#github-stats-content');
  if (!contentElement) return;

  const stats = await fetchGitHubStats(username);
  
  if (stats) {
    const languageBars = stats.languageStats
      .map(lang => `
        <div class="language-bar" style="width: ${lang.percentage}%; background-color: ${lang.color};" title="${lang.name}: ${lang.percentage.toFixed(1)}%"></div>
      `)
      .join('');
    
    const languageList = stats.languageStats
      .map(lang => `
        <div class="language-item">
          <span class="language-dot" style="background-color: ${lang.color};"></span>
          <span class="language-name">${lang.name}</span>
          <span class="language-percent">${lang.percentage.toFixed(1)}%</span>
        </div>
      `)
      .join('');

    contentElement.innerHTML = `
      <div class="github-stats-wrapper">
        <div class="stat-grid-primary">
          <div class="stat-item-large">
            <div class="stat-value-large">${stats.totalStars}</div>
            <div class="stat-label"><span class="material-symbols-rounded">star</span> Total Stars</div>
          </div>
          <div class="stat-item-large">
            <div class="stat-value-large">${stats.totalRepos}</div>
            <div class="stat-label"><span class="material-symbols-rounded">folder</span> Repositories</div>
          </div>
        </div>
        
        <div class="stat-grid-secondary">
          <div class="stat-item-small">
            <span class="material-symbols-rounded stat-icon">group</span>
            <div>
              <div class="stat-value-small">${stats.followers}</div>
              <div class="stat-sublabel">Followers</div>
            </div>
          </div>
          <div class="stat-item-small">
            <span class="material-symbols-rounded stat-icon">call_split</span>
            <div>
              <div class="stat-value-small">${stats.totalForks}</div>
              <div class="stat-sublabel">Total Forks</div>
            </div>
          </div>
          <div class="stat-item-small">
            <span class="material-symbols-rounded stat-icon">description</span>
            <div>
              <div class="stat-value-small">${stats.publicGists}</div>
              <div class="stat-sublabel">Public Gists</div>
            </div>
          </div>
          <div class="stat-item-small">
            <span class="material-symbols-rounded stat-icon">emoji_events</span>
            <div>
              <div class="stat-value-small">${stats.contributions > 0 ? stats.contributions.toLocaleString() : 'N/A'}</div>
              <div class="stat-sublabel">Total Contributions</div>
            </div>
          </div>
        </div>
        
        <div class="language-stats">
          <div class="language-stats-header">
            <span class="material-symbols-rounded">code</span>
            <span>Top Languages</span>
          </div>
          <div class="language-progress-bar">
            ${languageBars}
          </div>
          <div class="language-list">
            ${languageList}
          </div>
        </div>
      </div>
    `;
  } else {
    contentElement.innerHTML = `
      <div class="stat-error">Failed to load stats</div>
    `;
  }
}



/**
 * Update Last.fm card with real data
 */
async function updateLastFmStats(username: string, apiKey: string): Promise<void> {
  const contentElement = document.querySelector('#lastfm-content');
  if (!contentElement) return;

  const stats = await fetchLastFmStats(username, apiKey);
  
  if (stats && stats.recentTrack) {
    const track = stats.recentTrack;
    const statusBadge = track.nowPlaying 
      ? '<span class="lastfm-live-badge">🔴 Now Playing</span>' 
      : '<span class="lastfm-recent-badge">Recently Played</span>';
    
    contentElement.innerHTML = `
      <div class="lastfm-track">
        ${track.image ? `<img src="${track.image}" alt="${track.album}" class="lastfm-album-art" />` : '<div class="lastfm-no-image"><span class="material-symbols-rounded">album</span></div>'}
        <div class="lastfm-track-info">
          ${statusBadge}
          <a href="${track.url}" target="_blank" rel="noopener noreferrer" class="lastfm-track-title">${track.name}</a>
          <p class="lastfm-track-artist">${track.artist}</p>
          <div class="lastfm-stats-row">
            <span class="lastfm-playcount">
              <span class="material-symbols-rounded">play_circle</span>
              ${stats.playcount.toLocaleString()} scrobbles
            </span>
          </div>
        </div>
      </div>
    `;
  } else {
    contentElement.innerHTML = `
      <div class="lastfm-not-playing">
        <span class="material-symbols-rounded lastfm-idle-icon">music_off</span>
        <p>No recent tracks</p>
      </div>
    `;
  }
}

/**
 * Initialize stats cards
 */
export function initializeStatsCards(): void {
  const statsContainer = document.querySelector('.stats-cards-wrapper');
  if (!statsContainer) return;

  // Render cards
  statsContainer.innerHTML = `
    <div class="stats-cards-title">My Stats</div>
    <div class="stats-cards-grid">
      ${renderGitHubStatsCard()}
      ${renderLastFmCard()}
    </div>
  `;

  // Update GitHub stats
  const githubUsername = import.meta.env.VITE_GITHUB_USERNAME || 'Burhanverse';
  updateGitHubStats(githubUsername);
  
  // Update Last.fm stats
  // Get a free API key from: https://www.last.fm/api/account/create
  const LASTFM_API_KEY = import.meta.env.VITE_LASTFM_API_KEY || '';
  const LASTFM_USERNAME = import.meta.env.VITE_LASTFM_USERNAME || '';
  
  if (LASTFM_API_KEY && LASTFM_USERNAME) {
    updateLastFmStats(LASTFM_USERNAME, LASTFM_API_KEY);
  } else {
    // Show setup instructions if no API key
    const contentElement = document.querySelector('#lastfm-content');
    if (contentElement) {
      contentElement.innerHTML = `
        <div class="lastfm-setup">
          <span class="material-symbols-rounded">info</span>
          <p>Set up Last.fm API key in .env file</p>
          <p style="font-size: 1.2rem; margin-top: 0.8rem; opacity: 0.8;">Check .env.example for details</p>
        </div>
      `;
    }
  }
}
