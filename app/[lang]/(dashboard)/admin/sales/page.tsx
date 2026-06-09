import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { fetchAppUser } from "@/lib/api/user";
import { getDictionary, hasLocale, type Locale } from "@/app/dictionaries";
import { getOrders } from "@/lib/api/orders";
import { AdminSidebar } from "@/app/components/dashboard/admin/AdminSidebar";
import { AdminTopBar } from "@/app/components/dashboard/admin/AdminTopBar";
import { SalesTable } from "@/app/components/dashboard/admin/sales/SalesTable";
import { SalesFilterBar } from "@/app/components/dashboard/admin/sales/SalesFilterBar";
import type { OrdersFilters } from "@/app/components/dashboard/admin/sales/types";

type PageParams = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale, "admin");
  return {
    title: dict.salesMeta.title,
  };
}

export default async function AdminSalesPage({ params, searchParams }: PageParams) {
  const { lang } = await params;
  const sp = await searchParams;

  if (!hasLocale(lang)) notFound();

  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect(`/${lang}/login`);

  const user = await fetchAppUser(session);
  if (!user || user.role === "user") redirect(`/${lang}/user`);

  const dict = await getDictionary(lang as Locale, "admin");
  const headers = { Authorization: `Bearer ${session.access_token}` };

  const filters: OrdersFilters = {
    order_id: typeof sp.order_id === "string" ? sp.order_id : undefined,
    user_name: typeof sp.user_name === "string" ? sp.user_name : undefined,
    user_email: typeof sp.user_email === "string" ? sp.user_email : undefined,
    date_from: typeof sp.date_from === "string" ? sp.date_from : undefined,
    date_to: typeof sp.date_to === "string" ? sp.date_to : undefined,
    amount_min: typeof sp.amount_min === "string" ? sp.amount_min : undefined,
    amount_max: typeof sp.amount_max === "string" ? sp.amount_max : undefined,
  };

  const [ordersRes] = await Promise.allSettled([getOrders(headers, filters)]);

  const orders = ordersRes.status === "fulfilled" ? ordersRes.value : [];

  return (
    <div className="min-h-screen pt-[88px] flex bg-background">
      <AdminSidebar dict={dict} lang={lang} />

      <main className="flex-1 px-6 py-8 md:px-10 md:py-10">
        <AdminTopBar dict={dict} />

        <div className="mt-8">
          <Suspense>
            <SalesFilterBar />
          </Suspense>
        </div>

        <div className="mt-6">
          <SalesTable orders={orders} dict={dict} />
        </div>
      </main>
    </div>
  );
}
