import type { ReactNode } from 'react'
import type { Locale } from '@/lib/site/locales'

export type Post = { slug: string; title: string; description: string; date: string; tags: string[]; body: ReactNode }

const body: Record<Locale, ReactNode> = {
  en: <><p>AI is useful when it increases the amount of useful work a small team can do.</p><p>That does not mean every workflow should become an agent. Probabilistic behavior creates leverage in research, drafting, classification, and exploration. It creates risk when certainty, auditability, or data integrity is the actual requirement.</p><h2>Use uncertainty deliberately</h2><p>The interesting engineering question is not whether AI can do something. It is whether the uncertainty it introduces is smaller than the value it creates.</p><blockquote>Use AI where probabilistic behavior creates leverage. Use deterministic systems where certainty is the feature.</blockquote></>,
  es: <><p>La IA es útil cuando aumenta la cantidad de trabajo valioso que un equipo pequeño puede realizar.</p><p>Eso no significa que todos los procesos deban convertirse en agentes. El comportamiento probabilístico ayuda en investigación, redacción, clasificación y exploración. Aumenta el riesgo cuando el requisito real es la certeza, la trazabilidad o la integridad de los datos.</p><h2>Usa la incertidumbre de forma intencional</h2><p>La pregunta de ingeniería no es si la IA puede hacer algo, sino si la incertidumbre que introduce es menor que el valor que crea.</p><blockquote>Usa IA donde el comportamiento probabilístico genere ventaja. Usa sistemas deterministas donde la certeza sea la característica.</blockquote></>,
  pt: <><p>IA é útil quando aumenta a quantidade de trabalho valioso que uma equipe pequena consegue realizar.</p><p>Isso não significa transformar todo fluxo em um agente. O comportamento probabilístico cria alavancagem em pesquisa, rascunhos, classificação e exploração. Ele cria risco quando o requisito real é certeza, auditabilidade ou integridade dos dados.</p><h2>Use a incerteza de forma deliberada</h2><p>A pergunta de engenharia não é se a IA consegue fazer algo. É se a incerteza introduzida é menor que o valor criado.</p><blockquote>Use IA onde o comportamento probabilístico cria alavancagem. Use sistemas determinísticos onde a certeza é o diferencial.</blockquote></>,
}

export const posts: Record<Locale, Post> = {
  en: { slug: 'ai-is-leverage-not-authority', title: 'AI Is Leverage, Not Authority', description: 'A practical boundary between useful probabilistic systems and workflows that need certainty.', date: '2026-08-19', tags: ['AI', 'systems', 'judgment'], body: body.en },
  es: { slug: 'la-ia-es-palanca-no-autoridad', title: 'La IA es una palanca, no una autoridad', description: 'Dónde los sistemas probabilísticos ayudan y dónde la certeza es el requisito real.', date: '2026-08-19', tags: ['IA', 'sistemas', 'criterio'], body: body.es },
  pt: { slug: 'ia-e-alavanca-nao-autoridade', title: 'IA é alavanca, não autoridade', description: 'Onde sistemas probabilísticos ajudam e onde a certeza é o requisito real.', date: '2026-08-19', tags: ['IA', 'sistemas', 'julgamento'], body: body.pt },
}
