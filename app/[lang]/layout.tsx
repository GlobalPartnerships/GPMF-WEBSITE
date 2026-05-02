import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { getDictionary, hasLocale, locales, type Locale } from "./dictionaries";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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

  const dict = await getDictionary(lang as Locale);

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

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
