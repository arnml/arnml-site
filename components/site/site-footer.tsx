import Link from "next/link";
import { sectionPath, type Locale } from "@/lib/site/locales";

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="site-shell site-footer">
      <div className="site-footer-row">
        <p>© {new Date().getFullYear()} Arnold Moya</p>
        <div className="site-mono">EN · ES · PT</div>
        <div>
          <Link href={sectionPath(locale, "about")}>About</Link> <span>·</span>{" "}
          <Link href={sectionPath(locale, "contact")}>Contact</Link>
        </div>
      </div>
    </footer>
  );
}
