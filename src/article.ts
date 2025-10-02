/**
 * Article page functionality
 */

import { BlogPost } from './blog';

export interface ArticleContent {
  id: number;
  sections: ArticleSection[];
}

export interface ArticleSection {
  type: 'heading' | 'paragraph' | 'code' | 'image' | 'list';
  content: string | string[];
  language?: string; // for code blocks
  alt?: string; // for images
}

// Article content for each blog post
const articleContents: Record<number, ArticleContent> = {
  1: {
    id: 1,
    sections: [
      {
        type: 'heading',
        content: 'Introduction to Material Design 3'
      },
      {
        type: 'paragraph',
        content: 'Material Design 3 is the latest evolution of Google\'s design system, introducing a more personal and adaptive approach to design. It builds upon the foundations of Material Design while adding new features like dynamic color, improved accessibility, and enhanced customization options.'
      },
      {
        type: 'heading',
        content: 'Key Features'
      },
      {
        type: 'list',
        content: [
          'Dynamic Color: Automatically generates color schemes from wallpapers',
          'Enhanced Typography: Better readability and visual hierarchy',
          'Improved Components: More flexible and customizable UI elements',
          'Accessibility First: Built-in support for accessibility standards',
          'Cross-platform Consistency: Works seamlessly across devices'
        ]
      },
      {
        type: 'heading',
        content: 'Dynamic Color System'
      },
      {
        type: 'paragraph',
        content: 'One of the most exciting features of Material Design 3 is the dynamic color system. This allows your app to automatically generate a color palette based on the user\'s wallpaper or a source color, creating a personalized experience.'
      },
      {
        type: 'code',
        content: `// Example: Generating a color scheme
const theme = {
  primary: 'var(--md-sys-color-primary)',
  onPrimary: 'var(--md-sys-color-on-primary)',
  primaryContainer: 'var(--md-sys-color-primary-container)',
  onPrimaryContainer: 'var(--md-sys-color-on-primary-container)'
};`,
        language: 'javascript'
      },
      {
        type: 'heading',
        content: 'Implementation Tips'
      },
      {
        type: 'paragraph',
        content: 'When implementing Material Design 3 in your projects, start with the color system and typography. These foundational elements will guide the rest of your design decisions. Use the official Material Theme Builder to generate your color palettes and ensure consistency across your application.'
      },
      {
        type: 'paragraph',
        content: 'Remember to test your designs with different color schemes and in both light and dark modes to ensure a great experience for all users.'
      }
    ]
  },
  2: {
    id: 2,
    sections: [
      {
        type: 'heading',
        content: 'Why TypeScript?'
      },
      {
        type: 'paragraph',
        content: 'TypeScript has become an essential tool for modern web development. It adds static typing to JavaScript, catching errors at compile-time rather than runtime, and provides better tooling support through intelligent code completion and refactoring.'
      },
      {
        type: 'heading',
        content: 'Core Benefits'
      },
      {
        type: 'list',
        content: [
          'Type Safety: Catch errors before they reach production',
          'Better IDE Support: Enhanced autocomplete and IntelliSense',
          'Improved Refactoring: Rename symbols safely across your codebase',
          'Self-Documenting Code: Types serve as inline documentation',
          'Easier Maintenance: Large codebases become more manageable'
        ]
      },
      {
        type: 'heading',
        content: 'Getting Started'
      },
      {
        type: 'paragraph',
        content: 'Setting up TypeScript in your project is straightforward. You can add it to an existing JavaScript project or start fresh with a TypeScript template.'
      },
      {
        type: 'code',
        content: `// Installing TypeScript
npm install -D typescript

// Creating a tsconfig.json
npx tsc --init

// Basic TypeScript example
interface User {
  id: number;
  name: string;
  email: string;
}

function greetUser(user: User): string {
  return \`Hello, \${user.name}!\`;
}`,
        language: 'typescript'
      },
      {
        type: 'heading',
        content: 'Best Practices'
      },
      {
        type: 'paragraph',
        content: 'Start by enabling strict mode in your tsconfig.json. This will catch more potential errors and encourage better coding practices. Use interfaces and types to define your data structures clearly, and leverage TypeScript\'s utility types for common patterns.'
      },
      {
        type: 'paragraph',
        content: 'Don\'t be afraid to use "any" sparingly when you\'re first migrating a project, but make it a goal to replace these with proper types over time. The investment in typing your code pays dividends in reduced bugs and improved developer experience.'
      }
    ]
  },
  3: {
    id: 3,
    sections: [
      {
        type: 'heading',
        content: 'The Art of Animation'
      },
      {
        type: 'paragraph',
        content: 'Animations bring life to user interfaces, providing visual feedback and guiding users through interactions. When done well, they enhance usability and create delightful experiences. However, poorly executed animations can frustrate users and harm performance.'
      },
      {
        type: 'heading',
        content: 'Animation Principles'
      },
      {
        type: 'list',
        content: [
          'Purpose: Every animation should have a clear purpose',
          'Duration: Keep animations short (200-400ms for most UI)',
          'Easing: Use appropriate easing functions for natural motion',
          'Performance: Animate transform and opacity for best performance',
          'Accessibility: Respect prefers-reduced-motion settings'
        ]
      },
      {
        type: 'heading',
        content: 'CSS Transitions'
      },
      {
        type: 'paragraph',
        content: 'CSS transitions are the simplest way to add smooth animations to your UI. They\'re performant and easy to implement for common use cases like hover effects and state changes.'
      },
      {
        type: 'code',
        content: `/* Example: Smooth hover effect */
.button {
  background-color: var(--primary);
  transition: all 200ms cubic-bezier(0.420, 0.000, 0.580, 1.000);
}

.button:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Respecting user preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`,
        language: 'css'
      },
      {
        type: 'heading',
        content: 'Performance Tips'
      },
      {
        type: 'paragraph',
        content: 'For the best performance, stick to animating transform and opacity properties. These properties are handled by the GPU and won\'t trigger layout recalculations. Avoid animating properties like width, height, top, or left, as these force the browser to reflow the page.'
      },
      {
        type: 'code',
        content: `// Good: GPU-accelerated properties
.element {
  transition: transform 300ms, opacity 300ms;
}

// Avoid: These trigger layout recalculation
.element {
  transition: width 300ms, height 300ms, top 300ms;
}`,
        language: 'css'
      },
      {
        type: 'paragraph',
        content: 'Use the will-change property sparingly to hint to the browser which properties will animate, but remember to remove it after the animation completes to avoid performance issues.'
      }
    ]
  }
};

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
 * Get blog post data by ID
 */
export function getBlogPostById(id: number): BlogPost | null {
  // This would typically come from your blog.ts data
  // For now, we'll reconstruct it from the article content
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Getting Started with Material Design 3',
      description: 'An introduction to Material Design 3 principles and how to implement them in your projects.',
      date: '2024-09-15',
      image: '/img/project1.webp',
      link: '#',
      tags: ['Design', 'Material Design']
    },
    {
      id: 2,
      title: 'Building Modern Web Apps with TypeScript',
      description: 'Learn how TypeScript can improve your web development workflow and code quality.',
      date: '2024-08-20',
      image: '/img/project2.webp',
      link: '#',
      tags: ['TypeScript', 'Web Development']
    },
    {
      id: 3,
      title: 'Creating Beautiful UI Animations',
      description: 'Tips and tricks for creating smooth, performant animations in web applications.',
      date: '2024-07-10',
      image: '/img/project3.webp',
      link: '#',
      tags: ['CSS', 'Animations']
    }
  ];

  return blogPosts.find(post => post.id === id) || null;
}

/**
 * Render the full article page
 */
export function renderArticle(articleId: number): void {
  const articleContent = articleContents[articleId];
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
