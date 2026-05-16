import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/app/dictionaries";
import { RevealObserver } from "@/app/components/home/RevealObserver";
import { ServicesHero } from "@/app/components/services/ServicesHero";
import { Section1 } from "@/app/components/services/sections/Section1";
import { Section2 } from "@/app/components/services/sections/Section2";
import styles from "./page.module.css";
import { Section3 } from "@/app/components/services/sections/Section3";

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale, "services");
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default async function ServicesPage({ params }: PageParams) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale, "services");

  return (
    <>
      <RevealObserver />
      <ServicesHero dict={dict.hero} />
      <Section1 bagroundColor={styles.section1Background}/>
      <Section2 bagroundColor={styles.section2Background} />
      <Section3 bagroundColor={styles.section3Background} />
    </>
  );
}
