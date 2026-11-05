import Link from "next/link";
import type { Locale } from "@/lib/site/locales";
import type { Post } from "./ai-is-leverage";
import { PostMath } from "@/components/post-math";
import {
  RayGrazingFigure,
  RayHookFigure,
  RayMarchFigure,
  RayOpenLoopFigure,
  RayRegionFigure,
  RayRidgeFigure,
  RayStepsFigure,
} from "@/components/ray-terrain-figures";

/*
 * Same structure as the short video "Del píxel al mapa" (videos/01-rayo-al-terreno):
 * hook, intro, body 1, open loop, body 2, close the loop, body 3, call to action.
 *
 * Every number can be checked with d = h / tan(angle), drone 200 m above flat ground:
 *   45° → 200.0 m, 44° → 207.1 m, difference 7 m
 *    8° → 1423.1 m, 7° → 1628.9 m, difference 206 m
 */

const DISTANCE = String.raw`d = \dfrac{h}{\tan\theta}`;

const bodyEn = (
  <>
    <RayHookFigure
      locale="en"
      caption="A drone sees a person. The question sounds trivial."
    />
    <p>A drone sees a person. Simple question: where exactly on the map are they?</p>
    <p>
      Not “somewhere over there”. A latitude and a longitude you could send
      someone to.
    </p>

    <h2>The obvious answer</h2>
    <p>It looks like three steps.</p>
    <ul>
      <li>
        <strong>Pixel:</strong> find the person in the image.
      </li>
      <li>
        <strong>Ray:</strong> turn that pixel into a direction leaving the
        camera.
      </li>
      <li>
        <strong>Ground:</strong> follow the ray until it touches the terrain.
      </li>
    </ul>
    <RayStepsFigure
      locale="en"
      caption="Pixel → ray → ground. The first two arrows are well understood. The last one is where it gets hard."
    />
    <p>
      The first two steps are solved problems. Camera calibration tells you
      which direction each pixel looks at. The drone’s GPS and attitude tell
      you where the camera is and where it points. The hard part hides in one
      word: <em>touches</em>.
    </p>

    <h2>The terrain is not a formula</h2>
    <p>
      If the ground were a perfect plane, the intersection would be one line
      of algebra. Real ground is a <strong>height grid</strong>: millions of
      cells, each holding one number, its elevation. There is no equation to
      solve. You have to walk.
    </p>
    <p>
      So you walk the ray. Take a step and ask: is the ray still above the
      ground here? Take another. The moment the answer flips to “no”, the ray
      crossed the ground somewhere inside the last step.
    </p>
    <p>
      Then you refine. Cut that step in half, keep the half where the crossing
      is, repeat. That’s <strong>bisection</strong>. About ten halvings take a
      30-metre step down to a few centimetres.
    </p>
    <RayMarchFigure
      locale="en"
      caption="Walk the ray and compare heights at each step (cyan). When a sample falls below the ground (pink), halve the last step until the crossing is pinned down (green)."
    />

    <h2>An error that moves the point 200 metres</h2>
    <p>
      There’s one error in this pipeline that can move your point{" "}
      <strong>200 metres</strong>. It isn’t a bug. Every input can be almost
      right and it still happens.
    </p>
    <RayOpenLoopFigure
      locale="en"
      caption="Same drone, same person, almost the same inputs. The point lands 200 m away."
    />
    <p>Hold that thought. First, a more ordinary trap.</p>

    <h2>Problem 1: jumping over a crest</h2>
    <p>
      Walking the ray with big steps is fast. It’s also how you miss things. A
      thin ridge, a wall or a cliff edge can fit entirely between two samples.
      Both samples say “above ground”, and the ray goes straight through the
      crest without noticing. You still get a hit, just in the wrong valley.
    </p>
    <p>
      The fix is to stop picking a step size at all. Walk the grid{" "}
      <strong>cell by cell</strong>, visiting every cell the ray passes over,
      in order. That traversal is called <strong>DDA</strong>, the same trick
      early 3D games used to cast rays through a tile map. No cell is skipped,
      so no crest can hide.
    </p>
    <RayRidgeFigure
      locale="en"
      caption="Top: with big steps, every sample is above ground and the crest is never seen. Bottom: visiting every cell, the crest is found."
    />

    <h2>The 200 metres: it’s the angle</h2>
    <p>
      Now the promised number. It has nothing to do with the terrain. It’s
      about how steep the ray is.
    </p>
    <p>
      Put the drone <PostMath math="h = 200" /> m above flat ground. A ray
      looking down at an angle <PostMath math={String.raw`\theta`} /> below
      the horizon lands at a distance
    </p>
    <PostMath display math={DISTANCE} />
    <p>
      Looking <strong>45°</strong> down, the point is 200 m away. If your angle
      is off by one degree, 44°, it lands at 207 m. Seven metres of error.
      Annoying, but fine.
    </p>
    <p>
      Now look almost at the horizon: <strong>8°</strong> down. The point is
      1,423 m away. One degree off, 7°, and it lands at 1,629 m. Same
      one-degree error. <strong>206 metres</strong> of difference.
    </p>
    <RayGrazingFigure
      locale="en"
      caption="Drag the angle. The yellow ray is the measurement; the dashed pink ray is the same measurement one degree flatter."
    />
    <p>
      Near the horizon the ray skims the ground, so a tiny rotation slides the
      hit point a long way. One degree is not a big error once you add up the
      attitude sensor, the gimbal and the timing. That’s why a good system{" "}
      <strong>rejects grazing rays</strong>: below some angle, the answer is
      too sensitive to trust.
    </p>

    <h2>Not a point: a region</h2>
    <p>
      Which leads to the honest answer. Every input carries a small error: the
      GPS position, the angles, the photo’s timestamp against the GPS fix, the
      exact pixel. Instead of pretending they’re zero, you cast hundreds of
      rays, each with its own small random nudge to those inputs, and look at
      where they land.
    </p>
    <p>
      The hits form a cloud, stretched along the direction the camera looks,
      because that’s where angle error turns into distance. Draw the ellipse
      that holds 95% of them and you have the real output: the person is in
      here, with 95% confidence.
    </p>
    <RayRegionFigure
      locale="en"
      caption="Hundreds of rays, each with small errors in GPS, angles, time and pixel. Where they land forms the 95% ellipse."
    />
    <p>
      A point on a map looks precise. An ellipse is precise about how
      imprecise it is. That’s the better answer.
    </p>

    <h2>Your turn</h2>
    <p>
      Which one surprised you more, the hidden crest or the one degree? And
      what should I explain next: why your GPS height isn’t height above sea
      level, or why your compass doesn’t point north?
    </p>
    <p>
      Also in{" "}
      <Link href="/es/escritura/why-ray-to-terrain-is-hard">Spanish</Link> and{" "}
      <Link href="/pt/escrita/why-ray-to-terrain-is-hard">Portuguese</Link>.
    </p>
  </>
);

