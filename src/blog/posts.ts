/**
 * Blog posts data
 * All blog post metadata in one place
 */

import { BlogPost } from '../types';

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'material-design-3',
    title: 'Getting Started with Material Design 3',
    description: 'An introduction to Material Design 3 principles and how to implement them in your projects.',
    date: '2024-09-15',
    image: '/img/project1.webp',
    link: '/article.html?article=material-design-3',
    tags: ['Design', 'Material Design']
  },
  {
    id: 2,
    slug: 'typescript-web-apps',
    title: 'Building Modern Web Apps with TypeScript',
    description: 'Learn how TypeScript can improve your web development workflow and code quality.',
    date: '2024-08-20',
    image: '/img/project2.webp',
    link: '/article.html?article=typescript-web-apps',
    tags: ['TypeScript', 'Web Development']
  },
  {
    id: 3,
    slug: 'ui-animations',
    title: 'Creating Beautiful UI Animations',
    description: 'Tips and tricks for creating smooth, performant animations in web applications.',
    date: '2024-07-10',
    image: '/img/project3.webp',
    link: '/article.html?article=ui-animations',
    tags: ['CSS', 'Animations']
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
