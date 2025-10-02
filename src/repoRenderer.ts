import type { Repository } from './types';

export class RepoRenderer {
  private container: HTMLElement;

  constructor(containerSelector: string) {
    const element = document.querySelector(containerSelector);
    if (!element) {
      throw new Error(`Container element '${containerSelector}' not found`);
    }
    this.container = element as HTMLElement;
  }

  /**
   * Clear all repositories from the container
   */
  clear(): void {
    this.container.innerHTML = '';
  }

  /**
   * Show loading state
   */
  showLoading(): void {
    this.container.innerHTML = `
      <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
        <p>Loading repositories...</p>
      </div>
    `;
  }

  /**
   * Show error message
   */
  showError(message: string): void {
    this.container.innerHTML = `
      <div style="text-align: center; padding: 2rem; color: var(--error-color, #f44336);">
        <p>❌ ${message}</p>
      </div>
    `;
  }

  /**
   * Render a single repository
   */
  private renderRepo(repo: Repository): string {
    const description = repo.description || '<i>No Description</i>';
    const language = repo.language || '';
    
    return `
      <a class="clickable repo-wrapper" href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
        <div class="repo-infos">
          <p class="repo-title">${this.escapeHtml(repo.name)}</p>
          <p class="repo-desc">${this.escapeHtml(description)}</p>
          <div class="repo-metadata">
            ${language ? `<p class="repo-language">${this.escapeHtml(language)}</p>` : ''}
            <span class="material-symbols-rounded">&#xe90e;</span>
            <p class="metadata-text">${repo.stargazers_count}</p>
            <span class="material-symbols-rounded">&#xe903;</span>
            <p class="metadata-text">${repo.forks_count}</p>
          </div>
        </div>
      </a>
    `;
  }

  /**
   * Render multiple repositories
   */
  renderRepos(repos: Repository[]): void {
    if (repos.length === 0) {
      this.container.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
          <p>No repositories found.</p>
        </div>
      `;
      return;
    }

    const html = repos.map(repo => this.renderRepo(repo)).join('');
    this.container.innerHTML = html;
  }

  /**
   * Escape HTML to prevent XSS
   */
  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}
