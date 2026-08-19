import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findPost, posts, siblingSlug } from "@/content/posts";
import {
  isLocale,
  locales,
  sectionForPath,
  sectionPath,
  sectionSlugs,
} from "@/lib/site/locales";

const openGraphLocales = {
  en: "en_US",
  es: "es_ES",
  pt: "pt_BR",
} as const;

const languageTags = {
  en: "en",
  es: "es",
  pt: "pt-BR",
} as const;

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
}): Promise<Metadata> {
  const { locale, section, slug } = await params;
  const typedLocale = isLocale(locale) ? locale : null;
  if (!typedLocale || sectionForPath(typedLocale, section) !== "writing") return {};
  const post =
    findPost(typedLocale, slug);
  const url = sectionPath(typedLocale, "writing", slug);
  return post
    ? {
        title: post.title,
        description: post.description,
        keywords: post.tags,
        alternates: {
          canonical: url,
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
        openGraph: {
          type: "article",
          url,
          title: post.title,
          description: post.description,
          siteName: "Arnold Moya",
          locale: openGraphLocales[typedLocale],
          publishedTime: `${post.date}T00:00:00.000Z`,
          authors: ["Arnold Moya"],
          tags: post.tags,
        },
        twitter: {
          card: "summary",
          title: post.title,
          description: post.description,
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
  const url = sectionPath(locale, "writing", slug);
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://arnoldmoya.com"
  ).replace(/\/$/, "");
  const canonicalUrl = `${siteUrl}${url}`;
  const authorUrl = `${siteUrl}${sectionPath(locale, "about")}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: languageTags[locale],
    author: {
      "@type": "Person",
      name: "Arnold Moya",
      url: authorUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Arnold Moya",
    },
    keywords: post.tags.join(", "),
  };
  return (
    <article className="site-shell site-subpage">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
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
