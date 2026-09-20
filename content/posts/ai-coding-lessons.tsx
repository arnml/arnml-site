import type { ReactNode } from "react";
import type { Locale } from "@/lib/site/locales";
import type { Post } from "./ai-is-leverage";

const body: Record<Locale, ReactNode> = {
  en: (
    <>
      <p>
        For the last several months I&rsquo;ve been shipping production code
        with an AI agent writing most of it, while I review, test, and decide
        what actually ships. Here&rsquo;s what that experience taught me
        &mdash; the parts nobody tells you up front.
      </p>
      <p>
        <strong>Confidence is not a signal of truth.</strong> An AI assistant
        says things in the exact same steady, certain tone whether they are
        true or not. It can tell you a secret key just got committed to your
        git repository &mdash; a real, checkable claim &mdash; in the same
        flat voice it uses to tell you the sky is blue. Only one of those
        needs verifying. Actually, verify both. Never treat confidence as a
        proxy for accuracy.
      </p>
      <p>
        <strong>
          If you catch the same mistake twice, correcting it in the moment
          didn&rsquo;t fix anything.
        </strong>{" "}
        An AI has no memory between tasks beyond what you explicitly write
        down &mdash; a rule, a comment, a lint check, a document it reads
        before starting. It will happily repeat the identical error in three
        different files because, as far as it knows, nothing was ever wrong.
        Write the correction down once, somewhere it will actually be read
        next time.
      </p>
      <p>
        <strong>
          &ldquo;It exists&rdquo; and &ldquo;it works&rdquo; are two different
          claims
        </strong>
        , and AI blurs them constantly. Ask it to build a feature, and it will
        report success once the code compiles and the function is there
        &mdash; not once the function is actually being used. I once had it
        build a health-check function that looked complete. Nothing in the
        rest of the system ever called it. Nobody had checked. That gap
        &mdash; code that exists but isn&rsquo;t wired to anything &mdash; is
        an entire category of bug on its own.
      </p>
      <p>
        <strong>
          Run two AI agents on the same codebase and they will contradict each
          other without meaning to.
        </strong>{" "}
        Say one is working on the backend and another on the frontend, each
        in its own chat session: neither knows what the other decided ten
        minutes ago. Not malice, just no shared memory. Somebody &mdash; a
        human &mdash; has to actually read both sets of changes and catch
        where they&rsquo;ve quietly drifted apart.
      </p>
      <p>
        <strong>
          The worst bugs rarely live inside a single task. They live in the
          gap between two tasks that each looked finished on their own.
        </strong>{" "}
        Concretely: the database column got added, and it works. The toggle
        in the UI got added, and it works. Nobody built the logic that makes
        flipping the toggle actually do anything. Three separate checks pass.
        The feature, end to end, does nothing.
      </p>
      <p>
        <strong>
          Code that passes a quick test and code that survives three days of
          real traffic are not the same code.
        </strong>{" "}
        A test run lasts seconds; a memory leak needs hours or days of
        continuous use to show up. You either catch those the hard way
        &mdash; an outage at 2am &mdash; or you catch them because
        you&rsquo;ve been burned before and know exactly which patterns
        (a connection that&rsquo;s never closed, a cache that never gets
        cleared) to go check for.
      </p>
      <p>
        <strong>
          Having valid credentials to a system isn&rsquo;t the same as being
          authorized to touch everything in it.
        </strong>{" "}
        The most common security gap I found in AI-written code wasn&rsquo;t
        &ldquo;is this person logged in&rdquo; &mdash; that part almost always
        gets checked. It was &ldquo;is this specific logged-in person allowed
        to touch this specific record.&rdquo; First drafts check the first
        question and skip the second, every time.
      </p>
      <p>
        <strong>A linter enforces patterns, not judgment.</strong> It flagged
        code that was perfectly correct, simply because the shape of it
        didn&rsquo;t match what the tool expected &mdash; it has no idea why
        you wrote it that way. Treat a linter warning as a prompt to
        double-check your reasoning, not as a verdict to obey automatically.
      </p>
      <p>
        <strong>Plausible is not the same as correct</strong>, especially
        against a real external spec: an API protocol string, a config key
        name, a date-format code. AI-written code touching these will often
        look completely right &mdash; it compiles, it reads well &mdash; and
        still be wrong, because it matches the general shape of similar specs
        rather than the exact one you actually need. Check against the real
        documentation, not against how clean the code looks.
      </p>
      <p>
        <strong>
          The cheapest bug is the one you prevent by asking a question before
          writing a single line.
        </strong>{" "}
        Nearly every expensive mistake I watched happen traced back to a
        decision nobody stated out loud at the start &mdash; an assumption
        about scope, format, or ownership that everyone quietly read
        differently. Asking first feels slow. It&rsquo;s still the
        highest-leverage move available.
      </p>
    </>
  ),
  es: (
    <>
      <p>
        Durante los últimos meses estuve llevando a producción código escrito,
        en su mayor parte, por un agente de IA, mientras yo lo reviso, lo
        pruebo y decido qué se publica de verdad. Esto es lo que esa
        experiencia me enseñó: lo que nadie te cuenta de antemano.
      </p>
      <p>
        <strong>La confianza no es una señal de verdad.</strong> Un asistente
        de IA dice las cosas con el mismo tono firme y seguro, sean ciertas o
        no. Puede decirte que una clave secreta quedó expuesta en tu
        repositorio de git &mdash;una afirmación real y verificable&mdash; con
        la misma voz plana que usa para decirte que el cielo es azul. Solo una
        de esas dos afirmaciones necesita verificación. En realidad, verifica
        las dos. Nunca trates la seguridad con la que algo se dice como una
        señal de que es correcto.
      </p>
      <p>
        <strong>
          Si detectas el mismo error dos veces, corregirlo en el momento no
          arregló nada.
        </strong>{" "}
        Una IA no tiene memoria entre tareas más allá de lo que escribas
        explícitamente en algún lugar: una regla, un comentario, una
        validación automática, un documento que lea antes de empezar. Repetirá
        con gusto el mismo error idéntico en tres archivos distintos porque,
        hasta donde ella sabe, nunca hubo ningún problema. Escribe la
        corrección una sola vez, en un lugar donde realmente se vuelva a leer.
      </p>
      <p>
        <strong>
          &ldquo;Existe&rdquo; y &ldquo;funciona&rdquo; son dos afirmaciones
          distintas
        </strong>
        , y la IA las confunde todo el tiempo. Si le pedís que construya una
        funcionalidad, va a reportar éxito en cuanto el código compile y la
        función exista &mdash; no cuando esa función realmente se esté usando.
        Una vez le pedí una función que verificaba que un sistema seguía
        activo. Se veía completa. Ninguna otra parte del sistema la llamaba
        jamás. Nadie lo había revisado. Esa brecha &mdash;código que existe
        pero no está conectado a nada&mdash; es toda una categoría de bug por
        sí sola.
      </p>
      <p>
        <strong>
          Si corres dos agentes de IA sobre el mismo proyecto, se van a
          contradecir sin darse cuenta.
        </strong>{" "}
        Supongamos que uno trabaja en el backend y otro en el frontend, cada
        uno en su propia sesión de chat: ninguno sabe qué decidió el otro hace
        diez minutos. No es mala intención, es simplemente que no comparten
        memoria. Alguien &mdash;una persona&mdash; tiene que leer realmente
        los dos conjuntos de cambios y detectar dónde se separaron en
        silencio.
      </p>
      <p>
        <strong>
          Los peores bugs casi nunca están dentro de una sola tarea. Están en
          la costura entre dos tareas que, cada una por separado, parecían
          terminadas.
        </strong>{" "}
        En concreto: la columna en la base de datos se agregó y funciona. El
        toggle en la interfaz se agregó y funciona. Nadie construyó la lógica
        que hace que activar ese toggle realmente haga algo. Tres
        verificaciones distintas pasan. La funcionalidad completa no hace
        nada.
      </p>
      <p>
        <strong>
          El código que pasa una prueba rápida y el código que sobrevive tres
          días de tráfico real no son el mismo código.
        </strong>{" "}
        Una prueba dura segundos; una fuga de memoria necesita horas o días de
        uso continuo para manifestarse. Esas las descubrís de la forma
        difícil &mdash;una caída a las 2 de la madrugada&mdash;, o las
        descubrís porque ya te quemaste antes y sabés exactamente qué patrones
        revisar (una conexión que nunca se cierra, una caché que nunca se
        limpia).
      </p>
      <p>
        <strong>
          Tener credenciales válidas para un sistema no es lo mismo que estar
          autorizado a tocar cualquier cosa dentro de él.
        </strong>{" "}
        El agujero de seguridad más común que encontré en código escrito por
        IA no era &ldquo;esta persona está autenticada&rdquo; &mdash;eso casi
        siempre se verifica. Era &ldquo;esta persona autenticada tiene permiso
        para tocar este registro en particular.&rdquo; Los primeros borradores
        verifican la primera pregunta y se saltan la segunda, siempre.
      </p>
      <p>
        <strong>
          Un linter aplica patrones, no criterio.
        </strong>{" "}
        Marcó código perfectamente correcto solo porque su forma no coincidía
        con lo que la herramienta esperaba: no tiene forma de saber por qué lo
        escribiste así. Tratá una advertencia del linter como una invitación a
        revisar tu razonamiento, no como un veredicto que hay que obedecer
        automáticamente.
      </p>
      <p>
        <strong>Plausible no es lo mismo que correcto</strong>, especialmente
        frente a una especificación externa real: un string de un protocolo,
        el nombre de una clave de configuración, un código de formato de
        fecha. El código escrito por IA que toca esto suele verse
        completamente correcto &mdash;compila, se lee bien&mdash; y aun así
        estar mal, porque coincide con la forma general de especificaciones
        parecidas y no con la exacta que necesitás. Verificá contra la
        documentación real, no contra qué tan prolijo se ve el código.
      </p>
      <p>
        <strong>
          El bug más barato es el que evitás haciendo una pregunta antes de
          escribir una sola línea.
        </strong>{" "}
        Casi todo error costoso que vi ocurrir se remontaba a una decisión que
        nadie dijo en voz alta al principio: un supuesto sobre alcance,
        formato o responsabilidad que cada uno interpretó a su manera en
        silencio. Preguntar primero parece lento. Sigue siendo la acción de
        mayor impacto disponible.
      </p>
    </>
  ),
  pt: (
    <>
      <p>
        Nos últimos meses, venho colocando em produção código escrito, em sua
        maior parte, por um agente de IA, enquanto eu reviso, testo e decido o
        que realmente vai ao ar. Aqui está o que essa experiência me ensinou:
        as partes que ninguém conta antes.
      </p>
      <p>
        <strong>Confiança não é sinal de verdade.</strong> Um assistente de IA
        diz as coisas com o mesmo tom firme e seguro, sejam elas verdadeiras
        ou não. Ele pode te dizer que uma chave secreta acabou de ser
        commitada no seu repositório git &mdash; uma afirmação real e
        verificável &mdash; com a mesma voz neutra que usa para dizer que o
        céu é azul. Só uma dessas afirmações precisa de verificação. Na
        prática, verifique as duas. Nunca trate a firmeza com que algo é dito
        como sinal de que está correto.
      </p>
      <p>
        <strong>
          Se você percebe o mesmo erro duas vezes, corrigi-lo na hora não
          resolveu nada.
        </strong>{" "}
        Uma IA não tem memória entre tarefas além do que você escreve
        explicitamente em algum lugar: uma regra, um comentário, uma
        verificação automática, um documento que ela lê antes de começar. Ela
        vai repetir de bom grado o erro idêntico em três arquivos diferentes
        porque, do ponto de vista dela, nunca houve problema nenhum. Anote a
        correção uma única vez, em um lugar que será realmente lido da próxima
        vez.
      </p>
      <p>
        <strong>
          &ldquo;Existe&rdquo; e &ldquo;funciona&rdquo; são duas afirmações
          diferentes
        </strong>
        , e a IA as confunde o tempo todo. Se você pedir para ela construir
        uma funcionalidade, ela vai reportar sucesso assim que o código
        compilar e a função existir &mdash; não quando essa função realmente
        estiver sendo usada. Certa vez pedi uma função que verificava se um
        sistema continuava ativo. Parecia completa. Nenhuma outra parte do
        sistema jamais a chamava. Ninguém tinha verificado. Essa lacuna
        &mdash; código que existe mas não está conectado a nada &mdash; é uma
        categoria inteira de bug por si só.
      </p>
      <p>
        <strong>
          Rode dois agentes de IA no mesmo projeto e eles vão se contradizer
          sem perceber.
        </strong>{" "}
        Suponha que um trabalhe no backend e outro no frontend, cada um em
        sua própria sessão de chat: nenhum sabe o que o outro decidiu dez
        minutos atrás. Não é má intenção, é que eles simplesmente não
        compartilham memória. Alguém &mdash; uma pessoa &mdash; precisa
        realmente ler as duas mudanças e perceber onde elas se afastaram em
        silêncio.
      </p>
      <p>
        <strong>
          Os piores bugs quase nunca estão dentro de uma única tarefa. Estão
          na costura entre duas tarefas que, cada uma isoladamente, pareciam
          prontas.
        </strong>{" "}
        Concretamente: a coluna no banco de dados foi adicionada e funciona. O
        toggle na interface foi adicionado e funciona. Ninguém construiu a
        lógica que faz esse toggle realmente fazer alguma coisa. Três
        verificações separadas passam. A funcionalidade completa não faz
        nada.
      </p>
      <p>
        <strong>
          Código que passa em um teste rápido e código que sobrevive três
          dias de tráfego real não são o mesmo código.
        </strong>{" "}
        Um teste dura segundos; um vazamento de memória precisa de horas ou
        dias de uso contínuo para aparecer. Você descobre esses do jeito
        difícil &mdash; uma queda às 2 da manhã &mdash;, ou descobre porque já
        se queimou antes e sabe exatamente quais padrões procurar (uma conexão
        que nunca é fechada, um cache que nunca é limpo).
      </p>
      <p>
        <strong>
          Ter credenciais válidas para um sistema não é o mesmo que estar
          autorizado a mexer em qualquer coisa dentro dele.
        </strong>{" "}
        A brecha de segurança mais comum que encontrei em código escrito por
        IA não era &ldquo;essa pessoa está autenticada&rdquo; &mdash; isso
        quase sempre é verificado. Era &ldquo;essa pessoa autenticada tem
        permissão para mexer neste registro específico.&rdquo; As primeiras
        versões verificam a primeira pergunta e pulam a segunda, sempre.
      </p>
      <p>
        <strong>Um linter aplica padrões, não julgamento.</strong> Ele
        sinalizou código perfeitamente correto só porque a forma dele não
        batia com o que a ferramenta esperava &mdash; ele não tem como saber
        por que você escreveu daquele jeito. Trate um aviso de linter como um
        convite para revisar seu raciocínio, não como um veredito a ser
        obedecido automaticamente.
      </p>
      <p>
        <strong>Plausível não é o mesmo que correto</strong>, especialmente
        diante de uma especificação externa real: uma string de protocolo, o
        nome de uma chave de configuração, um código de formato de data.
        Código escrito por IA que mexe nisso costuma parecer completamente
        certo &mdash; compila, lê bem &mdash; e ainda assim estar errado,
        porque segue a forma geral de especificações parecidas em vez da
        exata que você precisa. Confira contra a documentação real, não
        contra o quão limpo o código parece.
      </p>
      <p>
        <strong>
          O bug mais barato é aquele que você evita fazendo uma pergunta antes
          de escrever uma única linha.
        </strong>{" "}
        Quase todo erro caro que vi acontecer remontava a uma decisão que
        ninguém disse em voz alta no início &mdash; uma suposição sobre
        escopo, formato ou responsabilidade que cada um interpretou à sua
        maneira, em silêncio. Perguntar primeiro parece lento. Ainda assim é
        a ação de maior impacto disponível.
      </p>
    </>
  ),
};

