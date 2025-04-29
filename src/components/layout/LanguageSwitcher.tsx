// components/layout/LanguageSwitcher.tsx
"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { locales } from "@/lib/i18n/config";

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export default function LanguageSwitcher({
  currentLocale,
}: LanguageSwitcherProps) {
  const pathname = usePathname();

  // Remove the current locale from the pathname
  const pathnameWithoutLocale = pathname.replace(`/${currentLocale}`, "");

  return (
    <div className="flex items-center gap-2">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={`/${locale}${pathnameWithoutLocale}`}
          className={`rounded px-2 py-1 ${
            currentLocale === locale
              ? "bg-[#CEAA87] font-medium text-stone-800"
              : "text-white hover:bg-stone-600"
          }`}
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
