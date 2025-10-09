// Copy this entire content to: src/blog/article.ts

import { getBlogPostBySlug } from "./posts";
import { marked } from "marked";
import Prism from "prismjs";

// Import Prism languages for syntax highlighting
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-markdown";

// Configure marked options for GitHub Flavored Markdown
marked.setOptions({
  gfm: true,
  breaks: true,
});

// Custom renderer to add copy buttons to code blocks
const renderer = new marked.Renderer();

renderer.code = function (token: {
  text: string;
  lang?: string;
  escaped?: boolean;
}): string {
  const code = token.text;
  const language = token.lang;
  const lang = language || "plaintext";
  const codeId = "code-" + Math.random().toString(36).substr(2, 9);

  // Use Prism to highlight the code if language is supported
  let highlightedCode = code;
  try {
    if (language && Prism.languages[language]) {
      highlightedCode = Prism.highlight(
        code,
        Prism.languages[language],
        language,
      );
    }
  } catch (e) {
    console.warn("Failed to highlight code for language: " + language, e);
  }

  // Return HTML with copy button
  return (
    '<div class="article-code-block">' +
    '<div class="code-header">' +
    '<span class="code-language">' +
    lang +
    "</span>" +
    '<button class="code-copy-btn clickable" data-code-id="' +
    codeId +
    '" aria-label="Copy code">' +
    '<svg class="copy-icon" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>' +
    "</svg>" +
    '<svg class="check-icon" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="display: none;">' +
    '<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>' +
    "</svg>" +
    '<span class="copy-text">Copy</span>' +
    "</button>" +
    "</div>" +
    '<pre><code id="' +
    codeId +
    '" class="language-' +
    lang +
    '">' +
    highlightedCode +
    "</code></pre>" +
    "</div>"
  );
};

// Apply custom renderer
marked.setOptions({ renderer });

// Load markdown content from file
async function loadMarkdownContent(slug: string): Promise<string | null> {
  try {
    // Use dynamic import with ?raw to load markdown as string
    // This works in both dev and production
    const markdownModule = await import(`./content/${slug}.md?raw`);
    return markdownModule.default;
  } catch (error) {
    console.error("Error loading markdown content for " + slug + ":", error);
    return null;
  }
}

// Render the full article page
export async function renderArticle(articleSlug: string): Promise<void> {
  const blogPost = getBlogPostBySlug(articleSlug);

  if (!blogPost) {
    console.error("Article not found: " + articleSlug);
    return;
  }

  const articleContainer = document.querySelector(".article-content");
  if (!articleContainer) {
    console.error("Article container not found");
    return;
  }

  // Load markdown content
  const markdownContent = await loadMarkdownContent(articleSlug);
  if (!markdownContent) {
    articleContainer.innerHTML =
      '<div class="article-error">' +
      "<h2>Article Not Found</h2>" +
      "<p>Sorry, the article content could not be loaded.</p>" +
      "</div>";
    return;
  }

  // Convert markdown to HTML
  const contentHtml = await marked.parse(markdownContent);

  // Format the date
  const formattedDate = new Date(blogPost.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Generate tags HTML
  const tagsHtml = blogPost.tags
    ? blogPost.tags
        .map((tag) => '<span class="article-tag">' + tag + "</span>")
        .join("")
    : "";

  // Render the article
  articleContainer.innerHTML =
    '<article class="article-wrapper">' +
    '<header class="article-header">' +
    '<div class="article-meta">' +
    '<time class="article-date" datetime="' +
    blogPost.date +
    '">' +
    formattedDate +
    "</time>" +
    '<div class="article-tags">' +
    tagsHtml +
    "</div>" +
    "</div>" +
    '<h1 class="article-title">' +
    blogPost.title +
    "</h1>" +
    '<p class="article-description">' +
    blogPost.description +
    "</p>" +
    '<div class="article-hero-image" style="background-image: url(\'' +
    blogPost.image +
    "')\"></div>" +
    "</header>" +
    '<div class="article-body">' +
    contentHtml +
    "</div>" +
    '<footer class="article-footer">' +
    '<p class="footer-text">Made with ❤️ by <i>Sid</i>.</p>' +
    '<p class="footer-copyright">© 2025 <a href="https://github.com/Burhanverse" target="_blank" rel="noopener noreferrer" class="footer-link">@burhanverse</a></p>' +
    "</footer>" +
    "</article>";

  // Initialize copy buttons
  initializeCopyButtons();

  // Re-apply syntax highlighting
  setTimeout(() => {
    Prism.highlightAll();
  }, 0);
}

// Initialize copy buttons for code blocks
function initializeCopyButtons() {
  const copyButtons = document.querySelectorAll(".code-copy-btn");

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
        const copyIcon = button.querySelector(".copy-icon") as HTMLElement;
        const checkIcon = button.querySelector(".check-icon") as HTMLElement;
        const copyText = button.querySelector(".copy-text") as HTMLElement;

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