const bodyEs = (
  <>
    <RayHookFigure
      locale="es"
      caption="Un dron ve a una persona. La pregunta parece trivial."
    />
    <p>
      Este dron ve a una persona. Pregunta simple: ¿en qué punto exacto del
      mapa está?
    </p>
    <p>
      No “por allá”. Una latitud y una longitud a la que podrías mandar a
      alguien.
    </p>

    <h2>La respuesta obvia</h2>
    <p>Parecen tres pasos.</p>
    <ul>
      <li>
        <strong>Píxel:</strong> encuentras a la persona en la imagen.
      </li>
      <li>
        <strong>Rayo:</strong> conviertes ese píxel en una dirección que sale
        de la cámara.
      </li>
      <li>
        <strong>Suelo:</strong> sigues el rayo hasta que toca el terreno.
      </li>
    </ul>
    <RayStepsFigure
      locale="es"
      caption="Píxel → rayo → suelo. Las dos primeras flechas se conocen bien. La última es donde se complica."
    />
    <p>
      Los dos primeros pasos son problemas resueltos. La calibración de la
      cámara dice hacia dónde mira cada píxel. El GPS y la orientación del dron
      dicen dónde está la cámara y hacia dónde apunta. Lo difícil se esconde en
      una palabra: <em>toca</em>.
    </p>

    <h2>El terreno no es una fórmula</h2>
    <p>
      Si el suelo fuera un plano perfecto, la intersección sería una línea de
      álgebra. El suelo real es una <strong>malla de alturas</strong>:
      millones de celdas, cada una con un número, su elevación. No hay ecuación
      que resolver. Hay que caminar.
    </p>
    <p>
      Así que caminas el rayo. Das un paso y preguntas: ¿el rayo sigue por
      encima del suelo aquí? Das otro. En cuanto la respuesta cambia a “no”, el
      rayo cruzó el suelo en algún punto del último paso.
    </p>
    <p>
      Luego afinas. Partes ese paso por la mitad, te quedas con la mitad donde
      está el cruce y repites. Eso es la <strong>bisección</strong>. Unas diez
      mitades llevan un paso de 30 metros a unos pocos centímetros.
    </p>
    <RayMarchFigure
      locale="es"
      caption="Camina el rayo y compara alturas en cada paso (cian). Cuando una muestra queda bajo el suelo (rosa), parte el último paso por la mitad hasta fijar el cruce (verde)."
    />

    <h2>Un error que mueve el punto 200 metros</h2>
    <p>
      Hay un error en este proceso que puede mover tu punto{" "}
      <strong>200 metros</strong>. Y no es un bug. Todos los datos pueden estar
      casi bien y aun así pasa.
    </p>
    <RayOpenLoopFigure
      locale="es"
      caption="Mismo dron, misma persona, casi los mismos datos. El punto cae 200 m más lejos."
    />
    <p>Quédate con eso. Antes, una trampa más común.</p>

    <h2>Problema 1: saltarse una cresta</h2>
    <p>
      Caminar el rayo con pasos grandes es rápido. También es la forma de
      perderse cosas. Una cresta delgada, un muro o el borde de un barranco
      caben enteros entre dos muestras. Las dos dicen “por encima del suelo”, y
      el rayo atraviesa la cresta sin verla. Igual obtienes un cruce, pero en
      el valle equivocado.
    </p>
    <p>
      La solución es dejar de elegir un tamaño de paso. Recorres la malla{" "}
      <strong>celda por celda</strong>, visitando en orden cada celda por la
      que pasa el rayo. Ese recorrido se llama <strong>DDA</strong>, el mismo
      truco que usaban los primeros juegos 3D para lanzar rayos sobre un mapa
      de baldosas. No se salta ninguna celda, así que ninguna cresta se puede
      esconder.
    </p>
    <RayRidgeFigure
      locale="es"
      caption="Arriba: con pasos grandes, todas las muestras quedan sobre el suelo y la cresta nunca aparece. Abajo: visitando cada celda, la cresta se encuentra."
    />

    <h2>Los 200 metros: es el ángulo</h2>
    <p>
      Ahora el número prometido. No tiene nada que ver con el terreno. Tiene
      que ver con qué tan inclinado va el rayo.
    </p>
    <p>
      Pon el dron a <PostMath math="h = 200" /> m sobre suelo plano. Un rayo
      que mira hacia abajo con un ángulo <PostMath math={String.raw`\theta`} />{" "}
      bajo el horizonte toca el suelo a una distancia
    </p>
    <PostMath display math={DISTANCE} />
    <p>
      Mirando <strong>45°</strong> hacia abajo, el punto está a 200 m. Si tu
      ángulo tiene un grado de error, 44°, cae a 207 m. Siete metros de error.
      Molesto, pero aceptable.
    </p>
    <p>
      Ahora mira casi al horizonte: <strong>8°</strong> hacia abajo. El punto
      está a 1423 m. Un grado de error, 7°, y cae a 1629 m. El mismo grado de
      error. <strong>206 metros</strong> de diferencia.
    </p>
    <RayGrazingFigure
      locale="es"
      caption="Mueve el ángulo. El rayo amarillo es la medición; el rayo rosa punteado es la misma medición con un grado menos."
    />
    <p>
      Cerca del horizonte el rayo roza el suelo, así que una rotación mínima
      desliza el punto muy lejos. Un grado no es mucho cuando sumas el sensor
      de orientación, el gimbal y el tiempo. Por eso un buen sistema{" "}
      <strong>rechaza los rayos rasantes</strong>: por debajo de cierto ángulo,
      la respuesta es demasiado sensible para confiar en ella.
    </p>

    <h2>No un punto: una región</h2>
    <p>
      Eso lleva a la respuesta honesta. Cada dato trae un pequeño error: la
      posición del GPS, los ángulos, la hora de la foto frente a la del GPS, el
      píxel exacto. En vez de fingir que son cero, lanzas cientos de rayos,
      cada uno con un pequeño empujón aleatorio en esos datos, y miras dónde
      caen.
    </p>
    <p>
      Los cruces forman una nube, estirada en la dirección hacia la que mira la
      cámara, porque ahí es donde el error de ángulo se convierte en distancia.
      Dibuja la elipse que contiene el 95 % de ellos y tienes el resultado
      real: la persona está aquí dentro, con un 95 % de confianza.
    </p>
    <RayRegionFigure
      locale="es"
      caption="Cientos de rayos, cada uno con pequeños errores de GPS, ángulos, tiempo y píxel. Donde caen forma la elipse del 95 %."
    />
    <p>
      Un punto en el mapa parece preciso. Una elipse es precisa sobre cuán
      imprecisa es. Esa es la mejor respuesta.
    </p>

    <h2>Tu turno</h2>
    <p>
      ¿Qué te sorprendió más, la cresta escondida o el grado? ¿Y qué explico
      después: por qué la altura de tu GPS no es sobre el nivel del mar, o por
      qué tu brújula no apunta al norte?
    </p>
    <p>
      También en <Link href="/en/writing/why-ray-to-terrain-is-hard">inglés</Link>{" "}
      y <Link href="/pt/escrita/why-ray-to-terrain-is-hard">portugués</Link>.
    </p>
  </>
);

