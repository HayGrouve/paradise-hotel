// app/[locale]/page.tsx
"use client";

import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/config";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { use } from "react"; // Import the 'use' hook

// Define animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Update Props type to reflect the Promise nature of params from the server
type HomePageProps = {
  params: Promise<{
    // params is a Promise
    locale: Locale;
  }>;
};

export default function HomePage(props: HomePageProps) {
  // Unwrap the params Promise using React.use()
  const params = use(props.params); // <-- Use the hook here
  const { locale } = params; // Now you can safely access locale
  const t = dictionary[locale];

  return (
    <div className="flex min-h-screen flex-col">
      <Header locale={locale} />

      <main className="flex-grow tracking-wide">
        {/* --- Hero Section --- */}
        <motion.section
          className="relative flex h-screen flex-col items-center justify-center"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <img
            src="/images/hero.webp"
            alt="Paradise Deluxe Apartments"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center text-white">
            <motion.div
              className="flex max-w-3xl flex-col items-center justify-center"
              variants={staggerContainer}
            >
              <motion.img
                src="/images/logo.svg"
                alt="Paradise Deluxe Apartments Logo"
                className="mb-4 h-40 max-w-full object-contain"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                viewport={{ once: true, amount: 0.5 }}
              />
              <motion.p
                className="mb-8 text-xl"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                viewport={{ once: true, amount: 0.5 }}
              >
                {t.welcomeDescription}
              </motion.p>
              <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                viewport={{ once: true, amount: 0.5 }}
              >
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
        <motion.section
          className="relative flex h-dvh flex-col items-center justify-center bg-[url('/images/about-us-lobby.webp')] bg-cover bg-center bg-no-repeat py-20 text-xl text-white"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs"></div>
          <div className="relative z-10 container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <motion.h2
                className="mb-6 font-serif text-5xl"
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
        <motion.section
          className="flex h-dvh flex-col justify-center bg-[#CEAA87] py-20"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          <div className="container mx-auto px-4">
            <motion.h2
              className="mb-12 text-center font-serif text-5xl"
              variants={fadeInUp}
            >
              {t.ourRooms}
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 gap-8 md:grid-cols-2"
              variants={staggerContainer}
            >
              <RoomCard
                locale={locale}
                title={t.deluxeRoom}
                image="/images/deluxe-room.webp"
                type="deluxe"
                viewMore={t.viewMore}
              />
              <RoomCard
                locale={locale}
                title={t.standardRoom}
                image="/images/standard-room.webp"
                type="standard"
                viewMore={t.viewMore}
              />
              <RoomCard
                locale={locale}
                title={t.budgetRoom}
                image="/images/budget-room.webp"
                type="budget"
                viewMore={t.viewMore}
              />
              <RoomCard
                locale={locale}
                title={t.businessRoom}
                image="/images/business-room.webp"
                type="business"
                viewMore={t.viewMore}
              />
            </motion.div>
          </div>
        </motion.section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}

// --- RoomCard component remains the same ---
interface RoomCardProps {
  locale: Locale;
  title: string;
  image: string;
  type: string;
  viewMore: string;
}

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function RoomCard({ locale, title, image, type, viewMore }: RoomCardProps) {
  return (
    <motion.div
      className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md"
      variants={cardVariants}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
    >
      <img src={image} alt={title} className="h-64 w-full object-cover" />
      <div className="p-6">
        <h3 className="mb-2 text-xl font-medium">{title}</h3>
        <Link
          href={`/${locale}/rooms/${type}`}
          className="mt-4 inline-block text-amber-600 hover:text-amber-800"
        >
          {viewMore}
        </Link>
      </div>
    </motion.div>
  );
}
