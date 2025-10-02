/**
 * Article page functionality
 */

import { ArticleSection } from './types';
import { getArticleById } from './blog/index';
import { getBlogPostById } from './blog/posts';

/**
 * Render article section based on type
 */
function renderSection(section: ArticleSection): string {
  switch (section.type) {
    case 'heading':
      return `<h2 class="article-heading">${section.content}</h2>`;
    
    case 'paragraph':
      return `<p class="article-paragraph">${section.content}</p>`;
    
    case 'code':
      const language = section.language || 'plaintext';
      return `
        <div class="article-code-block">
          <div class="code-header">
            <span class="code-language">${language}</span>
          </div>
          <pre><code class="language-${language}">${escapeHtml(section.content as string)}</code></pre>
        </div>
      `;
    
    case 'image':
      return `
        <figure class="article-image">
          <img src="${section.content}" alt="${section.alt || 'Article image'}" loading="lazy">
          ${section.alt ? `<figcaption>${section.alt}</figcaption>` : ''}
        </figure>
      `;
    
    case 'list':
      const items = (section.content as string[]).map(item => `<li>${item}</li>`).join('');
      return `<ul class="article-list">${items}</ul>`;
    
    default:
      return '';
  }
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Render the full article page
 */
export function renderArticle(articleId: number): void {
  const articleContent = getArticleById(articleId);
  const blogPost = getBlogPostById(articleId);
  
  if (!articleContent || !blogPost) {
    console.error(`Article ${articleId} not found`);
    return;
  }

  const articleContainer = document.querySelector<HTMLElement>('.article-content');
  if (!articleContainer) {
    console.error('Article container not found');
    return;
  }

  const formattedDate = new Date(blogPost.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const tagsHtml = blogPost.tags 
    ? blogPost.tags.map(tag => `<span class="article-tag">${tag}</span>`).join('')
    : '';

  const sectionsHtml = articleContent.sections.map(section => renderSection(section)).join('');

  articleContainer.innerHTML = `
    <article class="article-wrapper">
      <header class="article-header">
        <div class="article-meta">
          <time class="article-date" datetime="${blogPost.date}">${formattedDate}</time>
          <div class="article-tags">${tagsHtml}</div>
        </div>
        <h1 class="article-title">${blogPost.title}</h1>
        <p class="article-description">${blogPost.description}</p>
        <div class="article-hero-image" style="background-image: url('${blogPost.image}')"></div>
      </header>
      
      <div class="article-body">
        ${sectionsHtml}
      </div>

      <footer class="article-footer">
        <button class="clickable back-to-blog" onclick="window.history.back()">
          <svg class="back-arrow-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z"/>
          </svg>
          <span>Back to Blog</span>
        </button>
      </footer>
    </article>
  `;
}

/**
 * Initialize article page from URL parameter
 */
export function initializeArticlePage(): void {
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get('article');
  
  if (articleId) {
    const id = parseInt(articleId, 10);
    if (!isNaN(id)) {
      renderArticle(id);
    }
  }
}

// Auto-initialize if on article page
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeArticlePage);
} else {
  initializeArticlePage();
}
