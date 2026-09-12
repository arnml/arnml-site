import Link from "next/link";
import type { Locale } from "@/lib/site/locales";
import type { Post } from "./ai-is-leverage";
import { PostMath } from "@/components/post-math";
import { PostMermaid } from "@/components/post-mermaid";

const FLOW_CHART_EN = `flowchart LR
    A[Need to hire] --> B{How the budget gets decided}
    B -->|Market band| C[What the role pays]
    B -->|Expected impact| D[What solving the problem is worth in X weeks]
    C --> E[Reject on the number, real replacement never evaluated]
    D --> F[Offer anchored to the problem, not the role]`;

const FLOW_CHART_ES = `flowchart LR
    A[Necesidad de contratar] --> B{Como se decide el presupuesto}
    B -->|Banda de mercado| C[Cuanto cobra el puesto]
    B -->|Impacto esperado| D[Cuanto vale resolver el problema en X semanas]
    C --> E[Rechazo por el numero, sin evaluar el reemplazo real]
    D --> F[Oferta anclada al problema, no al puesto]`;

const FLOW_CHART_PT = `flowchart LR
    A[Necessidade de contratar] --> B{Como o orcamento e decidido}
    B -->|Banda de mercado| C[Quanto o cargo paga]
    B -->|Impacto esperado| D[Quanto vale resolver o problema em X semanas]
    C --> E[Rejeicao pelo numero, sem avaliar a substituicao real]
    D --> F[Oferta ancorada no problema, nao no cargo]`;

