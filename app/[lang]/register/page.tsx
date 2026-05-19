import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/app/dictionaries";
import { ImagePanel } from "@/app/components/login/ImagePanel";
import { RevealObserver } from "@/app/components/home/RevealObserver";
import { RegisterForm } from "@/app/components/register/RegisterForm";

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale, "register");
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default async function RegisterPage({ params }: PageParams) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale, "register");

  return (
    <>
      <RevealObserver />
      <section className="min-h-screen pt-[88px] flex">
        <ImagePanel dict={dict} />

        <div className="w-full lg:w-[54%] flex items-center justify-center px-8 py-16">
          <div className="max-w-[420px] w-full reveal">
            <div className="mb-10">
              <span className="tick text-[11px] tracking-[0.28em] uppercase text-burgundy font-semibold">
                {dict.eyebrow}
              </span>
              <h1 className="font-serif text-[40px] lg:text-[48px] leading-[1.05] tracking-[-0.01em] mt-6 mb-4">
                {dict.headlinePart1}{" "}
                <span className="italic font-medium text-burgundy">{dict.headlineAccent}</span>
              </h1>
              <p className="text-[16px] text-surface-variant leading-relaxed">
                {dict.description}
              </p>
            </div>

            <RegisterForm dict={dict} lang={lang} />
          </div>
        </div>
      </section>
    </>
  );
}
