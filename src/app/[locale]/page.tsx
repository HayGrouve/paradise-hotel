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

  const {
    locale
  } = params;

  const t = dictionary[locale];

  return (
    <div className="flex min-h-screen flex-col">
      <Header locale={locale} />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-screen">
          <img
            src="/images/hero-bg.jpg"
            alt="Paradise Deluxe Apartments"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 px-4 text-center text-white">
            <div className="max-w-3xl">
              <h1 className="mb-6 font-serif text-5xl">Paradise</h1>
              <p className="mb-8 text-xl">{t.welcomeDescription}</p>
              <Link
                href={`/${locale}/rooms`}
                className="rounded-md bg-amber-600 px-8 py-3 text-white transition-colors hover:bg-amber-700"
              >
                {t.bookNow}
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="bg-stone-100 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 font-serif text-3xl">{t.aboutUs}</h2>
              <p className="mb-8 text-gray-700">{t.aboutDescription}</p>
              <p className="text-gray-700">{t.aboutDescription2}</p>
            </div>
          </div>
        </section>

        {/* Room Preview Section */}
        <section className="bg-amber-50 py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center font-serif text-3xl">
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
