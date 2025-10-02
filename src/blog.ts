/**
 * Blog page functionality
 */

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  link: string;
  tags?: string[];
}

// Sample blog posts - replace with actual data source
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Getting Started with Material Design 3',
    description: 'An introduction to Material Design 3 principles and how to implement them in your projects.',
    date: '2024-09-15',
    image: '/img/project1.webp',
    link: '/article.html?article=1',
    tags: ['Design', 'Material Design']
  },
  {
    id: 2,
    title: 'Building Modern Web Apps with TypeScript',
    description: 'Learn how TypeScript can improve your web development workflow and code quality.',
    date: '2024-08-20',
    image: '/img/project2.webp',
    link: '/article.html?article=2',
    tags: ['TypeScript', 'Web Development']
  },
  {
    id: 3,
    title: 'Creating Beautiful UI Animations',
    description: 'Tips and tricks for creating smooth, performant animations in web applications.',
    date: '2024-07-10',
    image: '/img/project3.webp',
    link: '/article.html?article=3',
    tags: ['CSS', 'Animations']
  }
];

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

  // Sort posts by date (newest first)
  const sortedPosts = [...blogPosts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Render posts
  blogListWrapper.innerHTML = sortedPosts.map(post => renderBlogPost(post)).join('');
}

// Initialize blog posts when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderBlogPosts);
} else {
  renderBlogPosts();
}
