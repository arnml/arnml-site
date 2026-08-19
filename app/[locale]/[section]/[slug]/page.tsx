import { notFound } from "next/navigation";
import { findPost, posts, siblingSlug } from "@/content/posts";
import {
  isLocale,
  locales,
  sectionForPath,
  sectionPath,
  sectionSlugs,
} from "@/lib/site/locales";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    posts[locale].map((post) => ({
      locale,
      section: sectionSlugs[locale].writing,
      slug: post.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; section: string; slug: string }>;
}) {
  const { locale, section, slug } = await params;
  const typedLocale = isLocale(locale) ? locale : null;
  if (!typedLocale || sectionForPath(typedLocale, section) !== "writing") return {};
  const post =
    findPost(typedLocale, slug);
  return post
    ? {
        title: post.title,
        description: post.description,
        alternates: {
          canonical: sectionPath(typedLocale, "writing", slug),
          languages: {
            ...Object.fromEntries(
              locales.map((item) => [
                item,
                sectionPath(item, "writing", siblingSlug(item, typedLocale, slug)),
              ]),
            ),
            "x-default": sectionPath(
              "en",
              "writing",
              siblingSlug("en", typedLocale, slug),
            ),
          },
        },
      }
    : {};
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; section: string; slug: string }>;
}) {
  const { locale, section, slug } = await params;
  if (!isLocale(locale) || sectionForPath(locale, section) !== "writing")
    notFound();
  const post = findPost(locale, slug);
  if (!post) notFound();
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
