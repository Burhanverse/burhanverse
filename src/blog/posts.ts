/**
 * Blog posts data
 * All blog post metadata in one place
 */

import { BlogPost } from '../types';

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'fagram-desktop',
    title: 'FAgram Desktop',
    description: 'Instructions for installing fagram on linux distros.',
    date: '2024-09-15',
    image: '/img/fagram.jpg',
  link: 'article.html?article=fagram-desktop',
    tags: ['Fork', 'FAgram', 'Telegram Desktop']
  }
];

/**
 * Get blog post by ID
 */
export function getBlogPostById(id: number): BlogPost | null {
  return blogPosts.find(post => post.id === id) || null;
}

/**
 * Get blog post by slug
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  return blogPosts.find(post => post.slug === slug) || null;
}

/**
 * Get all blog posts sorted by date (newest first)
 */
export function getSortedBlogPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