const bodyEn = (
  <>
    <p>
      A recruiter tells this story: he finds a semi-senior developer earning
      $4,000 a month. He pitches a move. The candidate says, &ldquo;For this
      to make sense, it&rsquo;d have to be $5,000.&rdquo; The company&rsquo;s
      answer: &ldquo;Too high. Pass.&rdquo;
    </p>
    <p>Nobody at that company asked the obvious question.</p>
    <p>
      <strong>
        Why would someone comfortable, already earning $4,000, leave their
        current job to keep earning exactly $4,000?
      </strong>
    </p>
    <p>
      They wouldn&rsquo;t. Nobody would. Asking for more isn&rsquo;t greed
      &mdash; it&rsquo;s the minimum condition for the move to make sense at
      all.
    </p>
    <p>
      But this isn&rsquo;t really a recruiting problem. It&rsquo;s a symptom
      of something deeper: <strong>the company doesn&rsquo;t know what
      it&rsquo;s actually buying.</strong>
    </p>

    <h2>What a Company Thinks It&rsquo;s Buying, and What It&rsquo;s Actually Buying</h2>
    <p>
      When a company builds a hiring budget, it almost always starts with the
      same question: <em>what does the market pay for this role?</em>
    </p>
    <p>
      That question quietly assumes something: that a developer&rsquo;s work
      is a commodity. Fungible coding-hours, interchangeable. Under that
      logic, two people at $3,000 are worth the same as one at $6,000. The
      numbers add up, the budget closes.
    </p>
    <p>That&rsquo;s the wrong logic.</p>
    <p>
      What a company actually buys isn&rsquo;t time. It&rsquo;s{" "}
      <strong>expected impact within a window</strong> &mdash; bugs fixed,
      features shipped, systems that don&rsquo;t fall over at 3 AM. And that
      quantity doesn&rsquo;t add up across people. It isn&rsquo;t additive.
    </p>

    <h2>Why Impact Doesn&rsquo;t Add Up</h2>
    <p>
      There are two reasons, and both are structural &mdash; they don&rsquo;t
      go away no matter how well you hire.
    </p>
    <p>
      <strong>First: the learning curve can&rsquo;t be parallelized.</strong>
    </p>
    <p>
      Every project is unique. It has its own architecture, its own
      historical decisions, its own hidden technical debt buried in some
      module nobody documented. Learning that takes time &mdash; and each
      person pays that cost individually. Two juniors don&rsquo;t learn the
      system in half the time one would. They learn it <em>twice</em>, in
      parallel, each paying the full price.
    </p>
    <p>
      <strong>Second: the impact multiplier varies per person, and it
      doesn&rsquo;t sum.</strong>
    </p>
    <p>
      A developer&rsquo;s real impact is a combination of knowledge, energy,
      experience, and, increasingly, how well they leverage AI tooling. That
      combination isn&rsquo;t a property of a headcount slot. It&rsquo;s a
      property of the individual. A senior with a high multiplier can
      diagnose in an afternoon what two juniors won&rsquo;t solve in a week.
      Not because they type faster. Because they see the actual problem, not
      the symptom.
    </p>
    <p>Formally, the math companies use looks like this:</p>
    <PostMath
      display
      math={String.raw`\text{Impact}(\text{team}) = \sum_{i} \text{Impact}(\text{person}_i)`}
    />
    <p>The real math looks more like this:</p>
    <PostMath
      display
      math={String.raw`\text{Impact}(\text{team}) = f(\text{multiplier}_1, \dots, \text{multiplier}_n, \ \text{shared learning curve})`}
    />
    <p>
      where <PostMath math="f" /> isn&rsquo;t a sum &mdash; it&rsquo;s a
      function of how individual multipliers combine, and it&rsquo;s{" "}
      <em>reduced</em>, not helped, by a learning curve that every new hire
      has to pay from zero.
    </p>
    <p>
      That gap between the two formulas is exactly where hiring budgets
      quietly bleed out.
    </p>

    <h2>The Right Budget Is Measured, Not Negotiated</h2>
    <p>
      If impact isn&rsquo;t additive, then &ldquo;what does the market pay
      for this role&rdquo; was never the right question. The right question
      is:
    </p>
    <blockquote>
      How much is it worth, within a fixed window, to solve the specific
      problem this hire needs to solve?
    </blockquote>
    <p>
      That&rsquo;s measurable. Not with interview vibes, but with simple
      indicators almost any team can already track:
    </p>
    <ul>
      <li>Tickets resolved per period.</li>
      <li>Downtime avoided or incidents prevented.</li>
      <li>Number of customers or features handled without friction.</li>
    </ul>
    <p>
      The fixed window matters as much as the indicator. It&rsquo;s how you
      account for the learning curve instead of ignoring it &mdash; a hire
      who takes eight weeks to become productive isn&rsquo;t
      &ldquo;cheaper&rdquo; than one who takes two, even at a lower monthly
      rate.
    </p>
    <PostMermaid chart={FLOW_CHART_EN} />
    <p>
      The market band answers a question that isn&rsquo;t yours. It tells
      you what a generic role pays, not what the specific person in front of
      you is worth for solving <em>your</em> problem, in <em>your</em>{" "}
      window.
    </p>

    <h2>What This Means for Whoever&rsquo;s Hiring</h2>
    <p>
      This isn&rsquo;t a call to &ldquo;pay more.&rdquo; It&rsquo;s a call to{" "}
      <strong>measure differently</strong>.
    </p>
    <p>
      Rejecting a salary ask because it beats the market band, without
      asking what impact that person brings within your window, isn&rsquo;t
      protecting yourself from a cost &mdash; it&rsquo;s rejecting
      information.
    </p>
    <p>
      Sometimes that person is, in practice, the cheapest option on the
      market: they solve in weeks what two &ldquo;within-band&rdquo; hires
      would solve in months, if they solve it at all. The hourly rate never
      tells that part of the story.
    </p>
    <p>
      And there&rsquo;s a natural consequence of thinking this way that
      deserves its own piece: if impact isn&rsquo;t additive across people,
      the most efficient way to build a team in the AI era isn&rsquo;t
      stacking more people at the same level &mdash; it&rsquo;s pairing
      junior and senior developers where each one multiplies the other. But
      that&rsquo;s a different story.
    </p>
    <p>
      For now, the next time a candidate asks for &ldquo;more than the band
      says,&rdquo; the question worth asking isn&rsquo;t{" "}
      <em>how much do they cost</em>. It&rsquo;s <em>how much is what they
      solve actually worth</em>.
    </p>

    <p>
      Read also in{" "}
      <Link href="/es/escritura/hiring-devs-by-impact">Spanish</Link> and{" "}
      <Link href="/pt/escrita/hiring-devs-by-impact">Portuguese</Link>.
    </p>
  </>
);

