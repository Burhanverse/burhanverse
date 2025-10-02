/**
 * Blog articles index
 * Import and export all articles from this central location
 */

import { article1 } from './article-1';
import { article2 } from './article-2';
import { article3 } from './article-3';
import { ArticleContent } from '../types';

/**
 * All articles mapped by ID
 */
export const articles: Record<number, ArticleContent> = {
  1: article1,
  2: article2,
  3: article3
};

/**
 * All articles mapped by slug
 */
export const articlesBySlug: Record<string, ArticleContent> = {
  'material-design-3': article1,
  'typescript-web-apps': article2,
  'ui-animations': article3
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
  return Object.keys(articles).map(id => parseInt(id, 10));
}
