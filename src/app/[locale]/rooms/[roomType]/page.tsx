// app/[locale]/rooms/[roomType]/page.tsx
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/config";
import Link from "next/link";
import RoomCard from "../../../../components/rooms/RoomCard";
import ProductImages from "../../../../components/rooms/ProductImages";

interface RoomPageProps {
  params: Promise<{
    locale: Locale;
    roomType: string;
  }>;
}

// Room data
const roomData = {
  deluxe: {
    title: {
      en: "Deluxe Room",
      bg: "Делукс стая",
    },
    area: 30,
    description: {
      en: "With an area of 30 sq. m. and located on the high floor, this room offers all the necessary amenities for two or three people. It has one bedroom and a sofa bed. Pets up to 5 kg. are welcome, and there is no additional charge.",
      bg: "С площ от 30 кв. м. и разположена на висок етаж, тази стая предлага всички необходими удобства за двама или трима души. Има една спалня и разтегателен диван. Домашни любимци до 5 кг. са добре дошли, без допълнително заплащане.",
    },
    features: {
      en: [
        "Located on a high floor with large French windows and a beautiful view",
        "One bedroom and a sofa bed",
        "Nespresso coffee machine",
        "Safe in the room",
        '55" TV with interactive hotel TV system',
        "Air conditioning with individual temperature control",
      ],
      bg: [
        "Разположена на висок етаж с големи френски прозорци и красива гледка",
        "Една спалня и разтегателен диван",
        "Кафе машина Nespresso",
        "Сейф в стаята",
        '55" телевизор с интерактивна хотелска ТВ система',
        "Климатик с индивидуален контрол на температурата",
      ],
    },
    images: [
      "/images/deluxe-room.webp",
      "/images/deluxe-room-2.webp",
      "/images/deluxe-room-3.webp",
      "/images/deluxe-room-4.webp",
    ],
  },
  standard: {
    title: {
      en: "Standard Room",
      bg: "Стандартна стая",
    },
    area: 25,
    description: {
      en: "Our standard room offers comfort and convenience with an area of 25 sq. m. Perfect for couples or solo travelers looking for quality accommodation.",
      bg: "Нашата стандартна стая предлага комфорт и удобство с площ от 25 кв. м. Перфектна за двойки или самостоятелни пътешественици, търсещи качествено настаняване.",
    },
    features: {
      en: [
        "Queen-size bed",
        "En-suite bathroom with shower",
        "Flat-screen TV",
        "Mini fridge",
        "Air conditioning",
        "Free Wi-Fi",
      ],
      bg: [
        "Легло тип Queen-size",
        "Самостоятелна баня с душ",
        "Плосък телевизор",
        "Мини хладилник",
        "Климатик",
        "Безплатен Wi-Fi",
      ],
    },
    images: [
      "/images/standard-room.webp",
      "/images/standard-room-2.webp",
      "/images/standard-room-3.webp",
      "/images/standard-room-4.webp",
    ],
  },
  budget: {
    title: {
      en: "Budget Room",
      bg: "Бюджетна стая",
    },
    area: 20,
    description: {
      en: "Our budget room is designed for travelers who want comfort at an affordable price. With an area of 20 sq. m., it provides all essential amenities.",
      bg: "Нашата бюджетна стая е проектирана за пътешественици, които искат комфорт на достъпна цена. С площ от 20 кв. м., тя предоставя всички основни удобства.",
    },
    features: {
      en: [
        "Twin beds or one double bed",
        "Private bathroom",
        "TV",
        "Air conditioning",
        "Free Wi-Fi",
        "Daily housekeeping",
      ],
      bg: [
        "Две единични легла или едно двойно легло",
        "Самостоятелна баня",
        "Телевизор",
        "Климатик",
        "Безплатен Wi-Fi",
        "Ежедневно почистване",
      ],
    },
    images: [
      "/images/budget-room.webp",
      "/images/budget-room-2.webp",
      "/images/budget-room-3.webp",
      "/images/budget-room-4.webp",
    ],
  },
  business: {
    title: {
      en: "Business Room",
      bg: "Бизнес стая",
    },
    area: 35,
    description: {
      en: "Our business room is tailored for the modern professional. With 35 sq. m. of space, it includes a dedicated work area and premium amenities.",
      bg: "Нашата бизнес стая е съобразена със съвременния професионалист. С площ от 35 кв. м., тя включва специално работно пространство и премиум удобства.",
    },
    features: {
      en: [
        "King-size bed",
        "Ergonomic work desk and chair",
        "High-speed internet",
        "Coffee and tea making facilities",
        "Large bathroom with bathtub and shower",
        "Smart TV with streaming capabilities",
        "Room service available",
      ],
      bg: [
        "Легло тип King-size",
        "Ергономично работно бюро и стол",
        "Високоскоростен интернет",
        "Съоръжения за приготвяне на кафе и чай",
        "Голяма баня с вана и душ",
        "Smart TV с възможности за стрийминг",
        "Наличен рум сервиз",
      ],
    },
    images: [
      "/images/business-room.webp",
      "/images/business-room-2.webp",
      "/images/business-room-3.webp",
      "/images/business-room-4.webp",
    ],
  },
};

export default async function RoomPage(props: RoomPageProps) {
  const params = await props.params;
  const { locale, roomType } = params;
  const t = dictionary[locale];
  const room = roomData[roomType as keyof typeof roomData];
  if (!room) {
    return <div>Room not found</div>;
  }
  return (
    <div className="flex min-h-screen flex-col bg-[#cbb293]">
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center">
            <div className="flex w-full flex-col items-center gap-8 md:flex-row md:items-start md:gap-12">
              <div className="w-full md:w-1/2">
                <ProductImages
                  images={room.images.map((url) => ({ url }))}
                  productName={room.title[locale]}
                />
              </div>
              <div className="flex w-full flex-col items-center md:w-1/2 md:items-start">
                <h1 className="mb-4 text-center font-serif text-2xl font-semibold tracking-wider text-[#f5f5f5] uppercase text-shadow-lg md:text-left md:text-3xl">
                  {room.title[locale]}
                </h1>
                <div
                  className="mb-4 w-full text-center text-base font-light text-[#f5f5f5] text-shadow-lg md:text-left"
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
                >
                  {room.description[locale]}
                </div>
                <hr className="mb-4 w-full border-t border-[#f5f5f5] opacity-50" />
                <ul className="list-disc space-y-2 pl-4 text-sm text-[#f5f5f5] text-shadow-lg">
                  {room.features[locale].map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Divider for other rooms */}
            <hr className="my-8 w-full max-w-4xl border-t border-[#f5f5f5] opacity-50" />
            <h2 className="mb-8 text-center text-lg font-semibold tracking-widest text-[#f5f5f5] uppercase text-shadow-lg">
              {t.otherRooms}
            </h2>
            <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
              {Object.entries(roomData)
                .filter(([key]) => key !== roomType)
                .map(([key, data]) => (
                  <div key={key} className="flex flex-col items-center">
                    <RoomCard
                      className="text-center"
                      locale={locale}
                      title={data.title[locale]}
                      image={data.images[0]!}
                      type={key}
                      imageHeightClass="h-48"
                      imageOnly={true}
                    />
                    <span className="mt-4 text-center text-xl font-semibold tracking-wide text-[#f5f5f5] uppercase text-shadow-lg">
                      {data.title[locale]}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
