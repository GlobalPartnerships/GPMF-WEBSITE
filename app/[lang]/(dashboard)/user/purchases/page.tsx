import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/app/dictionaries";
import { createClient } from "@/lib/supabase/server";
import { fetchAppUser } from "@/lib/api/user";
import { getPurchasedPlansByUser } from "@/lib/api/purchased-plans";
import { Sidebar } from "@/app/components/dashboard/user/Sidebar";
import { PurchasesGrid } from "@/app/components/dashboard/user/purchases/PurchasesGrid";

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale, "dashboard");
  return {
    title: dict.purchasesMeta.title,
    description: dict.purchasesMeta.description,
  };
}

export default async function UserPurchasesPage({ params }: PageParams) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect(`/${lang}/login`);

  const user = await fetchAppUser(session);
  if (!user) redirect(`/${lang}/login`);
  if (user.role === "admin" || user.role === "moderator") redirect(`/${lang}/admin`);

  const dict = await getDictionary(lang as Locale, "dashboard");
  const headers = { Authorization: `Bearer ${session.access_token}` };

  const [purchasesRes] = await Promise.allSettled([
    getPurchasedPlansByUser(user.id, headers),
  ]);
  const purchases = purchasesRes.status === "fulfilled" ? purchasesRes.value : [];

  return (
    <div className="min-h-screen pt-[88px] flex bg-background">
      <Sidebar dict={dict} lang={lang} />

      <main className="flex-1 px-6 py-8 md:px-10 md:py-10">
        <div className="mb-8">
          <h1 className="font-serif text-[28px] text-foreground">
            {dict.purchasesTitle}
          </h1>
          <p className="text-[13px] text-surface-variant mt-1">
            {dict.purchasesSubtitle}
          </p>
        </div>

        <PurchasesGrid purchases={purchases} dict={dict} />
      </main>
    </div>
  );
}
