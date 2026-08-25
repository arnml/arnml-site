import type { ReactNode } from "react";
import type { Locale } from "@/lib/site/locales";
import type { Post } from "./ai-is-leverage";

const AgentFlow = ({ label }: { label: string }) => (
  <figure className="site-article-diagram" aria-label={label}>
    <svg viewBox="0 0 720 270" role="img" aria-labelledby="agent-flow-title agent-flow-desc">
      <title id="agent-flow-title">A reliable agentic workflow</title>
      <desc id="agent-flow-desc">
        Deterministic code controls the process, an AI agent interprets ambiguous input, and a human reviews risky cases.
      </desc>
      <defs>
        <marker id="agent-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L7,3 z" fill="currentColor" />
        </marker>
      </defs>
      <path className="agent-line" d="M200 105 H270" markerEnd="url(#agent-arrow)" />
      <path className="agent-line" d="M450 105 H548" markerEnd="url(#agent-arrow)" />
      <path className="agent-line agent-line-dashed" d="M360 150 V212 H110 V155" markerEnd="url(#agent-arrow)" />
      <g className="agent-node agent-node-code">
        <rect x="20" y="60" width="180" height="95" rx="4" />
        <text x="42" y="88">CODE</text>
        <text x="42" y="112">rules · tools</text>
        <text x="42" y="132">validation · state</text>
      </g>
      <g className="agent-node agent-node-model">
        <rect x="270" y="60" width="180" height="95" rx="4" />
        <text x="292" y="88">AGENT</text>
        <text x="292" y="112">language · audio</text>
        <text x="292" y="132">documents · exceptions</text>
      </g>
      <g className="agent-node agent-node-human">
        <rect x="548" y="60" width="152" height="95" rx="4" />
        <text x="570" y="88">HUMAN</text>
        <text x="570" y="112">risk · context</text>
        <text x="570" y="132">accountability</text>
      </g>
      <text className="agent-caption" x="360" y="250" textAnchor="middle">feedback, audit trail, and safe fallback</text>
    </svg>
    <figcaption>{label}</figcaption>
  </figure>
);

const Citation = ({ children }: { children: ReactNode }) => (
  <aside className="site-citation">{children}</aside>
);

