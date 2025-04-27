// app/layout.tsx
import { Inter } from "next/font/google";
import "@/styles/globals.css";
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
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