const bodyPt = (
  <>
    <RayHookFigure
      locale="pt"
      caption="Um drone vê uma pessoa. A pergunta parece trivial."
    />
    <p>
      Este drone vê uma pessoa. Pergunta simples: em que ponto exato do mapa
      ela está?
    </p>
    <p>
      Não “mais ou menos ali”. Uma latitude e uma longitude para onde você
      poderia mandar alguém.
    </p>

    <h2>A resposta óbvia</h2>
    <p>Parecem três passos.</p>
    <ul>
      <li>
        <strong>Pixel:</strong> encontrar a pessoa na imagem.
      </li>
      <li>
        <strong>Raio:</strong> transformar esse pixel numa direção que sai da
        câmera.
      </li>
      <li>
        <strong>Solo:</strong> seguir o raio até ele tocar o terreno.
      </li>
    </ul>
    <RayStepsFigure
      locale="pt"
      caption="Pixel → raio → solo. As duas primeiras setas são bem conhecidas. A última é onde complica."
    />
    <p>
      Os dois primeiros passos são problemas resolvidos. A calibração da câmera
      diz para onde cada pixel olha. O GPS e a orientação do drone dizem onde
      a câmera está e para onde aponta. A parte difícil se esconde numa
      palavra: <em>tocar</em>.
    </p>

    <h2>O terreno não é uma fórmula</h2>
    <p>
      Se o solo fosse um plano perfeito, a interseção seria uma linha de
      álgebra. O solo real é uma <strong>malha de alturas</strong>: milhões de
      células, cada uma com um número, sua elevação. Não há equação para
      resolver. É preciso caminhar.
    </p>
    <p>
      Então você caminha o raio. Dá um passo e pergunta: o raio ainda está
      acima do solo aqui? Dá outro. Assim que a resposta vira “não”, o raio
      cruzou o solo em algum ponto do último passo.
    </p>
    <p>
      Depois você refina. Corta esse passo ao meio, fica com a metade onde está
      o cruzamento e repete. Isso é a <strong>bisseção</strong>. Umas dez
      divisões levam um passo de 30 metros a poucos centímetros.
    </p>
    <RayMarchFigure
      locale="pt"
      caption="Caminhe o raio e compare alturas a cada passo (ciano). Quando uma amostra fica abaixo do solo (rosa), divida o último passo ao meio até fixar o cruzamento (verde)."
    />

    <h2>Um erro que move o ponto 200 metros</h2>
    <p>
      Existe um erro neste processo que pode mover seu ponto{" "}
      <strong>200 metros</strong>. E não é um bug. Todos os dados podem estar
      quase certos e mesmo assim acontece.
    </p>
    <RayOpenLoopFigure
      locale="pt"
      caption="Mesmo drone, mesma pessoa, quase os mesmos dados. O ponto cai 200 m mais longe."
    />
    <p>Guarde isso. Antes, uma armadilha mais comum.</p>

    <h2>Problema 1: pular uma crista</h2>
    <p>
      Caminhar o raio com passos grandes é rápido. Também é o jeito de perder
      coisas. Uma crista fina, um muro ou a borda de um barranco cabem
      inteiros entre duas amostras. As duas dizem “acima do solo”, e o raio
      atravessa a crista sem vê-la. Você ainda obtém um cruzamento, só que no
      vale errado.
    </p>
    <p>
      A solução é parar de escolher um tamanho de passo. Percorra a malha{" "}
      <strong>célula por célula</strong>, visitando em ordem cada célula por
      onde o raio passa. Esse percurso se chama <strong>DDA</strong>, o mesmo
      truque que os primeiros jogos 3D usavam para lançar raios sobre um mapa
      de blocos. Nenhuma célula é pulada, então nenhuma crista pode se
      esconder.
    </p>
    <RayRidgeFigure
      locale="pt"
      caption="Em cima: com passos grandes, todas as amostras ficam acima do solo e a crista nunca aparece. Embaixo: visitando cada célula, a crista é encontrada."
    />

    <h2>Os 200 metros: é o ângulo</h2>
    <p>
      Agora o número prometido. Ele não tem nada a ver com o terreno. Tem a ver
      com o quão inclinado o raio está.
    </p>
    <p>
      Coloque o drone a <PostMath math="h = 200" /> m sobre solo plano. Um raio
      que olha para baixo com um ângulo <PostMath math={String.raw`\theta`} />{" "}
      abaixo do horizonte toca o solo a uma distância
    </p>
    <PostMath display math={DISTANCE} />
    <p>
      Olhando <strong>45°</strong> para baixo, o ponto está a 200 m. Se o seu
      ângulo tiver um grau de erro, 44°, ele cai a 207 m. Sete metros de erro.
      Chato, mas aceitável.
    </p>
    <p>
      Agora olhe quase para o horizonte: <strong>8°</strong> para baixo. O
      ponto está a 1.423 m. Um grau de erro, 7°, e ele cai a 1.629 m. O mesmo
      grau de erro. <strong>206 metros</strong> de diferença.
    </p>
    <RayGrazingFigure
      locale="pt"
      caption="Arraste o ângulo. O raio amarelo é a medição; o raio rosa tracejado é a mesma medição com um grau a menos."
    />
    <p>
      Perto do horizonte o raio raspa o solo, então uma rotação mínima desliza
      o ponto para muito longe. Um grau não é muito quando você soma o sensor
      de orientação, o gimbal e o tempo. Por isso um bom sistema{" "}
      <strong>rejeita raios rasantes</strong>: abaixo de certo ângulo, a
      resposta é sensível demais para confiar.
    </p>

    <h2>Não um ponto: uma região</h2>
    <p>
      Isso leva à resposta honesta. Cada dado traz um pequeno erro: a posição
      do GPS, os ângulos, o horário da foto contra o do GPS, o pixel exato. Em
      vez de fingir que são zero, você lança centenas de raios, cada um com um
      pequeno empurrão aleatório nesses dados, e olha onde eles caem.
    </p>
    <p>
      Os cruzamentos formam uma nuvem, esticada na direção para onde a câmera
      olha, porque é ali que o erro de ângulo vira distância. Desenhe a elipse
      que contém 95% deles e você tem o resultado real: a pessoa está aqui
      dentro, com 95% de confiança.
    </p>
    <RayRegionFigure
      locale="pt"
      caption="Centenas de raios, cada um com pequenos erros de GPS, ângulos, tempo e pixel. Onde eles caem forma a elipse de 95%."
    />
    <p>
      Um ponto no mapa parece preciso. Uma elipse é precisa sobre o quanto é
      imprecisa. Essa é a resposta melhor.
    </p>

    <h2>Sua vez</h2>
    <p>
      O que mais te surpreendeu, a crista escondida ou o grau? E o que eu
      explico depois: por que a altura do seu GPS não é acima do nível do mar,
      ou por que sua bússola não aponta para o norte?
    </p>
    <p>
      Também em <Link href="/en/writing/why-ray-to-terrain-is-hard">inglês</Link>{" "}
      e <Link href="/es/escritura/why-ray-to-terrain-is-hard">espanhol</Link>.
    </p>
  </>
);

