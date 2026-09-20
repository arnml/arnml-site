import type { ReactNode } from "react";
import type { Locale } from "@/lib/site/locales";
import type { Post } from "./ai-is-leverage";
import { PostMermaid } from "@/components/post-mermaid";

const FIX_ONCE_EN = `flowchart LR
    A[Mistake happens] --> B{Did you write the fix down?}
    B -->|No| C[Same mistake, next file]
    C --> B
    B -->|Yes, somewhere it gets read| D[Fixed for good]`;

const FIX_ONCE_ES = `flowchart LR
    A[Ocurre un error] --> B{Escribiste la correccion en algun lado?}
    B -->|No| C[Mismo error, siguiente archivo]
    C --> B
    B -->|Si, en un lugar que se vuelve a leer| D[Arreglado de verdad]`;

const FIX_ONCE_PT = `flowchart LR
    A[Acontece um erro] --> B{Voce anotou a correcao em algum lugar?}
    B -->|Nao| C[Mesmo erro, proximo arquivo]
    C --> B
    B -->|Sim, em um lugar que sera lido de novo| D[Corrigido de verdade]`;

const EXISTS_WORKS_EN = `flowchart LR
    A[Function written] --> B[Compiles cleanly]
    B --> C{Is anything calling it?}
    C -->|No| D[Looks done, does nothing]
    C -->|Yes| E[Actually works]`;

const EXISTS_WORKS_ES = `flowchart LR
    A[Funcion escrita] --> B[Compila sin errores]
    B --> C{Algo la esta llamando?}
    C -->|No| D[Parece lista, no hace nada]
    C -->|Si| E[Funciona de verdad]`;

const EXISTS_WORKS_PT = `flowchart LR
    A[Funcao escrita] --> B[Compila sem erros]
    B --> C{Alguma coisa esta chamando ela?}
    C -->|Nao| D[Parece pronta, nao faz nada]
    C -->|Sim| E[Funciona de verdade]`;

const TWO_AGENTS_EN = `flowchart LR
    A[Agent A decides X] --> C[Same codebase]
    B[Agent B decides not-X] --> C
    C --> D[A human has to catch the conflict]`;

const TWO_AGENTS_ES = `flowchart LR
    A[Agente A decide X] --> C[Mismo repositorio]
    B[Agente B decide lo contrario] --> C
    C --> D[Una persona tiene que detectar el conflicto]`;

const TWO_AGENTS_PT = `flowchart LR
    A[Agente A decide X] --> C[Mesmo repositorio]
    B[Agente B decide o contrario] --> C
    C --> D[Uma pessoa precisa perceber o conflito]`;

const SEAM_EN = `flowchart LR
    A[Task 1: DB field, done and tested] --> C[Feature]
    B[Task 2: UI toggle, done and tested] --> C
    C --> D[Nothing connects them: broken feature, no failing test]`;

const SEAM_ES = `flowchart LR
    A[Tarea 1: campo en la base, lista y probada] --> C[Funcionalidad]
    B[Tarea 2: toggle en la interfaz, listo y probado] --> C
    C --> D[Nada los conecta: feature rota, ningun test falla]`;

const SEAM_PT = `flowchart LR
    A[Tarefa 1: campo no banco, pronta e testada] --> C[Funcionalidade]
    B[Tarefa 2: toggle na interface, pronto e testado] --> C
    C --> D[Nada os conecta: funcionalidade quebrada, nenhum teste falha]`;

const SPEC_EN = `flowchart LR
    A[AI writes the code] --> B[Compiles, reads well]
    B --> C{Matches the real spec?}
    C -->|Looks close enough| D[Ships broken]
    C -->|Checked against the doc| E[Actually correct]`;

const SPEC_ES = `flowchart LR
    A[La IA escribe el codigo] --> B[Compila, se lee bien]
    B --> C{Coincide con la especificacion real?}
    C -->|Se parece bastante| D[Sale roto a produccion]
    C -->|Se verifico contra el documento| E[Correcto de verdad]`;

const SPEC_PT = `flowchart LR
    A[A IA escreve o codigo] --> B[Compila, le bem]
    B --> C{Bate com a especificacao real?}
    C -->|Parece bem parecido| D[Vai quebrado para producao]
    C -->|Foi conferido no documento| E[Correto de verdade]`;

