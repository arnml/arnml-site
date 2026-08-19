import { notFound } from "next/navigation";
import { posts } from "@/content/posts/ai-is-leverage";
import { isLocale, locales } from "@/lib/site/locales";

export function generateStaticParams() {
  return locales.flatMap((locale) => [{ locale, slug: posts[locale].slug }]);
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post =
    isLocale(locale) && posts[locale].slug === slug ? posts[locale] : null;
  return post
    ? {
        title: post.title,
        description: post.description,
        alternates: { canonical: `/${locale}/writing/${slug}` },
      }
    : {};
}
export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale) || posts[rawLocale].slug !== slug) notFound();
  const post = posts[rawLocale];
  return (
    <article className="site-shell site-subpage">
      <header className="site-writing-item">
        <p className="site-date">{post.tags.join(" · ")}</p>
        <div>
          <h1 className="site-section-title">{post.title}</h1>
          <p className="site-article-dek">{post.description}</p>
          <time className="site-date" dateTime={post.date}>
            {post.date}
          </time>
        </div>
      </header>
      <div className="site-prose">{post.body}</div>
      <footer className="site-about-copy">
        I’m Arnold Moya. I write about software architecture, AI, systems,
        performance, and the tradeoffs behind building technology that works in
        the real world.
      </footer>
    </article>
  );
}
