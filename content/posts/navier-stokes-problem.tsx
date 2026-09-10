import Link from "next/link";
import type { Locale } from "@/lib/site/locales";
import type { Post } from "./ai-is-leverage";
import { PostMath } from "@/components/post-math";
import { PostMermaid } from "@/components/post-mermaid";

const VORTEX_CHART_EN = `graph LR
A[Vortex stretches] --> B[Rotation speeds up]
B --> C[Stronger local gradients]
C --> A`;

const VORTEX_CHART_ES = `graph LR
A[El vortice se estira] --> B[La rotacion se acelera]
B --> C[Gradientes locales mas fuertes]
C --> A`;

const VORTEX_CHART_PT = `graph LR
A[O vortice se estica] --> B[A rotacao acelera]
B --> C[Gradientes locais mais fortes]
C --> A`;

const OPENAI_URL = "https://openai.com/index/navier-stokes-solution/";
const CLAY_URL = "https://www.claymath.org/millennium/navier-stokes-equation/";
const LEAN_URL = "https://lean-lang.org/";
const VORTEX_IMAGE_URL =
  "https://images.ctfassets.net/kftzwdyauwt9/38fsDDtQmNLBW3F74od13W/7f0213895c06edc97709dc82d7905bc3/navier-stokes-dark-master.png?w=1920&q=80&fm=webp";

