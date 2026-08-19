import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/content/posts/ai-is-leverage";
import { principles, siteCopy } from "@/lib/site/content";
import { isLocale, localePath } from "@/lib/site/locales";

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
  const post = posts[locale];
  const work = copy.work.items;
  return (
    <>
      <div className="site-shell">
        <section className="site-hero">
          <div className="site-eyebrow">{copy.home.eyebrow}</div>
          <h1>{copy.home.title}</h1>
          <div className="site-hero-copy">
            <p>{copy.home.intro}</p>
            <div className="site-hero-note">
              I work across architecture, AI, automation, performance, and the
              decisions that connect technical systems to business reality.
            </div>
          </div>
          <div className="site-cta-row">
            <Link
              className="site-button primary"
              href={localePath(locale, "/writing")}
            >
              {copy.home.primary}
            </Link>
            <Link
              className="site-button secondary"
              href={localePath(locale, "/consulting")}
            >
              {copy.home.secondary}
            </Link>
          </div>
        </section>

        <section className="site-section" id="writing">
          <div className="site-section-head">
            <div className="site-section-label">{copy.home.selected}</div>
            <h2 className="site-section-title">Ideas worth arguing about.</h2>
          </div>
          <div className="site-articles">
            {[post, post, post, post].map((item, index) => (
              <Link
                className="site-article"
                href={localePath(locale, `/writing/${item.slug}`)}
                key={`${item.slug}-${index}`}
              >
                <div className="site-article-meta">
                  <span>{item.tags[index % item.tags.length]}</span>
                  <span>{item.date}</span>
                </div>
                <div>
                  <div className="site-article-title">
                    {index === 0
                      ? item.title
                      : [
                          "Fast shipping is an engineering constraint, not an excuse.",
                          "Optimize the work before optimizing the code.",
                          "Your startup probably does not need microservices.",
                        ][index - 1]}
                  </div>
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
                href={localePath(locale, "/about")}
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
                href={localePath(locale, "/contact")}
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
