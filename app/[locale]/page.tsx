import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/content/posts";
import { principles, siteCopy } from "@/lib/site/content";
import { isLocale, sectionPath } from "@/lib/site/locales";

const studying = [
  "Agent architecture",
  "Retrieval systems",
  "Distributed systems",
  "Performance engineering",
  "Security",
  "Algorithms",
  "LLM evaluation",
  "Automation economics",
];

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;
  const copy = siteCopy[locale];
  const writing = posts[locale];
  const featuredWriting = writing[0];
  const work = copy.work.items;
  return (
    <>
      <div className="site-shell">
        <section className="site-hero">
          <div className="site-eyebrow">{copy.home.eyebrow}</div>
          <h1>{featuredWriting.title}</h1>
          <div className="site-hero-copy">
            <p>{featuredWriting.description}</p>
            <div className="site-hero-note">{copy.home.heroNote}</div>
          </div>
          <div className="site-cta-row">
            <Link
              className="site-button primary"
              href={sectionPath(locale, "writing")}
            >
              {copy.home.primary}
            </Link>
            <Link
              className="site-button secondary"
              href={sectionPath(locale, "consulting")}
            >
              {copy.home.secondary}
            </Link>
          </div>
        </section>

        <section className="site-section" id="writing">
          <div className="site-section-head">
            <div className="site-section-label">{copy.home.selected}</div>
            <h2 className="site-section-title">{copy.home.selectedTitle}</h2>
          </div>
          <div className="site-articles">
            {writing.map((item) => (
              <Link
                className="site-article"
                href={sectionPath(locale, "writing", item.slug)}
                key={item.slug}
              >
                <div className="site-article-meta">
                  <span>{item.tags[0]}</span>
                  <span>{item.date}</span>
                </div>
                <div>
                  <div className="site-article-title">{item.title}</div>
                  <div className="site-article-dek">{item.description}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="site-section" id="work">
          <div className="site-section-head">
            <div className="site-section-label">{copy.home.services}</div>
            <h2 className="site-section-title">
              Problems that do not fit neatly inside one job title.
            </h2>
          </div>
          <div className="site-work-grid">
            {work.concat(work.slice(0, 1)).map((item, index) => (
              <div className="site-work-item" key={`${item.title}-${index}`}>
                <div className="site-work-num">0{index + 1}</div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="site-section">
          <div className="site-section-head">
            <div className="site-section-label">{copy.home.principles}</div>
            <h2 className="site-section-title">
              Engineering is mostly choosing which tradeoffs are acceptable.
            </h2>
          </div>
          <div className="site-principles-wrap">
            <div className="site-principles-intro">
              The right answer depends on the problem, its constraints, and what
              happens when the system is wrong.
            </div>
            <div className="site-principles">
              {principles[locale].map((item, index) => (
                <div className="site-principle" key={item}>
                  <span>0{index + 1}</span>
                  <div>{item}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="site-section">
          <div className="site-research-strip">
            <div className="site-section-label">Currently studying</div>
            <div className="site-research-list">
              {studying.map((item) => (
                <span className="site-chip" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="site-section" id="about">
          <div className="site-section-head">
            <div className="site-section-label">{copy.nav.about}</div>
            <h2 className="site-section-title">
              I am more interested in understanding the system than defending a
              tool.
            </h2>
          </div>
          <div className="site-about-grid">
            <p className="site-about-lead">
              I build software, study systems, and spend a lot of time asking
              why we build things the way we do.
            </p>
            <div className="site-about-copy">
              <p>{copy.about.intro}</p>
              <p>{copy.about.sections[0].body}</p>
              <Link
                className="site-text-link"
                href={sectionPath(locale, "about")}
              >
                {copy.nav.about} <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="site-contact" id="consulting">
          <div className="site-contact-card">
            <div>
              <div className="site-eyebrow">{copy.nav.consulting}</div>
              <h2>{copy.home.contactTitle}</h2>
            </div>
            <div className="site-contact-side">
              <p>{copy.home.contactText}</p>
              <Link
                className="site-button"
                href={sectionPath(locale, "contact")}
              >
                {copy.home.secondary}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
