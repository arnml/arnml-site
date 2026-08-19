import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/site/section-heading";
import { posts } from "@/content/posts";
import { siteCopy } from "@/lib/site/content";
import {
  isLocale,
  locales,
  sectionForPath,
  sectionPath,
  sectionSlugs,
} from "@/lib/site/locales";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    Object.values(sectionSlugs[locale]).map((section) => ({ locale, section })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; section: string }>;
}) {
  const { locale: rawLocale, section: rawSection } = await params;
  if (!isLocale(rawLocale)) return {};
  const section = sectionForPath(rawLocale, rawSection);
  if (!section) return {};
  const copy = siteCopy[rawLocale];
  const title =
    section === "about"
      ? copy.nav.about
      : section === "work"
        ? copy.nav.work
        : section === "consulting"
          ? copy.nav.consulting
          : section === "contact"
            ? copy.nav.contact
            : copy.nav.writing;
  return {
    title,
    alternates: {
      canonical: sectionPath(rawLocale, section),
      languages: {
        ...Object.fromEntries(
          locales.map((locale) => [locale, sectionPath(locale, section)]),
        ),
        "x-default": sectionPath("en", section),
      },
    },
  };
}

export default async function LocalizedSectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; section: string }>;
  searchParams: Promise<{ status?: string }>;
}) {
  const { locale: rawLocale, section: rawSection } = await params;
  if (!isLocale(rawLocale)) notFound();
  const section = sectionForPath(rawLocale, rawSection);
  if (!section) notFound();
  const copy = siteCopy[rawLocale];

  if (section === "writing") {
    return (
      <div className="site-shell site-subpage">
        <SectionHeading eyebrow={copy.nav.writing} title={copy.home.selected} />
        <p className="site-subpage-intro">
          Essays, experiments, architecture notes, and research about systems
          that have to work in the real world.
        </p>
        <div className="site-writing-list">
          {posts[rawLocale].map((post) => (
            <Link
              className="site-writing-item"
              href={sectionPath(rawLocale, "writing", post.slug)}
              key={post.slug}
            >
              <p className="site-date">{post.date}</p>
              <div>
                <div className="site-section-label">
                  {post.tags.join(" · ")}
                </div>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  if (section === "about")
    return (
      <div className="site-shell site-subpage">
        <SectionHeading eyebrow={copy.nav.about} title={copy.about.title} />
        <p className="site-subpage-intro">{copy.about.intro}</p>
        <div className="site-card-grid">
          {copy.about.sections.map((item, index) => (
            <section className="site-card" key={item.title}>
              <div className="site-work-num">0{index + 1}</div>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </section>
          ))}
        </div>
      </div>
    );
  if (section === "work")
    return (
      <div className="site-shell site-subpage">
        <SectionHeading eyebrow={copy.nav.work} title={copy.work.title} />
        <p className="site-subpage-intro">{copy.work.intro}</p>
        <div className="site-card-grid">
          {copy.work.items.map((item, index) => (
            <article className="site-card" key={item.title}>
              <div className="site-work-num">0{index + 1}</div>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    );
  if (section === "consulting")
    return (
      <div className="site-shell site-subpage">
        <SectionHeading
          eyebrow={copy.nav.consulting}
          title={copy.consulting.title}
        />
        <p className="site-subpage-intro">{copy.consulting.intro}</p>
        <div className="site-card-grid">
          {copy.consulting.items.map((item, index) => (
            <article className="site-card" key={item.title}>
              <div className="site-work-num">0{index + 1}</div>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    );
  if (section === "contact") {
    const { status } = await searchParams;
    const statusText =
      status === "sent"
        ? copy.contact.success
        : status === "limited"
          ? rawLocale === "es"
            ? "Se alcanzó el límite diario. Inténtalo mañana."
            : rawLocale === "pt"
              ? "O limite diário foi atingido. Tente novamente amanhã."
              : "The daily limit has been reached. Please try again tomorrow."
          : status === "error"
            ? copy.contact.error
            : null;
    return (
      <div className="site-shell site-subpage">
        <SectionHeading eyebrow={copy.nav.contact} title={copy.contact.title} />
        <p className="site-subpage-intro">{copy.contact.intro}</p>
        <ContactForm
          locale={rawLocale}
          copy={copy.contact}
          statusText={statusText}
        />
      </div>
    );
  }
  return notFound();
}

function ContactForm({
  locale,
  copy,
  statusText,
}: {
  locale: string;
  copy: { name: string; phone: string; message: string; submit: string };
  statusText: string | null;
}) {
  return (
    <>
      <form className="site-contact-form" action="/api/contact" method="post">
        <input type="hidden" name="locale" value={locale} />
        <label htmlFor="contact-name">{copy.name}</label>
        <input
          id="contact-name"
          name="name"
          required
          maxLength={120}
          autoComplete="name"
        />
        <label htmlFor="contact-phone">{copy.phone}</label>
        <input
          id="contact-phone"
          name="phone"
          required
          maxLength={40}
          autoComplete="tel"
        />
        <label htmlFor="contact-message">{copy.message}</label>
        <textarea
          id="contact-message"
          name="message"
          required
          maxLength={4000}
          rows={7}
        />
        <input
          className="site-honeypot"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
        <button className="site-button primary" type="submit">
          {copy.submit}
        </button>
      </form>
      {statusText ? (
        <p className="site-form-status" role="status">
          {statusText}
        </p>
      ) : null}
    </>
  );
}