const body: Record<Locale, ReactNode> = {
  en: (
    <>
      <p>
        I spent the last several months shipping production code with an AI
        doing most of the typing. I still read every diff and signed off on
        every line. Here is what that actually taught me, the part that
        doesn&rsquo;t make it into anyone&rsquo;s demo.
      </p>

      <h2>Confidence Is Not a Signal of Truth</h2>
      <p>
        The AI will tell you a secret leaked into your git history in the
        exact same voice it uses to tell you the sky is blue. Calm. Certain.
        Unbothered. Only one of those two claims needs checking. Check both
        anyway.
      </p>
      <blockquote>
        &ldquo;The first principle is that you must not fool
        yourself&mdash;and you are the easiest person to fool.&rdquo;
        <br />
        &mdash; Richard Feynman
      </blockquote>

      <h2>Fix It Once, in Writing</h2>
      <p>
        Catch the model making the same mistake twice and the fix you made
        the first time did nothing at all. It has no memory from one task to
        the next except what you actually write down: a rule, a comment, a
        short doc it reads before it starts. Leave the correction only in
        your head, and it will make the identical error in the next file, and
        the one after that.
      </p>
      <PostMermaid chart={FIX_ONCE_EN} />

      <h2>&ldquo;It Exists&rdquo; Is Not &ldquo;It Works&rdquo;</h2>
      <p>
        Ask it to build a feature and it will call the job done the moment
        the code compiles and the function is sitting there. Not once
        anything is actually using it. I once had it write a health-check
        function that looked complete in every way. Nothing else in the
        system ever called it. Nobody noticed for weeks.
      </p>
      <PostMermaid chart={EXISTS_WORKS_EN} />

      <h2>Two Agents, Two Stories</h2>
      <p>
        Point two AI sessions at the same codebase and they will contradict
        each other. Not out of malice, out of plain ignorance: neither one
        knows what the other decided ten minutes ago in a different window.
        Somebody has to actually sit down and read both sets of changes.
      </p>
      <PostMermaid chart={TWO_AGENTS_EN} />

      <h2>The Bug Lives in the Seam</h2>
      <p>
        The database field shipped, and it works. The toggle in the UI
        shipped, and it works. Nobody ever built what that toggle was
        supposed to turn on. Three green checkmarks, one dead feature. The
        worst bugs almost never sit inside a single task. They live in the
        handoff between two tasks that each looked finished on their own.
      </p>
      <PostMermaid chart={SEAM_EN} />

      <h2>Passing a Test Is Not Surviving Production</h2>
      <blockquote>
        Code that works right now and code that survives three days in
        production are not the same code.
      </blockquote>
      <p>
        Nothing in a test suite runs long enough to catch a memory leak. You
        find those the hard way, at two in the morning, or you find them
        early because you got burned once before and know exactly which
        patterns to go check: the connection that never closes, the cache
        that never clears.
      </p>

      <h2>Having a Key Doesn&rsquo;t Mean Every Door Opens</h2>
      <p>
        The most common security hole I found in AI-written code was never
        &ldquo;who are you.&rdquo; That question gets asked almost every
        time. The one that gets skipped is &ldquo;are you allowed to touch
        this specific thing.&rdquo; First drafts leave it out, every single
        time.
      </p>
      <blockquote>
        &ldquo;Security is a process, not a product.&rdquo;
        <br />
        &mdash; Bruce Schneier
      </blockquote>

      <h2>A Linter Is an Intern, Not a Judge</h2>
      <p>
        It flagged code that was perfectly correct, simply because the shape
        of it looked wrong to a machine that has no idea why you wrote it
        that way. Software engineers have a name for the deeper mistake here:
        Chesterton&rsquo;s Fence, the habit of tearing something down before
        you understand why it was put up. Understand the code first. Obey
        the tool second, if at all.
      </p>

      <h2>Plausible Is Not Correct</h2>
      <p>
        Protocol strings, config keys, date formats: they compile, they read
        well, and they are sometimes just wrong, because the AI matched the
        general shape of specs it has seen before instead of the exact one
        you actually need. Check against the real documentation. Not against
        how clean the code looks.
      </p>
      <PostMermaid chart={SPEC_EN} />

      <h2>The Cheapest Bug Is the One You Never Write</h2>
      <p>
        Every expensive mistake I watched happen traced back to a decision
        nobody made out loud at the start: an assumption about scope, or
        format, or who owns what, that everyone quietly read differently.
      </p>
      <blockquote>
        &ldquo;The hardest single part of building a software system is
        deciding precisely what to build.&rdquo;
        <br />
        &mdash; Fred Brooks, <em>No Silver Bullet</em>
      </blockquote>
      <p>
        Asking first feels slow. It is still the cheapest move on the board.
        Every one of these lessons comes down to the same instruction: slow
        down at the exact moment the machine sounds most sure of itself.
      </p>
    </>
  ),
  es: (
    <>
      <p>
        Pasé los últimos meses llevando a producción código escrito, en su
        mayor parte, por una IA. Yo leía cada cambio y firmaba cada línea. Esto
        es lo que esa experiencia me enseñó de verdad, la parte que no
        aparece en ninguna demo.
      </p>

      <h2>La Confianza No Es una Señal de Verdad</h2>
      <p>
        La IA te va a decir que se filtró un secreto en tu historial de git
        con la misma voz que usa para decirte que el cielo es azul. Tranquila.
        Segura. Impasible. Solo una de esas dos afirmaciones necesita
        verificación. Verifica las dos igual.
      </p>
      <blockquote>
        &ldquo;El primer principio es que no debes engañarte a ti mismo, y tú
        eres la persona más fácil de engañar.&rdquo;
        <br />
        &mdash; Richard Feynman
      </blockquote>

      <h2>Arregla Cada Error Una Sola Vez, por Escrito</h2>
      <p>
        Si detectas al modelo cometiendo el mismo error dos veces, la
        corrección que hiciste la primera vez no sirvió de nada. No tiene
        memoria de una tarea a la siguiente, salvo lo que realmente dejes
        escrito: una regla, un comentario, un documento breve que lea antes
        de empezar. Si la corrección queda solo en tu cabeza, va a repetir el
        mismo error en el próximo archivo, y en el siguiente.
      </p>
      <PostMermaid chart={FIX_ONCE_ES} />

      <h2>&ldquo;Existe&rdquo; No Es Lo Mismo Que &ldquo;Funciona&rdquo;</h2>
      <p>
        Pídele que construya una funcionalidad y va a dar el trabajo por
        terminado en cuanto el código compile y la función esté ahí. No
        cuando algo realmente la use. Una vez le pedí una función de
        verificación de estado que se veía completa en todo sentido. Ninguna
        otra parte del sistema la llamó jamás. Nadie lo notó durante semanas.
      </p>
      <PostMermaid chart={EXISTS_WORKS_ES} />

      <h2>Dos Agentes, Dos Historias</h2>
      <p>
        Pon dos sesiones de IA a trabajar sobre el mismo código y se van a
        contradecir. No por mala intención, por pura ignorancia: ninguna
        sabe qué decidió la otra hace diez minutos en otra ventana. Alguien
        tiene que sentarse a leer los dos conjuntos de cambios.
      </p>
      <PostMermaid chart={TWO_AGENTS_ES} />

      <h2>El Bug Vive en la Costura</h2>
      <p>
        El campo en la base de datos se implementó, y funciona. El toggle en
        la interfaz se implementó, y funciona. Nadie construyó lo que ese
        toggle debía activar. Tres checkmarks en verde, una funcionalidad
        muerta. Los peores bugs casi nunca están dentro de una sola tarea.
        Viven en el traspaso entre dos tareas que, cada una por separado,
        parecían terminadas.
      </p>
      <PostMermaid chart={SEAM_ES} />

      <h2>Pasar un Test No Es Sobrevivir en Producción</h2>
      <blockquote>
        El código que funciona ahora mismo y el código que sobrevive tres
        días en producción no son el mismo código.
      </blockquote>
      <p>
        Nada en una suite de tests corre el tiempo suficiente para detectar
        una fuga de memoria. Esas las descubres de la forma difícil, a las
        dos de la madrugada, o las descubres a tiempo porque ya te quemaste
        una vez antes y sabes exactamente qué patrones revisar: la conexión
        que nunca se cierra, la caché que nunca se limpia.
      </p>

      <h2>Tener una Llave No Significa que se Abra Cualquier Puerta</h2>
      <p>
        El agujero de seguridad más común que encontré en código escrito por
        IA nunca fue &ldquo;quién eres.&rdquo; Esa pregunta casi siempre se
        hace. La que se salta es &ldquo;tienes permiso para tocar esto en
        particular.&rdquo; Los primeros borradores la omiten, siempre.
      </p>
      <blockquote>
        &ldquo;La seguridad es un proceso, no un producto.&rdquo;
        <br />
        &mdash; Bruce Schneier
      </blockquote>

      <h2>Un Linter Es un Pasante, No un Juez</h2>
      <p>
        Marcó código perfectamente correcto solo porque su forma le pareció
        rara a una máquina que no tiene idea de por qué lo escribiste así.
        En ingeniería de software hay un nombre para el error de fondo: la
        Valla de Chesterton, el hábito de derribar algo antes de entender
        por qué lo pusieron ahí. Entiende el código primero. Obedece a la
        herramienta después, si acaso.
      </p>

      <h2>Plausible No Es Correcto</h2>
      <p>
        Strings de protocolo, claves de configuración, formatos de fecha:
        compilan, se leen bien, y a veces simplemente están mal, porque la
        IA copió la forma general de especificaciones que ya vio en vez de
        la exacta que tú necesitas. Verifica contra la documentación real.
        No contra qué tan prolijo se ve el código.
      </p>
      <PostMermaid chart={SPEC_ES} />

      <h2>El Bug Más Barato Es el que Nunca Llegas a Escribir</h2>
      <p>
        Cada error costoso que vi ocurrir se remontaba a una decisión que
        nadie dijo en voz alta al principio: un supuesto sobre alcance,
        formato o responsabilidad que cada uno interpretó a su manera, en
        silencio.
      </p>
      <blockquote>
        &ldquo;La parte más difícil de construir un sistema de software es
        decidir con precisión qué construir.&rdquo;
        <br />
        &mdash; Fred Brooks, <em>No Silver Bullet</em>
      </blockquote>
      <p>
        Preguntar primero parece lento. Sigue siendo la jugada más barata del
        tablero. Todas estas lecciones se reducen a la misma instrucción:
        frena justo en el momento en que la máquina suena más segura de sí
        misma.
      </p>
    </>
  ),
  pt: (
    <>
      <p>
        Passei os últimos meses colocando em produção código escrito, em sua
        maior parte, por uma IA. Eu lia cada mudança e assinava embaixo de
        cada linha. Aqui está o que isso realmente me ensinou, a parte que
        não aparece em nenhuma demonstração.
      </p>

      <h2>Confiança Não É Sinal de Verdade</h2>
      <p>
        A IA vai te dizer que um segredo vazou no histórico do git com a
        mesma voz que usa para dizer que o céu é azul. Calma. Segura.
        Impassível. Só uma dessas duas afirmações precisa de verificação.
        Verifique as duas de qualquer jeito.
      </p>
      <blockquote>
        &ldquo;O primeiro princípio é que você não deve enganar a si mesmo, e
        você é a pessoa mais fácil de enganar.&rdquo;
        <br />
        &mdash; Richard Feynman
      </blockquote>

      <h2>Corrija Cada Erro Uma Única Vez, por Escrito</h2>
      <p>
        Se você pegar o modelo cometendo o mesmo erro duas vezes, a correção
        que você fez da primeira vez não serviu para nada. Ele não tem
        memória de uma tarefa para a outra, exceto pelo que você realmente
        registra em algum lugar: uma regra, um comentário, um documento curto
        que ele lê antes de começar. Se a correção fica só na sua cabeça, ele
        vai repetir o mesmo erro no próximo arquivo, e no seguinte.
      </p>
      <PostMermaid chart={FIX_ONCE_PT} />

      <h2>&ldquo;Existir&rdquo; Não É o Mesmo Que &ldquo;Funcionar&rdquo;</h2>
      <p>
        Peça para ele construir uma funcionalidade e ele vai dar o trabalho
        como concluído assim que o código compilar e a função estiver ali.
        Não quando algo realmente a usa. Certa vez pedi uma função de
        verificação de status que parecia completa em todos os sentidos.
        Nenhuma outra parte do sistema jamais a chamou. Ninguém percebeu por
        semanas.
      </p>
      <PostMermaid chart={EXISTS_WORKS_PT} />

      <h2>Dois Agentes, Duas Histórias</h2>
      <p>
        Coloque duas sessões de IA para trabalhar no mesmo código e elas vão
        se contradizer. Não por má intenção, por pura ignorância: nenhuma
        sabe o que a outra decidiu dez minutos atrás em outra janela. Alguém
        precisa se sentar e ler as duas mudanças.
      </p>
      <PostMermaid chart={TWO_AGENTS_PT} />

      <h2>O Bug Vive na Costura</h2>
      <p>
        O campo no banco de dados foi entregue, e funciona. O toggle na
        interface foi entregue, e funciona. Ninguém construiu o que esse
        toggle deveria ligar. Três checkmarks verdes, uma funcionalidade
        morta. Os piores bugs quase nunca estão dentro de uma única tarefa.
        Vivem na passagem entre duas tarefas que, cada uma isoladamente,
        pareciam prontas.
      </p>
      <PostMermaid chart={SEAM_PT} />

      <h2>Passar em um Teste Não É Sobreviver em Produção</h2>
      <blockquote>
        Código que funciona agora e código que sobrevive três dias em
        produção não são o mesmo código.
      </blockquote>
      <p>
        Nada em uma suíte de testes roda tempo suficiente para pegar um
        vazamento de memória. Você descobre esses do jeito difícil, às duas
        da manhã, ou descobre a tempo porque já se queimou uma vez antes e
        sabe exatamente quais padrões procurar: a conexão que nunca fecha, o
        cache que nunca limpa.
      </p>

      <h2>Ter uma Chave Não Significa que Toda Porta Abre</h2>
      <p>
        A brecha de segurança mais comum que encontrei em código escrito por
        IA nunca foi &ldquo;quem é você.&rdquo; Essa pergunta quase sempre é
        feita. A que fica de fora é &ldquo;você tem permissão para mexer
        nisso especificamente.&rdquo; As primeiras versões deixam isso de
        fora, sempre.
      </p>
      <blockquote>
        &ldquo;Segurança é um processo, não um produto.&rdquo;
        <br />
        &mdash; Bruce Schneier
      </blockquote>

      <h2>Um Linter É um Estagiário, Não um Juiz</h2>
      <p>
        Ele sinalizou código perfeitamente correto só porque a forma dele
        pareceu estranha para uma máquina que não faz ideia de por que você
        escreveu daquele jeito. Na engenharia de software existe um nome
        para o erro mais profundo aqui: a Cerca de Chesterton, o hábito de
        derrubar algo antes de entender por que foi colocado ali. Entenda o
        código primeiro. Obedeça a ferramenta depois, se for o caso.
      </p>

      <h2>Plausível Não É Correto</h2>
      <p>
        Strings de protocolo, chaves de configuração, formatos de data:
        compilam, leem bem, e às vezes estão simplesmente errados, porque a
        IA copiou a forma geral de especificações parecidas em vez da exata
        que você precisa. Confira contra a documentação real. Não contra o
        quão limpo o código parece.
      </p>
      <PostMermaid chart={SPEC_PT} />

      <h2>O Bug Mais Barato É Aquele Que Você Nunca Chega a Escrever</h2>
      <p>
        Todo erro caro que vi acontecer remontava a uma decisão que ninguém
        disse em voz alta no início: uma suposição sobre escopo, formato ou
        responsabilidade que cada um interpretou à sua maneira, em silêncio.
      </p>
      <blockquote>
        &ldquo;A parte mais difícil de construir um sistema de software é
        decidir com precisão o que construir.&rdquo;
        <br />
        &mdash; Fred Brooks, <em>No Silver Bullet</em>
      </blockquote>
      <p>
        Perguntar primeiro parece lento. Ainda assim é a jogada mais barata
        do tabuleiro. Todas essas lições se resumem à mesma instrução: vá
        mais devagar bem no momento em que a máquina soa mais segura de si
        mesma.
      </p>
    </>
  ),
};

