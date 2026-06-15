export interface Task {
  id: string
  title: string
  detail: string
  impact: 'Alto' | 'Medio' | 'Bajo'
  metric?: string
}

export interface Category {
  id: 'wp' | 'speed' | 'gsc' | 'ga'
  label: string
  short: string
}

export interface Month {
  n: number
  label: string
  title: string
  period: string
  locked: boolean
  summary: string
  objective: string
  tasks: Record<string, Task[]>
}

export const CATEGORIES: Category[] = [
  { id: 'wp', label: 'Técnico WordPress', short: 'WordPress' },
  { id: 'speed', label: 'Velocidad Móvil', short: 'Velocidad' },
  { id: 'gsc', label: 'Search Console', short: 'GSC' },
]

export const MONTHS: Month[] = [
  {
    n: 1,
    label: 'Mes 1',
    title: 'Cimientos técnicos',
    period: 'Mayo 2026',
    locked: false,
    summary:
      'Limpiamos la base del sitio: schema, indexación, headings, performance móvil y medición. Sin cimientos sólidos, ninguna estrategia de contenido funciona.',
    objective:
      'Pasar el sitio de un estado "con fugas" a uno medible y rastreable correctamente por Google.',
    tasks: {
      wp: [
        {
          id: 'wp-schema',
          title: 'Corregir horarios en schema markup',
          detail:
            'Actualmente el schema declara 1 AM – 4 AM, lo que confunde a Google sobre cuándo está abierto el restaurante. Vamos a sustituirlo por los horarios reales (13:00–16:00 / 20:00–23:30).',
          impact: 'Alto',
        },
        {
          id: 'wp-noindex-backup',
          title: 'Añadir noindex a /mayurabox-backup/ + 301 a /mayurabox-3/',
          detail:
            'La URL antigua de MayuraBox sigue siendo indexable y compite con la página oficial. La marcamos como noindex y redirigimos todo su tráfico a /mayurabox-3/.',
          impact: 'Alto',
        },
        {
          id: 'wp-noindex-thanks',
          title: 'Añadir noindex a /gracias/, /en/thankyou/, /mayurabox-3-success/',
          detail:
            'Las páginas de "gracias" aparecen en Google y diluyen autoridad. Se les añade <meta name="robots" content="noindex">.',
          impact: 'Medio',
        },
        {
          id: 'wp-noindex-blog2',
          title: 'Añadir noindex a /blog-2/ + 301 a /blog-3/',
          detail:
            'Existen dos blogs duplicados. Consolidamos todo en /blog-3/ y redirigimos /blog-2/ con 301 para no perder enlaces existentes.',
          impact: 'Alto',
        },
        {
          id: 'wp-sitemap-exclude',
          title: 'Excluir del sitemap: team-category, testimonials-category, author',
          detail:
            'En Yoast/Rank Math marcamos esas taxonomías como noindex y las quitamos del sitemap. Son páginas vacías que Google rastrea sin razón.',
          impact: 'Medio',
        },
        {
          id: 'wp-title-contacto',
          title: 'Corregir title tag de /contacto/',
          detail:
            'Actualmente dice "carta mayura". Lo cambiamos por "Contacto · Mayura Restaurante Indio en Barcelona y Madrid".',
          impact: 'Alto',
        },
        {
          id: 'wp-hreflang',
          title: 'Corregir hreflang ES/EN',
          detail:
            'PageSpeed marca los hreflang como inválidos: faltan referencias recíprocas y el código de idioma no es correcto. Lo arreglamos para que ES y EN se reconozcan como variantes.',
          impact: 'Alto',
        },
        {
          id: 'wp-headings',
          title: 'Corregir orden de headings H1 → H2 → H3',
          detail:
            'Varias páginas tienen H3 antes de H2 o múltiples H1. Reordenamos la jerarquía para que sea semánticamente correcta.',
          impact: 'Medio',
        },
        {
          id: 'wp-anchor-text',
          title: 'Corregir links sin texto descriptivo',
          detail:
            'Sustituimos "click aquí" por enlaces descriptivos ("Ver carta", "Reservar mesa") y añadimos aria-label a iconos sin etiqueta.',
          impact: 'Medio',
        },
        {
          id: 'wp-contrast',
          title: 'Corregir contraste de colores insuficiente',
          detail:
            'Algunas secciones no cumplen WCAG AA (ratio < 4.5:1). Ajustamos los colores de texto sobre fondo claro para que cumplan accesibilidad.',
          impact: 'Medio',
        },
      ],
      speed: [
        {
          id: 'sp-cache',
          title: 'Instalar WP Rocket o LiteSpeed Cache',
          detail:
            'Resuelve render-blocking, minifica y combina recursos. Es el cambio individual con mayor impacto en Performance móvil.',
          impact: 'Alto',
          metric: 'Render-blocking',
        },
        {
          id: 'sp-lazy',
          title: 'Revisar configuración',
          detail:
            'Hoy solo está activo en home. Lo extendemos a carta, blog y delivery, excluyendo solo el LCP de cada plantilla.',
          impact: 'Medio',
        },
      ],
      gsc: [
        {
          id: 'gsc-sitemap',
          title: 'Verificar sitemap enviado y sin errores',
          detail:
            'Confirmamos que /sitemap_index.xml está enviado en Search Console y que no hay URLs con error.',
          impact: 'Alto',
        },
        {
          id: 'gsc-coverage',
          title: 'Revisar errores de cobertura',
          detail:
            'Listamos páginas excluidas o con 404 y decidimos: redirigir, recuperar o dejar como están.',
          impact: 'Alto',
        },
        {
          id: 'gsc-keywords',
          title: 'Identificar las 10 keywords con más impresiones',
          detail:
            'Exportamos las consultas de los últimos 90 días y priorizamos optimizar las páginas que ya están rankeando entre la posición 5–15 (la fruta más madura).',
          impact: 'Alto',
        },
        {
          id: 'gsc-penalties',
          title: 'Revisar penalizaciones manuales',
          detail:
            'Revisamos la sección "Acciones manuales" y "Problemas de seguridad" en GSC. Esperamos que esté limpia, pero hay que confirmarlo.',
          impact: 'Bajo',
        },
      ],
    },
  },
  {
    n: 2,
    label: 'Mes 2',
    title: 'Plugins y optimización técnica',
    period: 'Junio 2026',
    locked: false,
    summary:
      'Actualizamos y configuramos correctamente los plugins clave del sitio: Elementor, WP Rocket, WPCode, Complianz y Restaurant Menu. Cerramos pendientes técnicos y de compliance.',
    objective:
      'Asegurar que todos los plugins están actualizados, configurados correctamente y sin conflictos entre sí.',
    tasks: {
      wp: [
        {
          id: 'wp2-complianz-setup',
          title: 'Complianz: actualizar y llenar campos faltantes',
          detail:
            'Completar el asistente de Complianz con los datos faltantes: información de contacto, tipo de datos tratados, base legal y DPA. Sin esta información el plugin no genera el aviso legal correcto.',
          impact: 'Alto',
        },
        {
          id: 'wp2-complianz-banner',
          title: 'Complianz: actualizar banner de cookies y consentimiento',
          detail:
            'Revisar y actualizar el diseño y el texto del banner de cookies y del banner de consentimiento según los requisitos del RGPD aplicables en España.',
          impact: 'Alto',
        },
        {
          id: 'wp2-fragmentos',
          title: 'Fragmentos: limpiar cabecera por conflicto de horario',
          detail:
            'Un snippet activo en la cabecera entra en conflicto con otro sistema de gestión de horarios del sitio. Identificar y desactivar el fragmento que genera el conflicto.',
          impact: 'Medio',
        },
        {
          id: 'wp2-wpcode-update',
          title: 'WPCode: actualizar plugin',
          detail:
            'Actualizar WPCode a la última versión para asegurar compatibilidad con WordPress y corregir posibles vulnerabilidades.',
          impact: 'Medio',
        },
        {
          id: 'wp2-wpcode-schedule',
          title: 'WPCode: actualización de horario de apertura',
          detail:
            'Corregir el snippet de horario de apertura gestionado desde WPCode. Actualmente declara 1 AM – 4 AM; debe reflejar los horarios reales: 13:00–16:00 / 20:00–23:30.',
          impact: 'Alto',
        },
        {
          id: 'wp2-restaurant-menu',
          title: 'Restaurant Menu: actualizar plugin',
          detail:
            'Actualizar el plugin Restaurant Menu a la última versión para asegurar compatibilidad con la versión actual de WordPress y Elementor.',
          impact: 'Medio',
        },
        {
          id: 'wp2-llm-txt',
          title: 'Yoast: añadir llm.txt',
          detail:
            'Crear el archivo llm.txt en la raíz del sitio para declarar permisos de rastreo a los crawlers de inteligencia artificial (ChatGPT, Claude, Gemini, Perplexity). Definir qué secciones pueden indexar y cuáles no.',
          impact: 'Bajo',
        },
      ],
      speed: [
        {
          id: 'sp2-elementor-images',
          title: 'Elementor: carga de imágenes optimizada',
          detail:
            'Activar la opción de carga de imágenes optimizada en el panel de rendimiento de Elementor para aplicar lazy loading nativo y tamaños responsive automáticamente.',
          impact: 'Alto',
        },
        {
          id: 'sp2-elementor-css-method',
          title: 'Elementor: configurar método de impresión de CSS',
          detail:
            'Cambiar el método de impresión de CSS de Elementor a "externo" para que los estilos se carguen como archivo separado y puedan ser cacheados por el navegador.',
          impact: 'Medio',
        },
        {
          id: 'sp2-elementor-gutenberg',
          title: 'Elementor: carga optimizada de Gutenberg',
          detail:
            'Activar la opción "Carga optimizada de Gutenberg" en Ajustes → Elementor → Características para evitar que Gutenberg cargue sus scripts y estilos en páginas construidas con Elementor.',
          impact: 'Medio',
        },
        {
          id: 'sp2-elementor-cache',
          title: 'Elementor: activar caché de elementos',
          detail:
            'Activar la caché de widgets en el panel de rendimiento de Elementor para reducir el tiempo de renderizado en visitas recurrentes.',
          impact: 'Medio',
        },
        {
          id: 'sp2-elementor-compress',
          title: 'Elementor: comprimir archivos',
          detail:
            'Activar la compresión de archivos en el panel de rendimiento de Elementor para minificar HTML, CSS y JS generados por el builder.',
          impact: 'Medio',
        },
        {
          id: 'sp2-wprocket-cache',
          title: 'WP Rocket: actualización de caché',
          detail:
            'Vaciar y regenerar la caché de WP Rocket tras aplicar todos los cambios del mes. Verificar que las reglas de exclusión no afectan páginas críticas como checkout o área de reservas.',
          impact: 'Alto',
        },
      ],
    },
  },
  {
    n: 3,
    label: 'Mes 3',
    title: 'Contenido y autoridad local',
    period: 'Julio 2026',
    locked: true,
    summary:
      'Calendario editorial enfocado en búsquedas locales ("mejor restaurante indio Barcelona", "restaurante indio Madrid delivery") y fichas de Google Business Profile.',
    objective: 'Empezar a captar tráfico de descubrimiento y reforzar la presencia local.',
    tasks: {},
  },
  {
    n: 4,
    label: 'Mes 4',
    title: 'Link building y reseñas',
    period: 'Agosto 2026',
    locked: true,
    summary:
      'Estrategia de menciones en medios gastronómicos locales y campaña sistemática para invitar a clientes satisfechos a dejar reseña en Google.',
    objective: 'Aumentar autoridad de dominio y volumen de reseñas activas.',
    tasks: {},
  },
  {
    n: 5,
    label: 'Mes 5',
    title: 'Conversión y experiencia',
    period: 'Septiembre 2026',
    locked: true,
    summary:
      'Auditoría de UX en móvil, A/B test del flujo de reserva y mejora de las páginas de delivery para convertir más visitas en pedidos.',
    objective: 'Subir el ratio visita → reserva / pedido.',
    tasks: {},
  },
  {
    n: 6,
    label: 'Mes 6',
    title: 'Consolidación y reporting',
    period: 'Octubre 2026',
    locked: true,
    summary:
      'Revisión de los 6 meses, comparativa de keywords y tráfico, y propuesta de roadmap para el siguiente trimestre.',
    objective: 'Cerrar el ciclo con resultados medibles y un plan claro hacia adelante.',
    tasks: {},
  },
]