export const post: Record<Locale, Post> = {
  en: {
    slug: "ai-coding-lessons",
    title: "What Building Real Software With AI Actually Taught Me",
    description:
      "Months of shipping production code with an AI agent writing most of it, condensed into the lessons nobody tells you up front.",
    date: "2026-09-20",
    tags: ["ai", "software engineering", "lessons learned"],
    keywords: ["ai coding", "ai agents", "software engineering with ai"],
    body: body.en,
  },
  es: {
    slug: "ai-coding-lessons",
    title: "Lo Que Construir Software Real con IA Realmente Me Enseñó",
    description:
      "Meses llevando a producción código escrito en su mayoría por un agente de IA, resumidos en las lecciones que nadie te cuenta de antemano.",
    date: "2026-09-20",
    tags: ["ia", "ingeniería de software", "lecciones aprendidas"],
    keywords: ["programar con ia", "agentes de ia", "ingeniería de software con ia"],
    body: body.es,
  },
  pt: {
    slug: "ai-coding-lessons",
    title: "O Que Construir Software de Verdade com IA Realmente Me Ensinou",
    description:
      "Meses colocando em produção código escrito em sua maior parte por um agente de IA, resumidos nas lições que ninguém conta antes.",
    date: "2026-09-20",
    tags: ["ia", "engenharia de software", "lições aprendidas"],
    keywords: ["programar com ia", "agentes de ia", "engenharia de software com ia"],
    body: body.pt,
  },
};
