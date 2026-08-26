import type { ReactNode } from "react";
import type { Locale } from "@/lib/site/locales";
import type { Post } from "./ai-is-leverage";

const conflictDiagramCopy = {
  es: {
    title: "Qué tipo de desacuerdo es este?",
    desc: "Un mapa que muestra cómo el tema del desacuerdo y la seguridad psicológica cambian sus posibles efectos.",
    work: "sobre el trabajo",
    person: "sobre la persona",
    highSafety: "alta seguridad",
    lowSafety: "baja seguridad",
    upperLeft: "se pueden examinar supuestos",
    upperRight: "reparar la relación",
    lowerLeft: "defensividad · silencio",
    lowerRight: "mayor riesgo de daño",
    task: "tarea + evidencia",
    pressure: "presión",
    note: "la claridad es condicional, no automática",
  },
  en: {
    title: "What kind of disagreement is this?",
    desc: "A map showing how the subject of disagreement and psychological safety change its possible effects.",
    work: "about the work",
    person: "about the person",
    highSafety: "high safety",
    lowSafety: "low safety",
    upperLeft: "assumptions can be examined",
    upperRight: "relationship repair",
    lowerLeft: "defensiveness · silence",
    lowerRight: "higher risk of harm",
    task: "task + evidence",
    pressure: "pressure",
    note: "clarity is conditional, not automatic",
  },
  pt: {
    title: "Que tipo de discordância é esta?",
    desc: "Um mapa que mostra como o tema da discordância e a segurança psicológica mudam seus possíveis efeitos.",
    work: "sobre o trabalho",
    person: "sobre a pessoa",
    highSafety: "alta segurança",
    lowSafety: "baixa segurança",
    upperLeft: "suposições podem ser examinadas",
    upperRight: "reparar a relação",
    lowerLeft: "defensividade · silêncio",
    lowerRight: "maior risco de dano",
    task: "tarefa + evidência",
    pressure: "pressão",
    note: "clareza é condicional, não automática",
  },
} as const;

const ConflictFlow = ({ label, locale }: { label: string; locale: Locale }) => {
  const copy = conflictDiagramCopy[locale];

  return (
  <figure className="site-article-diagram conflict-diagram" aria-label={label}>
    <svg viewBox="0 0 720 340" role="img" aria-labelledby="conflict-map-title conflict-map-desc">
      <title id="conflict-map-title">{copy.title}</title>
      <desc id="conflict-map-desc">{copy.desc}</desc>
      <text className="conflict-map-kicker" x="360" y="22" textAnchor="middle">{copy.title}</text>
      <line className="conflict-axis" x1="110" y1="65" x2="110" y2="285" />
      <line className="conflict-axis" x1="110" y1="175" x2="650" y2="175" />
      <text className="conflict-axis-label" x="110" y="48">{copy.work}</text>
      <text className="conflict-axis-label" x="650" y="48" textAnchor="end">{copy.person}</text>
      <text className="conflict-axis-label" x="95" y="70" textAnchor="end">{copy.highSafety}</text>
      <text className="conflict-axis-label" x="95" y="285" textAnchor="end">{copy.lowSafety}</text>
      <g className="conflict-quadrant conflict-quadrant-positive">
        <text x="145" y="112">{copy.upperLeft}</text>
      </g>
      <g className="conflict-quadrant">
        <text x="395" y="112">{copy.upperRight}</text>
        <text x="145" y="238">{copy.lowerLeft}</text>
        <text x="395" y="238">{copy.lowerRight}</text>
      </g>
      <circle className="conflict-point conflict-point-task" cx="245" cy="125" r="7" />
      <text className="conflict-point-label" x="260" y="129">{copy.task}</text>
      <circle className="conflict-point conflict-point-pressure" cx="220" cy="205" r="6" />
      <text className="conflict-point-label" x="235" y="209">{copy.pressure}</text>
      <text className="conflict-map-note" x="650" y="320" textAnchor="end">{copy.note}</text>
    </svg>
    <figcaption>{label}</figcaption>
  </figure>
  );
};

const Citation = ({ children }: { children: ReactNode }) => (
  <aside className="site-citation">{children}</aside>
);

