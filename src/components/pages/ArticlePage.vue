<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from "vue";
import { getBlogPostBySlug } from "../../blog/posts";
import type { BlogPost } from "../../types";
import { marked } from "marked";
import Prism from "prismjs";

// Prism syntax highlighters
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-python";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-markdown";

const props = defineProps<{
  articleSlug: string;
}>();

const emit = defineEmits<{
  (e: "back-to-blog"): void;
}>();

const post = ref<BlogPost | null>(null);
const contentHtml = ref("");
const isLoading = ref(true);
const scrollProgress = ref(0);

async function loadArticle() {
  isLoading.value = true;
  post.value = getBlogPostBySlug(props.articleSlug);

  if (!post.value) {
    isLoading.value = false;
    return;
  }

  try {
    const markdownModule = await import(`../../blog/content/${props.articleSlug}.md?raw`);
    const rawMarkdown = markdownModule.default;
    contentHtml.value = await marked.parse(rawMarkdown);
  } catch (err) {
    console.error("Could not load article markdown:", err);
    contentHtml.value = "<p>Sorry, the content for this article could not be loaded.</p>";
  } finally {
    isLoading.value = false;
    await nextTick();
    Prism.highlightAll();
    setupCodeCopyButtons();
  }
}

function setupCodeCopyButtons() {
  const codeBlocks = document.querySelectorAll<HTMLElement>(".article-content-body pre");
  codeBlocks.forEach((pre) => {
    if (pre.querySelector(".code-copy-btn")) return;
    const codeEl = pre.querySelector("code") || pre;

    const copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.className = "code-copy-btn";
    copyBtn.setAttribute("title", "Copy code");
    copyBtn.setAttribute("aria-label", "Copy code snippet");
    copyBtn.innerHTML = `
      <span class="material-symbols-rounded">content_copy</span>
      <span>Copy</span>
    `;
    copyBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(codeEl.textContent || "");
        copyBtn.classList.add("copied");
        copyBtn.innerHTML = `
          <span class="material-symbols-rounded">check</span>
          <span>Copied!</span>
        `;
        setTimeout(() => {
          copyBtn.classList.remove("copied");
          copyBtn.innerHTML = `
            <span class="material-symbols-rounded">content_copy</span>
            <span>Copy</span>
          `;
        }, 2000);
      } catch (err) {
        console.error("Copy failed", err);
      }
    });

    pre.style.position = "relative";
    pre.appendChild(copyBtn);
  });
}

