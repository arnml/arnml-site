import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/site/section-heading";
import { siteCopy } from "@/lib/site/content";
import { isLocale } from "@/lib/site/locales";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const copy = siteCopy[rawLocale].contact;
  return (
    <div className="site-shell site-subpage">
      <SectionHeading eyebrow="Contact" title={copy.title} />
      <p className="site-subpage-intro">{copy.intro}</p>
      <a className="site-text-link" href={`mailto:${copy.email}`}>
        {copy.prompt} <span>→</span>
      </a>
    </div>
  );
}