const bodyEn = (
  <>
    <p>
      <a href={OPENAI_URL}>OpenAI</a> said an AI system solved a math problem
      that&rsquo;s stood open since 1934.
    </p>
    <p>The internet reacted before it understood the claim.</p>
    <p>Three camps formed immediately.</p>
    <ul>
      <li>
        <strong>Camp one:</strong> AI just did real science. A milestone.
        OpenAI&rsquo;s CEO, Sam Altman, can be happy.
      </li>
      <li>
        <strong>Camp two:</strong> not so fast. 10k agents grinding through
        trial and error isn&rsquo;t insight. That&rsquo;s brute force.
      </li>
      <li>
        <strong>Camp three:</strong> just confused. How does anything blow up
        to infinity, in finite time, when the force behind it stays finite
        the whole time?
      </li>
    </ul>
    <p>
      Here&rsquo;s the actual problem. Nobody agrees on what&rsquo;s being
      claimed.
    </p>
    <p>That&rsquo;s the story. Not who&rsquo;s right about AI.</p>

    <h2>The Fight, Formalized</h2>
    <p>Picture a fluid mid-negotiation.</p>
    <figure>
      <img
        src="/images/inertia-vs-viscosity.webp"
        alt="Inertia versus viscosity: chaotic swirling flow on the left settling into smooth, parallel streamlines on the right."
      />
    </figure>
    <p>
      Push it one way. It wants to keep going that way. It concentrates. It
      twists. It speeds up wherever it&rsquo;s already fast. That&rsquo;s{" "}
      <strong>inertia</strong>.
    </p>
    <p>
      Something pushes back. <strong>Viscosity</strong>. It smooths the
      motion out. It trades concentrated energy for calm, spread-out flow.
    </p>
    <p>
      Whatever velocity the fluid has right now is wherever that fight
      currently stands.
    </p>
    <p>
      A referee sits between them: <strong>pressure</strong>. It doesn&rsquo;t
      take sides. It has one job: keep the fluid from piling up anywhere.
      Whatever flows in has to flow back out. Pressure adjusts instantly to
      enforce that.
    </p>
    <p>That&rsquo;s the whole equation:</p>
    <PostMath
      display
      math={String.raw`\partial_t u + (u\cdot\nabla)u = -\nabla p + \nu\Delta u + f, \qquad \nabla\cdot u = 0.`}
    />
    <p>
      <PostMath math={String.raw`\partial_t u`} /> is the outcome.{" "}
      <PostMath math={String.raw`(u\cdot\nabla)u`} /> is inertia&rsquo;s
      move. <PostMath math={String.raw`\nu\Delta u`} /> is viscosity&rsquo;s
      countermove. <PostMath math={String.raw`-\nabla p`} /> is the referee.{" "}
      <PostMath math={String.raw`\nabla\cdot u = 0`} /> is the rule it
      enforces. <PostMath math="f" /> is anything pushing from outside.
      Usually nothing. Sometimes not.
    </p>
    <p>
      Sometimes the fight settles. Nothing accelerates. Every term cancels.
      That&rsquo;s a <strong>steady flow</strong>, the kind in a textbook
      diagram of pipe flow.
    </p>
    <p>
      The Clay Mathematics Institute put this fight on its list of seven
      Millennium Prize Problems: does a solution stay <strong>smooth</strong>{" "}
      forever, or does it eventually break?
    </p>
    <blockquote>
      Can the fight ever fail completely? Can inertia beat viscosity so badly
      the outcome stops being a finite number?
    </blockquote>

    <h2>How Strict &ldquo;Smooth&rdquo; Actually Is</h2>
    <p>&ldquo;Smooth&rdquo; undersells it.</p>
    <p>
      Mathematician Charles Fefferman wrote Clay&rsquo;s official problem
      statement. It asks the initial velocity{" "}
      <PostMath math={String.raw`u^\circ`} /> to decay faster than any power
      of distance. In every <strong>spatial derivative</strong>:
    </p>
    <PostMath
      display
      math={String.raw`|\partial_x^\alpha u^\circ(x)| \le C_{\alpha K}(1+|x|)^{-K}, \quad \text{for every } \alpha, K.`}
    />
    <blockquote>
      Velocity here is a disturbance that fades out far from it. Every rate
      of change of it also fades out.
    </blockquote>
    <p>
      That&rsquo;s Schwartz-function behavior: an idealized, perfectly
      localized disturbance.
    </p>
    <p>
      The force <PostMath math="f" /> gets the same treatment but{" "}
      <strong>in space and in time</strong>:
    </p>
    <PostMath
      display
      math={String.raw`|\partial_x^\alpha \partial_t^m f(x,t)| \le C_{\alpha m K}(1+|x|+t)^{-K}, \quad \text{for every } \alpha, m, K.`}
    />
    <p>
      The official problem has 4 statements. Statements (A) and (B) skip
      force entirely. They just set <PostMath math="f = 0" />. Statements (C)
      and (D) allow a real force, but only one this disciplined.
    </p>
    <blockquote>
      No pumping in extra energy. No infinity smuggled in through the
      forcing term.
    </blockquote>
    <p>
      That&rsquo;s what &ldquo;the force stays finite&rdquo; actually means,
      made precise.
    </p>
    <p>
      Say a solution fails. It hits some finite time <PostMath math="T" />.
      Past that point it can&rsquo;t stay smooth and finite-energy.
      Fefferman is explicit about what that looks like:
    </p>
    <blockquote>
      The velocity blows up as <PostMath math={String.raw`t \to T`} />. Not
      the pressure. Not a stray derivative.
    </blockquote>
    <p>
      That&rsquo;s also why nobody can simulate their way to an answer. A
      number climbing to <PostMath math="10^{50}" /> proves nothing. It
      could still turn around. What&rsquo;s needed is a proof: one specific,
      well-behaved <PostMath math={String.raw`(u^\circ, f)`} /> that
      inevitably blows up, no matter how far the clock runs. Ten thousand
      agents can&rsquo;t shortcut that by volume.
    </p>

    <h2>Why Three Dimensions Break the Truce</h2>
    <p>
      Two-dimensional fluids can&rsquo;t do something three-dimensional ones
      can: stretch their own rotation.
    </p>
    <p>
      Picture a spinning tube of fluid. Pull it thinner and longer. Like a
      figure skater pulling in their arms, it has to spin faster.
    </p>
    <figure>
      <img
        src={VORTEX_IMAGE_URL}
        alt="A snapshot of local incompressible motion. Orange marks faster angular rotation; teal marks slower rotation. Circulating speed also depends on radius. The trajectories show inward spiraling and axial stretching."
      />
      <figcaption>
        Image: <a href={OPENAI_URL}>OpenAI</a>. Orange marks faster rotation,
        teal marks slower. The inward spiral and axial stretching are the
        mechanism above, not an artist&rsquo;s impression of it.
      </figcaption>
    </figure>
    <p>
      3D flow can twist and pull on itself this way. 2D can&rsquo;t.
      There&rsquo;s no third direction to stretch into.
    </p>
    <p>
      That one geometric difference is most of the story. 2D regularity was
      settled decades ago. 3D is still open.
    </p>
    <p>
      That&rsquo;s the feedback loop in one frame. Fluid spirals inward.
      Stretches along the axis. Stretching speeds up the rotation. The
      orange region tightens as it goes.
    </p>
    <PostMermaid chart={VORTEX_CHART_EN} />
    <p>
      Let that loop run away completely, within finite time, instead of
      leveling off as viscosity catches up. Velocity concentrates into an
      ever-shrinking region. Fast enough to diverge.
    </p>
    <p>That &ldquo;ever-shrinking region&rdquo; solves a puzzle.</p>
    <blockquote>
      The problem still requires finite total energy:{" "}
      <PostMath math={String.raw`\int |u|^2\,dx`} /> stays bounded.
    </blockquote>
    <p>
      That sounds like it should rule out infinite velocity anywhere. It
      doesn&rsquo;t.
    </p>
    <p>
      An integral measures the total, not the peak.{" "}
      <PostMath math={String.raw`1/x^{1/4}`} /> shoots to infinity as{" "}
      <PostMath math={String.raw`x\to0`} />, but its square is still
      integrable near zero.
    </p>
    <figure>
      <img
        src="/images/finite-energy-local-blowup.webp"
        alt="Graph of 1 over x to the 1/4 power: the curve shoots toward infinity as x approaches zero, but the area under its square stays finite."
      />
      <figcaption>
        <PostMath math={String.raw`1/x^{1/4}`} /> is an example: infinite at
        one point, finite in total.
      </figcaption>
    </figure>
    <blockquote>
      A 3D blow-up could work the same way. Infinite at one point. The
      energy spread over all of space stays completely ordinary.
    </blockquote>

    <h2>Where It Actually Stands</h2>
    <p>
      Here&rsquo;s what&rsquo;s settled. OpenAI released a{" "}
      <a href={OPENAI_URL}>full write-up</a>, and a formalization in{" "}
      <a href={LEAN_URL}>Lean</a>, a proof assistant that checks each
      logical step by machine, that anyone can run.
    </p>
    <p>
      Here&rsquo;s what isn&rsquo;t. Whether the math community, working
      through it independently, agrees it&rsquo;s correct.
    </p>
    <p>
      <a href={CLAY_URL}>Clay&rsquo;s own page</a> still lists
      Navier&ndash;Stokes as open. OpenAI isn&rsquo;t claiming the prize.
    </p>
    <p>
      Computed and formalized isn&rsquo;t peer-reviewed. Peer-reviewed
      isn&rsquo;t accepted. This sits on the first rung.
    </p>
    <p>What OpenAI built, and who deserves credit, is next.</p>
    <p>
      Read also in{" "}
      <Link href="/es/escritura/why-navier-stokes-actually-matters">
        Spanish
      </Link>{" "}
      and{" "}
      <Link href="/pt/escrita/why-navier-stokes-actually-matters">
        Portuguese
      </Link>
      .
    </p>
  </>
);

