<script setup lang="ts">
import { getSortedBlogPosts } from "../../blog/posts";
import type { BlogPost } from "../../types";

const emit = defineEmits<{
  (e: "open-article", slug: string): void;
}>();

const posts = getSortedBlogPosts();

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
</script>

<template>
  <div class="blog-view">
    <!-- Header Widget -->
    <header class="blog-header-widget">
      <div class="header-content">
        <div class="header-icon-box">
          <span class="material-symbols-rounded">article</span>
        </div>
        <div>
          <h1 class="blog-page-title">Articles & Guides</h1>
          <p class="blog-page-subtitle">Explorations in software engineering, UI design, and systems</p>
        </div>
      </div>
      <div class="posts-count-chip">
        {{ posts.length }} Articles Published
      </div>
    </header>

    <!-- Blog Posts Widget Grid -->
    <div class="blog-widget-grid">
      <article
        v-for="post in posts"
        :key="post.id"
        class="blog-card-widget"
        @click="emit('open-article', post.slug)"
      >
        <md-ripple></md-ripple>

        <!-- Compact card header -->
        <div class="compact-card-header">
          <div class="compact-card-icon">
            <span class="material-symbols-rounded">menu_book</span>
          </div>
          <span class="compact-card-date">
            <span class="material-symbols-rounded">event</span>
            <span>{{ formatDate(post.date) }}</span>
          </span>
        </div>

        <!-- Article Info -->
        <div class="blog-card-body">
          <!-- Tags Row -->
          <div v-if="post.tags?.length" class="blog-tags-row">
            <span v-for="tag in post.tags" :key="tag" class="m3-tag-chip">
              {{ tag }}
            </span>
          </div>

          <h3 class="blog-title">{{ post.title }}</h3>
          <p class="blog-description">{{ post.description }}</p>

          <!-- Action Button -->
          <div class="blog-card-actions">
            <button
              type="button"
              class="read-article-btn"
              @click.stop="emit('open-article', post.slug)"
            >
              <span>Read Article</span>
              <span class="material-symbols-rounded">arrow_forward</span>
            </button>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.blog-view {
  width: 100%;
  max-width: 132rem;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 2rem 2rem 6rem 9rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
}

/* Header Widget */
.blog-header-widget {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 2.4rem;
  background: var(--md-sys-color-surface-container, rgba(255, 248, 245, 0.92));
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(191, 96, 56, 0.14);
  border-radius: 28px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.04);
  flex-wrap: wrap;
}

[theme="dark"] .blog-header-widget {
  background: var(--md-sys-color-surface-container, rgba(38, 27, 22, 0.92));
  border: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1.6rem;
}

.header-icon-box {
  width: 5rem;
  height: 5rem;
  border-radius: 1.6rem;
  background: var(--md-sys-color-secondary-container, #fce4c0);
  color: var(--md-sys-color-secondary, #81552a);
  display: flex;
  align-items: center;
  justify-content: center;
}

[theme="dark"] .header-icon-box {
  background: rgba(129, 85, 42, 0.25);
  color: #edbc90;
}

.header-icon-box .material-symbols-rounded {
  font-size: 2.6rem;
}

.blog-page-title {
  font-family: var(--font-sans, "Google Sans Flex", "Inter", sans-serif);
  font-size: 2.8rem;
  font-weight: 800;
  color: var(--md-sys-color-on-surface, #221a16);
  margin: 0;
}

.blog-page-subtitle {
  font-family: var(--font-sans, "Google Sans Flex", "Inter", sans-serif);
  font-size: 1.4rem;
  color: var(--md-sys-color-on-surface-variant, #6b5548);
  margin: 0.2rem 0 0 0;
}

.posts-count-chip {
  font-family: "JetBrains Mono", monospace;
  font-size: 1.3rem;
  font-weight: 700;
  padding: 0.6rem 1.4rem;
  border-radius: 9999px;
  background: rgba(0, 0, 0, 0.04);
  color: var(--md-sys-color-on-surface, #221a16);
}

[theme="dark"] .posts-count-chip {
  background: rgba(255, 255, 255, 0.06);
  color: var(--md-sys-color-on-surface, #ece2dc);
}

/* Blog Cards Grid */
.blog-widget-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(36rem, 1fr));
  gap: 2.4rem;
}

.blog-card-widget {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--md-sys-color-surface-container, rgba(255, 248, 245, 0.92));
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(191, 96, 56, 0.14);
  border-radius: 28px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.04);
  cursor: pointer;
  overflow: hidden;
  transition: transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 250ms ease, border-color 250ms ease;
}

[theme="dark"] .blog-card-widget {
  background: var(--md-sys-color-surface-container, rgba(38, 27, 22, 0.92));
  border: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45);
}

.blog-card-widget:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
}

