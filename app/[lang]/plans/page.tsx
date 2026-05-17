import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/app/dictionaries";
import { getPlans } from "@/lib/api/plans";
import { RevealObserver } from "@/app/components/home/RevealObserver";
import { PlansHeader } from "@/app/components/plans/PlansHeader";
import { PlansGrid } from "@/app/components/plans/PlansGrid";
import { DecoElements } from "@/app/components/plans/DecoElements";
import { SideText } from "@/app/components/plans/SideText";
import type { PlanResponse } from "@/app/components/dashboard/admin/plans/types";

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale, "plans");
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default async function PlansPage({ params }: PageParams) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const [dict, plans] = await Promise.all([
    getDictionary(lang as Locale, "plans"),
    getPlans().catch((): PlanResponse[] => []),
  ]);

  const standardPlans = plans.filter((p) => p.category === "standard");
  const customPlans = plans.filter((p) => p.category === "custom");

  return (
    <>
      <RevealObserver />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />
      <section className="pt-32 pb-32 relative overflow-hidden">
        <SideText line1={dict.sideText.line1} line2={dict.sideText.line2} />
        <DecoElements />

        <PlansHeader
          eyebrow={dict.eyebrow}
          headlinePart1={dict.headlinePart1}
          headlineAccent={dict.headlineAccent}
          subtitle={dict.subtitle}
        />

        <PlansGrid
          dict={dict}
          standardPlans={standardPlans}
          customPlans={customPlans}
          lang={lang}
        />
      </section>
    </>
  );
}