const body: Record<Locale, ReactNode> = {
  es: (
    <>
      <p>
        En muchas empresas, el conflicto se trata como una falla de cultura. Se busca que las reuniones sean amables, que los equipos estén alineados y que nadie genere fricción.
      </p>
      <p>
        Pero una organización sin desacuerdos visibles no necesariamente está alineada. Puede estar callada. Y el silencio es caro cuando oculta que el producto no funciona, que un cliente está insatisfecho o que una decisión importante no tiene dueño.
      </p>
      <p>
        En una entrevista reciente, Priya Parker llama <em>unhealthy peace</em> a esa paz basada en evitar conversaciones difíciles. Su alternativa es el <em>healthy heat</em>: suficiente tensión para decir la verdad sin convertir el desacuerdo en una guerra.
      </p>

      <h2>El conflicto no es el problema</h2>
      <p>
        El problema es el conflicto sin propósito, sin reglas y sin una salida. Una discusión puede crear valor cuando reduce ambigüedad, muestra información que faltaba o evita que el equipo construya durante semanas en la dirección equivocada.
      </p>
      <p>
        Para un founder, eso significa menos retrabajo y decisiones más rápidas. No porque el equipo discuta más, sino porque las dudas importantes aparecen antes de convertirse en costos.
      </p>

      <Citation>
        <strong>La idea en una línea</strong>
        <br />
        Los equipos no necesitan más conflicto. Necesitan desacuerdo sobre el trabajo, en un entorno donde decir la verdad no tenga un costo interpersonal.
        <br />
        <a href="https://www.nytimes.com/2026/08/22/magazine/priya-parker-interview.html">Entrevista de Priya Parker en The New York Times</a>
      </Citation>

      <ConflictFlow locale="es" label="Un desacuerdo útil depende de qué se discute y de si las personas pueden cuestionarse con seguridad." />

      <h2>Discutir puede mejorar una decisión</h2>
      <p>
        Un equipo que solo busca confirmar su primera opción puede parecer eficiente, pero está reduciendo la calidad de la información que usa. El disenso bien estructurado obliga a preguntar qué supuesto podría estar equivocado y qué evidencia todavía falta.
      </p>
      <p>
        La investigación sobre toma de decisiones grupales muestra que el disenso puede contrarrestar la búsqueda sesgada de información: en vez de reunir argumentos para defender una opción, el equipo examina alternativas reales.
      </p>
      <Citation>
        <strong>Lo que dice la evidencia</strong>
        <br />
        Los meta-análisis no respaldan la idea de que “más conflicto” siempre produzca mejores resultados. El conflicto relacional suele dañar el desempeño. El conflicto sobre la tarea puede ayudar solo en ciertos contextos, especialmente cuando existe confianza y seguridad psicológica.
        <br />
        <a href="https://pubmed.ncbi.nlm.nih.gov/21842974/">de Wit, Greer &amp; Jehn</a> · <a href="https://www.sciencedirect.com/science/article/pii/S0749597802000018">Dissent and group decision making</a>
      </Citation>

      <h2>La seguridad psicológica no significa comodidad</h2>
      <p>
        Un equipo psicológicamente seguro no es un equipo donde nadie se incomoda. Es un equipo donde una persona puede preguntar, admitir un error o contradecir al líder sin miedo a ser castigada o ridiculizada.
      </p>
      <p>
        Esa seguridad permite que la información circule. Si alguien detecta un fallo pero decide callarse, la empresa conserva una reunión tranquila y pierde una oportunidad de corregir el sistema.
      </p>
      <p>
        El poder importa. Una discusión entre dos pares no tiene el mismo riesgo que una discusión entre un manager y alguien que será evaluado por él. Si la franqueza solo existe para quien tiene más autoridad, no es una cultura de debate: es presión con otro nombre.
      </p>

      <h2>No confundas fricción con productividad</h2>
      <p>
        Hay discusiones que mejoran el trabajo y discusiones que solo consumen energía. Antes de abrir un conflicto, conviene preguntar:
      </p>
      <ul>
        <li>¿Existe una decisión concreta que pueda cambiar?</li>
        <li>¿Estoy intentando resolver el problema o descargar tensión?</li>
        <li>¿Tenemos evidencia o solo posiciones?</li>
        <li>¿La conversación protege a las personas con menos poder?</li>
        <li>¿Quién decidirá y cómo sabremos si la decisión funcionó?</li>
      </ul>
      <p>
        Si ninguna respuesta es clara, probablemente no necesitas una pelea. Necesitas más contexto, un límite o una decisión explícita.
      </p>

      <h2>Diseña la conversación</h2>
      <p>
        El conflicto productivo no debería depender de que todos sean buenos improvisando. Puede diseñarse como cualquier otro proceso de alto impacto:
      </p>
      <ul>
        <li>Define una sola pregunta.</li>
        <li>Pide evidencia o preparación antes de reunirse.</li>
        <li>Separa el problema de la persona.</li>
        <li>Usa un facilitador o un responsable del proceso.</li>
        <li>Timeboxea la discusión.</li>
        <li>Cierra con una decisión, un responsable y un siguiente paso.</li>
      </ul>
      <p>
        Slack puede ser útil para documentar un desacuerdo técnico, pero suele ser un mal lugar para resolver un conflicto sensible. Cuando faltan tono y contexto, el canal puede convertirse en el escenario del problema en vez de ayudar a resolverlo.
      </p>

      <h2>También existe la evitación inteligente</h2>
      <p>
        No todos los desacuerdos merecen ser ganados. A veces ya se habló varias veces, no hay información nueva y continuar solo daña una relación que todavía importa. Evitar estratégicamente no es lo mismo que esconderse por miedo.
      </p>
      <p>
        La pregunta no es “¿debo confrontar siempre?”. Es “¿esta conversación puede mejorar una decisión, preservar una relación o revelar algo que necesitamos saber?”. Si la respuesta es no, dejar el tema puede ser una decisión madura.
      </p>

      <blockquote>
        La productividad no viene de eliminar la fricción. Viene de convertir la fricción en información antes de que se convierta en daño.
      </blockquote>

      <Citation>
        <strong>Para seguir investigando</strong>
        <br />
        <a href="https://doi.org/10.2307/2666999">Edmondson sobre seguridad psicológica</a> · <a href="https://pubmed.ncbi.nlm.nih.gov/12940412/">Meta-análisis sobre conflicto de tarea y relacional</a> · <a href="https://pubmed.ncbi.nlm.nih.gov/10740960/">Confianza y conflicto dentro de los equipos</a> · <a href="https://business.google.com/us/think/future-of-marketing/five-dynamics-effective-team/">Google re:Work sobre equipos efectivos</a>
      </Citation>
    </>
  ),
  en: (
    <>
      <p>
        Many companies treat conflict as a culture failure. They want meetings to feel pleasant, teams to stay aligned, and nobody to create friction.
      </p>
      <p>
        But an organization with no visible disagreement is not necessarily aligned. It may simply be quiet. Silence is expensive when it hides a broken product, an unhappy customer, or an important decision with no owner.
      </p>
      <p>
        In a recent interview, Priya Parker calls this avoidance-based harmony <em>unhealthy peace</em>. Her alternative is <em>healthy heat</em>: enough tension to tell the truth without turning disagreement into war.
      </p>

      <h2>Conflict is not the problem</h2>
      <p>
        Conflict without purpose, rules, or an exit is the problem. A disagreement can create value when it reduces ambiguity, surfaces missing information, or stops a team from building in the wrong direction for weeks.
      </p>
      <p>
        For a founder, that means less rework and faster decisions. Not because the team argues more, but because important doubts appear before they become expensive.
      </p>
      <Citation>
        <strong>The idea in one line</strong>
        <br />
        Teams do not need more conflict. They need disagreement about the work, in an environment where telling the truth does not carry an interpersonal cost.
        <br />
        <a href="https://www.nytimes.com/2026/08/22/magazine/priya-parker-interview.html">Priya Parker in The New York Times</a>
      </Citation>

      <ConflictFlow locale="en" label="A useful disagreement depends on what it concerns and whether people can challenge one another safely." />

      <h2>Disagreement can improve a decision</h2>
      <p>
        A team that only looks for evidence supporting its first option may appear efficient while reducing the quality of the information it uses. Structured dissent forces the question: which assumption might be wrong, and what evidence is still missing?
      </p>
      <p>
        Research on group decision-making shows that dissent can counter biased information seeking. Instead of collecting arguments for one option, the team examines real alternatives.
      </p>
      <Citation>
        <strong>What the evidence says</strong>
        <br />
        Meta-analyses do not support the idea that more conflict always produces better outcomes. Relationship conflict usually harms performance. Task conflict can help in specific contexts, especially when trust and psychological safety are present.
        <br />
        <a href="https://pubmed.ncbi.nlm.nih.gov/21842974/">de Wit, Greer &amp; Jehn</a> · <a href="https://www.sciencedirect.com/science/article/pii/S0749597802000018">Dissent and group decision making</a>
      </Citation>

      <h2>Psychological safety does not mean comfort</h2>
      <p>
        A psychologically safe team is not one where nobody feels uncomfortable. It is one where people can ask questions, admit mistakes, or challenge a leader without fear of punishment or ridicule.
      </p>
      <p>
        That safety lets information travel. If someone notices a failure but stays quiet, the company keeps a calm meeting and loses a chance to correct the system.
      </p>
      <p>
        Power matters. An argument between peers does not carry the same risk as an argument between a manager and someone they evaluate. If candor only exists for the person with more authority, it is not a debate culture. It is pressure with better branding.
      </p>

      <h2>Do not confuse friction with productivity</h2>
      <p>
        Some disagreements improve the work. Others only consume energy. Before opening a conflict, ask:
      </p>
      <ul>
        <li>Is there a concrete decision that could change?</li>
        <li>Am I solving a problem or releasing tension?</li>
        <li>Do we have evidence, or just positions?</li>
        <li>Does the conversation protect people with less power?</li>
        <li>Who decides, and how will we know the decision worked?</li>
      </ul>
      <p>
        If none of those answers is clear, you probably do not need a fight. You need more context, a boundary, or an explicit decision.
      </p>

      <h2>Design the conversation</h2>
      <p>
        Productive conflict should not depend on everyone being good at improvisation. It can be designed like any other high-impact process:
      </p>
      <ul>
        <li>Define one question.</li>
        <li>Ask for evidence or preparation before the meeting.</li>
        <li>Separate the problem from the person.</li>
        <li>Assign a facilitator or process owner.</li>
        <li>Timebox the discussion.</li>
        <li>Close with a decision, an owner, and a next step.</li>
      </ul>
      <p>
        Slack can document a technical disagreement, but it is often a poor place to resolve a sensitive conflict. When tone and context are missing, the channel can become the stage for the problem instead of helping solve it.
      </p>

      <h2>Strategic avoidance is also a skill</h2>
      <p>
        Not every disagreement deserves to be won. Sometimes you have discussed the issue repeatedly, no new information is appearing, and continuing only damages a relationship that still matters. Strategic avoidance is not the same as hiding out of fear.
      </p>
      <p>
        The question is not “should I always confront?”. It is “can this conversation improve a decision, preserve a relationship, or reveal something we need to know?”. If the answer is no, letting the issue go can be a mature decision.
      </p>

      <blockquote>
        Productivity does not come from eliminating friction. It comes from turning friction into information before it becomes damage.
      </blockquote>

      <Citation>
        <strong>Further reading</strong>
        <br />
        <a href="https://doi.org/10.2307/2666999">Edmondson on psychological safety</a> · <a href="https://pubmed.ncbi.nlm.nih.gov/12940412/">Task and relationship conflict meta-analysis</a> · <a href="https://pubmed.ncbi.nlm.nih.gov/10740960/">Trust and intragroup conflict</a> · <a href="https://business.google.com/us/think/future-of-marketing/five-dynamics-effective-team/">Google re:Work on effective teams</a>
      </Citation>
    </>
  ),
  pt: (
    <>
      <p>
        Muitas empresas tratam o conflito como uma falha cultural. Querem reuniões agradáveis, equipes alinhadas e ninguém criando atrito.
      </p>
      <p>
        Mas uma organização sem discordâncias visíveis não está necessariamente alinhada. Talvez esteja apenas silenciosa. O silêncio é caro quando esconde um produto ruim, um cliente insatisfeito ou uma decisão importante sem responsável.
      </p>
      <p>
        Em uma entrevista recente, Priya Parker chama essa harmonia baseada em evitar conversas difíceis de <em>unhealthy peace</em>. A alternativa é o <em>healthy heat</em>: tensão suficiente para dizer a verdade sem transformar discordância em guerra.
      </p>

      <h2>O conflito não é o problema</h2>
      <p>
        O problema é o conflito sem propósito, sem regras e sem saída. Uma discordância pode criar valor quando reduz ambiguidade, revela informações ausentes ou impede que a equipe construa durante semanas na direção errada.
      </p>
      <p>
        Para um founder, isso significa menos retrabalho e decisões mais rápidas. Não porque a equipe discuta mais, mas porque dúvidas importantes aparecem antes de ficarem caras.
      </p>
      <Citation>
        <strong>A ideia em uma linha</strong>
        <br />
        As equipes não precisam de mais conflito. Precisam discordar sobre o trabalho em um ambiente onde dizer a verdade não tenha um custo interpessoal.
        <br />
        <a href="https://www.nytimes.com/2026/08/22/magazine/priya-parker-interview.html">Priya Parker no The New York Times</a>
      </Citation>

      <ConflictFlow locale="pt" label="Uma discordância útil depende do tema e de as pessoas poderem questionar umas às outras com segurança." />

      <h2>Discordar pode melhorar uma decisão</h2>
      <p>
        Uma equipe que procura apenas evidências para confirmar sua primeira opção pode parecer eficiente, enquanto reduz a qualidade das informações usadas. O dissenso estruturado força a pergunta: qual premissa pode estar errada e que evidência ainda falta?
      </p>
      <p>
        Pesquisas sobre decisões em grupo mostram que o dissenso pode combater a busca enviesada por informações. Em vez de reunir argumentos para uma opção, a equipe examina alternativas reais.
      </p>
      <Citation>
        <strong>O que as evidências mostram</strong>
        <br />
        Meta-análises não sustentam a ideia de que mais conflito sempre produz resultados melhores. Conflitos relacionais geralmente prejudicam o desempenho. Conflitos sobre a tarefa podem ajudar em contextos específicos, especialmente quando existem confiança e segurança psicológica.
        <br />
        <a href="https://pubmed.ncbi.nlm.nih.gov/21842974/">de Wit, Greer &amp; Jehn</a> · <a href="https://www.sciencedirect.com/science/article/pii/S0749597802000018">Dissenso e decisões em grupo</a>
      </Citation>

      <h2>Segurança psicológica não significa conforto</h2>
      <p>
        Uma equipe psicologicamente segura não é aquela em que ninguém fica desconfortável. É aquela em que as pessoas podem fazer perguntas, admitir erros ou desafiar um líder sem medo de punição ou ridicularização.
      </p>
      <p>
        Essa segurança permite que a informação circule. Se alguém percebe uma falha, mas fica em silêncio, a empresa preserva uma reunião tranquila e perde a chance de corrigir o sistema.
      </p>
      <p>
        O poder importa. Uma discussão entre colegas não tem o mesmo risco que uma discussão entre um gestor e alguém que ele avalia. Se a franqueza só existe para quem tem mais autoridade, isso não é uma cultura de debate. É pressão com um nome melhor.
      </p>

      <h2>Não confunda atrito com produtividade</h2>
      <p>
        Algumas discordâncias melhoram o trabalho. Outras apenas consomem energia. Antes de abrir um conflito, pergunte:
      </p>
      <ul>
        <li>Existe uma decisão concreta que pode mudar?</li>
        <li>Estou tentando resolver o problema ou descarregar tensão?</li>
        <li>Temos evidências ou apenas posições?</li>
        <li>A conversa protege as pessoas com menos poder?</li>
        <li>Quem decide e como saberemos se a decisão funcionou?</li>
      </ul>
      <p>
        Se nenhuma resposta estiver clara, provavelmente você não precisa de uma briga. Precisa de mais contexto, um limite ou uma decisão explícita.
      </p>

      <h2>Desenhe a conversa</h2>
      <p>
        O conflito produtivo não deveria depender de todos serem bons improvisadores. Ele pode ser desenhado como qualquer outro processo de alto impacto:
      </p>
      <ul>
        <li>Defina uma única pergunta.</li>
        <li>Peça evidências ou preparação antes da reunião.</li>
        <li>Separe o problema da pessoa.</li>
        <li>Defina um facilitador ou responsável pelo processo.</li>
        <li>Limite o tempo da discussão.</li>
        <li>Encerre com uma decisão, um responsável e um próximo passo.</li>
      </ul>
      <p>
        O Slack pode documentar uma discordância técnica, mas costuma ser um lugar ruim para resolver um conflito sensível. Quando faltam tom e contexto, o canal pode virar o palco do problema em vez de ajudar a resolvê-lo.
      </p>

      <h2>Evitar estrategicamente também é uma habilidade</h2>
      <p>
        Nem toda discordância merece ser vencida. Às vezes o assunto já foi discutido várias vezes, nenhuma informação nova aparece e continuar só prejudica uma relação que ainda importa. Evitar estrategicamente não é se esconder por medo.
      </p>
      <p>
        A pergunta não é “devo sempre confrontar?”. É “esta conversa pode melhorar uma decisão, preservar uma relação ou revelar algo que precisamos saber?”. Se a resposta for não, deixar o assunto de lado pode ser uma decisão madura.
      </p>

      <blockquote>
        Produtividade não vem de eliminar o atrito. Vem de transformar atrito em informação antes que ele se transforme em dano.
      </blockquote>

      <Citation>
        <strong>Para continuar pesquisando</strong>
        <br />
        <a href="https://doi.org/10.2307/2666999">Edmondson sobre segurança psicológica</a> · <a href="https://pubmed.ncbi.nlm.nih.gov/12940412/">Meta-análise sobre conflito de tarefa e relacional</a> · <a href="https://pubmed.ncbi.nlm.nih.gov/10740960/">Confiança e conflito intragrupo</a> · <a href="https://business.google.com/us/think/future-of-marketing/five-dynamics-effective-team/">Google re:Work sobre equipes eficazes</a>
      </Citation>
    </>
  ),
};

