import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/app/dictionaries";
import { RevealObserver } from "@/app/components/home/RevealObserver";
import { DiagnosisHero } from "@/app/components/diagnosis/organisms/DiagnosisHero";
import { DiagnosisForm } from "@/app/components/diagnosis/organisms/DiagnosisForm";
import { DiagnosisCta } from "@/app/components/diagnosis/organisms/DiagnosisCta";

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale, "diagnosis");
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default async function DiagnosisPage({ params }: PageParams) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale, "diagnosis");

  return (
    <>
      <RevealObserver />
      <DiagnosisHero dict={dict.hero} />
      <DiagnosisForm dict={dict.form} success={dict.success} />
      <DiagnosisCta dict={dict.cta} />
    </>
  );
}
