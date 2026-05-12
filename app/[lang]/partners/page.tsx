import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/app/dictionaries";
import { RevealObserver } from "@/app/components/home/RevealObserver";
import { PartnersHero } from "@/app/components/partners/PartnersHero";
import { ProfessionalsGrid } from "@/app/components/partners/ProfessionalsGrid";
import { CorporatePartners } from "@/app/components/partners/CorporatePartners";
import { PartnersCollaborationCta } from "@/app/components/partners/PartnersCollaborationCta";
import styles from "@/app/components/partners/Partners.module.css";

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale, "partners");
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default async function PartnersPage({ params }: PageParams) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale, "partners");

  return (
    <>
      <RevealObserver />
      <main className={styles.pageMain}>
        <PartnersHero dict={dict.hero} />
        <ProfessionalsGrid dict={dict.professionals} />
        <CorporatePartners dict={dict.corporatePartners} />
        <PartnersCollaborationCta dict={dict.cta} />
      </main>
    </>
  );
}