export const post: Record<Locale, Post> = {
  en: {
    slug: "ai-coding-lessons",
    title: "What Building Real Software With AI Actually Taught Me",
    description:
      "Ten things a year of shipping AI-written production code actually taught me, minus the hype.",
    date: "2026-09-20",
    tags: ["ai", "software engineering", "lessons learned"],
    keywords: ["ai coding", "ai agents", "software engineering with ai"],
    body: body.en,
  },
  es: {
    slug: "ai-coding-lessons",
    title: "Lo Que Construir Software Real con IA Realmente Me Enseñó",
    description:
      "Diez cosas que un año llevando a producción código escrito por IA me enseñó de verdad, sin el hype.",
    date: "2026-09-20",
    tags: ["ia", "ingeniería de software", "lecciones aprendidas"],
    keywords: ["programar con ia", "agentes de ia", "ingeniería de software con ia"],
    body: body.es,
  },
  pt: {
    slug: "ai-coding-lessons",
    title: "O Que Construir Software de Verdade com IA Realmente Me Ensinou",
    description:
      "Dez coisas que um ano colocando em produção código escrito por IA realmente me ensinou, sem o hype.",
    date: "2026-09-20",
    tags: ["ia", "engenharia de software", "lições aprendidas"],
    keywords: ["programar com ia", "agentes de ia", "engenharia de software com ia"],
    body: body.pt,
  },
};