export const post: Record<Locale, Post> = {
  en: {
    slug: "the-conflict-that-moves-a-team-forward",
    title: "The Conflict That Moves a Team Forward: How to Disagree Without Breaking It",
    description:
      "Why productive disagreement can reduce rework, improve decisions, and protect team trust without romanticizing conflict.",
    date: "2026-08-26",
    tags: ["leadership", "productivity", "teams"],
    keywords: ["productive conflict", "team productivity", "psychological safety", "startup leadership", "decision making"],
    body: body.en,
  },
  es: {
    slug: "el-conflicto-que-hace-avanzar-a-un-equipo",
    title: "El conflicto que hace avanzar a un equipo: cómo discutir sin romperlo",
    description:
      "Cómo el desacuerdo productivo puede reducir el retrabajo, mejorar las decisiones y proteger la confianza del equipo.",
    date: "2026-08-26",
    tags: ["liderazgo", "productividad", "equipos"],
    keywords: ["conflicto productivo", "productividad de equipos", "seguridad psicológica", "liderazgo startup", "toma de decisiones"],
    body: body.es,
  },
  pt: {
    slug: "o-conflito-que-faz-uma-equipe-avancar",
    title: "O conflito que faz uma equipe avançar: como discordar sem destruí-la",
    description:
      "Como a discordância produtiva pode reduzir retrabalho, melhorar decisões e proteger a confiança da equipe.",
    date: "2026-08-26",
    tags: ["liderança", "produtividade", "equipes"],
    keywords: ["conflito produtivo", "produtividade de equipes", "segurança psicológica", "liderança de startup", "tomada de decisão"],
    body: body.pt,
  },
};
