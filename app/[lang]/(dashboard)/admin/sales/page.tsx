import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { fetchAppUser } from "@/lib/api/user";
import { getDictionary, hasLocale, type Locale } from "@/app/dictionaries";
import { getOrders } from "@/lib/api/orders";
import { AdminSidebar } from "@/app/components/dashboard/admin/AdminSidebar";
import { AdminTopBar } from "@/app/components/dashboard/admin/AdminTopBar";
import { SalesTable } from "@/app/components/dashboard/admin/sales/SalesTable";

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale, "admin");
  return {
    title: dict.salesMeta.title,
  };
}

export default async function AdminSalesPage({ params }: PageParams) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect(`/${lang}/login`);

  const user = await fetchAppUser(session);
  if (!user || user.role === "user") redirect(`/${lang}/user`);

  const dict = await getDictionary(lang as Locale, "admin");
  const headers = { Authorization: `Bearer ${session.access_token}` };

  const [ordersRes] = await Promise.allSettled([getOrders(headers)]);

  const orders = ordersRes.status === "fulfilled" ? ordersRes.value : [];

  return (
    <div className="min-h-screen pt-[88px] flex bg-background">
      <AdminSidebar dict={dict} lang={lang} />

      <main className="flex-1 px-6 py-8 md:px-10 md:py-10">
        <AdminTopBar dict={dict} />

        <div className="mt-8">
          <SalesTable orders={orders} dict={dict} />
        </div>
      </main>
    </div>
  );
}