function handleScroll(e: Event) {
  const target = e.currentTarget as HTMLElement;
  if (!target) return;
  const scrollTop = target.scrollTop;
  const scrollHeight = target.scrollHeight - target.clientHeight;
  if (scrollHeight > 0) {
    scrollProgress.value = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

onMounted(() => {
  loadArticle();
});

watch(() => props.articleSlug, () => {
  loadArticle();
});
</script>

<template>
  <div class="article-reader-view" @scroll="handleScroll">
    <!-- Wrapped in a Large Material Design 3 Tablet Window Widget -->
    <div class="article-window-widget">
      <!-- Window App Bar / Toolbar -->
      <div class="window-top-bar">
        <button
          type="button"
          class="back-pill-btn"
          title="Back to Articles"
          @click="emit('back-to-blog')"
        >
          <md-ripple></md-ripple>
          <span class="material-symbols-rounded">arrow_back</span>
          <span>Back to Articles</span>
        </button>

        <div v-if="post" class="window-reading-meta">
          <span class="material-symbols-rounded">schedule</span>
          <span>5 min read</span>
        </div>
      </div>

      <!-- Linear Reading Progress Bar -->
      <div class="reading-progress-track">
        <div class="reading-progress-bar" :style="{ width: `${scrollProgress}%` }"></div>
      </div>

      <!-- Article Header Inside Window -->
      <header v-if="post" class="article-inner-header">
        <div class="article-tags-row">
          <span v-for="tag in post.tags" :key="tag" class="m3-tag-pill">{{ tag }}</span>
        </div>

        <h1 class="article-main-title">{{ post.title }}</h1>
        <p class="article-lead-description">{{ post.description }}</p>

        <div class="article-author-row">
          <img src="https://github.com/Burhanverse.png" alt="Burhan" class="author-avatar" />
          <div class="author-meta">
            <span class="author-name">Sid (Burhan)</span>
            <span class="publish-date">{{ formatDate(post.date) }}</span>
          </div>
        </div>

        <!-- Hero Image Banner -->
        <div v-if="post.image" class="article-hero-banner">
          <img :src="post.image" :alt="post.title" class="article-hero-img" />
        </div>
      </header>

      <!-- Markdown Article Content -->
      <div class="article-content-body" v-html="contentHtml"></div>

      <!-- Article Footer Widget -->
      <footer class="article-window-footer">
        <div class="footer-profile-box">
          <img src="https://github.com/Burhanverse.png" alt="Burhan" class="footer-avatar" />
          <div>
            <h4 class="footer-author-name">Written by Sid (Burhan)</h4>
            <p class="footer-author-bio">Creator of Burhanverse & open source explorer.</p>
          </div>
        </div>
        <button type="button" class="back-pill-btn footer-back-btn" @click="emit('back-to-blog')">
          <span class="material-symbols-rounded">arrow_back</span>
          <span>Return to Articles</span>
        </button>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.article-reader-view {
  width: 100%;
  max-width: 96rem;
  margin: 0 auto;
  padding: 2rem 2rem 6rem 9rem;
}

/* Material Design 3 Tablet Window Widget */
.article-window-widget {
  position: relative;
  background: var(--md-sys-color-surface-container, rgba(255, 248, 245, 0.95));
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(191, 96, 56, 0.14);
  border-radius: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

[theme="dark"] .article-window-widget {
  background: var(--md-sys-color-surface-container, rgba(38, 27, 22, 0.96));
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.55);
}

/* Window Top Bar */
.window-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 2.4rem;
  border-bottom: 1px solid rgba(191, 96, 56, 0.1);
  background: rgba(0, 0, 0, 0.02);
}

[theme="dark"] .window-top-bar {
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.02);
}

.back-pill-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1.6rem;
  background: rgba(0, 0, 0, 0.035);
  color: var(--md-sys-color-on-surface, #221a16);
  border: 1px solid rgba(191, 96, 56, 0.12);
  border-radius: 9999px;
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  transition: all 200ms ease;
}

[theme="dark"] .back-pill-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--md-sys-color-on-surface, #ece2dc);
}

