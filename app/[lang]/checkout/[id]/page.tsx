import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/app/dictionaries";
import { getPlan } from "@/lib/api/plans";
import { CheckoutLayout } from "@/app/components/checkout/CheckoutLayout";
import { createClient } from "@/lib/supabase/server";

type PageProps = {
  params: Promise<{ lang: string; id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale, "checkout");
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default async function CheckoutPage({ params }: PageProps) {
  const { lang, id } = await params;

  if (!hasLocale(lang)) notFound();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect(`/${lang}/login`);

  const [dict, plan] = await Promise.all([
    getDictionary(lang as Locale, "checkout"),
    getPlan(id).catch(() => null),
  ]);

  if (!plan) notFound();

  const clientId = process.env.PAYPAL_CLIENT_ID ?? "";

  return (
    <section className="pt-32 pb-32 min-h-screen">
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />
      <CheckoutLayout lang={lang} dict={dict} plan={plan} userId={user.id} clientId={clientId} />
    </section>
  );
}
