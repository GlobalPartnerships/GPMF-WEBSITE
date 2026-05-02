import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "./dictionaries";

type PageParams = { params: Promise<{ lang: string }> };

export default async function HomePage({ params }: PageParams) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
      <h1 className="text-4xl font-semibold tracking-tight text-foreground">
        {dict.hero.headline}
      </h1>
      <p className="mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
        {dict.hero.subheadline}
      </p>
      <a
        href="#contact"
        className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-background transition-colors hover:bg-zinc-700 dark:hover:bg-zinc-300"
      >
        {dict.hero.cta}
      </a>
    </main>
  );
}
