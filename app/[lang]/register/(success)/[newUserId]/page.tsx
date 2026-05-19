import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDictionary, hasLocale, type Locale } from "@/app/dictionaries";
import { RevealObserver } from "@/app/components/home/RevealObserver";
import { DecoElements } from "@/app/components/plans/DecoElements";
import { createClient } from "@/lib/supabase/server";
import { fetchAppUser } from "@/lib/api/user";

type PageParams = {
  params: Promise<{ lang: string; newUserId: string }>;
};

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale, "register");
  return {
    title: dict.successMeta.title,
    description: dict.successMeta.description,
  };
}

export default async function RegisterSuccessPage({ params }: PageParams) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const [dict, supabase] = await Promise.all([
    getDictionary(lang as Locale, "register"),
    createClient(),
  ]);

  const { data: { session } } = await supabase.auth.getSession();
  const user = session ? await fetchAppUser(session) : null;

  return (
    <>
      <RevealObserver />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />
      <section className="pt-32 pb-32 min-h-screen relative overflow-hidden flex items-center">
        <DecoElements />

        <div className="max-w-xl mx-auto px-6 text-center reveal">
          <div className="mb-8 flex justify-center">
            <span
              className="material-symbols-outlined text-burgundy"
              style={{ fontSize: 72 }}
            >
              check_circle
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
            {dict.successTitle}
            {user?.name ? `, ${user.name}` : ""}
          </h1>

          <p className="mt-4 text-base text-foreground/70 max-w-md mx-auto leading-relaxed">
            {dict.successSubtitle}
          </p>

          <div className="mt-10 flex justify-center">
            <Link
              href={`/${lang}/user`}
              className="btn-sweep bg-burgundy text-white py-4 px-8 text-[12px] uppercase tracking-[0.22em] rounded-[2px] text-center"
            >
              <span>{dict.successCta}</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
