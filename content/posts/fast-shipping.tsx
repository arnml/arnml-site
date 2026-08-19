import type { ReactNode } from "react";
import type { Locale } from "@/lib/site/locales";
import type { Post } from "./ai-is-leverage";

const body: Record<Locale, ReactNode> = {
  en: (
    <>
      <p>
        Fast shipping is not the opposite of good engineering. It is one of the
        constraints good engineering has to satisfy.
      </p>
      <p>
        The mistake is treating speed as permission to ignore the expensive
        parts: data integrity, security boundaries, rollback paths, and the
        operational behavior users will experience after launch.
      </p>
      <h2>Speed needs a risk model</h2>
      <p>
        A small product can move quickly because its risks are understood and
        contained. The answer is not maximal process. It is knowing which
        shortcuts are reversible and which ones become permanent architecture.
      </p>
    </>
  ),
  es: (
    <>
      <p>
        Entregar rápido no es lo contrario de hacer buena ingeniería. Es una de
        las restricciones que la buena ingeniería debe satisfacer.
      </p>
      <p>
        El error es interpretar la velocidad como permiso para ignorar lo caro:
        la integridad de los datos, los límites de seguridad, las rutas de
        rollback y el comportamiento operativo después del lanzamiento.
      </p>
      <h2>La velocidad necesita un modelo de riesgo</h2>
      <p>
        Un producto pequeño puede avanzar rápido cuando sus riesgos están
        entendidos y contenidos. La respuesta no es añadir procesos infinitos,
        sino distinguir qué atajos son reversibles y cuáles se convertirán en
        arquitectura permanente.
      </p>
    </>
  ),
  pt: (
    <>
      <p>
        Entregar rápido não é o oposto de fazer boa engenharia. É uma das
        restrições que a boa engenharia precisa atender.
      </p>
      <p>
        O erro é tratar velocidade como permissão para ignorar o que fica caro:
        integridade dos dados, limites de segurança, caminhos de rollback e o
        comportamento operacional depois do lançamento.
      </p>
      <h2>Velocidade precisa de um modelo de risco</h2>
      <p>
        Um produto pequeno pode avançar rápido quando seus riscos estão
        entendidos e contidos. A resposta não é criar processos infinitos, mas
        saber quais atalhos são reversíveis e quais viram arquitetura
        permanente.
      </p>
    </>
  ),
};

export const post: Record<Locale, Post> = {
  en: {
    slug: "fast-shipping-is-an-engineering-constraint",
    title: "Fast Shipping Is an Engineering Constraint, Not an Excuse",
    description:
      "Shipping quickly is a technical requirement—but speed still needs judgment about irreversible risk.",
    date: "2026-08-19",
    tags: ["engineering", "delivery"],
    body: body.en,
  },
  es: {
    slug: "entregar-rapido-es-una-restriccion-de-ingenieria",
    title: "Entregar rápido es una restricción de ingeniería, no una excusa",
    description:
      "La velocidad es un requisito técnico, pero necesita criterio sobre los riesgos irreversibles.",
    date: "2026-08-19",
    tags: ["ingeniería", "entrega"],
    body: body.es,
  },
  pt: {
    slug: "entregar-rapido-e-uma-restricao-de-engenharia",
    title: "Entregar rápido é uma restrição de engenharia, não uma desculpa",
    description:
      "Velocidade é um requisito técnico, mas ainda exige julgamento sobre riscos irreversíveis.",
    date: "2026-08-19",
    tags: ["engenharia", "entrega"],
    body: body.pt,
  },
};