const bodyEs = (
  <>
    <p>
      Un reclutador cuenta esta historia: encuentra un semi-senior que hoy
      gana USD 4.000. Le ofrece un cambio. El candidato dice: &ldquo;Para
      moverme, USD 5.000.&rdquo; La empresa responde: &ldquo;Muy alto.
      Descartado.&rdquo;
    </p>
    <p>Nadie en esa empresa se hizo la pregunta obvia.</p>
    <p>
      <strong>
        &iquest;Por qu&eacute; alguien c&oacute;modo, ganando USD 4.000,
        dejar&iacute;a su trabajo actual para seguir ganando exactamente USD
        4.000?
      </strong>
    </p>
    <p>
      No lo har&iacute;a. Nadie lo har&iacute;a. Pedir m&aacute;s no es
      codicia &mdash; es la condici&oacute;n m&iacute;nima para que el cambio
      tenga sentido.
    </p>
    <p>
      Pero esto no es un problema de reclutamiento. Es un s&iacute;ntoma de
      algo m&aacute;s profundo:{" "}
      <strong>la empresa no sabe qu&eacute; es lo que realmente est&aacute;
      comprando.</strong>
    </p>

    <h2>Qu&eacute; Cree Comprar una Empresa, y Qu&eacute; Compra en Realidad</h2>
    <p>
      Cuando una empresa arma un presupuesto de contrataci&oacute;n, casi
      siempre empieza por la misma pregunta: <em>&iquest;cu&aacute;nto paga
      el mercado por este puesto?</em>
    </p>
    <p>
      Esa pregunta asume algo silenciosamente: que el trabajo de un
      developer es un commodity. Tiempo de c&oacute;digo, fungible,
      intercambiable. Bajo esa l&oacute;gica, dos personas a USD 3.000 valen
      lo mismo que una a USD 6.000. Sum&aacute;s los n&uacute;meros y el
      presupuesto cierra.
    </p>
    <p>Es la l&oacute;gica equivocada.</p>
    <p>
      Lo que una empresa realmente compra no es tiempo. Es{" "}
      <strong>impacto dentro de un plazo</strong> &mdash; bugs resueltos,
      features enviadas, sistemas que no se caen a las 3 AM. Y esa magnitud
      no se suma entre personas. No es aditiva.
    </p>

    <h2>Por Qu&eacute; el Impacto No Se Suma</h2>
    <p>
      Hay dos razones, y las dos son estructurales &mdash; no dependen de
      qu&eacute; tan bien contrates.
    </p>
    <p>
      <strong>Primera: la curva de aprendizaje no se paraleliza.</strong>
    </p>
    <p>
      Cada proyecto es &uacute;nico. Tiene su propia arquitectura, sus
      propias decisiones hist&oacute;ricas, su propia deuda t&eacute;cnica
      escondida en alg&uacute;n m&oacute;dulo que nadie document&oacute;.
      Aprender eso toma tiempo &mdash; y ese tiempo lo paga{" "}
      <em>cada persona</em>, individualmente. Dos juniors no aprenden el
      sistema en la mitad de tiempo que uno solo. Aprenden el sistema{" "}
      <em>dos veces</em>, en paralelo, cada uno pagando el costo completo.
    </p>
    <p>
      <strong>Segunda: el multiplicador de impacto var&iacute;a por persona,
      y no se suma.</strong>
    </p>
    <p>
      El impacto real de un developer es una combinaci&oacute;n de
      conocimiento, energ&iacute;a, experiencia y, cada vez m&aacute;s,
      cu&aacute;nto sabe apalancar herramientas de IA. Esa combinaci&oacute;n
      no es una propiedad de la plantilla &mdash; es una propiedad de la
      persona. Un senior con ese multiplicador alto puede diagnosticar en
      una tarde un problema que dos juniors no resuelven en una semana. No
      porque trabaje m&aacute;s r&aacute;pido l&iacute;nea por l&iacute;nea.
      Porque ve el problema real, no el s&iacute;ntoma.
    </p>
    <p>Formalmente, la matem&aacute;tica que las empresas usan es esta:</p>
    <PostMath
      display
      math={String.raw`\text{Impacto}(\text{equipo}) = \sum_{i} \text{Impacto}(\text{persona}_i)`}
    />
    <p>Y la matem&aacute;tica real se parece m&aacute;s a esto:</p>
    <PostMath
      display
      math={String.raw`\text{Impacto}(\text{equipo}) = f(\text{multiplicador}_1, \dots, \text{multiplicador}_n, \ \text{curva de aprendizaje compartida})`}
    />
    <p>
      donde <PostMath math="f" /> no es una suma &mdash; es una
      funci&oacute;n que depende de c&oacute;mo se combinan los
      multiplicadores individuales, y que se ve <em>reducida</em>, no
      ayudada, por una curva de aprendizaje que cada persona nueva vuelve a
      pagar desde cero.
    </p>
    <p>
      Esa diferencia entre las dos f&oacute;rmulas es exactamente donde se
      pierde el presupuesto de contrataci&oacute;n.
    </p>

    <h2>El Presupuesto Correcto se Mide, No se Negocia</h2>
    <p>
      Si el impacto no es aditivo, entonces &ldquo;cu&aacute;nto paga el
      mercado por este puesto&rdquo; nunca fue la pregunta correcta. La
      pregunta correcta es:
    </p>
    <blockquote>
      &iquest;Cu&aacute;nto vale, en un plazo fijo, resolver el problema que
      este hire tiene que resolver?
    </blockquote>
    <p>
      Eso se puede medir. No con vibras de entrevista, sino con indicadores
      simples que casi cualquier equipo ya puede rastrear:
    </p>
    <ul>
      <li>Tickets resueltos por per&iacute;odo.</li>
      <li>Tiempo de desconexi&oacute;n o incidentes evitados.</li>
      <li>N&uacute;mero de clientes o features atendidos sin fricci&oacute;n.</li>
    </ul>
    <p>
      El plazo fijo importa tanto como el indicador. Es la forma de
      contabilizar la curva de aprendizaje en vez de ignorarla &mdash; un
      hire que tarda ocho semanas en ser productivo no es &ldquo;m&aacute;s
      barato&rdquo; que uno que tarda dos, aunque cobre menos por mes.
    </p>
    <PostMermaid chart={FLOW_CHART_ES} />
    <p>
      El band de mercado responde una pregunta que no es la tuya. Te dice
      cu&aacute;nto cobra un puesto gen&eacute;rico, no cu&aacute;nto vale la
      persona que ten&eacute;s al frente para resolver <em>tu</em> problema,
      en <em>tu</em> plazo.
    </p>

    <h2>Lo Que Esto Significa Para Quien Contrata</h2>
    <p>
      Esto no es un llamado a &ldquo;pagar m&aacute;s&rdquo;. Es un llamado
      a <strong>medir distinto</strong>.
    </p>
    <p>
      Rechazar un pedido de sueldo porque supera el band de mercado, sin
      preguntar qu&eacute; impacto trae esa persona en el plazo que
      necesit&aacute;s, es rechazar informaci&oacute;n &mdash; no protegerte
      de un costo.
    </p>
    <p>
      A veces esa persona es, en los hechos, la opci&oacute;n m&aacute;s
      barata del mercado: resuelve en semanas lo que dos contrataciones
      &ldquo;dentro de band&rdquo; resolver&iacute;an en meses, si es que lo
      resuelven. El precio por hora nunca cuenta esa parte de la historia.
    </p>
    <p>
      Y hay una consecuencia natural de pensar as&iacute; que merece su
      propio an&aacute;lisis: si el impacto no es aditivo entre personas, la
      forma m&aacute;s eficiente de construir equipo en la era de la IA no
      es apilar m&aacute;s gente al mismo nivel &mdash; es combinar duplas
      junior-senior donde cada uno multiplica al otro. Pero esa es otra
      historia.
    </p>
    <p>
      Por ahora, la pr&oacute;xima vez que un candidato pida &ldquo;m&aacute;s
      de lo que dice el band&rdquo;, la pregunta que vale la pena hacerse no
      es <em>cu&aacute;nto cobra</em>. Es <em>cu&aacute;nto vale lo que
      resuelve</em>.
    </p>

    <p>
      Lee tambi&eacute;n en{" "}
      <Link href="/en/writing/hiring-devs-by-impact">ingl&eacute;s</Link> y{" "}
      <Link href="/pt/escrita/hiring-devs-by-impact">portugu&eacute;s</Link>.
    </p>
  </>
);

