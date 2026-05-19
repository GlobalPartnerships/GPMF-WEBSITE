import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getDictionary,
  hasLocale,
  locales,
  type Locale,
} from "@/app/dictionaries";
import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";
import { SetHtmlLang } from "@/app/components/layout/SetHtmlLang";
import { createClient } from "@/lib/supabase/server";
import { fetchAppUser } from "@/lib/api/user";
import { UserProvider } from "@/app/context/UserContext";

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

  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const appUser = session ? await fetchAppUser(session) : null;

  return (
    <>
      <SetHtmlLang lang={lang} />
      <UserProvider user={appUser}>
        <Header lang={locale} dict={dict.nav} />
        <main className="flex-1">{children}</main>
        <Footer dict={dict.footer} />
      </UserProvider>
    </>
  );
}
