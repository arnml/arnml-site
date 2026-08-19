import type { ReactNode } from "react";
import type { Locale } from "@/lib/site/locales";
import type { Post } from "./ai-is-leverage";

const body: Record<Locale, ReactNode> = {
  en: (
    <>
      <p>
        Microservices can solve real organizational and scaling problems. They
        also turn local decisions into network calls, deployments, monitoring,
        and failure modes.
      </p>
      <p>
        A startup should not adopt them because a diagram looks mature. It
        should adopt them when independent boundaries, ownership, or scaling
        characteristics make the distributed cost worthwhile.
      </p>
      <h2>Distributed complexity is still complexity</h2>
      <p>
        A well-structured monolith is not a failure state. It can be the
        simplest system that preserves speed while the business is still
        learning what should become independent.
      </p>
    </>
  ),
  es: (
    <>
      <p>
        Los microservicios pueden resolver problemas reales de organización y
        escalabilidad. También convierten decisiones locales en llamadas de red,
        despliegues, monitoreo y modos de fallo.
      </p>
      <p>
        Una startup no debería adoptarlos porque un diagrama parece maduro.
        Debería hacerlo cuando los límites, la propiedad o las necesidades de
        escalado independientes justifican el coste distribuido.
      </p>
      <h2>La complejidad distribuida sigue siendo complejidad</h2>
      <p>
        Un monolito bien estructurado no es un fracaso. Puede ser el sistema más
        simple para conservar velocidad mientras el negocio todavía aprende qué
        debe independizarse.
      </p>
    </>
  ),
  pt: (
    <>
      <p>
        Microsserviços podem resolver problemas reais de organização e escala.
        Também transformam decisões locais em chamadas de rede, deploys,
        observabilidade e modos de falha.
      </p>
      <p>
        Uma startup não deveria adotá-los porque um diagrama parece maduro.
        Deveria fazê-lo quando limites, ownership ou necessidades de escala
        independentes justificarem o custo distribuído.
      </p>
      <h2>Complexidade distribuída ainda é complexidade</h2>
      <p>
        Um monólito bem estruturado não é um estado de fracasso. Pode ser o
        sistema mais simples para preservar velocidade enquanto o negócio ainda
        aprende o que deve se tornar independente.
      </p>
    </>
  ),
};

export const post: Record<Locale, Post> = {
  en: {
    slug: "your-startup-probably-does-not-need-microservices",
    title: "Your Startup Probably Does Not Need Microservices",
    description:
      "Microservices are a trade: exchange local complexity for distributed complexity only when the benefits are real.",
    date: "2026-08-19",
    tags: ["architecture", "startups"],
    body: body.en,
  },
  es: {
    slug: "tu-startup-probablemente-no-necesita-microservicios",
    title: "Tu startup probablemente no necesita microservicios",
    description:
      "Los microservicios intercambian complejidad local por distribuida: hazlo solo cuando el beneficio sea real.",
    date: "2026-08-19",
    tags: ["arquitectura", "startups"],
    body: body.es,
  },
  pt: {
    slug: "sua-startup-provavelmente-nao-precisa-de-microsservicos",
    title: "Sua startup provavelmente não precisa de microsserviços",
    description:
      "Microsserviços trocam complexidade local por distribuída: faça isso apenas quando o benefício for real.",
    date: "2026-08-19",
    tags: ["arquitetura", "startups"],
    body: body.pt,
  },
};
