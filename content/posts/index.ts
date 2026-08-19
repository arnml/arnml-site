import { post as agents } from "./ai-is-leverage";
import { post as shipping } from "./fast-shipping";
import { post as optimization } from "./optimize-work";
import { post as microservices } from "./microservices";
import type { Locale } from "@/lib/site/locales";
import type { Post } from "./ai-is-leverage";

export const posts: Record<Locale, Post[]> = {
  en: [agents.en, shipping.en, optimization.en, microservices.en],
  es: [agents.es, shipping.es, optimization.es, microservices.es],
  pt: [agents.pt, shipping.pt, optimization.pt, microservices.pt],
};

export function findPost(locale: Locale, slug: string) {
  return posts[locale].find((post) => post.slug === slug);
}

export function siblingSlug(
  targetLocale: Locale,
  sourceLocale: Locale,
  sourceSlug: string,
) {
  const index = posts[sourceLocale].findIndex(
    (post) => post.slug === sourceSlug,
  );
  return posts[targetLocale][index]?.slug || posts[targetLocale][0].slug;
}
