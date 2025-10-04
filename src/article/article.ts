/**
 * Article page functionality
 */

import { ArticleSection } from "../types";
import { getArticleBySlug } from "../blog/index";
import { getBlogPostBySlug } from "../blog/posts";
import Prism from "prismjs";

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
        <div class="footer-actions">
          <button class="clickable md-action-button back-to-blog">
            <svg class="back-arrow-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z"/>
            </svg>
          </button>

          <button class="clickable md-action-button home-button">
            <svg class="home-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
          </button>
        </div>
      </footer>
    </article>
  `;

  // Apply syntax highlighting after DOM update
  setTimeout(() => {
    Prism.highlightAll();
  }, 0);

  // Setup copy buttons after rendering
  initializeCopyButtons();
  
  // Setup navigation buttons
  setTimeout(() => {
    // Back to blog button - navigates to blog tab
    const backButton = document.querySelector<HTMLButtonElement>(".back-to-blog");
    if (backButton) {
      backButton.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "/?section=blog";
      });
    }

    // Home button
    const homeButton = document.querySelector<HTMLButtonElement>(".home-button");
    if (homeButton) {
      homeButton.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "/";
      });
    }
  }, 0);
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
}

// Auto-initialize if on article page
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeArticlePage);
} else {
  initializeArticlePage();
}
