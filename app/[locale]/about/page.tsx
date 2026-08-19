import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/site/section-heading";
import { siteCopy } from "@/lib/site/content";
import { isLocale } from "@/lib/site/locales";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return isLocale(locale)
    ? {
        title: siteCopy[locale].nav.about,
        description: siteCopy[locale].about.intro,
      }
    : {};
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const copy = siteCopy[rawLocale].about;
  return (
    <div className="site-shell site-subpage">
      <SectionHeading eyebrow="About" title={copy.title} />
      <p className="site-subpage-intro">{copy.intro}</p>
      <div className="site-card-grid">
        {copy.sections.map((section, index) => (
          <section className="site-card" key={section.title}>
            <div className="site-work-num">0{index + 1}</div>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
