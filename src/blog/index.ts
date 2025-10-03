/**
 * Blog articles index
 * Import and export all articles from this central location
 */

import { article1 } from "./fagram";
import { ArticleContent } from "../types";

/**
 * All articles mapped by ID
 */
export const articles: Record<number, ArticleContent> = {
  1: article1,
};

/**
 * All articles mapped by slug
 */
export const articlesBySlug: Record<string, ArticleContent> = {
  "fagram-desktop": article1,
};

/**
 * Get article by ID
 */
export function getArticleById(id: number): ArticleContent | null {
  return articles[id] || null;
}

/**
 * Get article by slug
 */
export function getArticleBySlug(slug: string): ArticleContent | null {
  return articlesBySlug[slug] || null;
}

/**
 * Get all article IDs
 */
export function getArticleIds(): number[] {
  return Object.keys(articles).map((id) => parseInt(id, 10));
}
