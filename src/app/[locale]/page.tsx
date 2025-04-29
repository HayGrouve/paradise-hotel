// app/[locale]/page.tsx
"use client"; // Keep as Client Component for Framer Motion

import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/config";
import Link from "next/link";
import { motion } from "framer-motion"; // Only need motion now
import { use } from "react"; // Keep use hook

// --- Animation Variants ---
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
  // Exit animations are less relevant without section snapping, but can be kept
  exit: { opacity: 0, y: -15, transition: { duration: 0.3, ease: "easeIn" } },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15, // Stagger delay between children
    },
  },
};

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: "easeIn" } }, // Optional exit animation
};
// --- ---

// Props type reflecting the Promise nature of params
type HomePageProps = {
  params: Promise<{
    locale: Locale;
  }>;
};

// No longer need NUM_SECTIONS or scroll-related state/refs
export default function HomePage(props: HomePageProps) {
  // Unwrap the params Promise using React.use()
  const params = use(props.params);
  const { locale } = params;
  const t = dictionary[locale];

  // Removed the useEffect for wheel handling and related state/refs

  return (
    <div className="flex min-h-screen flex-col">
      {/* Main container - Remove ref, h-screen, overflow-hidden */}
      {/* Let the browser handle scrolling */}
      <main className="flex-grow tracking-wide">
        {/* --- Hero Section --- */}
        {/* Keep h-screen for the hero to fill the initial viewport */}
        <motion.section
          className="relative flex h-screen flex-col items-center justify-start"
          initial="initial"
          whileInView="animate" // Trigger animation when section is in view
          viewport={{ once: false, amount: 0.4 }} // Re-animate every time, trigger at 40% visibility
          variants={staggerContainer} // Apply stagger effect to children
          // exit="exit" // Uncomment if you have defined exit variants and want exit animations
        >
          <img
            src="/images/hero.webp"
            alt="Paradise Deluxe Apartments"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs"></div>{" "}
          {/* Overlay */}
          <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center text-white">
            <motion.div
              className="flex max-w-3xl flex-col items-center justify-center"
              variants={staggerContainer} // Inner stagger container
            >
              <motion.img
                src="/images/logo.svg"
                alt="Paradise Deluxe Apartments Logo"
                className="mt-20 h-[40rem] max-w-full object-contain"
                variants={fadeInUp} // Apply fade-in-up animation
              />
              <motion.p className="mb-8 text-2xl" variants={fadeInUp}>
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
        {/* Remove h-screen/h-dvh to allow natural height */}
        <motion.section
          className="relative flex h-dvh flex-col items-center justify-center bg-[url('/images/about-us-lobby.webp')] bg-cover bg-center bg-no-repeat py-20 text-xl text-white md:py-32"
          initial="initial"
          whileInView="animate"
          viewport={{ once: false, amount: 0.3 }} // Adjust amount if needed
          variants={staggerContainer}
          // exit="exit"
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs"></div>
          {/* Overlay */}
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
        {/* Remove h-screen/h-dvh to allow natural height */}
        <motion.section
          className="flex h-dvh flex-col justify-center bg-[#CEAA87] py-20 md:py-32" // Added more padding
          initial="initial"
          whileInView="animate"
          viewport={{ once: false, amount: 0.1 }} // Trigger earlier as content might be taller
          variants={staggerContainer}
          // exit="exit"
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
              variants={staggerContainer} // Stagger the cards
            >
              {/* Room Cards will inherit animation trigger from parent section */}
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
    </div>
  );
}

// --- RoomCard component ---
interface RoomCardProps {
  locale: Locale;
  title: string;
  image: string;
  type: string;
  viewMore: string;
}

function RoomCard({ locale, title, image, type, viewMore }: RoomCardProps) {
  return (
    // Apply motion properties directly to the card
    <motion.div
      className="overflow-hidden rounded-lg bg-white shadow-md"
      variants={cardVariants} // Use defined variants for entry/exit
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }} // Hover effect
      // initial, animate, exit are handled by parent's whileInView + stagger
    >
      <Link href={`/${locale}/rooms/${type}`}>
        <img src={image} alt={title} className="h-64 w-full object-cover" />
      </Link>
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
