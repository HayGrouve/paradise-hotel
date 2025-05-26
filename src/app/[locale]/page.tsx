// app/[locale]/page.tsx
"use client";

import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/config";
import Link from "next/link";
import { motion } from "framer-motion";
import { use } from "react";
import RoomCard from "@/components/rooms/RoomCard";
import Image from "next/image";

// --- Animation Variants ---
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -15, transition: { duration: 0.3, ease: "easeIn" } },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};
// --- ---

type HomePageProps = {
  params: Promise<{
    locale: Locale;
  }>;
};

export default function HomePage(props: HomePageProps) {
  const params = use(props.params);
  const { locale } = params;
  const t = dictionary[locale];

  return (
    <main className="flex-grow tracking-wide">
      {/* --- Hero Section --- */}
      <motion.section
        className="relative flex h-screen flex-col items-center justify-start pt-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.4 }}
        variants={staggerContainer}
      >
        <Image
          src="/images/hero.webp"
          alt="Paradise Deluxe Apartments"
          fill
          className="absolute inset-0 h-full w-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-xs"></div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <motion.div
            className="flex max-w-3xl flex-col items-center justify-center"
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="mb-4 w-3/4 max-w-md md:w-1/2"
            >
              <Image
                src="/images/logo.svg"
                alt="Paradise Deluxe Apartments Logo"
                width={400}
                height={200}
                className="object-contain"
                priority
              />
            </motion.div>
            <motion.p className="mb-8 text-xl md:text-2xl" variants={fadeInUp}>
              {t.welcomeDescription}
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link
                href={`/${locale}/rooms`}
                className="inline-block rounded-[20px] bg-gradient-to-r from-[#0D1321] via-[#124559] to-[#598392] px-8 py-3 text-center text-white transition-all duration-300 ease-in-out hover:brightness-110 focus:ring-2 focus:ring-[#598392] focus:ring-offset-2 focus:outline-none"
              >
                {t.viewRooms}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* --- About Section --- */}
      {/* Keep h-screen for this section */}
      <motion.section
        className="relative flex h-screen flex-col items-center justify-center bg-[url('/images/about-us-lobby.webp')] bg-cover bg-center bg-no-repeat py-20 text-xl text-white"
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-xs"></div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h2
              className="mb-6 font-serif text-4xl md:text-5xl"
              variants={fadeInUp}
            >
              {t.aboutUs}
            </motion.h2>
            <motion.p className="mb-8" variants={fadeInUp}>
              {t.aboutDescription}
            </motion.p>
            <motion.p variants={fadeInUp}>{t.aboutDescription2}</motion.p>
          </div>
        </div>
      </motion.section>

      {/* --- Room Preview Section --- */}
      {/* Use md:h-screen to apply height only on medium screens and up */}
      {/* Use md:flex md:flex-col md:justify-center for desktop centering */}
      <motion.section
        className="bg-[#CEAA87] py-20 md:flex md:h-screen md:flex-col md:justify-center md:py-0" // Apply h-screen and flex centering only on md+
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.1 }}
        variants={staggerContainer}
      >
        {/* Remove height/overflow constraints from container */}
        <div className="container mx-auto px-4">
          <motion.h2
            className="mb-12 text-center font-serif text-4xl md:text-5xl"
            variants={fadeInUp}
          >
            {t.ourRooms}
          </motion.h2>
          {/* Grid layout remains the same, stacking naturally on mobile */}
          <motion.div
            className="grid grid-cols-1 gap-8 md:grid-cols-2"
            variants={staggerContainer}
          >
            <RoomCard
              locale={locale}
              title={t.deluxeRoom}
              image="/images/deluxe-room.webp"
              type="deluxe"
              viewMoreText={t.viewMore}
              imageHeightClass="h-64"
            />
            <RoomCard
              locale={locale}
              title={t.standardRoom}
              image="/images/standard-room.webp"
              type="standard"
              viewMoreText={t.viewMore}
              imageHeightClass="h-64"
            />
            <RoomCard
              locale={locale}
              title={t.budgetRoom}
              image="/images/budget-room.webp"
              type="budget"
              viewMoreText={t.viewMore}
              imageHeightClass="h-64"
            />
            <RoomCard
              locale={locale}
              title={t.businessRoom}
              image="/images/business-room.webp"
              type="business"
              viewMoreText={t.viewMore}
              imageHeightClass="h-64"
            />
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