const meta = { slug: "why-ray-to-terrain-is-hard", date: "2026-11-05" };

export const post: Record<Locale, Post> = {
  en: {
    ...meta,
    title: "From Pixel to Map: Why Casting a Ray to the Terrain Is So Hard",
    description:
      "A drone sees a person. Finding where they stand on the map sounds like one line of geometry. It isn’t, and one degree can cost you 200 metres.",
    tags: ["geometry", "drones", "computer vision"],
    keywords: ["ray casting", "terrain", "DEM", "DDA", "geolocation", "drone"],
    body: bodyEn,
  },
  es: {
    ...meta,
    title: "Del píxel al mapa: por qué proyectar un rayo al terreno es tan difícil",
    description:
      "Un dron ve a una persona. Saber dónde está en el mapa parece una línea de geometría. No lo es, y un grado te puede costar 200 metros.",
    tags: ["geometría", "drones", "visión por computador"],
    keywords: ["trazado de rayos", "terreno", "modelo de elevación", "DDA", "geolocalización", "dron"],
    body: bodyEs,
  },
  pt: {
    ...meta,
    title: "Do pixel ao mapa: por que projetar um raio até o terreno é tão difícil",
    description:
      "Um drone vê uma pessoa. Saber onde ela está no mapa parece uma linha de geometria. Não é, e um grau pode custar 200 metros.",
    tags: ["geometria", "drones", "visão computacional"],
    keywords: ["traçado de raios", "terreno", "modelo de elevação", "DDA", "geolocalização", "drone"],
    body: bodyPt,
  },
};