[theme="dark"] .blog-card-widget:hover {
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 16px 42px rgba(0, 0, 0, 0.6);
}

/* Compact card header */
.compact-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
  padding: 1.6rem 1.8rem 0 1.8rem;
}

.compact-card-icon {
  width: 4.4rem;
  height: 4.4rem;
  border-radius: 1.4rem;
  background: var(--md-sys-color-secondary-container, #fce4c0);
  color: var(--md-sys-color-secondary, #81552a);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

[theme="dark"] .compact-card-icon {
  background: rgba(129, 85, 42, 0.25);
  color: #edbc90;
}

.compact-card-icon .material-symbols-rounded {
  font-size: 2.4rem;
}

.compact-card-date {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: "JetBrains Mono", monospace;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--md-sys-color-on-surface-variant, #6b5548);
}

.compact-card-date .material-symbols-rounded {
  font-size: 1.6rem;
  color: var(--md-sys-color-primary, #b95000);
}

.blog-card-widget .blog-card-body {
  padding-top: 1.6rem;
}

.blog-card-widget .blog-description {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Card Body */
.blog-card-body {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 2.2rem;
  flex: 1;
}

.blog-tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.m3-tag-chip {
  font-family: var(--font-sans, "Google Sans Flex", "Inter", sans-serif);
  font-size: 1.15rem;
  font-weight: 600;
  padding: 0.3rem 0.8rem;
  background: var(--md-sys-color-surface-container-high, #f8ece4);
  color: var(--md-sys-color-on-surface-variant, #52443d);
  border-radius: 0.8rem;
  border: 1px solid var(--md-sys-color-outline-variant, rgba(220, 195, 180, 0.4));
}

.blog-title {
  font-family: var(--font-sans, "Google Sans Flex", "Inter", sans-serif);
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--md-sys-color-on-surface, #221a16);
  margin: 0;
  line-height: 1.3;
}

.blog-description {
  font-family: var(--font-sans, "Google Sans Flex", "Inter", sans-serif);
  font-size: 1.4rem;
  line-height: 1.6;
  color: var(--md-sys-color-on-surface-variant, #52443d);
  margin: 0;
  flex: 1;
}

.blog-card-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.6rem;
}

.read-article-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1.6rem;
  background: var(--md-sys-color-primary, #b95000);
  color: var(--md-sys-color-on-primary, #ffffff);
  border-radius: 9999px;
  border: none;
  font-family: var(--font-sans, "Google Sans Flex", "Inter", sans-serif);
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(185, 80, 0, 0.25);
  transition: transform 200ms ease, background-color 200ms ease;
}

.read-article-btn:hover {
  transform: translateX(3px);
  background: var(--md-sys-color-primary-hover, #953e00);
}

.read-article-btn .material-symbols-rounded {
  font-size: 1.6rem;
}

@media (max-width: 768px) {
  .blog-view {
    width: 100%;
    max-width: 100%;
    margin: 0;
    box-sizing: border-box;
    padding: 1rem 1.6rem 2.4rem 1.6rem;
    gap: 2rem;
  }
  .blog-header-widget {
    width: 100%;
    box-sizing: border-box;
    padding: 1.8rem;
    border-radius: 28px;
    gap: 1.4rem;
  }
  .header-content {
    gap: 1.2rem;
  }
  .header-icon-box {
    width: 4.4rem;
    height: 4.4rem;
    border-radius: 1.4rem;
  }
  .blog-page-title {
    font-size: 2.4rem;
  }
  .blog-widget-grid {
    width: 100%;
    box-sizing: border-box;
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .blog-card-widget {
    width: 100%;
    box-sizing: border-box;
    border-radius: 28px;
  }
  .blog-card-body {
    padding: 1.8rem;
    box-sizing: border-box;
  }
  .blog-title {
    font-size: 2rem;
  }
}
</style>
