// app/layout.tsx
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { redirect } from "next/navigation";
import { defaultLocale } from "@/lib/i18n/config";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Paradise Deluxe Apartments",
  description: "Your perfect escape where luxury meets comfort.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  redirect(`/${defaultLocale}`);

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
