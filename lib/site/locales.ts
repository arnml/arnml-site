export const locales = ["en", "es", "pt"] as const;

export type Locale = (typeof locales)[number];

export type PublicSection =
  | "about"
  | "work"
  | "consulting"
  | "contact"
  | "writing";

export const sectionSlugs: Record<Locale, Record<PublicSection, string>> = {
  en: {
    about: "about",
    work: "work",
    consulting: "consulting",
    contact: "contact",
    writing: "writing",
  },
  es: {
    about: "sobre",
    work: "trabajo",
    consulting: "consultoria",
    contact: "contacto",
    writing: "escritura",
  },
  pt: {
    about: "sobre",
    work: "trabalho",
    consulting: "consultoria",
    contact: "contato",
    writing: "escrita",
  },
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localeLabel(locale: Locale) {
  return { en: "English", es: "Español", pt: "Português" }[locale];
}

export function localePath(locale: Locale, path = "") {
  return `/${locale}${path ? `/${path.replace(/^\//, "")}` : ""}`;
}

export function sectionPath(
  locale: Locale,
  section: PublicSection,
  suffix = "",
) {
  return localePath(
    locale,
    `/${sectionSlugs[locale][section]}${suffix ? `/${suffix.replace(/^\//, "")}` : ""}`,
  );
}

export function sectionForPath(
  locale: Locale,
  path: string,
): PublicSection | null {
  const entry = Object.entries(sectionSlugs[locale]).find(
    ([, slug]) => slug === path,
  );
  return (entry?.[0] as PublicSection | undefined) ?? null;
}
