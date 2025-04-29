// app/[locale]/contact/page.tsx
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/config";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Update the props type to match Next.js expectations
export default async function ContactPage(props: {
  params: Promise<{ locale: Locale }>;
}) {
  const params = await props.params;
  const locale = params.locale;
  const t = dictionary[locale];

  return (
    <div className="flex min-h-screen flex-col">
      <Header locale={locale} />

      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="relative h-96">
          <img
            src="/images/nea-peramos.jpg"
            alt="Nea Peramos, Kavala"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <h1 className="font-serif text-4xl text-white">{t.contactUs}</h1>
          </div>
        </div>

        {/* Contact Information */}
        <section className="bg-amber-100 py-16">
          <div className="container mx-auto px-4">
            <div className="md:flex">
              <div className="mb-8 md:mb-0 md:w-1/2 md:pr-8">
                <h2 className="mb-6 font-serif text-2xl">{t.contactUs}</h2>
                <div className="space-y-4">
                  <p>
                    <strong>{t.location}:</strong> Nea Peramos, Kavala
                  </p>
                  <p>
                    <strong>{t.address}:</strong>{" "}
                    .................................
                  </p>
                  <p>
                    <strong>{t.phone}:</strong> +359 XX XXX XXXX
                  </p>
                  <p>
                    <strong>{t.email}:</strong> paradiseapartments@gmail.com
                  </p>
                </div>
              </div>

              <div className="md:w-1/2">
                <div className="h-96 overflow-hidden rounded-lg bg-gray-200">
                  {/* Replace with actual Google Maps embed */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6036.9834744160025!2d24.29250215022347!3d40.83912640239889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14aeb7d96262bd5b%3A0x69035280ab1081f6!2sNea%20Peramos%20640%2007%2C%20Greece!5e0!3m2!1sen!2sbg!4v1745933055166!5m2!1sen!2sbg"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
