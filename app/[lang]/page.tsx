import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/app/dictionaries";
import { HeroSection } from "@/app/components/home/HeroSection";
import { TrustedByMarquee } from "@/app/components/home/TrustedByMarquee";
import { PrinciplesSection } from "@/app/components/home/PrinciplesSection";
import { MethodologySection } from "@/app/components/home/MethodologySection";
import { CaseStudiesSection } from "@/app/components/home/CaseStudiesSection";
import { TeamSection } from "@/app/components/home/TeamSection";
import { LegacyCtaSection } from "@/app/components/home/LegacyCtaSection";
import { RevealObserver } from "@/app/components/home/RevealObserver";

type PageParams = { params: Promise<{ lang: string }> };

export default async function HomePage({ params }: PageParams) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale, "home");

  return (
    <>
      <RevealObserver />
      <HeroSection dict={dict.hero} lang={lang} />
      <TrustedByMarquee dict={dict.trustedBy} />
      <PrinciplesSection dict={dict.principles} />
      <MethodologySection dict={dict.methodology} />
      <CaseStudiesSection dict={dict.caseStudies} />
      <TeamSection dict={dict.team} lang={lang} />
      <LegacyCtaSection dict={dict.legacy} />
    </>
  );
}
