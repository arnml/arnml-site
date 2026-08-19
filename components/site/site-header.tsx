import Link from "next/link";
import { localeLabel, localePath, type Locale } from "@/lib/site/locales";
import { siteCopy } from "@/lib/site/content";

export function SiteHeader({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale].nav;
  const links = [
    [copy.writing, "/writing"],
    [copy.work, "/work"],
    [copy.about, "/about"],
    [copy.consulting, "/consulting"],
    [copy.contact, "/contact"],
  ] as const;
  return (
    <header className="site-shell">
      <nav className="site-nav" aria-label="Primary navigation">
        <Link href={localePath(locale)} className="site-brand">
          Arnold Moya
        </Link>
        <div className="site-nav-right">
          {links.map(([label, path], index) => (
            <Link
              key={path}
              className={index === 3 ? "site-keep" : undefined}
              href={localePath(locale, path)}
            >
              {label}
            </Link>
          ))}
          <div className="site-langs" aria-label="Language switcher">
            {(["en", "es", "pt"] as const).map((item) => (
              <Link
                key={item}
                href={localePath(item)}
                title={localeLabel(item)}
                aria-current={item === locale ? "page" : undefined}
                className={item === locale ? "active" : undefined}
              >
                {item.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
