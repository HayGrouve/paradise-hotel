// app/[locale]/rooms/page.tsx
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/config";
import Link from "next/link";
import RoomCard from "../../../components/rooms/RoomCard";

interface RoomsPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function RoomsPage(props: RoomsPageProps) {
  const params = await props.params;

  const { locale } = params;

  const t = dictionary[locale];

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow bg-[#CEAA87] py-16">
        <div className="container mx-auto px-4">
          <h1 className="mb-16 text-center font-serif text-4xl">
            {t.ourRooms}
          </h1>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <RoomCard
              locale={locale}
              title={t.deluxeRoom}
              image="/images/deluxe-room.webp"
              type="deluxe"
              description={t.deluxeRoomDescription}
              viewMoreText={t.viewMore}
              imageHeightClass="h-80"
            />
            <RoomCard
              locale={locale}
              title={t.standardRoom}
              image="/images/standard-room.webp"
              type="standard"
              description={t.standardRoomDescription}
              viewMoreText={t.viewMore}
              imageHeightClass="h-80"
            />
            <RoomCard
              locale={locale}
              title={t.budgetRoom}
              image="/images/budget-room.webp"
              type="budget"
              description={t.budgetRoomDescription}
              viewMoreText={t.viewMore}
            />
            <RoomCard
              locale={locale}
              title={t.businessRoom}
              image="/images/business-room.webp"
              type="business"
              description={t.businessRoomDescription}
              viewMoreText={t.viewMore}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
