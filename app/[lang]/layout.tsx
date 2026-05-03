import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import {
  getDictionary,
  hasLocale,
  locales,
  type Locale,
} from "@/app/dictionaries";
import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

type LangParams = { params: Promise<{ lang: string }> };

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LangParams): Promise<Metadata> {
  const { lang } = await params;

  if (!hasLocale(lang)) return {};

  const dict = await getDictionary(lang as Locale, "layout");

  const alternateLanguages = Object.fromEntries(
    locales.map((l) => [l, `/${l}`])
  );

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      languages: alternateLanguages,
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: LangParams & { children: React.ReactNode }) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale, "layout");

  return (
    <html
      lang={lang}
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans antialiased">
        <Header lang={locale} dict={dict.nav} />
        <main className="flex-1">{children}</main>
        <Footer dict={dict.footer} />
      </body>
    </html>
  );
}
