import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/site/section-heading";
import { siteCopy } from "@/lib/site/content";
import { isLocale } from "@/lib/site/locales";

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const copy = siteCopy[rawLocale].work;
  return (
    <div className="site-shell site-subpage">
      <SectionHeading eyebrow="Work" title={copy.title} />
      <p className="site-subpage-intro">{copy.intro}</p>
      <div className="site-card-grid">
        {copy.items.map((item, index) => (
          <article className="site-card" key={item.title}>
            <div className="site-work-num">0{index + 1}</div>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
