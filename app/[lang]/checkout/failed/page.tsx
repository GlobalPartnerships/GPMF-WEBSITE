import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDictionary, hasLocale, type Locale } from "@/app/dictionaries";
import { RevealObserver } from "@/app/components/home/RevealObserver";
import { DecoElements } from "@/app/components/plans/DecoElements";
import { SideText } from "@/app/components/plans/SideText";

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale, "checkoutResult");
  return {
    title: dict.failed.meta.title,
    description: dict.failed.meta.description,
  };
}

export default async function CheckoutFailedPage({ params }: PageParams) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale, "checkoutResult");
  const t = dict.failed;

  return (
    <>
      <RevealObserver />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />
      <section className="pt-32 pb-32 min-h-screen relative overflow-hidden flex items-center">
        <SideText line1={t.sideText.line1} line2={t.sideText.line2} />
        <DecoElements />

        <div className="max-w-xl mx-auto px-6 text-center reveal">
          <div className="mb-8 flex justify-center">
            <span
              className="material-symbols-outlined text-red-600"
              style={{ fontSize: 72 }}
            >
              error
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
            {t.errorTitle}
          </h1>
          <p className="text-foreground/70 text-sm max-w-md mx-auto">
            {t.errorMessage}
          </p>

          <div className="mt-10 flex justify-center">
            <Link
              href={`/${lang}/plans`}
              className="btn-sweep bg-burgundy text-white py-4 px-8 text-[12px] uppercase tracking-[0.22em] rounded-[2px] text-center"
            >
              <span>{t.backToPlans}</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
