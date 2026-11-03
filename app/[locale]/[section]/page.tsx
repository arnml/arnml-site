import Link from "next/link";
import { notFound } from "next/navigation";
import "./writing.css";
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
    const writingCopy = {
      en: { title: "Ideas worth thinking through.", intro: "Essays, experiments, and research on software, AI, and the decisions behind systems that work in the real world.", latest: "Latest thinking", all: "All articles", read: "Read article" },
      es: { title: "Ideas para pensar a fondo.", intro: "Ensayos, experimentos e investigación sobre software, IA y las decisiones detrás de sistemas que funcionan en el mundo real.", latest: "Lo más reciente", all: "Todos los artículos", read: "Leer artículo" },
      pt: { title: "Ideias para pensar a fundo.", intro: "Ensaios, experimentos e pesquisas sobre software, IA e as decisões por trás de sistemas que funcionam no mundo real.", latest: "Mais recentes", all: "Todos os artigos", read: "Ler artigo" },
    }[rawLocale];
    const [featured, ...remaining] = posts[rawLocale];
    return (
      <div className="motion-writing-page">
        <div className="writing-shell">
          <header className="writing-hero">
            <div className="writing-label">{copy.nav.writing}</div>
            <h1>{writingCopy.title}</h1>
            <p>{writingCopy.intro}</p>
          </header>
          {featured && (
            <section className="writing-feature" aria-labelledby="featured-heading">
              <div className="writing-label" id="featured-heading">{writingCopy.latest}</div>
              <Link className="writing-feature-card" href={sectionPath(rawLocale, "writing", featured.slug)}>
                <div className="writing-meta"><span>{featured.tags[0]}</span><time dateTime={featured.date}>{featured.date}</time></div>
                <div className="writing-feature-body"><div><h2>{featured.title}</h2><p>{featured.description}</p></div><span className="writing-round-arrow" aria-hidden="true">↗</span></div>
                <span className="writing-read">{writingCopy.read} <span aria-hidden="true">↗</span></span>
              </Link>
            </section>
          )}
          <section className="writing-archive" aria-labelledby="archive-heading">
            <div className="writing-archive-heading"><h2 id="archive-heading">{writingCopy.all}</h2><span>{String(remaining.length).padStart(2, "0")}</span></div>
            <div className="writing-grid">{remaining.map((post) => (
              <Link className="writing-card" href={sectionPath(rawLocale, "writing", post.slug)} key={post.slug}>
                <div className="writing-meta"><span>{post.tags[0]}</span><time dateTime={post.date}>{post.date}</time></div>
                <div className="writing-card-body"><h3>{post.title}</h3><p>{post.description}</p></div>
                <span className="writing-round-arrow" aria-hidden="true">↗</span>
              </Link>
            ))}</div>
          </section>
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