const bodyPt = (
  <>
    <p>
      Um recrutador conta essa hist&oacute;ria: encontra um semi-s&ecirc;nior
      que hoje ganha USD 4.000. Oferece uma mudan&ccedil;a. O candidato diz:
      &ldquo;Para eu me mover, teria que ser USD 5.000.&rdquo; A resposta da
      empresa: &ldquo;Muito alto. Descartado.&rdquo;
    </p>
    <p>Ningu&eacute;m naquela empresa fez a pergunta &oacute;bvia.</p>
    <p>
      <strong>
        Por que algu&eacute;m confort&aacute;vel, ganhando USD 4.000, deixaria
        o emprego atual para continuar ganhando exatamente USD 4.000?
      </strong>
    </p>
    <p>
      N&atilde;o deixaria. Ningu&eacute;m deixaria. Pedir mais n&atilde;o
      &eacute; gan&acirc;ncia &mdash; &eacute; a condi&ccedil;&atilde;o
      m&iacute;nima para que a mudan&ccedil;a fa&ccedil;a sentido.
    </p>
    <p>
      Mas isso n&atilde;o &eacute; um problema de recrutamento. &Eacute;
      sintoma de algo mais profundo:{" "}
      <strong>a empresa n&atilde;o sabe o que est&aacute; realmente
      comprando.</strong>
    </p>

    <h2>O Que uma Empresa Acha Que Compra, e O Que Compra de Verdade</h2>
    <p>
      Quando uma empresa monta um or&ccedil;amento de contrata&ccedil;&atilde;o,
      quase sempre come&ccedil;a pela mesma pergunta: <em>quanto o mercado
      paga por esse cargo?</em>
    </p>
    <p>
      Essa pergunta assume algo silenciosamente: que o trabalho de um
      desenvolvedor &eacute; uma commodity. Tempo de c&oacute;digo,
      fung&iacute;vel, intercambi&aacute;vel. Nessa l&oacute;gica, duas
      pessoas a USD 3.000 valem o mesmo que uma a USD 6.000. Os
      n&uacute;meros fecham, o or&ccedil;amento fecha.
    </p>
    <p>&Eacute; a l&oacute;gica errada.</p>
    <p>
      O que uma empresa realmente compra n&atilde;o &eacute; tempo. &Eacute;{" "}
      <strong>impacto esperado dentro de um prazo</strong> &mdash; bugs
      resolvidos, features entregues, sistemas que n&atilde;o caem &agrave;s
      3 da manh&atilde;. E essa grandeza n&atilde;o se soma entre pessoas.
      N&atilde;o &eacute; aditiva.
    </p>

    <h2>Por Que o Impacto N&atilde;o Se Soma</h2>
    <p>
      H&aacute; duas raz&otilde;es, e as duas s&atilde;o estruturais
      &mdash; n&atilde;o desaparecem por mais bem que voc&ecirc; contrate.
    </p>
    <p>
      <strong>Primeira: a curva de aprendizado n&atilde;o se paraleliza.</strong>
    </p>
    <p>
      Cada projeto &eacute; &uacute;nico. Tem sua pr&oacute;pria arquitetura,
      suas pr&oacute;prias decis&otilde;es hist&oacute;ricas, sua
      pr&oacute;pria d&iacute;vida t&eacute;cnica escondida em algum
      m&oacute;dulo que ningu&eacute;m documentou. Aprender isso leva tempo
      &mdash; e esse tempo &eacute; pago por <em>cada pessoa</em>,
      individualmente. Dois juniors n&atilde;o aprendem o sistema na metade
      do tempo que um levaria. Aprendem o sistema <em>duas vezes</em>, em
      paralelo, cada um pagando o custo inteiro.
    </p>
    <p>
      <strong>Segunda: o multiplicador de impacto varia por pessoa, e
      n&atilde;o se soma.</strong>
    </p>
    <p>
      O impacto real de um desenvolvedor &eacute; uma combina&ccedil;&atilde;o
      de conhecimento, energia, experi&ecirc;ncia e, cada vez mais, o quanto
      sabe aproveitar ferramentas de IA. Essa combina&ccedil;&atilde;o
      n&atilde;o &eacute; propriedade do cargo &mdash; &eacute; propriedade
      da pessoa. Um s&ecirc;nior com esse multiplicador alto pode
      diagnosticar numa tarde um problema que dois juniors n&atilde;o
      resolvem numa semana. N&atilde;o porque digita mais r&aacute;pido.
      Porque enxerga o problema real, n&atilde;o o sintoma.
    </p>
    <p>Formalmente, a matem&aacute;tica que as empresas usam &eacute; esta:</p>
    <PostMath
      display
      math={String.raw`\text{Impacto}(\text{time}) = \sum_{i} \text{Impacto}(\text{pessoa}_i)`}
    />
    <p>E a matem&aacute;tica real se parece mais com isto:</p>
    <PostMath
      display
      math={String.raw`\text{Impacto}(\text{time}) = f(\text{multiplicador}_1, \dots, \text{multiplicador}_n, \ \text{curva de aprendizado compartilhada})`}
    />
    <p>
      onde <PostMath math="f" /> n&atilde;o &eacute; uma soma &mdash;
      &eacute; uma fun&ccedil;&atilde;o de como os multiplicadores
      individuais se combinam, e que &eacute; <em>reduzida</em>, n&atilde;o
      ajudada, por uma curva de aprendizado que cada nova contrata&ccedil;&atilde;o
      paga do zero.
    </p>
    <p>
      Essa diferen&ccedil;a entre as duas f&oacute;rmulas &eacute;
      exatamente onde o or&ccedil;amento de contrata&ccedil;&atilde;o vaza.
    </p>

    <h2>O Or&ccedil;amento Certo Se Mede, N&atilde;o Se Negocia</h2>
    <p>
      Se o impacto n&atilde;o &eacute; aditivo, ent&atilde;o &ldquo;quanto o
      mercado paga por esse cargo&rdquo; nunca foi a pergunta certa. A
      pergunta certa &eacute;:
    </p>
    <blockquote>
      Quanto vale, dentro de um prazo fixo, resolver o problema que essa
      contrata&ccedil;&atilde;o precisa resolver?
    </blockquote>
    <p>
      Isso &eacute; mensur&aacute;vel. N&atilde;o com sensa&ccedil;&atilde;o
      de entrevista, mas com indicadores simples que quase qualquer time
      j&aacute; consegue rastrear:
    </p>
    <ul>
      <li>Tickets resolvidos por per&iacute;odo.</li>
      <li>Tempo de indisponibilidade ou incidentes evitados.</li>
      <li>N&uacute;mero de clientes ou features atendidos sem fric&ccedil;&atilde;o.</li>
    </ul>
    <p>
      O prazo fixo importa tanto quanto o indicador. &Eacute; a forma de
      contabilizar a curva de aprendizado em vez de ignor&aacute;-la &mdash;
      uma contrata&ccedil;&atilde;o que leva oito semanas para ser produtiva
      n&atilde;o &eacute; &ldquo;mais barata&rdquo; que uma que leva duas,
      mesmo cobrando menos por m&ecirc;s.
    </p>
    <PostMermaid chart={FLOW_CHART_PT} />
    <p>
      A banda de mercado responde uma pergunta que n&atilde;o &eacute; sua.
      Diz quanto paga um cargo gen&eacute;rico, n&atilde;o quanto vale a
      pessoa &agrave; sua frente para resolver <em>o seu</em> problema, no{" "}
      <em>seu</em> prazo.
    </p>

    <h2>O Que Isso Significa Para Quem Contrata</h2>
    <p>
      Isso n&atilde;o &eacute; um chamado para &ldquo;pagar mais&rdquo;.
      &Eacute; um chamado para <strong>medir diferente</strong>.
    </p>
    <p>
      Rejeitar um pedido salarial porque supera a banda de mercado, sem
      perguntar qual impacto essa pessoa traz dentro do seu prazo, n&atilde;o
      &eacute; se proteger de um custo &mdash; &eacute; rejeitar
      informa&ccedil;&atilde;o.
    </p>
    <p>
      &Agrave;s vezes essa pessoa &eacute;, na pr&aacute;tica, a
      op&ccedil;&atilde;o mais barata do mercado: resolve em semanas o que
      duas contrata&ccedil;&otilde;es &ldquo;dentro da banda&rdquo;
      resolveriam em meses, se resolverem. O valor por hora nunca conta essa
      parte da hist&oacute;ria.
    </p>
    <p>
      E h&aacute; uma consequ&ecirc;ncia natural de pensar assim que
      merece seu pr&oacute;prio texto: se o impacto n&atilde;o &eacute;
      aditivo entre pessoas, a forma mais eficiente de construir um time na
      era da IA n&atilde;o &eacute; empilhar mais gente no mesmo n&iacute;vel
      &mdash; &eacute; combinar duplas junior-s&ecirc;nior onde cada um
      multiplica o outro. Mas essa &eacute; outra hist&oacute;ria.
    </p>
    <p>
      Por enquanto, da pr&oacute;xima vez que um candidato pedir &ldquo;mais
      do que diz a banda&rdquo;, a pergunta que vale a pena fazer n&atilde;o
      &eacute; <em>quanto custa</em>. &Eacute; <em>quanto vale o que essa
      pessoa resolve</em>.
    </p>

    <p>
      Leia tamb&eacute;m em{" "}
      <Link href="/en/writing/hiring-devs-by-impact">ingl&ecirc;s</Link> e{" "}
      <Link href="/es/escritura/hiring-devs-by-impact">espanhol</Link>.
    </p>
  </>
);

