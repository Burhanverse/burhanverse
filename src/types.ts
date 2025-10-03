export interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
  fork: boolean;
}

export interface GitHubConfig {
  username: string;
  token?: string;
}

// Blog and Article types
export interface BlogPost {
  id: number;
  slug: string; // URL-friendly identifier
  title: string;
  description: string;
  date: string;
  image: string;
  link: string;
  tags?: string[];
}

export interface ArticleContent {
  id: number;
  slug: string; // URL-friendly identifier
  sections: ArticleSection[];
}

export interface ArticleSection {
  type: "heading" | "paragraph" | "code" | "image" | "list";
  content: string | string[];
  language?: string; // for code blocks
  alt?: string; // for images
}
