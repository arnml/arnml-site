import type { ReactNode } from "react";
import type { Locale } from "@/lib/site/locales";
import type { Post } from "./ai-is-leverage";

const body: Record<Locale, ReactNode> = {
  en: (
    <>
      <p>
        Building software is difficult for a reason that is easy to miss from
        outside the engineering team: the code is only the visible part of the
        system. The harder work is agreeing on what the system is supposed to
        mean when real people, real devices, real time, and real failure are
        involved.
      </p>
      <p>
        For a CEO or founder, this appears as missed dates, estimates that keep
        moving, expensive rework, and a product that works in a demonstration
        but not reliably in the field. For a CTO or engineering leader, it
        appears as ambiguous requirements, conflicting assumptions, difficult
        integrations, and bugs that cannot be reproduced consistently.
      </p>

      <h2>The most expensive bug may be an unanswered question</h2>
      <p>
        A software team can write excellent code and still build the wrong
        thing. The problem is often not incompetence. It is that the team has
        not made the important decisions explicit.
      </p>
      <p>
        What does “authorized” mean? Which clock decides whether access is
        allowed? What happens when a message arrives late? What should a device
        do when a field is missing? Does “nothing happened” mean success,
        denial, timeout, or an internal error?
      </p>
      <p>
        Fred Brooks made a similar point in <em>No Silver Bullet</em>: the
        difficult part of software is the specification, design, and testing of
        the conceptual system, not merely representing it in code. In other
        words, the most expensive ambiguity is often created before the first
        line is written.
      </p>

      <h2>A real integration failure</h2>
      <p>
        I recently tested a real-time integration with an edge hardware
        engineer. The broader product included another application that sent an
        access request for a building. The authorization policy was complex for
        the use case, and we had to reason through the messages, payloads, and
        sequence of events between the systems.
      </p>
      <p>
        I tested my part locally. The messages looked correct. The payloads
        looked correct. The local flow appeared to work.
      </p>
      <p>
        Then the real test failed.
      </p>
      <p>
        The reason was a rule that had not been visible in my local model: the
        device checked the hour first. If the request arrived outside the
        allowed time for that device, it did nothing.
      </p>
      <p>
        “Nothing” was not a message. It was not an error. It was not a rejected
        authorization response. It was an absence of observable behavior.
      </p>
      <p>
        The device was not necessarily broken. My code was not necessarily
        broken. The test was not necessarily wrong. The system was incomplete
        in our shared understanding of its behavior.
      </p>

      <h2>More conditions create more possible realities</h2>
      <p>
        The edge hardware could operate in five or more modes depending on
        conditions such as time, device state, authorization, connectivity, and
        the order in which messages arrived. That means the system does not have
        one simple path. It has a state space.
      </p>
      <p>
        The number of possible interactions grows quickly when several systems
        make independent decisions. A local test covers one path through that
        space. Production visits the paths nobody wrote down.
      </p>
      <p>
        This is why distributed systems are difficult. A message can be delayed,
        duplicated, reordered, rejected, or silently ignored. A device can be
        online according to one component and unavailable according to another.
        A valid payload can still be invalid in the current state.
      </p>
      <p>
        Martin Kleppmann’s <em>Designing Data-Intensive Applications</em> is
        valuable precisely because it treats reliability, consistency,
        operability, and failure as design concerns rather than afterthoughts.
        Google’s SRE material makes the same operational point: systems need
        monitoring and troubleshooting practices that reveal what happened,
        not just code that works on the happy path.
      </p>

      <h2>Communication is part of the architecture</h2>
      <p>
        Communication is often treated as a soft skill. In software, it is a
        technical dependency.
      </p>
      <p>
        Every undocumented assumption becomes a hidden branch in the system.
        Every different interpretation of a word like “approved,” “available,”
        or “processed” becomes a compatibility risk. Every team that owns only
        one part of the flow can believe its part is correct while the end-to-
        end behavior is wrong.
      </p>
      <p>
        Architecture is not only boxes and arrows. It is also the agreement
        between the people and systems responsible for those boxes. Conway’s
        Law captures this relationship: the structure of a system tends to
        reflect the communication structure of the organization that builds it.
        If teams do not share a clear model of the problem, the architecture
        will expose that gap.
      </p>

      <h2>AI does not remove the need for clarity</h2>
      <p>
        AI can help with research, implementation, testing, documentation, and
        exploring alternatives. But AI generally does what we ask it to do. If
        the goal is wrong, the instructions are unclear, or the important
        decisions are left on autopilot, AI can make the wrong direction faster
        and more convincing.
      </p>
      <p>
        This is not a reason to avoid AI. It is a reason to improve the system
        around it. Leaders still need to define the outcome, the constraints,
        the unacceptable failures, and the point at which a human must review
        the result. AI can generate code and possibilities; it cannot take
        responsibility for an unclear business decision.
      </p>

      <h2>What leaders should make explicit</h2>
      <p>
        Clear communication does not mean producing more documents. It means
        making the decisions that affect business outcomes visible and testable.
        Before implementation, a leadership team should be able to answer:
      </p>
      <ul>
        <li>What is the business outcome this flow must protect?</li>
        <li>What are the valid states and transitions?</li>
        <li>Which conditions change the result?</li>
        <li>What is the order of operations?</li>
        <li>What does success, denial, timeout, and failure look like?</li>
        <li>Which component owns each decision?</li>
        <li>How will an operator know what happened?</li>
        <li>What must be deterministic, and where is uncertainty acceptable?</li>
      </ul>
      <p>
        These questions are useful whether the system is a startup MVP, a
        payment workflow, a machine-learning feature, or an access-control
        device. They reduce the distance between the business intention and the
        behavior customers actually experience.
      </p>

      <h2>The goal is not perfect certainty</h2>
      <p>
        No team can eliminate uncertainty. Requirements change. Hardware has
        limits. Networks fail. Customers behave in ways nobody predicted.
      </p>
      <p>
        The goal is to decide where uncertainty is acceptable and where it is
        dangerous. A recommendation can be probabilistic. A security boundary,
        authorization decision, billing state, or irreversible data operation
        usually needs explicit and observable rules.
      </p>
      <p>
        Good engineering is not the absence of complexity. It is the ability to
        understand which complexity is essential, which complexity was created
        by our choices, and which complexity can be removed before it becomes a
        business problem.
      </p>

      <h2>Software succeeds when the shared model succeeds</h2>
      <p>
        The lesson from the failed test was not “write better code.” It was
        “make the system’s behavior explicit.” We needed a shared model of the
        states, rules, messages, timing, and observable outcomes before another
        local test could tell us anything useful.
      </p>
      <p>
        For founders and executives, this is the practical point: software
        delays are often decision and communication delays in disguise. The
        fastest teams are not the teams that skip thinking. They are the teams
        that resolve the right questions early, expose failure clearly, and
        keep the business goal connected to the technical behavior.
      </p>
      <blockquote>
        The quality of the code matters. But before code can be good, the team
        must agree on what “good behavior” means.
      </blockquote>
      <p>
        Has this happened in your team? A feature looked correct in isolation,
        but failed when the complete system, its hidden rules, and real-world
        conditions were involved? That gap is often where the most valuable
        engineering work begins.
      </p>

      <h2>Further reading</h2>
      <p>
        This argument connects with <a href="https://users.csc.calpoly.edu/~jdalbey/SWE/Papers/NoSilverBullet.html">Fred Brooks’s No Silver Bullet</a>,
        <a href="https://www.oreilly.com/library/view/designing-data-intensive-applications/9781098119058/">Designing Data-Intensive Applications</a>
        by Martin Kleppmann and Chris Riccomini, and Google’s
        <a href="https://sre.google/sre-book/">Site Reliability Engineering</a>
        book. For practical engineering habits, <a href="https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/">The Pragmatic Programmer</a>
        remains a useful companion.
      </p>
    </>
  ),
  es: (
    <>
      <p>Construir software es difícil porque el código es solo la parte visible del sistema. El trabajo más complejo es acordar qué debe significar el sistema cuando intervienen personas, dispositivos, tiempo real y fallos reales.</p>
      <p>Para un fundador, esto aparece como retrasos, retrabajo y un producto que funciona en una demo pero no en el campo. Para un CTO, aparece como requisitos ambiguos, supuestos contradictorios e integraciones difíciles de reproducir.</p>
      <h2>El bug más caro puede ser una pregunta sin responder</h2>
      <p>Un equipo puede escribir código excelente y aun así construir algo incorrecto. ¿Qué significa “autorizado”? ¿Qué reloj decide si el acceso está permitido? ¿Qué ocurre si un mensaje llega tarde? ¿“No pasó nada” significa éxito, rechazo, timeout o error interno?</p>
      <p>Fred Brooks explicó en <em>No Silver Bullet</em> que la dificultad esencial está en especificar, diseñar y probar el sistema conceptual. La ambigüedad más costosa suele aparecer antes de la primera línea de código.</p>
      <h2>Una integración real que falló</h2>
      <p>Probé una integración en tiempo real con hardware edge. Otra aplicación enviaba una solicitud de acceso a un edificio. La política de autorización era compleja y tuvimos que definir mensajes, payloads y secuencias.</p>
      <p>Mi prueba local parecía correcta. En la prueba real falló porque existía una regla que no estaba en mi modelo: el dispositivo comprobaba primero la hora. Fuera del horario permitido, no hacía nada.</p>
      <p>Ese “nada” no era un mensaje, un error ni una respuesta de autorización. Era ausencia de comportamiento observable. El dispositivo no tenía por qué estar roto; el problema era que nuestra comprensión compartida estaba incompleta.</p>
      <h2>Más condiciones crean más realidades posibles</h2>
      <p>El hardware podía operar de cinco formas o más según la hora, el estado del dispositivo, la autorización, la conectividad y el orden de los mensajes. Una prueba local cubre un camino. Producción visita los caminos que nadie escribió.</p>
      <p>Los sistemas distribuidos son difíciles por esto: los mensajes se retrasan, duplican, reordenan, rechazan o ignoran. Un payload válido puede ser inválido en el estado actual.</p>
      <p>Los principios de <em>Designing Data-Intensive Applications</em> y del libro de SRE de Google apuntan a lo mismo: la fiabilidad, la operación y el fallo deben formar parte del diseño.</p>
      <h2>La comunicación también es arquitectura</h2>
      <p>En software, la comunicación no es solo una habilidad blanda: es una dependencia técnica. Cada supuesto no documentado se convierte en una rama oculta. Cada interpretación distinta de “aprobado”, “disponible” o “procesado” se convierte en riesgo de compatibilidad.</p>
      <p>La arquitectura también es el acuerdo entre las personas y sistemas responsables de cada parte. Si los equipos no comparten un modelo claro del problema, la arquitectura expone esa brecha.</p>
      <h2>La IA no elimina la necesidad de claridad</h2>
      <p>La IA puede ayudar con investigación, implementación, pruebas y documentación. Pero normalmente hace lo que le pedimos. Si el objetivo es incorrecto, las instrucciones son ambiguas o dejamos las decisiones importantes en piloto automático, la IA puede acelerar la dirección equivocada.</p>
      <p>No es una razón para evitar la IA. Es una razón para mejorar el sistema que la rodea: definir el resultado, las restricciones, los fallos inaceptables y cuándo debe revisar una persona.</p>
      <h2>Qué deben hacer explícito los líderes</h2>
      <ul><li>¿Qué resultado de negocio debe proteger este flujo?</li><li>¿Cuáles son los estados y transiciones válidos?</li><li>¿Qué condiciones cambian el resultado?</li><li>¿Qué significan éxito, rechazo, timeout y fallo?</li><li>¿Quién es responsable de cada decisión?</li><li>¿Cómo sabrá un operador qué ocurrió?</li><li>¿Qué debe ser determinista?</li></ul>
      <p>No se trata de eliminar toda incertidumbre. Se trata de decidir dónde es aceptable y dónde es peligrosa. Una recomendación puede ser probabilística; una autorización, un pago o un límite de seguridad normalmente necesita reglas explícitas y observables.</p>
      <p>Los retrasos de software suelen ser retrasos de decisión y comunicación disfrazados. Los equipos rápidos no dejan de pensar: resuelven antes las preguntas correctas y conectan el objetivo de negocio con el comportamiento técnico.</p>
      <blockquote>La calidad del código importa. Pero antes de que el código pueda ser bueno, el equipo debe acordar qué significa un buen comportamiento.</blockquote>
      <p>¿Te ha pasado esto en tu equipo? ¿Una funcionalidad parecía correcta de forma aislada, pero falló cuando entraron en juego el sistema completo, sus reglas ocultas y las condiciones reales? Esa brecha suele ser donde comienza el trabajo de ingeniería más valioso.</p>
    </>
  ),
  pt: (
    <>
      <p>Construir software é difícil porque o código é apenas a parte visível do sistema. O trabalho mais complexo é concordar sobre o que o sistema deve significar quando existem pessoas, dispositivos, tempo real e falhas reais.</p>
      <p>Para um fundador, isso aparece como atrasos, retrabalho e um produto que funciona na demonstração, mas não no mundo real. Para um CTO, aparece como requisitos ambíguos, premissas conflitantes e integrações difíceis de reproduzir.</p>
      <h2>O bug mais caro pode ser uma pergunta sem resposta</h2>
      <p>Uma equipe pode escrever um código excelente e ainda construir a coisa errada. O que significa “autorizado”? Qual relógio decide se o acesso é permitido? O que acontece quando uma mensagem chega atrasada? “Nada aconteceu” significa sucesso, negação, timeout ou erro interno?</p>
      <p>Fred Brooks explicou em <em>No Silver Bullet</em> que a dificuldade essencial está em especificar, projetar e testar o sistema conceitual. A ambiguidade mais cara costuma existir antes da primeira linha de código.</p>
      <h2>Uma integração real que falhou</h2>
      <p>Testei uma integração em tempo real com hardware edge. Outro aplicativo enviava uma solicitação de acesso a um prédio. A política de autorização era complexa, e precisávamos definir mensagens, payloads e sequência.</p>
      <p>Meu teste local parecia correto. No teste real, falhou porque havia uma regra que não estava no meu modelo: o dispositivo verificava primeiro o horário. Fora do horário permitido, não fazia nada.</p>
      <p>Esse “nada” não era mensagem, erro nem resposta de autorização. Era ausência de comportamento observável. O dispositivo não necessariamente estava quebrado; nossa compreensão compartilhada estava incompleta.</p>
      <h2>Mais condições criam mais realidades possíveis</h2>
      <p>O hardware podia operar de cinco formas ou mais dependendo do horário, do estado do dispositivo, da autorização, da conectividade e da ordem das mensagens. Um teste local cobre um caminho. A produção visita os caminhos que ninguém escreveu.</p>
      <p>É por isso que sistemas distribuídos são difíceis: mensagens atrasam, duplicam, mudam de ordem, são rejeitadas ou ignoradas. Um payload válido pode ser inválido no estado atual.</p>
      <p>Os princípios de <em>Designing Data-Intensive Applications</em> e do livro de SRE do Google reforçam a mesma ideia: confiabilidade, operação e falhas precisam fazer parte do design.</p>
      <h2>Comunicação também é arquitetura</h2>
      <p>Em software, comunicação não é apenas uma habilidade comportamental; é uma dependência técnica. Toda premissa não documentada vira um ramo oculto. Cada interpretação diferente de “aprovado”, “disponível” ou “processado” vira risco de compatibilidade.</p>
      <p>Arquitetura também é o acordo entre as pessoas e os sistemas responsáveis por cada parte. Se as equipes não compartilham um modelo claro do problema, a arquitetura expõe essa lacuna.</p>
      <h2>IA não elimina a necessidade de clareza</h2>
      <p>A IA pode ajudar com pesquisa, implementação, testes e documentação. Mas normalmente ela faz o que pedimos. Se o objetivo estiver errado, as instruções forem ambíguas ou deixarmos decisões importantes no piloto automático, a IA pode acelerar a direção errada.</p>
      <p>Isso não é motivo para evitar IA. É motivo para melhorar o sistema ao redor dela: definir o resultado, as restrições, as falhas inaceitáveis e quando uma pessoa precisa revisar o resultado.</p>
      <h2>O que líderes devem tornar explícito</h2>
      <ul><li>Qual resultado de negócio esse fluxo precisa proteger?</li><li>Quais são os estados e transições válidos?</li><li>Quais condições mudam o resultado?</li><li>O que significam sucesso, negação, timeout e falha?</li><li>Quem é responsável por cada decisão?</li><li>Como um operador saberá o que aconteceu?</li><li>O que precisa ser determinístico?</li></ul>
      <p>O objetivo não é eliminar toda incerteza. É decidir onde ela é aceitável e onde é perigosa. Uma recomendação pode ser probabilística; uma autorização, cobrança ou limite de segurança normalmente precisa de regras explícitas e observáveis.</p>
      <p>Atrasos de software muitas vezes são atrasos de decisão e comunicação disfarçados. Equipes rápidas não deixam de pensar: resolvem cedo as perguntas certas e conectam o objetivo de negócio ao comportamento técnico.</p>
      <blockquote>A qualidade do código importa. Mas, antes de o código poder ser bom, a equipe precisa concordar sobre o que é um bom comportamento.</blockquote>
      <p>Isso já aconteceu na sua equipe? Uma funcionalidade parecia correta isoladamente, mas falhou quando o sistema completo, suas regras ocultas e as condições reais entraram em cena? Essa lacuna costuma ser o ponto de partida do trabalho de engenharia mais valioso.</p>
    </>
  ),
};

export const post: Record<Locale, Post> = {
  en: {
    slug: "why-building-software-is-hard",
    title: "Why Building Software Is Hard: The Cost of Ambiguity",
    description: "Software fails in the gaps between goals, communication, system states, and real-world behavior. A founder-focused lesson from a real-time hardware integration.",
    date: "2026-08-19",
    tags: ["software architecture", "communication", "distributed systems", "leadership"],
    body: body.en,
  },
  es: {
    slug: "por-que-construir-software-es-dificil",
    title: "Por qué construir software es difícil: el coste de la ambigüedad",
    description: "El software falla en las brechas entre objetivos, comunicación, estados del sistema y comportamiento real.",
    date: "2026-08-19",
    tags: ["arquitectura de software", "comunicación", "sistemas distribuidos"],
    body: body.es,
  },
  pt: {
    slug: "por-que-construir-software-e-dificil",
    title: "Por que construir software é difícil: o custo da ambiguidade",
    description: "O software falha nas lacunas entre objetivos, comunicação, estados do sistema e comportamento real.",
    date: "2026-08-19",
    tags: ["arquitetura de software", "comunicação", "sistemas distribuídos"],
    body: body.pt,
  },
};
