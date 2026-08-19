import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/site/section-heading";
import { posts } from "@/content/posts/ai-is-leverage";
import { siteCopy } from "@/lib/site/content";
import { isLocale, localePath } from "@/lib/site/locales";

export default async function WritingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const post = posts[rawLocale];
  return (
    <div className="site-shell site-subpage">
      <SectionHeading
        eyebrow="Writing"
        title={siteCopy[rawLocale].home.selected}
      />
      <p className="site-subpage-intro">
        Essays, experiments, architecture notes, and research about systems that
        have to work in the real world.
      </p>
      <div className="site-writing-list">
        <Link
          className="site-writing-item"
          href={localePath(rawLocale, `/writing/${post.slug}`)}
        >
          <p className="site-date">{post.date}</p>
          <div>
            <div className="site-section-label">{post.tags.join(" · ")}</div>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
