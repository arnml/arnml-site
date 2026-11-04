import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/content/posts";
import { siteCopy } from "@/lib/site/content";
import { isLocale, sectionPath } from "@/lib/site/locales";
import { WhiteboardHero } from "@/components/site/whiteboard-hero";
import "./home.css";

const homeCopy = {
  en: {
    label: "Technology strategy for founders & leaders",
    title: <>Complex problems.<br />Thoughtful solutions.</>,
    intro: "I help founders and teams make better technology decisions, build resilient systems, and turn ideas into practical results.",
    workAction: "Work with me", writingAction: "Explore my writing",
    band: <>Good technology starts with <em>understanding the problem.</em></>,
    workTitle: "For the problems that don’t come with an obvious answer.",
    writingTitle: <>Ideas worth<br />thinking through.</>,
    aboutLabel: "A little about how I think", aboutTitle: <>Curiosity first.<br />Clarity always.</>,
    aboutText: "I’m Arnold. I build software, study systems, and help people navigate the decisions that shape their technology.",
    principles: ["Understand the problem before choosing the tool.", "Measure what matters.", "Keep the solution as simple as reality allows."],
    research: "Currently exploring", topics: ["AI agents", "Distributed systems", "Performance", "Automation", "Technical strategy"],
    contactLabel: "Start a conversation", contactAction: "Let’s talk about it", allWriting: "All writing", aboutLink: "More about me",
  },
  es: {
    label: "Estrategia tecnológica para fundadores y líderes",
    title: <>Problemas complejos.<br />Soluciones pensadas.</>,
    intro: "Ayudo a fundadores y equipos a tomar mejores decisiones tecnológicas, construir sistemas sólidos y convertir ideas en resultados prácticos.",
    workAction: "Trabajemos juntos", writingAction: "Explora mis artículos",
    band: <>La buena tecnología empieza por <em>entender el problema.</em></>,
    workTitle: "Para los problemas que no tienen una respuesta obvia.",
    writingTitle: <>Ideas para<br />pensar a fondo.</>,
    aboutLabel: "Cómo pienso", aboutTitle: <>Primero, curiosidad.<br />Siempre, claridad.</>,
    aboutText: "Soy Arnold. Construyo software, estudio sistemas y ayudo a las personas a tomar decisiones sobre su tecnología.",
    principles: ["Entiende el problema antes de elegir la herramienta.", "Mide lo que importa.", "Mantén la solución tan simple como la realidad lo permita."],
    research: "Explorando ahora", topics: ["Agentes de IA", "Sistemas distribuidos", "Rendimiento", "Automatización", "Estrategia tecnológica"],
    contactLabel: "Hablemos", contactAction: "Cuéntame tu problema", allWriting: "Todos los artículos", aboutLink: "Más sobre mí",
  },
  pt: {
    label: "Estratégia de tecnologia para fundadores e líderes",
    title: <>Problemas complexos.<br />Soluções bem pensadas.</>,
    intro: "Ajudo fundadores e equipes a tomar decisões melhores de tecnologia, criar sistemas sólidos e transformar ideias em resultados práticos.",
    workAction: "Trabalhe comigo", writingAction: "Explore meus artigos",
    band: <>Boa tecnologia começa por <em>entender o problema.</em></>,
    workTitle: "Para os problemas que não têm uma resposta óbvia.",
    writingTitle: <>Ideias para<br />pensar a fundo.</>,
    aboutLabel: "Um pouco sobre como penso", aboutTitle: <>Curiosidade primeiro.<br />Clareza sempre.</>,
    aboutText: "Sou Arnold. Construo software, estudo sistemas e ajudo pessoas a tomar decisões sobre tecnologia.",
    principles: ["Entenda o problema antes de escolher a ferramenta.", "Meça o que importa.", "Mantenha a solução tão simples quanto a realidade permitir."],
    research: "Explorando agora", topics: ["Agentes de IA", "Sistemas distribuídos", "Performance", "Automação", "Estratégia tecnológica"],
    contactLabel: "Vamos conversar", contactAction: "Conte seu problema", allWriting: "Todos os artigos", aboutLink: "Mais sobre mim",
  },
} as const;

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;
  const copy = siteCopy[locale];
  const home = homeCopy[locale];

  return (
    <div className="motion-home">
      <div className="motion-shell">
        <section className="motion-hero">
          <div className="motion-hero-text">
            <div className="motion-label">{home.label}</div>
            <h1>{home.title}</h1>
            <p>{home.intro}</p>
            <div className="motion-actions">
              <Link className="motion-button" href={sectionPath(locale, "contact")}>{home.workAction} <span aria-hidden="true">↗</span></Link>
              <Link className="motion-text-link" href={sectionPath(locale, "writing")}>{home.writingAction} <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
          <div className="motion-hero-art"><WhiteboardHero locale={locale} /></div>
        </section>
        <div className="motion-hero-bottom">{copy.home.eyebrow}</div>
      </div>
      <div className="motion-band"><div className="motion-shell motion-band-inner"><p>{home.band}</p><div className="motion-band-mark" aria-hidden="true" /></div></div>
      <section className="motion-shell motion-section motion-work" id="work">
        <div><div className="motion-label">{copy.home.services}</div><h2>{home.workTitle}</h2></div>
        <div className="motion-work-list">{copy.work.items.map((item) => <div className="motion-work-row" key={item.title}><h3>{item.title}</h3><p>{item.body}</p></div>)}</div>
      </section>
      <section className="motion-writing" id="writing"><div className="motion-shell motion-section">
        <div className="motion-writing-head"><div className="motion-label">{copy.home.selected}</div><h2>{home.writingTitle}</h2></div>
        <div className="motion-articles">{posts[locale].slice(0, 3).map((item) => <Link className="motion-article" href={sectionPath(locale, "writing", item.slug)} key={item.slug}><span className="motion-article-tag">{item.tags[0]}</span><div className="motion-article-content"><div><h3>{item.title}</h3><p>{item.description}</p></div><span className="motion-arrow" aria-hidden="true">↗</span></div></Link>)}</div>
        <Link className="motion-text-link motion-all-writing" href={sectionPath(locale, "writing")}>{home.allWriting} <span aria-hidden="true">↗</span></Link>
      </div></section>
      <section className="motion-shell motion-section motion-about" id="about">
        <div className="motion-about-intro"><div className="motion-label">{home.aboutLabel}</div><h2>{home.aboutTitle}</h2><p>{home.aboutText}</p><Link className="motion-text-link" href={sectionPath(locale, "about")}>{home.aboutLink} <span aria-hidden="true">↗</span></Link></div>
        <div className="motion-principles">{home.principles.map((item) => <div key={item}>{item}</div>)}</div>
      </section>
      <div className="motion-shell motion-research"><strong>{home.research}</strong><div>{home.topics.map((item) => <span key={item}>{item}</span>)}</div></div>
      <section className="motion-contact"><div className="motion-shell motion-contact-inner"><div className="motion-label">{home.contactLabel}</div><h2>{copy.home.contactTitle}</h2><p>{copy.home.contactText}</p><Link className="motion-button" href={sectionPath(locale, "contact")}>{home.contactAction} <span aria-hidden="true">↗</span></Link></div></section>
    </div>
  );
}