const bodyEs = (
  <>
    <p>
      <a href={OPENAI_URL}>OpenAI</a> dijo que un sistema de IA resolvi&oacute;
      un problema matem&aacute;tico que llevaba abierto desde 1934.
    </p>
    <p>Internet reaccion&oacute; antes de entender la afirmaci&oacute;n.</p>
    <p>Se formaron tres bandos de inmediato.</p>
    <ul>
      <li>
        <strong>Bando uno:</strong> la IA acaba de hacer ciencia real. Un
        hito. El CEO de OpenAI, Sam Altman, puede estar contento.
      </li>
      <li>
        <strong>Bando dos:</strong> espera un momento. 10 mil agentes
        probando por ensayo y error no es lo mismo que una idea. Eso es
        fuerza bruta.
      </li>
      <li>
        <strong>Bando tres:</strong> simplemente confundido. &iquest;C&oacute;mo
        puede algo llegar al infinito, en tiempo finito, si la fuerza detr&aacute;s
        se mantiene finita todo el tiempo?
      </li>
    </ul>
    <p>
      Este es el problema real. Nadie se pone de acuerdo sobre qu&eacute; se
      est&aacute; afirmando.
    </p>
    <p>Esa es la historia. No qui&eacute;n tiene raz&oacute;n sobre la IA.</p>

    <h2>La pelea, formalizada</h2>
    <p>Imagina un fluido a mitad de una negociaci&oacute;n.</p>
    <figure>
      <img
        src="/images/inertia-vs-viscosity.webp"
        alt="Inercia versus viscosidad: flujo ca&oacute;tico y arremolinado a la izquierda que se asienta en l&iacute;neas de corriente suaves y paralelas a la derecha."
      />
    </figure>
    <p>
      Emp&uacute;jalo en una direcci&oacute;n. Quiere seguir en esa
      direcci&oacute;n. Se concentra. Se retuerce. Acelera donde ya iba
      r&aacute;pido. Eso es la <strong>inercia</strong>.
    </p>
    <p>
      Algo empuja de vuelta. La <strong>viscosidad</strong>. Suaviza el
      movimiento. Cambia energ&iacute;a concentrada por un flujo calmado y
      disperso.
    </p>
    <p>
      La velocidad que tiene el fluido en este momento es justo donde est&aacute;
      esa pelea ahora mismo.
    </p>
    <p>
      Un &aacute;rbitro se sienta entre ambos: la <strong>presi&oacute;n</strong>.
      No toma partido. Tiene un solo trabajo: evitar que el fluido se
      acumule en alg&uacute;n punto. Todo lo que entra tiene que salir. La
      presi&oacute;n se ajusta al instante para exigir eso.
    </p>
    <p>Esa es la ecuaci&oacute;n completa:</p>
    <PostMath
      display
      math={String.raw`\partial_t u + (u\cdot\nabla)u = -\nabla p + \nu\Delta u + f, \qquad \nabla\cdot u = 0.`}
    />
    <p>
      <PostMath math={String.raw`\partial_t u`} /> es el resultado.{" "}
      <PostMath math={String.raw`(u\cdot\nabla)u`} /> es el movimiento de la
      inercia. <PostMath math={String.raw`\nu\Delta u`} /> es la respuesta
      de la viscosidad. <PostMath math={String.raw`-\nabla p`} /> es el
      &aacute;rbitro. <PostMath math={String.raw`\nabla\cdot u = 0`} /> es
      la regla que impone. <PostMath math="f" /> es cualquier cosa que
      empuje desde afuera. Normalmente nada. A veces no.
    </p>
    <p>
      A veces la pelea se calma. Nada acelera. Cada t&eacute;rmino se
      cancela. Eso es un <strong>flujo estacionario</strong>, el tipo de
      diagrama de un libro de texto sobre flujo en tuber&iacute;as.
    </p>
    <p>
      El Clay Mathematics Institute puso esta pelea en su lista de los siete
      Problemas del Milenio: &iquest;una soluci&oacute;n se mantiene{" "}
      <strong>suave</strong> para siempre, o eventualmente se rompe?
    </p>
    <blockquote>
      &iquest;Puede la pelea fallar por completo? &iquest;Puede la inercia
      vencer tan mal a la viscosidad que el resultado deje de ser un n&uacute;mero
      finito?
    </blockquote>

    <h2>Qu&eacute; tan estricto es realmente &ldquo;suave&rdquo;</h2>
    <p>&ldquo;Suave&rdquo; se queda corto.</p>
    <p>
      El matem&aacute;tico Charles Fefferman escribi&oacute; el planteamiento
      oficial del problema para Clay. Pide que la velocidad inicial{" "}
      <PostMath math={String.raw`u^\circ`} /> decaiga m&aacute;s r&aacute;pido
      que cualquier potencia de la distancia. En cada{" "}
      <strong>derivada espacial</strong>:
    </p>
    <PostMath
      display
      math={String.raw`|\partial_x^\alpha u^\circ(x)| \le C_{\alpha K}(1+|x|)^{-K}, \quad \text{para todo } \alpha, K.`}
    />
    <blockquote>
      La velocidad aqu&iacute; es una perturbaci&oacute;n que se desvanece
      lejos de s&iacute; misma. Cada tasa de cambio de ella tambi&eacute;n se
      desvanece.
    </blockquote>
    <p>
      Eso es comportamiento tipo funci&oacute;n de Schwartz: una
      perturbaci&oacute;n idealizada y perfectamente localizada.
    </p>
    <p>
      La fuerza <PostMath math="f" /> recibe el mismo trato pero{" "}
      <strong>en espacio y en tiempo</strong>:
    </p>
    <PostMath
      display
      math={String.raw`|\partial_x^\alpha \partial_t^m f(x,t)| \le C_{\alpha m K}(1+|x|+t)^{-K}, \quad \text{para todo } \alpha, m, K.`}
    />
    <p>
      El problema oficial tiene 4 enunciados. Los enunciados (A) y (B)
      prescinden por completo de la fuerza. Simplemente fijan{" "}
      <PostMath math="f = 0" />. Los enunciados (C) y (D) permiten una
      fuerza real, pero solo una tan disciplinada como esta.
    </p>
    <blockquote>
      Nada de bombear energ&iacute;a extra. Nada de infinito colado a
      trav&eacute;s del t&eacute;rmino de forzamiento.
    </blockquote>
    <p>
      Eso es lo que &ldquo;la fuerza se mantiene finita&rdquo; realmente
      significa, con precisi&oacute;n.
    </p>
    <p>
      Supongamos que una soluci&oacute;n falla. Llega a un tiempo finito{" "}
      <PostMath math="T" />. Pasado ese punto no puede seguir siendo suave y
      de energ&iacute;a finita. Fefferman es expl&iacute;cito sobre c&oacute;mo
      se ve eso:
    </p>
    <blockquote>
      La velocidad explota cuando <PostMath math={String.raw`t \to T`} />.
      No la presi&oacute;n. No una derivada suelta.
    </blockquote>
    <p>
      Por eso tampoco nadie puede llegar a una respuesta simulando. Un
      n&uacute;mero que sube hasta <PostMath math="10^{50}" /> no prueba
      nada, todav&iacute;a podr&iacute;a dar la vuelta. Lo que se necesita
      es una prueba: un par espec&iacute;fico y bien portado{" "}
      <PostMath math={String.raw`(u^\circ, f)`} /> que inevitablemente
      explote, sin importar cu&aacute;nto corra el reloj. Diez mil agentes
      no pueden acortar eso a fuerza de volumen.
    </p>

    <h2>Por qu&eacute; tres dimensiones rompen la tregua</h2>
    <p>
      Los fluidos bidimensionales no pueden hacer algo que los
      tridimensionales s&iacute;: estirar su propia rotaci&oacute;n.
    </p>
    <p>
      Imagina un tubo de fluido girando. Est&iacute;ralo, hazlo m&aacute;s
      delgado y m&aacute;s largo. Como una patinadora que recoge los brazos,
      tiene que girar m&aacute;s r&aacute;pido.
    </p>
    <figure>
      <img
        src={VORTEX_IMAGE_URL}
        alt="Una instant&aacute;nea del movimiento incompresible local. El naranja marca una rotaci&oacute;n angular m&aacute;s r&aacute;pida; el verde azulado marca una rotaci&oacute;n m&aacute;s lenta. La velocidad de circulaci&oacute;n tambi&eacute;n depende del radio. Las trayectorias muestran un espiral hacia adentro y un estiramiento axial."
      />
      <figcaption>
        Imagen: <a href={OPENAI_URL}>OpenAI</a>. El naranja marca una
        rotaci&oacute;n m&aacute;s r&aacute;pida, el verde azulado una
        m&aacute;s lenta. El espiral hacia adentro y el estiramiento axial
        son el mecanismo descrito arriba, no una impresi&oacute;n
        art&iacute;stica de este.
      </figcaption>
    </figure>
    <p>
      El flujo 3D puede retorcerse y tirar de s&iacute; mismo de esta forma.
      El 2D no puede. No hay una tercera direcci&oacute;n hacia la cual
      estirarse.
    </p>
    <p>
      Esa diferencia geom&eacute;trica es casi toda la historia. La
      regularidad en 2D se resolvi&oacute; hace d&eacute;cadas. En 3D sigue
      abierta.
    </p>
    <p>
      Ese es el bucle de retroalimentaci&oacute;n en un solo cuadro. El
      fluido se enrosca hacia adentro. Se estira a lo largo del eje. El
      estiramiento acelera la rotaci&oacute;n. La regi&oacute;n naranja se
      aprieta a medida que avanza.
    </p>
    <PostMermaid chart={VORTEX_CHART_ES} />
    <p>
      Deja que ese bucle se descontrole por completo, en tiempo finito, en
      lugar de estabilizarse a medida que la viscosidad lo alcanza. La
      velocidad se concentra en una regi&oacute;n cada vez m&aacute;s
      peque&ntilde;a. Lo bastante r&aacute;pido como para divergir.
    </p>
    <p>Esa &ldquo;regi&oacute;n que se encoge&rdquo; resuelve un acertijo.</p>
    <blockquote>
      El problema sigue exigiendo energ&iacute;a total finita:{" "}
      <PostMath math={String.raw`\int |u|^2\,dx`} /> se mantiene acotada.
    </blockquote>
    <p>
      Suena como si eso debiera descartar velocidad infinita en cualquier
      parte. No lo hace.
    </p>
    <p>
      Una integral mide el total, no el pico.{" "}
      <PostMath math={String.raw`1/x^{1/4}`} /> se dispara al infinito
      cuando <PostMath math={String.raw`x\to0`} />, pero su cuadrado sigue
      siendo integrable cerca de cero.
    </p>
    <figure>
      <img
        src="/images/finite-energy-local-blowup.webp"
        alt="Gr&aacute;fico de 1 sobre x elevado a 1/4: la curva se dispara hacia el infinito cuando x se acerca a cero, pero el &aacute;rea bajo su cuadrado se mantiene finita."
      />
      <figcaption>
        <PostMath math={String.raw`1/x^{1/4}`} /> es un ejemplo: infinito en
        un punto, finito en total.
      </figcaption>
    </figure>
    <blockquote>
      Un colapso en 3D podr&iacute;a funcionar de la misma forma. Infinito
      en un punto. La energ&iacute;a repartida por todo el espacio se
      mantiene completamente ordinaria.
    </blockquote>

    <h2>D&oacute;nde est&aacute; realmente parado esto</h2>
    <p>
      Esto es lo que est&aacute; establecido. OpenAI public&oacute; un{" "}
      <a href={OPENAI_URL}>informe completo</a>, y una formalizaci&oacute;n
      en <a href={LEAN_URL}>Lean</a>, un asistente de pruebas que verifica
      cada paso l&oacute;gico por m&aacute;quina, que cualquiera puede
      ejecutar.
    </p>
    <p>
      Esto es lo que no. Si la comunidad matem&aacute;tica, trabaj&aacute;ndolo
      de forma independiente, est&aacute; de acuerdo en que es correcto.
    </p>
    <p>
      <a href={CLAY_URL}>La propia p&aacute;gina de Clay</a> todav&iacute;a
      lista a Navier&ndash;Stokes como abierto. OpenAI no est&aacute;
      reclamando el premio.
    </p>
    <p>
      Calculado y formalizado no es lo mismo que revisado por pares.
      Revisado por pares no es lo mismo que aceptado. Esto est&aacute; en el
      primer pelda&ntilde;o.
    </p>
    <p>Lo que OpenAI construy&oacute;, y qui&eacute;n merece el cr&eacute;dito, viene despu&eacute;s.</p>
    <p>
      Lee tambi&eacute;n en{" "}
      <Link href="/en/writing/why-navier-stokes-actually-matters">
        ingl&eacute;s
      </Link>{" "}
      y{" "}
      <Link href="/pt/escrita/why-navier-stokes-actually-matters">
        portugu&eacute;s
      </Link>
      .
    </p>
  </>
);

