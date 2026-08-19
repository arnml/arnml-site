import type { ReactNode } from "react";
import type { Locale } from "@/lib/site/locales";
import type { Post } from "./ai-is-leverage";

const body: Record<Locale, ReactNode> = {
  en: (
    <>
      <p>
        When software feels slow, engineers often start by optimizing code. That
        is sometimes the right move. It is rarely the first question.
      </p>
      <p>
        Before changing an algorithm, ask what work the system is doing, why it
        is doing it, and whether the user needs the result at all. Removing
        unnecessary work beats making necessary work five percent faster.
      </p>
      <h2>Efficiency starts with subtraction</h2>
      <p>
        Fewer requests, smaller payloads, simpler workflows, and clearer
        ownership can outperform clever local optimizations. Measure the whole
        path before polishing one function.
      </p>
    </>
  ),
  es: (
    <>
      <p>
        Cuando el software se siente lento, los ingenieros suelen empezar
        optimizando código. A veces es lo correcto. Rara vez es la primera
        pregunta.
      </p>
      <p>
        Antes de cambiar un algoritmo, pregunta qué trabajo hace el sistema, por
        qué lo hace y si el usuario realmente necesita el resultado. Eliminar
        trabajo innecesario suele superar a hacer un cinco por ciento más rápido
        el trabajo necesario.
      </p>
      <h2>La eficiencia empieza restando</h2>
      <p>
        Menos solicitudes, payloads más pequeños, flujos simples y
        responsabilidades claras pueden superar optimizaciones locales
        ingeniosas. Mide el recorrido completo antes de pulir una función.
      </p>
    </>
  ),
  pt: (
    <>
      <p>
        Quando o software parece lento, engenheiros costumam começar otimizando
        o código. Às vezes é o caminho certo. Raramente é a primeira pergunta.
      </p>
      <p>
        Antes de trocar um algoritmo, pergunte que trabalho o sistema está
        fazendo, por que o faz e se o usuário realmente precisa do resultado.
        Remover trabalho desnecessário costuma ser melhor do que tornar o
        trabalho necessário cinco por cento mais rápido.
      </p>
      <h2>Eficiência começa subtraindo</h2>
      <p>
        Menos requisições, payloads menores, fluxos mais simples e
        responsabilidades claras podem superar otimizações locais inteligentes.
        Meça o caminho inteiro antes de polir uma função.
      </p>
    </>
  ),
};

export const post: Record<Locale, Post> = {
  en: {
    slug: "optimize-the-work-before-optimizing-the-code",
    title: "Optimize the Work Before Optimizing the Code",
    description:
      "The highest-leverage performance optimization is often deleting work the system never needed to do.",
    date: "2026-08-19",
    tags: ["performance", "systems"],
    body: body.en,
  },
  es: {
    slug: "optimiza-el-trabajo-antes-que-el-codigo",
    title: "Optimiza el trabajo antes que el código",
    description:
      "La optimización de mayor impacto suele ser eliminar trabajo que el sistema nunca necesitó hacer.",
    date: "2026-08-19",
    tags: ["rendimiento", "sistemas"],
    body: body.es,
  },
  pt: {
    slug: "otimize-o-trabalho-antes-do-codigo",
    title: "Otimize o trabalho antes de otimizar o código",
    description:
      "A otimização de maior impacto muitas vezes é eliminar trabalho que o sistema nunca precisou fazer.",
    date: "2026-08-19",
    tags: ["performance", "sistemas"],
    body: body.pt,
  },
};
