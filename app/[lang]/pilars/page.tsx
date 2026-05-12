import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/app/dictionaries";
import { RevealObserver } from "@/app/components/home/RevealObserver";
import { PilarsHeader } from "@/app/components/pilars/PilarsHeader";
import { PilarsAccordion } from "@/app/components/pilars/PilarsAccordion";
import { PilarsCta } from "@/app/components/pilars/PilarsCta";
import { PilarsDecorations } from "@/app/components/pilars/PilarsDecorations";
import { DecoElements } from "@/app/components/plans/DecoElements";

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale, "pilars");
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default async function PilarsPage({ params }: PageParams) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale, "pilars");

  return (
    <>
      <RevealObserver />
      <main className="pt-32 pb-32 relative overflow-hidden">
        <PilarsDecorations />
        <DecoElements />
        <PilarsHeader dict={dict} />
        <PilarsAccordion principles={dict.principles} />
        <PilarsCta cta={dict.cta} separator={dict.separator} />
      </main>
    </>
  );
}