const bodyPt = (
  <>
    <p>
      A <a href={OPENAI_URL}>OpenAI</a> disse que um sistema de IA resolveu
      um problema matem&aacute;tico em aberto desde 1934.
    </p>
    <p>A internet reagiu antes de entender a alega&ccedil;&atilde;o.</p>
    <p>Tr&ecirc;s grupos se formaram imediatamente.</p>
    <ul>
      <li>
        <strong>Grupo um:</strong> a IA acabou de fazer ci&ecirc;ncia de
        verdade. Um marco. O CEO da OpenAI, Sam Altman, pode ficar feliz.
      </li>
      <li>
        <strong>Grupo dois:</strong> calma l&aacute;. 10 mil agentes testando
        por tentativa e erro n&atilde;o &eacute; a mesma coisa que uma ideia
        nova. Isso &eacute; for&ccedil;a bruta.
      </li>
      <li>
        <strong>Grupo tr&ecirc;s:</strong> simplesmente confuso. Como algo
        pode ir ao infinito, em tempo finito, se a for&ccedil;a por tr&aacute;s
        permanece finita o tempo todo?
      </li>
    </ul>
    <p>
      Esse &eacute; o problema real. Ningu&eacute;m concorda sobre o que
      est&aacute; sendo afirmado.
    </p>
    <p>Essa &eacute; a hist&oacute;ria. N&atilde;o quem est&aacute; certo sobre a IA.</p>

    <h2>A briga, formalizada</h2>
    <p>Imagine um fluido no meio de uma negocia&ccedil;&atilde;o.</p>
    <figure>
      <img
        src="/images/inertia-vs-viscosity.webp"
        alt="In&eacute;rcia versus viscosidade: fluxo ca&oacute;tico e turbulento &agrave; esquerda se acomodando em linhas de corrente suaves e paralelas &agrave; direita."
      />
    </figure>
    <p>
      Empurre-o para um lado. Ele quer continuar naquela dire&ccedil;&atilde;o.
      Se concentra. Se torce. Acelera onde j&aacute; estava r&aacute;pido.
      Isso &eacute; <strong>in&eacute;rcia</strong>.
    </p>
    <p>
      Algo empurra de volta. A <strong>viscosidade</strong>. Ela suaviza o
      movimento. Troca energia concentrada por um fluxo calmo e espalhado.
    </p>
    <p>
      A velocidade que o fluido tem agora &eacute; exatamente onde essa
      briga est&aacute; no momento.
    </p>
    <p>
      Um &aacute;rbitro fica entre os dois: a <strong>press&atilde;o</strong>.
      Ela n&atilde;o toma partido. Tem um &uacute;nico trabalho: impedir que
      o fluido se acumule em algum lugar. Tudo que entra precisa sair. A
      press&atilde;o se ajusta instantaneamente para garantir isso.
    </p>
    <p>Essa &eacute; a equa&ccedil;&atilde;o inteira:</p>
    <PostMath
      display
      math={String.raw`\partial_t u + (u\cdot\nabla)u = -\nabla p + \nu\Delta u + f, \qquad \nabla\cdot u = 0.`}
    />
    <p>
      <PostMath math={String.raw`\partial_t u`} /> &eacute; o resultado.{" "}
      <PostMath math={String.raw`(u\cdot\nabla)u`} /> &eacute; a jogada da
      in&eacute;rcia. <PostMath math={String.raw`\nu\Delta u`} /> &eacute; a
      resposta da viscosidade. <PostMath math={String.raw`-\nabla p`} />{" "}
      &eacute; o &aacute;rbitro.{" "}
      <PostMath math={String.raw`\nabla\cdot u = 0`} /> &eacute; a regra que
      ele imp&otilde;e. <PostMath math="f" /> &eacute; qualquer coisa
      empurrando de fora. Geralmente nada. &Agrave;s vezes n&atilde;o.
    </p>
    <p>
      &Agrave;s vezes a briga se estabiliza. Nada acelera. Cada termo se
      cancela. Isso &eacute; um <strong>fluxo estacion&aacute;rio</strong>,
      o tipo de diagrama de livro did&aacute;tico sobre escoamento em tubos.
    </p>
    <p>
      O Clay Mathematics Institute colocou essa briga na sua lista dos sete
      Problemas do Mil&ecirc;nio: uma solu&ccedil;&atilde;o permanece{" "}
      <strong>suave</strong> para sempre, ou ela eventualmente quebra?
    </p>
    <blockquote>
      A briga pode falhar completamente? A in&eacute;rcia pode vencer a
      viscosidade de forma t&atilde;o feia que o resultado deixa de ser um
      n&uacute;mero finito?
    </blockquote>

    <h2>O qu&atilde;o r&iacute;gido &ldquo;suave&rdquo; realmente &eacute;</h2>
    <p>&ldquo;Suave&rdquo; &eacute; um eufemismo.</p>
    <p>
      O matem&aacute;tico Charles Fefferman escreveu o enunciado oficial do
      problema para a Clay. Ele pede que a velocidade inicial{" "}
      <PostMath math={String.raw`u^\circ`} /> decaia mais r&aacute;pido do
      que qualquer pot&ecirc;ncia da dist&acirc;ncia. Em toda{" "}
      <strong>derivada espacial</strong>:
    </p>
    <PostMath
      display
      math={String.raw`|\partial_x^\alpha u^\circ(x)| \le C_{\alpha K}(1+|x|)^{-K}, \quad \text{para todo } \alpha, K.`}
    />
    <blockquote>
      A velocidade aqui &eacute; uma perturba&ccedil;&atilde;o que desaparece
      longe de si mesma. Toda taxa de varia&ccedil;&atilde;o dela tamb&eacute;m
      desaparece.
    </blockquote>
    <p>
      Isso &eacute; comportamento de fun&ccedil;&atilde;o de Schwartz: uma
      perturba&ccedil;&atilde;o idealizada e perfeitamente localizada.
    </p>
    <p>
      A for&ccedil;a <PostMath math="f" /> recebe o mesmo tratamento, mas{" "}
      <strong>no espa&ccedil;o e no tempo</strong>:
    </p>
    <PostMath
      display
      math={String.raw`|\partial_x^\alpha \partial_t^m f(x,t)| \le C_{\alpha m K}(1+|x|+t)^{-K}, \quad \text{para todo } \alpha, m, K.`}
    />
    <p>
      O problema oficial tem 4 enunciados. Os enunciados (A) e (B) dispensam
      a for&ccedil;a por completo. Eles simplesmente fixam{" "}
      <PostMath math="f = 0" />. Os enunciados (C) e (D) permitem uma
      for&ccedil;a real, mas apenas uma t&atilde;o disciplinada quanto essa.
    </p>
    <blockquote>
      Nada de bombear energia extra. Nada de infinito contrabandeado pelo
      termo de for&ccedil;a.
    </blockquote>
    <p>
      &Eacute; isso que &ldquo;a for&ccedil;a permanece finita&rdquo;
      realmente significa, com precis&atilde;o.
    </p>
    <p>
      Suponha que uma solu&ccedil;&atilde;o falhe. Ela chega a um tempo
      finito <PostMath math="T" />. Depois desse ponto, ela n&atilde;o pode
      continuar suave e com energia finita. Fefferman &eacute; expl&iacute;cito
      sobre como isso se parece:
    </p>
    <blockquote>
      A velocidade explode quando <PostMath math={String.raw`t \to T`} />.
      N&atilde;o a press&atilde;o. N&atilde;o uma derivada qualquer.
    </blockquote>
    <p>
      &Eacute; por isso tamb&eacute;m que ningu&eacute;m consegue chegar a
      uma resposta simulando. Um n&uacute;mero que sobe at&eacute;{" "}
      <PostMath math="10^{50}" /> n&atilde;o prova nada, ele ainda pode dar
      meia-volta. O que se precisa &eacute; de uma prova: um par
      espec&iacute;fico e bem-comportado{" "}
      <PostMath math={String.raw`(u^\circ, f)`} /> que inevitavelmente
      explode, n&atilde;o importa quanto tempo o rel&oacute;gio rode. Dez
      mil agentes n&atilde;o conseguem abreviar isso no volume.
    </p>

    <h2>Por que tr&ecirc;s dimens&otilde;es quebram a tr&eacute;gua</h2>
    <p>
      Fluidos bidimensionais n&atilde;o conseguem fazer algo que os
      tridimensionais conseguem: esticar sua pr&oacute;pria rota&ccedil;&atilde;o.
    </p>
    <p>
      Imagine um tubo de fluido girando. Puxe-o, deixando-o mais fino e mais
      comprido. Como uma patinadora recolhendo os bra&ccedil;os, ele tem
      que girar mais r&aacute;pido.
    </p>
    <figure>
      <img
        src={VORTEX_IMAGE_URL}
        alt="Um retrato do movimento incompress&iacute;vel local. O laranja marca rota&ccedil;&atilde;o angular mais r&aacute;pida; o verde-azulado marca rota&ccedil;&atilde;o mais lenta. A velocidade de circula&ccedil;&atilde;o tamb&eacute;m depende do raio. As trajet&oacute;rias mostram espiral para dentro e estiramento axial."
      />
      <figcaption>
        Imagem: <a href={OPENAI_URL}>OpenAI</a>. O laranja marca rota&ccedil;&atilde;o
        mais r&aacute;pida, o verde-azulado mais lenta. O espiral para
        dentro e o estiramento axial s&atilde;o o mecanismo descrito acima,
        n&atilde;o uma impress&atilde;o art&iacute;stica dele.
      </figcaption>
    </figure>
    <p>
      O fluxo 3D pode se torcer e puxar a si mesmo dessa forma. O 2D
      n&atilde;o pode. N&atilde;o existe uma terceira dire&ccedil;&atilde;o
      para se esticar.
    </p>
    <p>
      Essa diferen&ccedil;a geom&eacute;trica &eacute; praticamente toda a
      hist&oacute;ria. A regularidade em 2D foi resolvida d&eacute;cadas
      atr&aacute;s. Em 3D, ainda est&aacute; em aberto.
    </p>
    <p>
      Esse &eacute; o loop de retroalimenta&ccedil;&atilde;o em um &uacute;nico
      quadro. O fluido espirala para dentro. Se estica ao longo do eixo. O
      estiramento acelera a rota&ccedil;&atilde;o. A regi&atilde;o laranja
      vai se apertando conforme avan&ccedil;a.
    </p>
    <PostMermaid chart={VORTEX_CHART_PT} />
    <p>
      Deixe esse loop disparar completamente, em tempo finito, em vez de se
      estabilizar conforme a viscosidade o alcan&ccedil;a. A velocidade se
      concentra em uma regi&atilde;o cada vez menor. R&aacute;pido o
      suficiente para divergir.
    </p>
    <p>Essa &ldquo;regi&atilde;o cada vez menor&rdquo; resolve um quebra-cabe&ccedil;a.</p>
    <blockquote>
      O problema ainda exige energia total finita:{" "}
      <PostMath math={String.raw`\int |u|^2\,dx`} /> permanece limitada.
    </blockquote>
    <p>
      Parece que isso deveria descartar velocidade infinita em qualquer
      lugar. Mas n&atilde;o descarta.
    </p>
    <p>
      Uma integral mede o total, n&atilde;o o pico.{" "}
      <PostMath math={String.raw`1/x^{1/4}`} /> dispara para o infinito
      quando <PostMath math={String.raw`x\to0`} />, mas seu quadrado ainda
      &eacute; integr&aacute;vel perto de zero.
    </p>
    <figure>
      <img
        src="/images/finite-energy-local-blowup.webp"
        alt="Gr&aacute;fico de 1 sobre x elevado a 1/4: a curva dispara para o infinito conforme x se aproxima de zero, mas a &aacute;rea sob seu quadrado permanece finita."
      />
      <figcaption>
        <PostMath math={String.raw`1/x^{1/4}`} /> &eacute; um exemplo:
        infinito em um ponto, finito no total.
      </figcaption>
    </figure>
    <blockquote>
      Uma explos&atilde;o em 3D poderia funcionar da mesma forma. Infinita
      em um ponto. A energia espalhada por todo o espa&ccedil;o permanece
      completamente comum.
    </blockquote>

    <h2>Onde isso realmente est&aacute;</h2>
    <p>
      Aqui est&aacute; o que est&aacute; estabelecido. A OpenAI divulgou um{" "}
      <a href={OPENAI_URL}>relat&oacute;rio completo</a>, e uma
      formaliza&ccedil;&atilde;o em <a href={LEAN_URL}>Lean</a>, um
      assistente de provas que verifica cada passo l&oacute;gico por
      m&aacute;quina, que qualquer um pode rodar.
    </p>
    <p>
      Aqui est&aacute; o que n&atilde;o est&aacute;. Se a comunidade
      matem&aacute;tica, trabalhando de forma independente, concorda que
      est&aacute; correto.
    </p>
    <p>
      <a href={CLAY_URL}>A pr&oacute;pria p&aacute;gina da Clay</a> ainda
      lista Navier&ndash;Stokes como em aberto. A OpenAI n&atilde;o est&aacute;
      reivindicando o pr&ecirc;mio.
    </p>
    <p>
      Calculado e formalizado n&atilde;o &eacute; a mesma coisa que revisado
      por pares. Revisado por pares n&atilde;o &eacute; a mesma coisa que
      aceito. Isso est&aacute; no primeiro degrau.
    </p>
    <p>O que a OpenAI construiu, e quem merece o cr&eacute;dito, vem a seguir.</p>
    <p>
      Leia tamb&eacute;m em{" "}
      <Link href="/en/writing/why-navier-stokes-actually-matters">
        ingl&ecirc;s
      </Link>{" "}
      e{" "}
      <Link href="/es/escritura/why-navier-stokes-actually-matters">
        espanhol
      </Link>
      .
    </p>
  </>
);

