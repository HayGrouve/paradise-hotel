// app/[locale]/contact/page.tsx
import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/config";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Update the props type to match Next.js expectations
export default function ContactPage({
  params,
}: {
  params: { locale: Locale };
}) {
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

                <div className="mt-8">
                  <h3 className="mb-4 text-xl font-medium">{t.sendMessage}</h3>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="mb-1 block">
                        {t.name}
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full rounded-md border px-4 py-2"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1 block">
                        {t.email}
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full rounded-md border px-4 py-2"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="mb-1 block">
                        {t.message}
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full rounded-md border px-4 py-2"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="rounded-md bg-amber-600 px-6 py-2 text-white transition-colors hover:bg-amber-700"
                    >
                      {t.send}
                    </button>
                  </form>
                </div>
              </div>

              <div className="md:w-1/2">
                <div className="h-96 overflow-hidden rounded-lg bg-gray-200">
                  {/* Replace with actual Google Maps embed */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.67890!2d24.123456!3d40.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDA3JzM0LjQiTiAyNMKwMDcnMzQuNCJF!5e0!3m2!1sen!2sbg!4v1234567890!5m2!1sen!2sbg"
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