.back-pill-btn:hover {
  background: var(--md-sys-color-primary-container, #faebd4);
  color: var(--md-sys-color-on-primary-container, #3c1200);
  transform: translateX(-2px);
}

[theme="dark"] .back-pill-btn:hover {
  background: var(--md-sys-color-primary-container, #783615);
  color: var(--md-sys-color-on-primary-container, #ffdccf);
}

.window-reading-meta {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: "JetBrains Mono", monospace;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--md-sys-color-on-surface-variant, #6b5548);
}

.window-reading-meta .material-symbols-rounded {
  font-size: 1.6rem;
  color: var(--md-sys-color-primary, #b95000);
}

/* Reading Progress */
.reading-progress-track {
  width: 100%;
  height: 0.4rem;
  background: rgba(0, 0, 0, 0.05);
}

.reading-progress-bar {
  height: 100%;
  background: var(--md-sys-color-primary, #b95000);
  transition: width 150ms linear;
}

/* Article Header */
.article-inner-header {
  padding: 3.2rem 3.2rem 1.6rem 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.article-tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.m3-tag-pill {
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  background: var(--md-sys-color-primary-container, #ffdcc9);
  color: var(--md-sys-color-on-primary-container, #331100);
  border-radius: 9999px;
}

.article-main-title {
  font-family: "Lexend Zetta", sans-serif;
  font-size: 3.4rem;
  font-weight: 800;
  color: var(--md-sys-color-on-surface, #221a16);
  line-height: 1.25;
  margin: 0;
  letter-spacing: -0.02em;
}

.article-lead-description {
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.6rem;
  line-height: 1.6;
  color: var(--md-sys-color-on-surface-variant, #52443d);
  margin: 0;
}

.article-author-row {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding-block: 0.6rem;
}

.author-avatar {
  width: 4.4rem;
  height: 4.4rem;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--md-sys-color-primary-container, #ffdcc9);
}

.author-meta {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--md-sys-color-on-surface, #221a16);
}

.publish-date {
  font-family: "JetBrains Mono", monospace;
  font-size: 1.2rem;
  color: var(--md-sys-color-on-surface-variant, #6b5548);
}

.article-hero-banner {
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  margin-top: 1.6rem;
  background: var(--md-sys-color-surface-container-highest, rgba(0, 0, 0, 0.04));
  border: 1px solid var(--md-sys-color-outline-variant, rgba(191, 96, 56, 0.12));
  display: flex;
  align-items: center;
  justify-content: center;
}

[theme="dark"] .article-hero-banner {
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(255, 255, 255, 0.08);
}

.article-hero-img {
  width: 100%;
  max-height: 46rem;
  height: auto;
  object-fit: fill;
  display: block;
}

/* Article Body Typography */
.article-content-body {
  padding: 1.6rem 3.2rem 3.2rem 3.2rem;
  font-family: var(--font-sans, "Google Sans Flex", "Inter", sans-serif);
  font-size: 1.55rem;
  line-height: 1.8;
  color: var(--md-sys-color-on-surface, #221a16);
}

.article-content-body :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 16px;
  display: block;
  margin: 2.4rem auto;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--md-sys-color-outline-variant, rgba(191, 96, 56, 0.12));
}

.article-content-body :deep(h2) {
  font-family: var(--font-sans, "Google Sans Flex", "Inter", sans-serif);
  font-size: 2.4rem;
  font-weight: 800;
  margin-top: 3.2rem;
  margin-bottom: 1.2rem;
  color: var(--md-sys-color-on-surface, #221a16);
}

.article-content-body :deep(h3) {
  font-family: var(--font-sans, "Google Sans Flex", "Inter", sans-serif);
  font-size: 2rem;
  font-weight: 700;
  margin-top: 2.4rem;
  margin-bottom: 1rem;
  color: var(--md-sys-color-on-surface, #221a16);
}

.article-content-body :deep(p) {
  margin-bottom: 1.6rem;
}

.article-content-body :deep(ul),
.article-content-body :deep(ol) {
  margin-bottom: 1.6rem;
  padding-left: 2.4rem;
}

.article-content-body :deep(li) {
  margin-bottom: 0.6rem;
}

.article-content-body :deep(a) {
  color: var(--md-sys-color-primary, #b95000);
  text-decoration: underline;
  font-weight: 600;
}

.article-content-body :deep(blockquote) {
  margin: 2rem 0;
  padding: 1.4rem 2rem;
  background: var(--md-sys-color-surface-container-high, rgba(255, 238, 230, 0.7));
  border-left: 4px solid var(--md-sys-color-primary, #b95000);
  border-radius: 0 16px 16px 0;
  font-style: italic;
}

/* Codeblocks - Dynamic Light and Dark Mode */
.article-content-body :deep(pre) {
  position: relative;
  margin: 2.4rem 0;
  padding: 2.4rem 2.4rem 2rem 2.4rem;
  background: var(--md-sys-color-surface-container-high, #f5e8e0);
  color: var(--md-sys-color-on-surface, #221a16);
  border: 1px solid var(--md-sys-color-outline-variant, rgba(191, 96, 56, 0.18));
  border-radius: 20px;
  overflow-x: auto;
  font-family: var(--font-mono, "JetBrains Mono", monospace);
  font-size: 1.35rem;
  line-height: 1.6;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

[theme="dark"] .article-content-body :deep(pre) {
  background: var(--md-sys-color-surface-container-lowest, #150e0b);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #ede0db;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
}

.article-content-body :deep(pre code) {
  background: transparent !important;
  color: inherit !important;
  padding: 0 !important;
  font-family: var(--font-mono, "JetBrains Mono", monospace) !important;
}

.article-content-body :deep(code:not(pre code)) {
  background: var(--md-sys-color-surface-container-high, rgba(191, 96, 56, 0.12));
  color: var(--md-sys-color-primary, #bf6038);
  padding: 0.2rem 0.6rem;
  border-radius: 0.6rem;
  font-family: var(--font-mono, "JetBrains Mono", monospace);
  font-size: 1.3rem;
  font-weight: 600;
}

[theme="dark"] .article-content-body :deep(code:not(pre code)) {
  background: rgba(255, 181, 157, 0.15);
  color: var(--md-sys-color-primary, #ffb59d);
}

/* Code Copy Button */
.article-content-body :deep(.code-copy-btn) {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 1.1rem;
  background: var(--md-sys-color-surface, #fff8f3);
  color: var(--md-sys-color-on-surface, #221a16);
  border: 1px solid var(--md-sys-color-outline-variant, rgba(191, 96, 56, 0.22));
  border-radius: 9999px;
  font-family: var(--font-sans, "Google Sans Flex", "Inter", sans-serif);
  font-size: 1.15rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  transition: all 200ms ease;
  z-index: 10;
  user-select: none;
}

[theme="dark"] .article-content-body :deep(.code-copy-btn) {
  background: var(--md-sys-color-surface-container-high, #2d201a);
  color: var(--md-sys-color-on-surface, #ede0db);
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.article-content-body :deep(.code-copy-btn:hover) {
  background: var(--md-sys-color-primary-container, #faebd4);
  color: var(--md-sys-color-on-primary-container, #3c1200);
  border-color: var(--md-sys-color-primary, #bf6038);
  transform: translateY(-1px);
}

[theme="dark"] .article-content-body :deep(.code-copy-btn:hover) {
  background: var(--md-sys-color-primary, #ffb59d);
  color: #26130b;
}

.article-content-body :deep(.code-copy-btn.copied) {
  background: #2e7d32 !important;
  color: #ffffff !important;
  border-color: #2e7d32 !important;
}

.article-content-body :deep(.code-copy-btn .material-symbols-rounded) {
  font-size: 1.4rem;
}

.article-content-body :deep(.code-copy-btn .material-symbols-rounded) {
  font-size: 1.4rem;
}

/* Footer */
.article-window-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2.4rem 3.2rem;
  border-top: 1px solid var(--md-sys-color-outline-variant, rgba(220, 195, 180, 0.3));
  background: var(--md-sys-color-surface-container-high, rgba(255, 238, 230, 0.6));
  flex-wrap: wrap;
  gap: 1.6rem;
}

.footer-profile-box {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.footer-avatar {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}

.footer-author-name {
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--md-sys-color-on-surface, #221a16);
  margin: 0;
}

.footer-author-bio {
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.25rem;
  color: var(--md-sys-color-on-surface-variant, #6b5548);
  margin: 0;
}

@media (max-width: 768px) {
  .article-reader-view {
    padding: 1rem 1.6rem 2.4rem 1.6rem;
    max-width: 100%;
  }
  .article-window-widget {
    border-radius: 28px;
  }
  .window-top-bar {
    padding: 1.2rem 1.6rem;
  }
  .article-inner-header {
    padding: 2rem 1.6rem 1.2rem 1.6rem;
    gap: 1.2rem;
  }
  .article-main-title {
    font-size: 2.4rem;
  }
  .article-lead-description {
    font-size: 1.45rem;
  }
  .article-hero-banner {
    border-radius: 1.6rem;
    margin-top: 1.2rem;
  }
  .article-hero-img {
    max-height: 28rem;
  }
  .article-content-body {
    padding: 1.2rem 1.6rem 2.4rem 1.6rem;
    font-size: 1.5rem;
    line-height: 1.75;
  }
  .article-content-body :deep(h2) {
    font-size: 2.1rem;
    margin-top: 2.4rem;
  }
  .article-content-body :deep(h3) {
    font-size: 1.8rem;
    margin-top: 2rem;
  }
  .article-content-body :deep(pre) {
    padding: 2.2rem 1.4rem 1.4rem 1.4rem;
    border-radius: 1.6rem;
    font-size: 1.25rem;
  }
  .article-window-footer {
    padding: 1.8rem 1.6rem;
    flex-direction: column;
    align-items: stretch;
    gap: 1.6rem;
  }
  .footer-back-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
