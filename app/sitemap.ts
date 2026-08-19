import { MetadataRoute } from "next";
import { posts } from "@/content/posts";
import { locales, sectionPath, type PublicSection } from "@/lib/site/locales";
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://arnoldmoya.com";
  const pages: PublicSection[] = [
    "about",
    "work",
    "consulting",
    "contact",
    "writing",
  ];
  return locales.flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    ...pages.map((page) => ({
      url: `${baseUrl}${sectionPath(locale, page)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...posts[locale].map((post) => ({
      url: `${baseUrl}${sectionPath(locale, "writing", post.slug)}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ]);
}