export const post: Record<Locale, Post> = {
  en: {
    slug: "why-navier-stokes-actually-matters",
    title: "Why Navier-Stokes Actually Matters",
    description:
      "OpenAI says an AI system proved a fluid equation can break down in finite time. Here's the actual Navier-Stokes problem, precisely.",
    date: "2026-09-10",
    tags: ["math", "AI", "physics"],
    keywords: ["Navier-Stokes", "Millennium Prize", "OpenAI", "fluid dynamics"],
    body: bodyEn,
  },
  es: {
    slug: "why-navier-stokes-actually-matters",
    title: "Por qué Navier-Stokes realmente importa",
    description:
      "OpenAI dice que un sistema de IA demostró que una ecuación de fluidos puede colapsar en tiempo finito. Aquí está el problema real de Navier-Stokes, con precisión.",
    date: "2026-09-10",
    tags: ["matemáticas", "IA", "física"],
    keywords: ["Navier-Stokes", "Premio del Milenio", "OpenAI", "dinámica de fluidos"],
    body: bodyEs,
  },
  pt: {
    slug: "why-navier-stokes-actually-matters",
    title: "Por que Navier-Stokes realmente importa",
    description:
      "A OpenAI diz que um sistema de IA provou que uma equação de fluidos pode explodir em tempo finito. Aqui está o problema real de Navier-Stokes, com precisão.",
    date: "2026-09-10",
    tags: ["matemática", "IA", "física"],
    keywords: ["Navier-Stokes", "Prêmio do Milênio", "OpenAI", "dinâmica dos fluidos"],
    body: bodyPt,
  },
};
