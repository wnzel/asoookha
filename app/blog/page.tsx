import Link from "next/link";
import type { Metadata } from "next";
import { WindowFrame } from "@/components/WindowFrame";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog"
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="page-shell">
      <WindowFrame title="blog">
        <div className="blog-list">
          {posts.map((post) => (
            <article key={post.slug}>
              {post.cover ? <img alt="" src={post.cover} /> : null}
              <div>
                <time>{post.date}</time>
                <h2>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p>{post.excerpt}</p>
                <div className="tag-row">
                  {post.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </WindowFrame>
    </div>
  );
}
