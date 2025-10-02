/**
 * Blog page functionality
 */

import { BlogPost } from './types';
import { getSortedBlogPosts } from './blog/posts';

/**
 * Render a single blog post card
 */
function renderBlogPost(post: BlogPost): string {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const tagsHtml = post.tags 
    ? `<div class="blog-post-tags">${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}</div>`
    : '';

  return `
    <article class="blog-post-element">
      <div class="blog-post-illustration" style="background-image: url('${post.image}')"></div>
      <div class="blog-post-informations">
        <div class="blog-post-meta">
          <span class="blog-post-date">${formattedDate}</span>
        </div>
        <h3 class="blog-post-title">${post.title}</h3>
        <p class="blog-post-description">${post.description}</p>
        ${tagsHtml}
      </div>
      <div class="blog-post-link-wrapper">
        <a class="clickable blog-read-more" aria-label="Read more about ${post.title}" href="${post.link}">
          <span class="blog-read-more-text">Read More</span>
          <svg class="blog-arrow-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z"/>
          </svg>
        </a>
      </div>
    </article>
  `;
}

/**
 * Render all blog posts to the page
 */
export function renderBlogPosts(): void {
  const blogListWrapper = document.querySelector<HTMLElement>('.blog-list-wrapper');
  
  if (!blogListWrapper) {
    console.error('Blog list wrapper not found');
    return;
  }

  // Get sorted posts (newest first)
  const sortedPosts = getSortedBlogPosts();

  // Render posts
  blogListWrapper.innerHTML = sortedPosts.map(post => renderBlogPost(post)).join('');
}

// Initialize blog posts when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderBlogPosts);
} else {
  renderBlogPosts();
}