const body: Record<Locale, ReactNode> = {
  es: (
    <>
      <p>
        Muchas empresas están intentando construir agentes de IA antes de entender qué proceso quieren mejorar. Es una inversión en la dirección equivocada. El primer objetivo no debería ser tener un agente autónomo, sino eliminar una parte del trabajo que todos conocen, todos repiten y nadie quiere hacer.
      </p>
      <p>
        Los mejores candidatos suelen ser tareas frecuentes, tediosas y propensas a errores: leer documentos con formatos distintos, revisar llamadas, preparar notas, clasificar solicitudes o detectar registros duplicados.
      </p>

      <h2>La automatización no empezó con la IA</h2>
      <p>
        La automatización existe desde mucho antes de los modelos generativos. Lo que cambió con los modelos multimodales es la clase de información que puede entrar en el proceso: texto, audio, video, imágenes y documentos que no vienen perfectamente estructurados.
      </p>
      <p>
        Eso no vuelve obsoleto al código. Al contrario: hace más importante separar qué parte del proceso necesita reglas y qué parte necesita interpretación.
      </p>

      <Citation>
        <strong>La idea en una línea</strong>
        <br />
        El agente interpreta lo ambiguo. El código controla lo que debe ser confiable. La persona responde por las decisiones importantes.
      </Citation>

      <h2>Empieza con la tarea que más detestas</h2>
      <p>
        Una buena primera automatización no es la más espectacular. Es la que tiene suficiente volumen para importar y suficiente claridad para poder medirla.
      </p>
      <ul>
        <li>Ocurre con frecuencia y consume atención cada semana.</li>
        <li>Es fácil equivocarse por cansancio o falta de contexto.</li>
        <li>Usa información no estructurada o cambia de formato.</li>
        <li>Permite revisar, corregir o revertir el resultado.</li>
        <li>Tiene un criterio de éxito que puede observarse.</li>
      </ul>
      <p>
        Este filtro también evita un error común: usar un agente para un proceso que un script, una consulta o una regla ya resolverían mejor.
      </p>

      <h2>Los agentes son buenos para las excepciones</h2>
      <p>
        Entrevistas, llamadas, notas de reuniones, revisión de código y procesamiento documental tienen algo en común: combinan conversación o contenido no estructurado con una acción posterior.
      </p>
      <p>
        Un agente puede extraer los temas de una entrevista, proponer preguntas, detectar una contradicción en un contrato o preparar un borrador para actualizar un CRM. Pero no debería decidir solo qué cambios son irreversibles, sensibles o difíciles de auditar.
      </p>

      <Citation>
        <strong>Lo que muestran los patrones de producción</strong>
        <br />
        Anthropic recomienda patrones simples y componibles. a16z observa tracción en entrevistas de voz, tickets, llamadas y workflows que conectan agentes con sistemas existentes. El valor está en completar el proceso, no en añadir autonomía por sí misma.
        <br />
        <a href="https://www.anthropic.com/engineering/building-effective-agents">Anthropic</a> · <a href="https://a16z.com/ai-voice-agents-2025-update/">a16z sobre agentes de voz</a> · <a href="https://ai.google.dev/gemini-api/docs/long-context">Google sobre multimodalidad</a>
      </Citation>

      <AgentFlow label="Un proceso confiable combina código, agentes y supervisión humana." />

      <h2>La confiabilidad se diseña alrededor del modelo</h2>
      <p>
        Un modelo de lenguaje es probabilístico. Puede producir respuestas diferentes ante entradas parecidas y también puede entregar una respuesta plausible pero incorrecta. Bajar la temperatura ayuda a la consistencia, pero no convierte al modelo en una función matemática perfectamente reproducible.
      </p>
      <p>
        La solución es construir un sistema que limite el daño de una interpretación equivocada:
      </p>
      <ul>
        <li>código para el estado, los permisos y las transiciones;</li>
        <li>esquemas estructurados y validaciones deterministas;</li>
        <li>evidencia y trazabilidad de cada decisión;</li>
        <li>umbrales de confianza y revisión humana;</li>
        <li>pruebas con ejemplos reales y monitoreo en producción.</li>
      </ul>

      <h2>Un ejemplo: descubrir que dos registros son la misma persona</h2>
      <p>
        Benjamin Hernández puede aparecer en otro sistema como Ben Hernández. Eso es un problema de <em>entity resolution</em>, no simplemente de comparar cadenas de texto.
      </p>
      <p>
        Un pipeline sólido puede normalizar nombres y direcciones, encontrar candidatos con reglas y dejar que un modelo avanzado analice los pares ambiguos. El modelo debería considerar nombre, correo, teléfono, dirección y contradicciones entre campos; después, el sistema decide si fusiona, envía a revisión o conserva ambos registros.
      </p>
      <p>
        La IA aporta criterio semántico. No debería tener permiso para convertir una conjetura en una verdad sin una capa de validación.
      </p>

      <h2>La pregunta para un founder</h2>
      <p>
        Antes de construir un agente, pregunta: ¿dónde está la ambigüedad que antes hacía demasiado caro automatizar este proceso? Si no existe, probablemente necesitas software convencional. Si existe, define qué puede interpretar el agente, qué debe comprobar el código y cuándo debe intervenir una persona.
      </p>
      <blockquote>
        No se trata de reemplazar la automatización por agentes. Se trata de usar código donde conocemos las reglas, modelos donde necesitamos interpretar ambigüedad y humanos donde el costo del error exige criterio.
      </blockquote>

      <Citation>
        <strong>Para seguir investigando</strong>
        <br />
        <a href="https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/">OpenAI: guía práctica para construir agentes</a> · <a href="https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system">Google Cloud: patrones de diseño agentic</a> · <a href="https://airc.nist.gov/airmf-resources/airmf/5-sec-core/">NIST AI Risk Management Framework</a> · <a href="https://arxiv.org/abs/2401.03426">LLMs para entity resolution</a>
      </Citation>
    </>
  ),
  en: (
    <>
      <p>
        Many companies are trying to build AI agents before understanding which process they want to improve. That is an investment in the wrong direction. The first goal should not be an autonomous agent. It should be removing a piece of work everyone knows, repeats, and hates doing.
      </p>
      <p>
        The best candidates are usually frequent, tedious, error-prone tasks: reading documents in inconsistent formats, reviewing calls, preparing notes, classifying requests, or finding duplicate records.
      </p>

      <h2>Automation did not start with AI</h2>
      <p>
        Automation has existed long before generative models. What multimodal models changed is the kind of information that can enter a workflow: text, audio, video, images, and documents that are not perfectly structured.
      </p>
      <p>
        That does not make code obsolete. It makes the boundary more important: which part needs rules, and which part needs interpretation?
      </p>
      <Citation>
        <strong>The idea in one line</strong>
        <br />
        The agent interprets ambiguity. Code controls what must be reliable. A person owns important decisions.
      </Citation>

      <h2>Start with the task you hate most</h2>
      <p>
        A good first automation is not the most impressive one. It has enough volume to matter and enough clarity to measure.
      </p>
      <ul>
        <li>It happens often and consumes attention every week.</li>
        <li>Fatigue or missing context makes mistakes easy.</li>
        <li>It relies on unstructured data or changing formats.</li>
        <li>The result can be reviewed, corrected, or reversed.</li>
        <li>Success can be observed and measured.</li>
      </ul>
      <p>
        This filter also prevents a common mistake: using an agent for a process that a script, query, or rule would handle better.
      </p>

      <h2>Agents are good at exceptions</h2>
      <p>
        Interviews, calls, meeting notes, code review, and document processing share a pattern: unstructured content or conversation followed by an action.
      </p>
      <p>
        An agent can extract themes from an interview, suggest questions, flag a contract contradiction, or draft a CRM update. It should not decide alone which changes are irreversible, sensitive, or hard to audit.
      </p>
      <Citation>
        <strong>What production patterns suggest</strong>
        <br />
        Anthropic recommends simple, composable patterns. a16z reports traction in voice interviews, tickets, calls, and workflows that connect agents to existing systems. The value is completing the process, not adding autonomy for its own sake.
        <br />
        <a href="https://www.anthropic.com/engineering/building-effective-agents">Anthropic</a> · <a href="https://a16z.com/ai-voice-agents-2025-update/">a16z on voice agents</a> · <a href="https://ai.google.dev/gemini-api/docs/long-context">Google on multimodality</a>
      </Citation>

      <AgentFlow label="A reliable process combines code, agents, and human oversight." />

      <h2>Reliability is designed around the model</h2>
      <p>
        A language model is probabilistic. It can produce different answers for similar inputs and a plausible answer that is still wrong. Lowering temperature improves consistency, but it does not turn a model into a perfectly reproducible mathematical function.
      </p>
      <p>
        The answer is a system that limits the damage of a wrong interpretation:
      </p>
      <ul>
        <li>code for state, permissions, and transitions;</li>
        <li>structured schemas and deterministic validation;</li>
        <li>evidence and traceability for each decision;</li>
        <li>confidence thresholds and human review;</li>
        <li>real examples, tests, and production monitoring.</li>
      </ul>

      <h2>Example: finding that two records are the same person</h2>
      <p>
        Benjamin Hernandez may appear in another system as Ben Hernandez. That is an <em>entity resolution</em> problem, not merely a string comparison problem.
      </p>
      <p>
        A strong pipeline can normalize names and addresses, find candidates with rules, and ask an advanced model to analyze ambiguous pairs. The model should consider names, email, phone, address, and contradictions across fields. The system can then merge, route to review, or keep both records.
      </p>
      <p>
        AI contributes semantic judgment. It should not have permission to turn a guess into truth without a validation layer.
      </p>

      <h2>The founder question</h2>
      <p>
        Before building an agent, ask: where is the ambiguity that used to make this process too expensive to automate? If there is none, you probably need conventional software. If there is, define what the agent may interpret, what code must verify, and when a person must step in.
      </p>
      <blockquote>
        This is not about replacing automation with agents. It is about using code where we know the rules, models where we need to interpret ambiguity, and humans where the cost of error requires judgment.
      </blockquote>
      <Citation>
        <strong>Further reading</strong>
        <br />
        <a href="https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/">OpenAI: practical guide to building agents</a> · <a href="https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system">Google Cloud: agentic design patterns</a> · <a href="https://airc.nist.gov/airmf-resources/airmf/5-sec-core/">NIST AI Risk Management Framework</a> · <a href="https://arxiv.org/abs/2401.03426">LLMs for entity resolution</a>
      </Citation>
    </>
  ),
  pt: (
    <>
      <p>
        Muitas empresas estão tentando construir agentes de IA antes de entender qual processo querem melhorar. Esse é um investimento na direção errada. O primeiro objetivo não deveria ser um agente autônomo, mas eliminar uma parte do trabalho que todos conhecem, repetem e detestam fazer.
      </p>
      <p>
        Os melhores candidatos costumam ser tarefas frequentes, tediosas e sujeitas a erros: ler documentos em formatos diferentes, revisar ligações, preparar notas, classificar solicitações ou encontrar registros duplicados.
      </p>

      <h2>A automação não começou com a IA</h2>
      <p>
        A automação existe muito antes dos modelos generativos. O que os modelos multimodais mudaram foi o tipo de informação que pode entrar no fluxo: texto, áudio, vídeo, imagens e documentos que não estão perfeitamente estruturados.
      </p>
      <p>
        Isso não torna o código obsoleto. Torna mais importante separar o que precisa de regras do que precisa de interpretação.
      </p>
      <Citation>
        <strong>A ideia em uma linha</strong>
        <br />
        O agente interpreta a ambiguidade. O código controla o que precisa ser confiável. Uma pessoa assume as decisões importantes.
      </Citation>

      <h2>Comece pela tarefa que você mais detesta</h2>
      <p>
        Uma boa primeira automação não é a mais impressionante. É aquela que tem volume suficiente para importar e clareza suficiente para ser medida.
      </p>
      <ul>
        <li>Acontece com frequência e consome atenção toda semana.</li>
        <li>Cansaço ou falta de contexto tornam os erros fáceis.</li>
        <li>Usa dados não estruturados ou formatos que mudam.</li>
        <li>O resultado pode ser revisado, corrigido ou revertido.</li>
        <li>O sucesso pode ser observado e medido.</li>
      </ul>
      <p>
        Esse filtro também evita um erro comum: usar um agente em um processo que um script, uma consulta ou uma regra resolveria melhor.
      </p>

      <h2>Agentes são bons para exceções</h2>
      <p>
        Entrevistas, ligações, notas de reuniões, revisão de código e processamento de documentos compartilham um padrão: conteúdo não estruturado ou conversa seguida de uma ação.
      </p>
      <p>
        Um agente pode extrair temas de uma entrevista, sugerir perguntas, apontar uma contradição em um contrato ou preparar uma atualização no CRM. Ele não deveria decidir sozinho quais mudanças são irreversíveis, sensíveis ou difíceis de auditar.
      </p>
      <Citation>
        <strong>O que os padrões de produção sugerem</strong>
        <br />
        A Anthropic recomenda padrões simples e componíveis. A a16z relata tração em entrevistas de voz, tickets, ligações e fluxos que conectam agentes a sistemas existentes. O valor está em completar o processo, não em adicionar autonomia por si só.
        <br />
        <a href="https://www.anthropic.com/engineering/building-effective-agents">Anthropic</a> · <a href="https://a16z.com/ai-voice-agents-2025-update/">a16z sobre agentes de voz</a> · <a href="https://ai.google.dev/gemini-api/docs/long-context">Google sobre multimodalidade</a>
      </Citation>

      <AgentFlow label="Um processo confiável combina código, agentes e supervisão humana." />

      <h2>A confiabilidade é desenhada ao redor do modelo</h2>
      <p>
        Um modelo de linguagem é probabilístico. Ele pode produzir respostas diferentes para entradas parecidas e uma resposta plausível que ainda está errada. Reduzir a temperatura melhora a consistência, mas não transforma o modelo em uma função matemática perfeitamente reproduzível.
      </p>
      <p>
        A resposta é um sistema que limita o dano de uma interpretação errada:
      </p>
      <ul>
        <li>código para estado, permissões e transições;</li>
        <li>schemas estruturados e validação determinística;</li>
        <li>evidência e rastreabilidade para cada decisão;</li>
        <li>limites de confiança e revisão humana;</li>
        <li>exemplos reais, testes e monitoramento em produção.</li>
      </ul>

      <h2>Exemplo: descobrir que dois registros são a mesma pessoa</h2>
      <p>
        Benjamin Hernandez pode aparecer em outro sistema como Ben Hernandez. Isso é um problema de <em>entity resolution</em>, não apenas de comparação de texto.
      </p>
      <p>
        Um pipeline sólido pode normalizar nomes e endereços, encontrar candidatos com regras e pedir a um modelo avançado que analise os pares ambíguos. O modelo deve considerar nomes, e-mail, telefone, endereço e contradições entre campos. Depois, o sistema decide se deve unir, enviar para revisão ou manter os dois registros.
      </p>
      <p>
        A IA contribui com julgamento semântico. Ela não deveria ter permissão para transformar um palpite em verdade sem uma camada de validação.
      </p>

      <h2>A pergunta para um founder</h2>
      <p>
        Antes de construir um agente, pergunte: onde está a ambiguidade que antes tornava esse processo caro demais para automatizar? Se ela não existe, provavelmente você precisa de software convencional. Se existe, defina o que o agente pode interpretar, o que o código deve verificar e quando uma pessoa deve intervir.
      </p>
      <blockquote>
        Não se trata de substituir automação por agentes. Trata-se de usar código onde conhecemos as regras, modelos onde precisamos interpretar a ambiguidade e pessoas onde o custo do erro exige julgamento.
      </blockquote>
      <Citation>
        <strong>Para continuar pesquisando</strong>
        <br />
        <a href="https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/">OpenAI: guia prático para construir agentes</a> · <a href="https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system">Google Cloud: padrões de design agentic</a> · <a href="https://airc.nist.gov/airmf-resources/airmf/5-sec-core/">NIST AI Risk Management Framework</a> · <a href="https://arxiv.org/abs/2401.03426">LLMs para entity resolution</a>
      </Citation>
    </>
  ),
};

