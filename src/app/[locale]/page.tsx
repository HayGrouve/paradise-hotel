// app/[locale]/page.tsx
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/config";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

interface HomePageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function HomePage(props: HomePageProps) {
  const params = await props.params;

  const { locale } = params;

  const t = dictionary[locale];

  return (
    <div className="flex min-h-screen flex-col">
      <Header locale={locale} />

      <main className="flex-grow tracking-wide">
        {/* Hero Section */}
        <section className="relative h-screen">
          <img
            src="/images/hero.webp"
            alt="Paradise Deluxe Apartments"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 mt-[-200px] flex flex-col items-center justify-center bg-black/30 px-4 text-center text-white">
            <div className="flex max-w-3xl flex-col items-center justify-center">
              {/* add the logo */}
              <img
                src="/images/logo.svg"
                alt="Paradise Deluxe Apartments Logo"
                className="h-[40rem] max-w-full object-contain"
              />
              <h1 className="mb-6 font-serif text-5xl">Paradise</h1>
              <p className="mb-8 text-xl">{t.welcomeDescription}</p>
              <Link
                href={`/${locale}/rooms`}
                className="inline-block rounded-[20px] bg-gradient-to-r from-[#0D1321] via-[#124559] to-[#598392] px-8 py-3 text-center text-white transition-all duration-300 ease-in-out hover:brightness-110 focus:ring-2 focus:ring-[#598392] focus:ring-offset-2 focus:outline-none"
              >
                {t.viewRooms}
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="relative flex h-dvh flex-col items-center justify-center bg-[url('/images/about-us-lobby.webp')] bg-cover bg-center bg-no-repeat py-20 text-xl text-white">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs"></div>
          {/* Adjust opacity (e.g., /90) and blur as needed */}
          {/* Content Container - Needs relative positioning */}
          <div className="relative container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              {/* Optional: Adjust text color if needed for contrast */}
              <h2 className="mb-6 font-serif text-5xl">{t.aboutUs}</h2>
              <p className="mb-8">{t.aboutDescription}</p>
              <p className="">{t.aboutDescription2}</p>
            </div>
          </div>
        </section>

        {/* Room Preview Section */}
        <section className="h-dvh bg-[#CEAA87] py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center font-serif text-5xl">
              {t.ourRooms}
            </h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {/* Room Cards */}
              <RoomCard
                locale={locale}
                title={t.deluxeRoom}
                image="/images/deluxe-room.jpg"
                type="deluxe"
                viewMore={t.viewMore}
              />
              <RoomCard
                locale={locale}
                title={t.standardRoom}
                image="/images/standard-room.jpg"
                type="standard"
                viewMore={t.viewMore}
              />
              <RoomCard
                locale={locale}
                title={t.budgetRoom}
                image="/images/budget-room.jpg"
                type="budget"
                viewMore={t.viewMore}
              />
              <RoomCard
                locale={locale}
                title={t.businessRoom}
                image="/images/business-room.jpg"
                type="business"
                viewMore={t.viewMore}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}

interface RoomCardProps {
  locale: Locale;
  title: string;
  image: string;
  type: string;
  viewMore: string;
}

function RoomCard({ locale, title, image, type, viewMore }: RoomCardProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md">
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
    </div>
  );
}
