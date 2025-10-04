/**
 * Article page functionality
 */

import { ArticleSection } from "../types";
import { getArticleBySlug } from "../blog/index";
import { getBlogPostBySlug } from "../blog/posts";
import Prism from "prismjs";
import { updateClock } from "../features/clock";
import { initCustomCursor } from "../features/customCursor";
import { themeToggle } from "../core/theme";

// Import Prism languages
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-markdown";

/**
 * Render article section based on type
 */
function renderSection(section: ArticleSection): string {
  switch (section.type) {
    case "heading":
      return `<h2 class="article-heading">${section.content}</h2>`;

    case "paragraph":
      return `<p class="article-paragraph">${section.content}</p>`;

    case "code":
      const language = section.language || "plaintext";
      const codeId = `code-${Math.random().toString(36).substr(2, 9)}`;
      return `
        <div class="article-code-block">
          <div class="code-header">
            <span class="code-language">${language}</span>
            <button class="code-copy-btn clickable" data-code-id="${codeId}" aria-label="Copy code">
              <svg class="copy-icon" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
              </svg>
              <svg class="check-icon" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="display: none;">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              <span class="copy-text">Copy</span>
            </button>
          </div>
          <pre><code id="${codeId}" class="language-${language}">${escapeHtml(section.content as string)}</code></pre>
        </div>
      `;

    case "image":
      return `
        <figure class="article-image">
          <img src="${section.content}" alt="${section.alt || "Article image"}" loading="lazy">
          ${section.alt ? `<figcaption>${section.alt}</figcaption>` : ""}
        </figure>
      `;

    case "list":
      const items = (section.content as string[])
        .map((item) => `<li>${item}</li>`)
        .join("");
      return `<ul class="article-list">${items}</ul>`;

    default:
      return "";
  }
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Render the full article page
 */
export function renderArticle(articleSlug: string): void {
  const articleContent = getArticleBySlug(articleSlug);
  const blogPost = getBlogPostBySlug(articleSlug);

  if (!articleContent || !blogPost) {
    console.error(`Article "${articleSlug}" not found`);
    return;
  }

  const articleContainer =
    document.querySelector<HTMLElement>(".article-content");
  if (!articleContainer) {
    console.error("Article container not found");
    return;
  }

  const formattedDate = new Date(blogPost.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const tagsHtml = blogPost.tags
    ? blogPost.tags
        .map((tag) => `<span class="article-tag">${tag}</span>`)
        .join("")
    : "";

  const sectionsHtml = articleContent.sections
    .map((section) => renderSection(section))
    .join("");

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
        <p class="footer-text">Made with ❤️ by Sid.</p>
        <p class="footer-copyright">
          <span class="material-symbols-rounded copyright-icon">copyright</span>
          <span>2025 <a href="https://github.com/Burhanverse" target="_blank" rel="noopener noreferrer" class="footer-link">@burhanverse</a></span>
        </p>
      </footer>
    </article>
  `;

  // Apply syntax highlighting after DOM update
  setTimeout(() => {
    Prism.highlightAll();
  }, 0);

  // Setup copy buttons after rendering
  initializeCopyButtons();
}

/**
 * Initialize copy buttons for code blocks
 */
function initializeCopyButtons(): void {
  const copyButtons =
    document.querySelectorAll<HTMLButtonElement>(".code-copy-btn");

  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const codeId = button.getAttribute("data-code-id");
      if (!codeId) return;

      const codeElement = document.getElementById(codeId);
      if (!codeElement) return;

      const code = codeElement.textContent || "";

      try {
        await navigator.clipboard.writeText(code);

        // Show success feedback
        const copyIcon = button.querySelector(".copy-icon") as SVGElement;
        const checkIcon = button.querySelector(".check-icon") as SVGElement;
        const copyText = button.querySelector(".copy-text") as HTMLSpanElement;

        if (copyIcon && checkIcon && copyText) {
          copyIcon.style.display = "none";
          checkIcon.style.display = "block";
          copyText.textContent = "Copied!";

          // Reset after 2 seconds
          setTimeout(() => {
            copyIcon.style.display = "block";
            checkIcon.style.display = "none";
            copyText.textContent = "Copy";
          }, 2000);
        }
      } catch (err) {
        console.error("Failed to copy code:", err);
      }
    });
  });
}

/**
 * Initialize article page from URL parameter
 */
export function initializeArticlePage(): void {
  const urlParams = new URLSearchParams(window.location.search);
  const articleSlug = urlParams.get("article");

  if (articleSlug) {
    renderArticle(articleSlug);
  }
  
  // Initialize page features
  initializePageFeatures();
}

/**
 * Initialize page features (clock, cursor, theme, navigation)
 */
function initializePageFeatures(): void {
  // Make themeToggle globally available
  (window as any).themeToggle = themeToggle;

  // Update clock
  updateClock();
  setInterval(updateClock, 1000);

  // Initialize custom cursor
  initCustomCursor();

  // Add click handler for mobile theme button
  const mobileThemeBtn = document.querySelector('.mobile-change-theme');
  if (mobileThemeBtn) {
    mobileThemeBtn.addEventListener('click', themeToggle);
  }

  // Initialize navigation
  initializeMobileNavigation();
  initializeDesktopNavigation();
  initializeNavIndicators();
}

/**
 * Initialize mobile navigation handlers
 */
function initializeMobileNavigation(): void {
  const mobileNavItems = {
    'mobile-home-icon': 'home',
    'mobile-repos-icon': 'repos',
    'mobile-blog-icon': 'blog',
    'mobile-contact-icon': 'contact'
  };

  Object.entries(mobileNavItems).forEach(([id, section]) => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('click', () => {
        // Just set localStorage - let the link's href handle navigation
        localStorage.setItem('page-section', section);
      });
    }
  });
}

/**
 * Initialize desktop navigation handlers
 */
function initializeDesktopNavigation(): void {
  // Handle navigation links with section parameter
  const navLinks = document.querySelectorAll('a[href^="/?section="]');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const url = new URL((link as HTMLAnchorElement).href);
      const section = url.searchParams.get('section');
      if (section) {
        // Just set localStorage - let the link's href handle navigation
        localStorage.setItem('page-section', section);
      }
    });
  });

  // Handle home link
  const homeLink = document.querySelector('a[href="/"]');
  if (homeLink && homeLink.getAttribute('href') === '/') {
    homeLink.addEventListener('click', () => {
      // Just set localStorage - let the link's href handle navigation
      localStorage.setItem('page-section', 'home');
    });
  }
}

/**
 * Update mobile nav indicator position
 */
function updateMobileNavIndicator(): void {
  const nav = document.querySelector('.mobile-nav');
  const selected = document.querySelector('.mobile-nav-item.selected');
  
  if (nav && selected) {
    const navRect = nav.getBoundingClientRect();
    const selectedRect = selected.getBoundingClientRect();
    const left = selectedRect.left - navRect.left;
    const width = selectedRect.width;
    
    (nav as HTMLElement).style.setProperty('--indicator-left', `${left}px`);
    (nav as HTMLElement).style.setProperty('--indicator-width', `${width}px`);
  }
}

/**
 * Update desktop nav indicator position
 */
function updateDesktopNavIndicator(): void {
  const navbarContainer = document.querySelector('.navbar-elements-container');
  const selectedIcon = document.querySelector('.icon-container.selected');
  
  if (navbarContainer && selectedIcon) {
    const iconClickable = selectedIcon.querySelector('.clickable');
    if (iconClickable) {
      const navRect = navbarContainer.getBoundingClientRect();
      const iconRect = iconClickable.getBoundingClientRect();
      const top = iconRect.top - navRect.top;
      
      (navbarContainer as HTMLElement).style.setProperty('--indicator-top', `${top}px`);
    }
  }
}

/**
 * Initialize navigation indicators
 */
function initializeNavIndicators(): void {
  // Initialize indicator positions
  setTimeout(() => {
    updateMobileNavIndicator();
    updateDesktopNavIndicator();
  }, 100);

  // Update on window resize
  window.addEventListener('resize', () => {
    updateMobileNavIndicator();
    updateDesktopNavIndicator();
  });
}

// Auto-initialize if on article page
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeArticlePage);
} else {
  initializeArticlePage();
}
