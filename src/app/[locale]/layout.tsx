// app/[locale]/layout.tsx
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import type { Locale } from "@/lib/i18n/config";
import { locales } from "@/lib/i18n/config";
import { notFound } from "next/navigation";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;

  const { locale } = params;

  const { children } = props;

  // Validate that the locale is supported
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <Header locale={locale as Locale} />
        {children}
        <Footer locale={locale as Locale} />
      </body>
    </html>
  );
}