export const post: Record<Locale, Post> = {
  en: {
    slug: "hiring-devs-by-impact",
    title: "The Budgeting Mistake That's Quietly Wrecking Your Software Team",
    description:
      "Companies price developer hires against a market salary band. What they should be pricing is expected impact within a fixed window — and the difference is where hiring budgets bleed out.",
    date: "2026-09-12",
    tags: ["hiring", "engineering management", "compensation"],
    keywords: ["hiring developers", "salary band", "engineering impact", "ROI"],
    body: bodyEn,
  },
  es: {
    slug: "hiring-devs-by-impact",
    title: "El Error de Presupuesto Que Está Destruyendo Tu Equipo de Software",
    description:
      "Las empresas presupuestan contrataciones según el band de mercado. Deberían presupuestarlas según el impacto esperado en un plazo fijo — ahí es donde se pierde el presupuesto.",
    date: "2026-09-12",
    tags: ["contratación", "gestión de ingeniería", "compensación"],
    keywords: ["contratar developers", "band de mercado", "impacto en ingeniería", "ROI"],
    body: bodyEs,
  },
  pt: {
    slug: "hiring-devs-by-impact",
    title: "O Erro de Orçamento Que Está Destruindo Seu Time de Software",
    description:
      "Empresas orçam contratações pela banda de mercado. Deveriam orçar pelo impacto esperado dentro de um prazo fixo — é aí que o orçamento vaza.",
    date: "2026-09-12",
    tags: ["contratação", "gestão de engenharia", "compensação"],
    keywords: ["contratar desenvolvedores", "banda de mercado", "impacto em engenharia", "ROI"],
    body: bodyPt,
  },
};
