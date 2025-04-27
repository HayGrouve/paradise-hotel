// components/layout/Header.tsx
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/config";
import LanguageSwitcher from "./LanguageSwitcher";

interface HeaderProps {
  locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
  const t = dictionary[locale];

  return (
    <header className="bg-stone-700 py-4 text-white">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href={`/${locale}`} className="flex items-center">
          <img
            src="/images/logo.png"
            alt="Paradise Deluxe Apartments"
            className="h-12"
          />
        </Link>

        <nav className="flex items-center gap-8">
          <Link
            href={`/${locale}`}
            className="transition-colors hover:text-amber-200"
          >
            {t.home}
          </Link>
          <Link
            href={`/${locale}/rooms`}
            className="transition-colors hover:text-amber-200"
          >
            {t.rooms}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="transition-colors hover:text-amber-200"
          >
            {t.contactUs}
          </Link>
          <LanguageSwitcher currentLocale={locale} />
        </nav>
      </div>
    </header>
  );
}