export const post: Record<Locale, Post> = {
  en: {
    slug: "ai-agents-that-actually-work",
    title: "AI Agents That Actually Work: How to Combine Judgment, Code, and Control",
    description:
      "A practical case for combining probabilistic models with deterministic workflows and human judgment.",
    date: "2026-08-25",
    tags: ["AI", "agents", "reliability"],
    keywords: [
      "AI agents",
      "reliable AI agents",
      "agentic workflows",
      "AI automation",
      "deterministic workflows",
      "human-in-the-loop AI",
    ],
    body: body.en,
  },
  es: {
    slug: "agentes-de-ia-que-si-funcionan",
    title: "Agentes de IA que sí funcionan: cómo combinar criterio, código y control",
    description:
      "Por qué los agentes confiables combinan modelos probabilísticos, procesos deterministas y criterio humano.",
    date: "2026-08-25",
    tags: ["IA", "agentes", "fiabilidad"],
    keywords: [
      "agentes de IA",
      "agentes de IA confiables",
      "automatización con IA",
      "procesos deterministas",
      "revisión humana de IA",
      "entity resolution",
    ],
    body: body.es,
  },
  pt: {
    slug: "agentes-de-ia-que-realmente-funcionam",
    title: "Agentes de IA que realmente funcionam: como combinar critério, código e controle",
    description:
      "Por que agentes confiáveis combinam modelos probabilísticos, fluxos determinísticos e julgamento humano.",
    date: "2026-08-25",
    tags: ["IA", "agentes", "confiabilidade"],
    keywords: [
      "agentes de IA",
      "agentes de IA confiáveis",
      "automação com IA",
      "fluxos determinísticos",
      "revisão humana de IA",
      "entity resolution",
    ],
    body: body.pt,
  },
};
