// app/[locale]/rooms/page.tsx
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/config";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

interface RoomsPageProps {
  params: {
    locale: Locale;
  };
}

export default function RoomsPage({ params: { locale } }: RoomsPageProps) {
  const t = dictionary[locale];

  return (
    <div className="flex min-h-screen flex-col">
      <Header locale={locale} />

      <main className="flex-grow bg-amber-50 py-16">
        <div className="container mx-auto px-4">
          <h1 className="mb-16 text-center font-serif text-4xl">
            {t.ourRooms}
          </h1>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <RoomCard
              locale={locale}
              title={t.deluxeRoom}
              image="/images/deluxe-room.jpg"
              type="deluxe"
              description="With an area of 30 sq. m. and located on the high floor, this room offers all the necessary amenities for two or three people."
              viewMore={t.viewMore}
            />
            <RoomCard
              locale={locale}
              title={t.standardRoom}
              image="/images/standard-room.jpg"
              type="standard"
              description="Comfortable and well-appointed, our standard rooms provide everything you need for a pleasant stay."
              viewMore={t.viewMore}
            />
            <RoomCard
              locale={locale}
              title={t.budgetRoom}
              image="/images/budget-room.jpg"
              type="budget"
              description="Affordable without compromising on quality, our budget rooms are perfect for the cost-conscious traveler."
              viewMore={t.viewMore}
            />
            <RoomCard
              locale={locale}
              title={t.businessRoom}
              image="/images/business-room.jpg"
              type="business"
              description="Designed with the business traveler in mind, featuring a work desk and high-speed internet."
              viewMore={t.viewMore}
            />
          </div>
        </div>
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
  description: string;
  viewMore: string;
}

function RoomCard({
  locale,
  title,
  image,
  type,
  description,
  viewMore,
}: RoomCardProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-lg">
      <img src={image} alt={title} className="h-80 w-full object-cover" />
      <div className="p-8">
        <h2 className="mb-4 text-2xl font-medium">{title}</h2>
        <p className="mb-6 text-gray-600">{description}</p>
        <Link
          href={`/${locale}/rooms/${type}`}
          className="inline-block rounded-md bg-amber-600 px-6 py-2 text-white transition-colors hover:bg-amber-700"
        >
          {viewMore}
        </Link>
      </div>
    </div>
  );
}
