/**
 * Blog posts data
 * All blog post metadata in one place
 */

import { BlogPost } from "../types";

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "fagram-desktop",
    title: "FAgram Desktop",
    description: "Instructions for installing fagram on Windows, MacOS & GNU/Linux distros.",
    date: "2026-04-11",
    image: "/img/fagram.png",
    link: "/?article=fagram-desktop",
    tags: ["Fork", "FAgram", "Telegram Desktop"],
  },
  {
    id: 2,
    slug: "webclip-sync",
    title: "WebClip",
    description: "WebClip is a Gboard web clipboard companion for desktop.",
    date: "2026-09-10",
    link: "/?article=webclip-sync",
    tags: ["Linux", "Android", "Windows", "Open Source"],
  },
];

/**
 * Get blog post by ID
 */
export function getBlogPostById(id: number): BlogPost | null {
  return blogPosts.find((post) => post.id === id) || null;
}

/**
 * Get blog post by slug
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  return blogPosts.find((post) => post.slug === slug) || null;
}

/**
 * Get all blog posts sorted by date (newest first)
 */
export function getSortedBlogPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
