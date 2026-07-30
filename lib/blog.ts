import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const blogDirectory = path.join(process.cwd(), "content", "blog");

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  cover?: string;
  content: string;
};

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  return fs
    .readdirSync(blogDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => getPostBySlug(file.replace(/\.md$/, "")))
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
}

export function getPostBySlug(slug: string): BlogPost {
  const fullPath = path.join(blogDirectory, `${slug}.md`);
  const raw = fs.readFileSync(fullPath, "utf8");
  const parsed = matter(raw);

  return {
    slug,
    title: String(parsed.data.title ?? slug),
    date: String(parsed.data.date ?? ""),
    excerpt: String(parsed.data.excerpt ?? ""),
    tags: Array.isArray(parsed.data.tags) ? parsed.data.tags.map(String) : [],
    cover: parsed.data.cover ? String(parsed.data.cover) : undefined,
    content: parsed.content
  };
}
