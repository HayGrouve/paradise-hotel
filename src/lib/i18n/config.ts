// lib/i18n/config.ts
export const locales = ["en", "bg"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const dictionary = {
  en: {
    home: "Home",
    rooms: "Rooms",
    contactUs: "Contact Us",
    viewRooms: "View Rooms",
    bookNow: "Book now",
    welcome: "Welcome to Paradise Deluxe Apartments",
    welcomeDescription:
      "Your perfect escape where luxury meets comfort. Nestled in the heart of Nea Peramos, we offer a serene retreat with modern amenities, exceptional service, and breathtaking views.",
    aboutUs: "About Us",
    aboutDescription:
      "We pride ourselves on offering a unique blend of modern elegance and warm hospitality. With a passion for creating memorable experiences, we provide our guests with personalized service, luxurious comfort, and attention to detail.",
    aboutDescription2:
      "Whether you're visiting for relaxation or adventure, our dedicated team is here to ensure every moment of your stay is exceptional. Welcome to your home away from home.",
    ourRooms: "Our Rooms",
    viewMore: "View More",
    deluxeRoom: "Deluxe Room",
    standardRoom: "Standard Room",
    budgetRoom: "Budget Room",
    businessRoom: "Business Room",
    location: "Location",
    address: "Address",
    phone: "Phone",
    email: "Email",
    sendMessage: "Send a Message",
    name: "Name",
    message: "Message",
    send: "Send",
    features: "Features",
    morePhotos: "More Photos",
    otherRooms: "Other Rooms",
    booking: "Booking",
    quickLinks: "Quick Links",
    followUs: "Follow Us",
    enjoyComfort:
      "Enjoy the comfort in the stylish and elegant atmosphere and discover your kingdom of tranquility away from the busy daily life",
  },
  bg: {
    home: "Начало",
    rooms: "Стаи",
    contactUs: "Контакти",
    bookNow: "Резервирайте сега",
    viewRooms: "Виж стаите",
    welcome: "Добре дошли в Paradise Deluxe Apartments",
    welcomeDescription:
      "Вашето перфектно бягство, където луксът се среща с комфорта. Разположен в сърцето на Неа Перамос, ние предлагаме спокойно убежище с модерни удобства, изключително обслужване и спиращи дъха гледки.",
    aboutUs: "За нас",
    aboutDescription:
      "Гордеем се с предлагането на уникална комбинация от модерна елегантност и топло гостоприемство. Със страст към създаването на незабравими преживявания, ние предоставяме на нашите гости персонализирано обслужване, луксозен комфорт и внимание към детайла.",
    aboutDescription2:
      "Независимо дали посещавате за релаксация или приключение, нашият отдаден екип е тук, за да гарантира, че всеки момент от престоя ви е изключителен. Добре дошли във вашия дом далеч от дома.",
    ourRooms: "Нашите стаи",
    viewMore: "Вижте повече",
    deluxeRoom: "Делукс стая",
    standardRoom: "Стандартна стая",
    budgetRoom: "Бюджетна стая",
    businessRoom: "Бизнес стая",
    location: "Локация",
    address: "Адрес",
    phone: "Телефон",
    email: "Имейл",
    sendMessage: "Изпратете съобщение",
    name: "Име",
    message: "Съобщение",
    send: "Изпрати",
    features: "Характеристики",
    morePhotos: "Още снимки",
    otherRooms: "Други стаи",
    booking: "Резервация",
    quickLinks: "Бързи връзки",
    followUs: "Последвайте ни",
    enjoyComfort:
      "Насладете се на комфорта в стилна и елегантна атмосфера и открийте вашето царство на спокойствие далеч от натоварения ежедневен живот",
  },
};
