import type { Locale } from "./locales";

export const siteCopy: Record<
  Locale,
  {
    nav: {
      writing: string;
      work: string;
      about: string;
      consulting: string;
      contact: string;
    };
    home: {
      eyebrow: string;
      title: string;
      intro: string;
      heroNote: string;
      primary: string;
      secondary: string;
      selected: string;
      services: string;
      principles: string;
      contactTitle: string;
      contactText: string;
    };
    about: {
      title: string;
      intro: string;
      sections: { title: string; body: string }[];
    };
    work: {
      title: string;
      intro: string;
      items: { title: string; body: string }[];
    };
    consulting: {
      title: string;
      intro: string;
      items: { title: string; body: string }[];
    };
    contact: {
      title: string;
      intro: string;
      email: string;
      prompt: string;
      name: string;
      phone: string;
      message: string;
      submit: string;
      success: string;
      error: string;
    };
  }
> = {
  en: {
    nav: {
      writing: "Writing",
      work: "Work",
      about: "About",
      consulting: "Consulting",
      contact: "Contact",
    },
    home: {
      eyebrow: "Software architecture · AI · technical strategy",
      title: "I solve difficult technology problems.",
      intro:
        "I build software, study systems, and help founders and teams make better technical decisions when the obvious answer is incomplete.",
      heroNote:
        "Use AI where probabilistic behavior creates leverage. Use deterministic systems where certainty is the feature.",
      primary: "Read my writing",
      secondary: "Work with me",
      selected: "Selected thinking",
      services: "What I work on",
      principles: "Principles",
      contactTitle: "Have a difficult technical problem?",
      contactText: "I take on selected advisory and technical engagements.",
    },
    about: {
      title: "Build pragmatically. Understand deeply.",
      intro:
        "I am Arnold Moya. I work across architecture, AI, performance, automation, and the operational details that decide whether software survives contact with reality.",
      sections: [
        {
          title: "How I think",
          body: "Shipping speed, quality, performance, security, simplicity, and business value are not independent virtues. Good engineering is the tradeoff that fits the problem.",
        },
        {
          title: "AI changed the workflow, not the fundamentals",
          body: "AI makes research, prototyping, and automation faster. It also makes judgment, validation, architecture, and human accountability more important.",
        },
        {
          title: "Why this site exists",
          body: "This is where I publish what I learn, test ideas in public, and build a long-term body of technical work worth discovering years from now.",
        },
      ],
    },
    work: {
      title: "Evidence over technology lists.",
      intro:
        "Case studies will focus on the problem, constraints, decision, result, and tradeoffs—not on a logo wall.",
      items: [
        {
          title: "Architecture & technical strategy",
          body: "System design, modernization, scaling decisions, and architecture rescue.",
        },
        {
          title: "AI & automation",
          body: "Workflow analysis, AI system design, retrieval, agents, and deterministic automation.",
        },
        {
          title: "Performance & reliability",
          body: "Measurement-led investigations into latency, cost, bottlenecks, and failure paths.",
        },
      ],
    },
    consulting: {
      title: "Difficult technical problems rarely fit inside one job title.",
      intro:
        "I work with selected founders and companies when they need an independent technical perspective and hands-on reasoning.",
      items: [
        {
          title: "Architecture review",
          body: "A clear view of risks, options, boundaries, and the simplest system that meets the real requirements.",
        },
        {
          title: "AI adoption",
          body: "Find where probabilistic systems create leverage—and where deterministic behavior is the feature.",
        },
        {
          title: "Technical advisory",
          body: "Second opinions, technical diligence, modernization strategy, and complex technical decisions.",
        },
      ],
    },
    contact: {
      title: "Start with the problem.",
      intro:
        "Tell me what is difficult, uncertain, expensive, or not working. High-signal conversations are welcome.",
      email: "dev.arn.ml@gmail.com",
      prompt: "Send a technical problem",
      name: "Name",
      phone: "Contact number",
      message: "What are you trying to solve?",
      submit: "Send message",
      success: "Message sent. I will get back to you soon.",
      error: "The message could not be sent. Please try again later.",
    },
  },
  es: {
    nav: {
      writing: "Escritura",
      work: "Trabajo",
      about: "Sobre mí",
      consulting: "Consultoría",
      contact: "Contacto",
    },
    home: {
      eyebrow: "Arquitectura de software · IA · estrategia técnica",
      title: "Resuelvo problemas tecnológicos difíciles.",
      intro:
        "Construyo software, estudio sistemas y ayudo a fundadores y equipos a tomar mejores decisiones técnicas cuando la respuesta obvia no alcanza.",
      heroNote:
        "Usa IA donde el comportamiento probabilístico genere ventaja. Usa sistemas deterministas donde la certeza sea la característica.",
      primary: "Leer lo que escribo",
      secondary: "Trabajar conmigo",
      selected: "Ideas seleccionadas",
      services: "En qué trabajo",
      principles: "Principios",
      contactTitle: "¿Tienes un problema técnico difícil?",
      contactText:
        "Acepto proyectos seleccionados de asesoría y trabajo técnico.",
    },
    about: {
      title: "Construir con pragmatismo. Entender a fondo.",
      intro:
        "Soy Arnold Moya. Trabajo entre arquitectura, IA, rendimiento, automatización y los detalles operativos que determinan si el software funciona en el mundo real.",
      sections: [
        {
          title: "Cómo pienso",
          body: "La velocidad, la calidad, el rendimiento, la seguridad, la simplicidad y el valor de negocio no son virtudes independientes. La buena ingeniería elige el equilibrio adecuado para cada problema.",
        },
        {
          title: "La IA cambió el flujo, no los fundamentos",
          body: "La IA acelera la investigación, los prototipos y la automatización. También vuelve más importantes el criterio, la validación, la arquitectura y la responsabilidad humana.",
        },
        {
          title: "Por qué existe este sitio",
          body: "Aquí publico lo que aprendo, pruebo ideas en público y construyo un cuerpo de trabajo técnico que siga siendo útil con el paso de los años.",
        },
      ],
    },
    work: {
      title: "Evidencia antes que listas de tecnologías.",
      intro:
        "Los casos se centrarán en el problema, las restricciones, la decisión, el resultado y los tradeoffs.",
      items: [
        {
          title: "Arquitectura y estrategia técnica",
          body: "Diseño de sistemas, modernización, escalabilidad y rescate de arquitecturas.",
        },
        {
          title: "IA y automatización",
          body: "Análisis de procesos, diseño de sistemas de IA, retrieval, agentes y automatización determinista.",
        },
        {
          title: "Rendimiento y fiabilidad",
          body: "Investigaciones guiadas por mediciones sobre latencia, costes, cuellos de botella y fallos.",
        },
      ],
    },
    consulting: {
      title:
        "Los problemas técnicos difíciles rara vez caben en un solo cargo.",
      intro:
        "Trabajo con empresas y fundadores seleccionados cuando necesitan una perspectiva técnica independiente y razonamiento práctico.",
      items: [
        {
          title: "Revisión de arquitectura",
          body: "Riesgos, opciones, límites y el sistema más simple que cumpla los requisitos reales.",
        },
        {
          title: "Adopción de IA",
          body: "Encontrar dónde los sistemas probabilísticos generan ventaja y dónde la certeza es la característica.",
        },
        {
          title: "Asesoría técnica",
          body: "Segundas opiniones, due diligence, modernización y decisiones técnicas complejas.",
        },
      ],
    },
    contact: {
      title: "Empecemos por el problema.",
      intro: "Cuéntame qué es difícil, incierto, caro o no está funcionando.",
      email: "dev.arn.ml@gmail.com",
      prompt: "Enviar un problema técnico",
      name: "Nombre",
      phone: "Número de contacto",
      message: "¿Qué estás intentando resolver?",
      submit: "Enviar mensaje",
      success: "Mensaje enviado. Te responderé pronto.",
      error: "No se pudo enviar el mensaje. Inténtalo más tarde.",
    },
  },
  pt: {
    nav: {
      writing: "Textos",
      work: "Trabalho",
      about: "Sobre",
      consulting: "Consultoria",
      contact: "Contato",
    },
    home: {
      eyebrow: "Arquitetura de software · IA · estratégia técnica",
      title: "Resolvo problemas tecnológicos difíceis.",
      intro:
        "Construo software, estudo sistemas e ajudo fundadores e equipes a tomar decisões técnicas melhores quando a resposta óbvia não é suficiente.",
      heroNote:
        "Use IA onde o comportamento probabilístico cria alavancagem. Use sistemas determinísticos onde a certeza é o diferencial.",
      primary: "Ler meus textos",
      secondary: "Trabalhar comigo",
      selected: "Ideias selecionadas",
      services: "No que trabalho",
      principles: "Princípios",
      contactTitle: "Você tem um problema técnico difícil?",
      contactText:
        "Aceito projetos selecionados de assessoria e trabalho técnico.",
    },
    about: {
      title: "Construir com pragmatismo. Entender profundamente.",
      intro:
        "Sou Arnold Moya. Trabalho entre arquitetura, IA, performance, automação e os detalhes operacionais que determinam se um software funciona no mundo real.",
      sections: [
        {
          title: "Como penso",
          body: "Velocidade, qualidade, performance, segurança, simplicidade e valor de negócio não são virtudes independentes. Boa engenharia é escolher o equilíbrio certo para cada problema.",
        },
        {
          title: "A IA mudou o fluxo, não os fundamentos",
          body: "A IA acelera pesquisa, prototipação e automação. Isso também torna julgamento, validação, arquitetura e responsabilidade humana mais importantes.",
        },
        {
          title: "Por que este site existe",
          body: "Aqui publico o que aprendo, testo ideias em público e construo um corpo de trabalho técnico que continue valioso com o tempo.",
        },
      ],
    },
    work: {
      title: "Evidência antes de listas de tecnologias.",
      intro:
        "Os estudos vão se concentrar no problema, nas restrições, na decisão, no resultado e nos tradeoffs.",
      items: [
        {
          title: "Arquitetura e estratégia técnica",
          body: "Design de sistemas, modernização, escalabilidade e recuperação de arquiteturas.",
        },
        {
          title: "IA e automação",
          body: "Análise de processos, design de sistemas de IA, retrieval, agentes e automação determinística.",
        },
        {
          title: "Performance e confiabilidade",
          body: "Investigações orientadas por métricas sobre latência, custo, gargalos e falhas.",
        },
      ],
    },
    consulting: {
      title: "Problemas técnicos difíceis raramente cabem em um único cargo.",
      intro:
        "Trabalho com fundadores e empresas selecionados quando precisam de uma perspectiva técnica independente e raciocínio prático.",
      items: [
        {
          title: "Revisão de arquitetura",
          body: "Riscos, opções, limites e o sistema mais simples que atende aos requisitos reais.",
        },
        {
          title: "Adoção de IA",
          body: "Encontrar onde sistemas probabilísticos geram alavancagem e onde a certeza é o diferencial.",
        },
        {
          title: "Assessoria técnica",
          body: "Segundas opiniões, due diligence, modernização e decisões técnicas complexas.",
        },
      ],
    },
    contact: {
      title: "Comece pelo problema.",
      intro: "Conte o que é difícil, incerto, caro ou não está funcionando.",
      email: "dev.arn.ml@gmail.com",
      prompt: "Enviar um problema técnico",
      name: "Nome",
      phone: "Número de contato",
      message: "O que você está tentando resolver?",
      submit: "Enviar mensagem",
      success: "Mensagem enviada. Responderei em breve.",
      error: "Não foi possível enviar a mensagem. Tente novamente mais tarde.",
    },
  },
};

export const principles = {
  en: [
    "Ship fast, but understand the risk.",
    "Simplicity is a feature.",
    "Measure before optimizing.",
    "AI is leverage, not authority.",
    "Failure paths matter.",
  ],
  es: [
    "Envía rápido, pero entiende el riesgo.",
    "La simplicidad es una característica.",
    "Mide antes de optimizar.",
    "La IA es una palanca, no una autoridad.",
    "Los caminos de fallo importan.",
  ],
  pt: [
    "Entregue rápido, mas entenda o risco.",
    "Simplicidade é uma funcionalidade.",
    "Meça antes de otimizar.",
    "IA é alavanca, não autoridade.",
    "Os caminhos de falha importam.",
  ],
} satisfies Record<Locale, string[]>;
