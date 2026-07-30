import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { WindowFrame } from "@/components/WindowFrame";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getAllPosts().find((item) => item.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const exists = getAllPosts().some((post) => post.slug === slug);

  if (!exists) {
    notFound();
  }

  const post = getPostBySlug(slug);

  return (
    <div className="page-shell compact-shell">
      <WindowFrame title={post.title} actionHref="/blog" actionLabel="back to blog">
        <article className="markdown-post">
          {post.cover ? <img alt="" className="post-cover" src={post.cover} /> : null}
          <time>{post.date}</time>
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
      </WindowFrame>
    </div>
  );
}
