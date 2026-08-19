import Link from "next/link";
import { localePath, type Locale } from "@/lib/site/locales";

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="site-shell site-footer">
      <div className="site-footer-row">
        <p>© {new Date().getFullYear()} Arnold Moya</p>
        <div className="site-mono">EN · ES · PT</div>
        <div>
          <Link href={localePath(locale, "/about")}>About</Link> <span>·</span>{" "}
          <Link href={localePath(locale, "/contact")}>Contact</Link>
        </div>
      </div>
    </footer>
  );
}
